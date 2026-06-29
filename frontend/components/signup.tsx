"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function SignupForm() {
  const router = useRouter();
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
      
      // Redirects user directly to your home landing page ("/")
      router.push("/");
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
      
      {/* Left Side Column - Immersive Image Background */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden">
        
        {/* Next.js Optimized Full-Bleed Background Image */}
        <Image
          src="/images/image2.png"
          alt="Food City Onboarding Background"
          fill
          priority
          className="object-cover object-center z-0"
        />

        {/* Dynamic Dark/Warm Overlay to ensure readability over your custom image */}
        <div 
          className="absolute inset-0 z-10" 
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(45, 27, 20, 0.4), rgba(45, 27, 20, 0.2), rgba(45, 27, 20, 0.75))"
          }}
        />

        {/* Logo Branding */}
        <div className="relative z-20 flex items-center gap-3 drop-shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-black text-[var(--primary)] shadow-lg shadow-[rgba(255,122,69,0.28)]">
              FD
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">Food City</p>
            </div>
          </div>
        {/* Hero Copy Overlay */}
        <div className="max-w-md my-auto relative z-20 space-y-4 drop-shadow-xl">
          <h2 className="text-4xl font-extrabold text-white leading-tight">
            Start your beautiful journey with us today.
          </h2>
          <p className="text-base text-white/90 leading-relaxed font-medium">
            Get access to your personalized dashboard, cute customizable themes, and a community that genuinely cheers you on.
          </p>
        </div>
      </div>

      {/* Right Side Column - Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        <div
          className="absolute inset-0 lg:hidden pointer-events-none"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)" }}
        />

        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Create an account </h1>
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
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-black/5 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 bg-[var(--primary)] hover:opacity-95 text-white font-semibold rounded-2xl shadow-lg shadow-[rgba(255,122,69,0.18)] transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? "Creating your account..." : "Get Started "}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400">
            Or jump straight to the dedicated <Link href="/login" className="font-semibold text-[var(--primary)] hover:underline underline-offset-4">login page</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}