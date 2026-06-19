"use client";

import React, { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-secondary/10 p-4 relative overflow-hidden">
      {/* Cute Decorative Background Blobs */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none delay-700" />

      {/* Main Auth Container */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-primary/10 p-8 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">
        
        {/* Header/Tabs */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform">
            <span className="text-2xl animate-bounce">✨</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {isLogin ? "We missed your beautiful face!" : "Join us and start your journey today ✨"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider pl-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your lovely name"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider pl-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="hello@beautiful.com"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center pl-1">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Password
              </label>
              {isLogin && (
                <button type="button" className="text-xs font-medium text-secondary hover:underline transition-all">
                  Forgot?
                </button>
              )}
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm"
          >
            {isLogin ? "Let's Go! 🚀" : "Get Started ✨"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <span className="relative bg-white px-3 text-xs text-slate-400 uppercase tracking-widest font-medium">
            or
          </span>
        </div>

        {/* Toggle Footer */}
        <div className="text-center">
          <p className="text-sm text-slate-600">
            {isLogin ? "New around here?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-secondary hover:text-secondary/80 hover:underline underline-offset-4 transition-all"
            >
              {isLogin ? "Create an account" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}