"use client";

import Link from "next/link";
import React, { useState } from "react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    if (!formData.email.trim() || !formData.password) {
      setError("Please provide both email and password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      localStorage.setItem("userToken", data.token);
      localStorage.setItem(
        "userData",
        JSON.stringify({ name: data.name, email: data.email })
      );

      setSuccess(true);
      setFormData({ email: "", password: "" });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Failed to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-slate-950 shadow-lg shadow-black/30">
              FD
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Food Delivery</p>
              <p className="text-lg font-semibold tracking-tight">Fast, simple, and ready when you are.</p>
            </div>
          </div>

          <div className="relative z-10 max-w-lg space-y-6">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Welcome back
            </span>
            <h1 className="text-5xl font-black leading-[1.02] tracking-tight">
              Sign in and pick up where you left off.
            </h1>
            <p className="max-w-md text-base leading-7 text-white/70">
              Manage orders, review favorites, and keep everything in one place with a login flow that stays focused and quick.
            </p>
          </div>

          <p className="relative z-10 text-xs uppercase tracking-[0.28em] text-white/35">
            Secure access for returning customers
          </p>
        </section>

        <section className="relative flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.03),transparent_20%)] lg:hidden" />

          <div className="relative z-10 w-full max-w-md rounded-4xl border border-slate-200/80 bg-white p-8 shadow-[0_24px_80px_-28px_rgba(15,23,42,0.35)] sm:p-10">
            <div className="mb-8 space-y-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-md shadow-slate-950/20">
                in
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-slate-950">Sign in</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Use your email and password to get back into your account.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-700" aria-live="polite">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-700" aria-live="polite">
                Signed in successfully. Welcome back.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="pl-1 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="hello@example.com"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between pl-1">
                  <label className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
                    Password
                  </label>
                  <button type="button" className="text-xs font-semibold text-slate-500 transition-colors hover:text-slate-900">
                    Forgot?
                  </button>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing you in..." : "Sign In"}
              </button>
            </form>

            <div className="relative my-7 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                New here?
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-slate-600">
                Need an account?{" "}
                <Link href="/signup" className="font-semibold text-slate-950 underline-offset-4 hover:underline">
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}