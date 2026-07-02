"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen antialiased font-sans text-slate-900 bg-[var(--secondary)] selection:bg-[var(--primary-soft)] selection:text-[var(--primary)]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--secondary)]/90 border-b border-[var(--primary-soft)] px-6 py-4 md:px-12 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-black text-lg shadow-sm">
            F
          </div>

          <span className="font-bold text-xl tracking-tight text-slate-900">
            Food<span className="text-[var(--primary)]">City</span>
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => router.push("/login")}
            className="cursor-pointer px-5 py-2 rounded-full text-sm font-bold border border-slate-300 hover:border-slate-900 transition-colors"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="cursor-pointer px-5 py-2 bg-[var(--primary)] text-white text-sm font-bold rounded-full hover:brightness-105 shadow-sm transition-all"
          >
            Sign Up
          </button>

        </div>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-12 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-5 flex flex-col space-y-6 text-center lg:text-left">

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Your favorite meals <br />
            delivered hot & fresh <br />
            <span className="text-[var(--primary)] uppercase">
              To Your Door
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
            Satisfy your cravings instantly with Food City. We connect you with
            the best local restaurants to bring delicious, high-quality dishes
            straight to your doorstep with lightning-fast delivery.
          </p>

          <div className="flex items-center justify-center lg:justify-start pt-2">

            <button
              onClick={() => router.push("/signup")}
              className="cursor-pointer px-8 py-3.5 bg-[var(--primary)] text-white font-bold rounded-xl text-sm shadow-md hover:brightness-105 transition-all"
            >
              Get Started
            </button>

          </div>

        </div>

        {/* Hero Image */}
        <div className="lg:col-span-7 flex justify-center relative">
          <div className="w-full max-w-xl aspect-square rounded-full border-8 border-white/40 shadow-xl overflow-hidden bg-slate-100 flex items-center justify-center">

            <img
              src="/images/image2.png"
              alt="Food City Fresh Delivery"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />

          </div>
        </div>

      </section>
      <section className="max-w-7xl mx-auto px-6 py-16 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side Image */}
        <div className="flex justify-center order-2 lg:order-1">
          <div className="w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 shadow-lg flex items-center justify-center">
            <img 
              src="/images/food.png" 
              alt="Freshly packed food delivery" 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col space-y-4 text-center lg:text-left order-1 lg:order-2">
          <span className="text-sm font-bold text-[var(--primary)] tracking-wide uppercase">Track Your Order</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Real-time tracking from kitchen to doorstep
          </h2>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
            <p>
              No more guessing games. From the moment the chef starts preparing your meal until our rider rings your doorbell, you can follow your order step-by-step on our interactive live map.
            </p>
            <p>
              Our dedicated delivery fleet handles your food with extreme care, ensuring everything arrives perfectly insulated, fresh, and exactly the temperature it's supposed to be.
            </p>
            <p className="font-bold text-slate-900">
              Zero hassle, zero delays—just premium food delivery whenever hunger strikes.
            </p>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
            
            
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TESTIMONIAL / INFOBAR --- */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="flex flex-col space-y-6 text-center lg:text-left justify-center">
          <span className="text-4xl text-[var(--primary)] font-serif block mx-auto lg:mx-0">“</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight max-w-md mx-auto lg:mx-0">
            Why our customers choose Food City
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto lg:mx-0">
            "The delivery is consistently faster than any other app I've used. The food always arrives steaming hot, and the app interface is incredibly smooth and simple to navigate when making a quick order."
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <button className="px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-xl text-sm shadow-md hover:brightness-105 transition-all">
              Explore Restaurants
            </button>
          </div>
        </div>

        {/* Right Skillet Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-lg flex items-center justify-center">
            <img 
              src="/images/pack.png" 
              alt="Food City Delivery Rider" 
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER / INFO GRID --- */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-16 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Column 1: Links & Metadata */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="font-black text-lg text-slate-900">Food City Stats</h3>
            <p className="font-bold text-slate-800 text-sm">Our Growing Community</p>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li className="flex items-center gap-2 text-[var(--primary)]">➔ 99.4% On-time deliveries</li>
              <li className="flex items-center gap-2">👁️ Over 10,0+ verified restaurant partners</li>
              <li className="flex items-center gap-2 text-amber-600">🌿 Eco-friendly packaging initiatives</li>
              <li className="flex items-center gap-2">📍 Serving thousands of happy neighborhoods</li>
            </ul>
          </div>

          {/* Column 2: Details & Socials */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Our Mission</p>
              <p className="text-sm font-bold text-slate-800">Bringing the city's flavor to your table</p>
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--primary)]">Average Delivery Time</p>
              <p className="text-xs text-slate-500">Under 25 minutes guaranteed within central city limits.</p>
            </div>
            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a href="#" className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold hover:opacity-80 transition-opacity">f</a>
              <a href="#" className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold hover:opacity-80 transition-opacity">t</a>
              <a href="#" className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold hover:opacity-80 transition-opacity">in</a>
            </div>
          </div>

          {/* Column 3: Bottom Right Image Card */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="w-full max-w-xs aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-md flex items-center justify-center">
              <img 
                src="/images/go.png" 
                alt="Food City Promotion" 
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        
      </footer>
      {/* Keep the rest of your code exactly the same */}

    </div>
  );
}







