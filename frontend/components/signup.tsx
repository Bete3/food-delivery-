"use client";

import Link from "next/link";
import React, { useState } from "react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("Please fill out all fields.");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
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
      setFormData({ name: "", email: "", password: "" });
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
    <div className="min-h-screen w-full flex bg-slate-50 font-sans">
      <div
        className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.03), rgba(255,255,255,0.95))",
        }}
      >
        <div className="absolute top-1/4 -left-10 w-72 h-72 rounded-full blur-3xl animate-pulse bg-black/15" />
        <div className="absolute bottom-1/4 right-0 w-60 h-60 rounded-full blur-3xl bg-black/10" />

        <div className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-md shadow-black/20">
            <span className="text-white text-xl font-bold">✨</span>
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">YourBrand</span>
        </div>

        <div className="max-w-md my-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-black/10 shadow-sm text-xs font-semibold text-black">
            <span>🎉</span> Join over 10,000+ happy humans
          </div>
          <h2 className="text-4xl font-extrabold text-slate-800 leading-tight">
            Start your beautiful journey with us today.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Get access to your personalized dashboard, cute customizable themes, and a community that genuinely cheers you on.
          </p>
        </div>

        <p className="text-xs text-slate-400 relative z-10">© 2026 YourBrand Inc. Made with love and pixels.</p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        <div
          className="absolute inset-0 lg:hidden pointer-events-none"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)" }}
        />

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Create an account ✨</h1>
            <p className="text-sm text-slate-500">Let&apos;s get you set up in less than 60 seconds.</p>
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium rounded-2xl" aria-live="polite">
              {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-medium rounded-2xl" aria-live="polite">
              Account created successfully. Welcome aboard.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What should we call you?"
                autoComplete="name"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-black/5 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@beautiful.com"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-black/5 transition-all text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Must be at least 8 characters"
                autoComplete="new-password"
                minLength={8}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-black/5 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 bg-black hover:bg-slate-800 text-white font-semibold rounded-2xl shadow-lg shadow-black/20 transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating your account..." : "Get Started 🚀"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Or jump straight to the dedicated <Link href="/login" className="font-semibold text-secondary hover:underline underline-offset-4">login page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}