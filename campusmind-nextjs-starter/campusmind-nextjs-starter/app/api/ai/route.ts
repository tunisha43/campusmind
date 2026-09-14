import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  reserveAICredits,
  finalizeAIUsage,
  failAIUsage,
  providerForTask,
  type AITask,
} from "@/lib/ai/credits";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type AIRequestBody = {
  task?: AITask;
  message?: string;
  messages?: ChatMessage[];
  model?: string;
  requestId?: string;
};

const MODELS = {
  deepseek: "deepseek-v4-flash",
  perplexity: "sonar",
  openai: "gpt-5.6-luna",
} as const;

function isValidTask(value: unknown): value is AITask {
  return (
    value === "assignment" ||
    value === "project" ||
    value === "presentation" ||
    value === "pdf" ||
    value === "general"
  );
}

function normaliseMessages(body: AIRequestBody): ChatMessage[] {
  if (Array.isArray(body.messages) && body.messages.length > 0) {
    return body.messages.filter(
      (message) =>
        message &&
        typeof message.content === "string" &&
        ["system", "user", "assistant"].includes(message.role)
    );
  }

  if (typeof body.message === "string" && body.message.trim()) {
    return [
      {
        role: "user",
        content: body.message.trim(),
      },
    ];
  }

  return [];
}

function calculateCredits(
  provider: "deepseek" | "perplexity" | "openai",
  inputTokens: number,
  outputTokens: number,
  providerCost?: number
) {
  /*
   * CampusMind credits are an internal usage unit.
   *
   * We intentionally keep this calculation separate from
   * the provider APIs so we can change the business pricing
   * later without rebuilding the AI architecture.
   */

  if (provider === "perplexity" && typeof providerCost === "number") {
    return Math.max(1, Math.ceil(providerCost * 100000));
  }

  if (provider === "deepseek") {
    // Conservative estimate using current peak pricing.
    const inputCost = (inputTokens / 1_000_000) * 0.44;
    const outputCost = (outputTokens / 1_000_000) * 1.32;

    return Math.max(1, Math.ceil((inputCost + outputCost) * 100000));
  }

  // OpenAI GPT-5.6 Luna
  const inputCost = (inputTokens / 1_000_000) * 0.20;
  const outputCost = (outputTokens / 1_000_000) * 1.20;

  return Math.max(1, Math.ceil((inputCost + outputCost) * 100000));
}

async function callDeepSeek(messages: ChatMessage[], model: string) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error("DEEPSEEK_API_KEY is not configured");
  }

  const response = await fetch(
    "https://api.deepseek.com/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
        max_tokens: 1200,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "DeepSeek request failed"
    );
  }

  return {
    content: data?.choices?.[0]?.message?.content || "",
    inputTokens: data?.usage?.prompt_tokens || 0,
    outputTokens: data?.usage?.completion_tokens || 0,
    providerCost: undefined,
  };
}

async function callPerplexity(messages: ChatMessage[], model: string) {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    throw new Error("PERPLEXITY_API_KEY is not configured");
  }

  const response = await fetch(
    "https://api.perplexity.ai/v1/sonar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 1200,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "Perplexity request failed"
    );
  }

  return {
    content: data?.choices?.[0]?.message?.content || "",
    inputTokens: data?.usage?.prompt_tokens || 0,
    outputTokens: data?.usage?.completion_tokens || 0,
    providerCost: data?.usage?.cost?.total_cost,
  };
}

async function callOpenAI(messages: ChatMessage[], model: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const response = await fetch(
    "https://api.openai.com/v1/responses",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        input: messages,
        max_output_tokens: 1200,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "OpenAI request failed"
    );
  }

  return {
    content: data?.output_text || "",
    inputTokens: data?.usage?.input_tokens || 0,
    outputTokens: data?.usage?.output_tokens || 0,
    providerCost: undefined,
  };
}

export async function POST(request: Request) {
  let usageId: string | null = null;

  try {
    const supabase = await createClient();

    const { data: dbTest, error: dbTestError } = await supabase
      .from("ai_credit_balances")
      .select("user_id, credits_balance")
      .limit(1);
    
    console.log("AI CREDIT TABLE TEST:", {
      data: dbTest,
      error: dbTestError,
    });
    console.log(
      "SUPABASE URL:",
      process.env.NEXT_PUBLIC_SUPABASE_URL
    );
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "UNAUTHENTICATED",
          message: "Please log in to use CampusMind AI.",
        },
        { status: 401 }
      );
    }

    const body = (await request.json()) as AIRequestBody;

    if (!isValidTask(body.task)) {
      return NextResponse.json(
        {
          error: "INVALID_TASK",
          message: "A valid AI task is required.",
        },
        { status: 400 }
      );
    }

    const messages = normaliseMessages(body);

    if (messages.length === 0) {
      return NextResponse.json(
        {
          error: "EMPTY_MESSAGE",
          message: "Please provide a message.",
        },
        { status: 400 }
      );
    }

    const task = body.task;
    const provider = providerForTask(task);

    const model =
      body.model ||
      MODELS[provider];

    const requestId =
      body.requestId ||
      crypto.randomUUID();

    // Reserve CampusMind credits before calling the provider.
    const reservation = await reserveAICredits(
      task,
      model,
      requestId
    );

    usageId = reservation.usageId;

    let result;

    if (provider === "deepseek") {
      result = await callDeepSeek(messages, model);
    } else if (provider === "perplexity") {
      result = await callPerplexity(messages, model);
    } else {
      result = await callOpenAI(messages, model);
    }

    const creditsCharged = calculateCredits(
      provider,
      result.inputTokens,
      result.outputTokens,
      result.providerCost
    );

    await finalizeAIUsage({
      usageId,
      inputTokens: result.inputTokens,
      outputTokens: result.outputTokens,
      creditsCharged,
      metadata: {
        requestId,
        task,
        provider,
        model,
        providerCost: result.providerCost ?? null,
      },
    });

    return NextResponse.json({
      success: true,
      message: result.content,
      task,
      provider,
      model,
      usage: {
        inputTokens: result.inputTokens,
        outputTokens: result.outputTokens,
        creditsCharged,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "AI request failed";

    if (usageId) {
      try {
        await failAIUsage(usageId, {
          error: message,
        });
      } catch {
        // Do not replace the original provider error.
      }
    }

    if (message === "INSUFFICIENT_AI_CREDITS") {
      return NextResponse.json(
        {
          error: "INSUFFICIENT_AI_CREDITS",
          message:
            "You don't have enough CampusMind AI credits.",
        },
        { status: 402 }
      );
    }

    if (message === "UNAUTHENTICATED") {
      return NextResponse.json(
        {
          error: "UNAUTHENTICATED",
          message: "Please log in first.",
        },
        { status: 401 }
      );
    }

    console.error("CampusMind AI error:", error);

    return NextResponse.json(
      {
        error: "AI_REQUEST_FAILED",
        message: "CampusMind AI could not complete your request.",
      },
      { status: 500 }
    );
  }
}
