"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setMessage(
      "Account created. Please check your email to confirm your account."
    );

    setLoading(false);
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 20,
      }}
    >
      <div
        className="card"
        style={{
          width: "min(440px,100%)",
          padding: 28,
        }}
      >
        <Link
          href="/"
          style={{
            fontWeight: 800,
            fontSize: 22,
            color: "#7F1D1D",
          }}
        >
          CampusMind
        </Link>

        <h1 style={{ margin: "28px 0 8px" }}>
          Create your account
        </h1>

        <p className="muted">
          Your academic workspace starts here.
        </p>

        <form
          onSubmit={handleSignup}
          style={{
            display: "grid",
            gap: 16,
            marginTop: 24,
          }}
        >
          <label
            style={{
              display: "grid",
              gap: 7,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Full name

            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              style={{
                height: 46,
                padding: "0 13px",
                border: "1px solid #E7E5E4",
                borderRadius: 8,
              }}
            />
          </label>

          <label
            style={{
              display: "grid",
              gap: 7,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Email address

            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                height: 46,
                padding: "0 13px",
                border: "1px solid #E7E5E4",
                borderRadius: 8,
              }}
            />
          </label>

          <label
            style={{
              display: "grid",
              gap: 7,
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Password

            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              style={{
                height: 46,
                padding: "0 13px",
                border: "1px solid #E7E5E4",
                borderRadius: 8,
              }}
            />
          </label>

          {error && (
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: "#FEF2F2",
                color: "#991B1B",
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          {message && (
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: "#F0FDF4",
                color: "#166534",
                fontSize: 14,
              }}
            >
              {message}
            </div>
          )}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p
          className="muted"
          style={{
            fontSize: 14,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              color: "#7F1D1D",
              fontWeight: 700,
            }}
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
