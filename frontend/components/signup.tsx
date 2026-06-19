"use client";

import React from "react";

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex bg-slate-50 font-sans">
      
      {/* LEFT SIDE: Playful Hero/Welcome Area (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-tr from-primary/10 via-primary/5 to-secondary/15 p-12 flex-col justify-between relative overflow-hidden">
        {/* Floating background decorative blobs */}
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-60 h-60 bg-secondary/30 rounded-full blur-3xl" />
        
        {/* Brand/Logo Area */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md shadow-primary/20">
            <span className="text-white text-xl font-bold">✨</span>
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight">YourBrand</span>
        </div>

        {/* Center Cute Illustration/Text Copy */}
        <div className="max-w-md my-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-primary/10 shadow-sm text-xs font-semibold text-primary">
            <span>🎉</span> Join over 10,000+ happy humans
          </div>
          <h2 className="text-4xl font-extrabold text-slate-800 leading-tight">
            Start your beautiful journey with us today.
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Get access to your personalized dashboard, cute customizable themes, and a community that genuinely cheers you on. 
          </p>
        </div>

        {/* Footer info */}
        <p className="text-xs text-slate-400 relative z-10">
          © 2026 YourBrand Inc. Made with love and pixels.
        </p>
      </div>

      {/* RIGHT SIDE: The Form Container */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        {/* Subtle mobile-only background accents */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent lg:hidden pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Create an account ✨
            </h1>
            <p className="text-sm text-slate-500">
              Let's get you set up in less than 60 seconds.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
            
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="What should we call you?"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="hello@beautiful.com"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider pl-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Must be at least 8 characters"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-3 pt-1 pl-1">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 h-4 w-4 rounded-lg border-slate-300 text-primary focus:ring-primary/20 transition-all cursor-pointer accent-primary"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-normal cursor-pointer select-none">
                I agree to the <span className="text-secondary font-medium hover:underline">Terms of Service</span> and <span className="text-secondary font-medium hover:underline">Privacy Policy</span>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-sm"
            >
              Get Started 🚀
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <span className="relative bg-white px-3 text-xs text-slate-400 uppercase tracking-widest font-medium">
              Already a member?
            </span>
          </div>

          {/* Switch to Login Link */}
          <div className="text-center">
            <button
              type="button"
              className="w-full py-3 border border-slate-200 hover:border-slate-300 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
            >
              Sign in to your account
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}