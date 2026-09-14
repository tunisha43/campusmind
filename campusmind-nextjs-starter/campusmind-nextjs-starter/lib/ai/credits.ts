import { createClient } from "../../lib/supabase/server";

export type AITask = "assignment" | "project" | "presentation" | "pdf" | "general";
export type AIProvider = "deepseek" | "perplexity" | "openai";

export const CREDIT_RESERVES: Record<AITask, number> = {
  assignment: 100,
  project: 500,
  presentation: 300,
  pdf: 300,
  general: 100,
};

export function providerForTask(task: AITask): AIProvider {
  if (task === "assignment" || task === "general") return "deepseek";
  if (task === "project") return "perplexity";
  return "openai";
}

export async function reserveAICredits(task: AITask, model: string | null, requestId?: string) {
  const supabase = await createClient();
  const provider = providerForTask(task);

  const { data, error } = await supabase.rpc("reserve_ai_credits", {
    p_task_type: task,
    p_provider: provider,
    p_model: model,
    p_reserved_credits: CREDIT_RESERVES[task],
    p_request_id: requestId ?? null,
  });

  if (error) {
    if (error.message.includes("INSUFFICIENT_AI_CREDITS")) {
      throw new Error("INSUFFICIENT_AI_CREDITS");
    }
    throw error;
  }

  return { usageId: data as string, provider, reservedCredits: CREDIT_RESERVES[task] };
}

export async function finalizeAIUsage(args: {
  usageId: string;
  inputTokens: number;
  outputTokens: number;
  creditsCharged: number;
  metadata?: Record<string, unknown>;
}) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("finalize_ai_usage", {
    p_usage_id: args.usageId,
    p_input_tokens: args.inputTokens,
    p_output_tokens: args.outputTokens,
    p_credits_charged: args.creditsCharged,
    p_metadata: args.metadata ?? {},
  });
  if (error) throw error;
}

export async function failAIUsage(usageId: string, metadata: Record<string, unknown> = {}) {
  const supabase = await createClient();
  const { error } = await supabase.rpc("fail_ai_usage", {
    p_usage_id: usageId,
    p_metadata: metadata,
  });
  if (error) throw error;
}
