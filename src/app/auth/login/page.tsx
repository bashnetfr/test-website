"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Bot, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase().auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
    } else {
      window.location.href = "/";
    }
    setLoading(false);
  };

  const inputClass =
    "w-full bg-card border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-accent transition-colors";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Bot className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-muted text-sm mt-1">
            Sign in to your RoboVault account
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg px-4 py-3 text-danger text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm text-muted mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover text-background font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-accent hover:text-accent-hover font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
