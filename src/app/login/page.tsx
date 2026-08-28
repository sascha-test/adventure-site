"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the magic link!");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="block text-center text-sm text-foreground/50 hover:text-foreground/70 mb-8"
          >
            ← Back to home
          </Link>

          <h1 className="text-4xl font-semibold text-ember mb-4 text-center">
            Enter the Adventure
          </h1>
          <p className="text-foreground/70 mb-8 text-center leading-relaxed">
            Sign in with your email and we&apos;ll send you a magic link. No
            password needed.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-ember transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-ember text-background font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </button>
          </form>

          {message && (
            <p className="mt-6 text-center text-foreground/80 leading-relaxed">
              {message}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
