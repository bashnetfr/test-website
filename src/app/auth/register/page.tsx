"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Bot, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase().auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
      },
    });

    if (authError) {
      setError(authError.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  const inputClass =
    "w-full bg-card border border-border rounded-lg pl-10 pr-10 py-2.5 text-sm text-foreground placeholder-muted focus:outline-none focus:border-accent transition-colors";

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          <Bot className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Check Your Email
          </h1>
          <p className="text-muted mb-6">
            We&apos;ve sent a confirmation link to{" "}
            <span className="text-foreground">{email}</span>. Please verify your
            email to complete registration.
          </p>
          <Link
            href="/auth/login"
            className="bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-2.5 rounded-lg transition-colors inline-block"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Bot className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground">
            Create Your Account
          </h1>
          <p className="text-muted text-sm mt-1">
            Join RoboVault and explore the future of robotics
          </p>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6 md:p-8">
          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-lg px-4 py-3 text-danger text-sm mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm text-muted mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>
            </div>

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
                  placeholder="Min. 6 characters"
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

            <div>
              <label className="block text-sm text-muted mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat your password"
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent hover:bg-accent-hover text-background font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-muted text-sm mt-6">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-accent hover:text-accent-hover font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
