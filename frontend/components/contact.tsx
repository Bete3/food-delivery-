"use client";

import React, { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Plug in your api request setup here when needed
    console.log("Feedback Submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", comment: "" });
  };

  return (
    <section 
      className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-10"
      style={{
        ["--primary" as string]: "#ff7a45",
        ["--primary-soft" as string]: "rgba(255, 122, 69, 0.14)",
      } as React.CSSProperties}
    >
      <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.3)] sm:rounded-[32px] sm:p-10 lg:p-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.4em] text-[var(--primary)]">
            Get In Touch
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            We Value Your Feedback
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Have a question, an idea, or want to drop a comment about your last delivery order? Send us a message below!
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-12 px-6 rounded-2xl bg-[var(--primary-soft)] border border-[var(--primary)]/20 animate-fadeIn">
            <span className="text-4xl">🎉</span>
            <h3 className="mt-4 text-xl font-bold text-slate-900">Thank you for writing to us!</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
              Your feedback helps us cook up a better delivery service. Our dispatch support team will look over your notes soon.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs font-bold uppercase tracking-wider text-[var(--primary)] hover:underline focus:outline-none"
            >
              Send another comment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary-soft)]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="johndoe@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary-soft)]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="comment" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Your Comment / Feedback
              </label>
              <textarea
                id="comment"
                required
                rows={5}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Tell us what you think or highlight adjustments you want to see in our services..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-[var(--primary)] focus:bg-white focus:ring-2 focus:ring-[var(--primary-soft)] resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto cursor-pointer rounded-2xl bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_16px_30px_-16px_rgba(255,122,69,0.95)] transition-transform hover:-translate-y-0.5 focus:outline-none"
              >
                Submit Comment
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}