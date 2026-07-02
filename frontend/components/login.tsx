"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function LoginForm() {
  const router = useRouter();
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
        JSON.stringify({ name: data.name, email: data.email, role: data.role })
      );

      setSuccess(true);
      setFormData({ email: "", password: "" });

      // ✅ Redirect after successful login (slightly safer in Next.js)
      if (data.role === "admin") {
  router.replace("/admin");
} else {
  router.replace("/landing-page");
}
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
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 sm:p-8 font-sans">
      
      {/* Expanded Container Card on Clean White Layout */}
      <div className="w-full max-w-xl rounded-[2.5rem] border border-slate-100 bg-slate-50/50 p-10 sm:p-14 shadow-[0_24px_70px_-15px_rgba(15,23,42,0.08)]">
        
        {/* Brand Header */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)] text-xl font-black text-white shadow-lg shadow-[rgba(255,122,69,0.25)]">
              FD
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 leading-none">Food city</h2>
              <p className="mt-1.5 text-xs text-slate-400 font-bold uppercase tracking-widest">Welcome back</p>
            </div>
          </div>
          <p className="text-base leading-relaxed text-slate-500 font-medium pt-1">
            Use your account credentials to quickly log back into your food dashboard and track orders.
          </p>
        </div>

        {/* Status Alerts */}
        {error && (
          <div className="mb-5 rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-700" aria-live="polite">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-medium text-emerald-700" aria-live="polite">
            Signed in successfully.
          </div>
        )}

        {/* Form Elements */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="pl-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@example.com"
              autoComplete="email"
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between pl-1">
              <label className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                Password
              </label>
              <button type="button" className="text-xs font-semibold text-slate-400 transition-colors hover:text-slate-900 cursor-pointer">
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
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-2xl bg-[var(--primary)] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-[rgba(255,122,69,0.2)] transition-all duration-200 hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing you in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200/80" />
          </div>
          <span className="relative bg-slate-50 px-4 text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">
            New to Food City?
          </span>
        </div>

        {/* Signup Link */}
        <div className="text-center">
          <p className="text-sm text-slate-500 font-medium">
            Need an account?{" "}
            <Link href="/signup" className="font-bold text-[var(--primary)] underline-offset-4 hover:underline">
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}