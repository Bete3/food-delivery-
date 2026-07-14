"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen overflow-x-hidden antialiased font-sans text-slate-900 bg-[var(--secondary)] selection:bg-[var(--primary-soft)] selection:text-[var(--primary)]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 flex flex-col gap-4 border-b border-[var(--primary-soft)] bg-[var(--secondary)]/90 px-4 py-4 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-12">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer self-start">
          <div className="w-9 h-9 rounded-xl bg-[var(--primary)] flex items-center justify-center text-white font-black text-lg shadow-sm">
            F
          </div>

          <span className="font-bold text-xl tracking-tight text-slate-900">
            Food<span className="text-[var(--primary)]">City</span>
          </span>
        </div>

        {/* Buttons */}
        <div className="flex w-full items-center gap-3 sm:w-auto sm:justify-end">

          <button
            onClick={() => router.push("/login")}
            className="cursor-pointer flex-1 rounded-full border border-slate-300 px-5 py-2 text-sm font-bold transition-colors hover:border-slate-900 sm:flex-none"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="cursor-pointer flex-1 rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:brightness-105 sm:flex-none"
          >
            Sign Up
          </button>

        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 md:px-12 lg:grid-cols-12 lg:gap-12 lg:py-12">

        <div className="flex flex-col space-y-6 text-center lg:col-span-5 lg:text-left">

          <h1 className="text-3xl font-black leading-[1.12] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
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

          <div className="flex items-center justify-center pt-2 lg:justify-start">

            <button
              onClick={() => router.push("/signup")}
              className="cursor-pointer px-8 py-3.5 bg-[var(--primary)] text-white font-bold rounded-xl text-sm shadow-md hover:brightness-105 transition-all"
            >
              Get Started
            </button>

          </div>

        </div>

        {/* Hero Image */}
        <div className="relative flex justify-center lg:col-span-7">
          <div className="flex aspect-square w-full max-w-lg items-center justify-center overflow-hidden rounded-full border-4 border-white/40 bg-slate-100 shadow-xl sm:border-8 lg:max-w-xl">

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
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:px-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
        {/* Left Side Image */}
        <div className="flex justify-center order-2 lg:order-1">
          <div className="flex aspect-[4/3] w-full max-w-md items-center justify-center overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
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
            <p>
              Zero hassle, zero delays just premium food delivery whenever hunger strikes.
            </p>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
            
            
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TESTIMONIAL / INFOBAR --- */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:px-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
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
          <div className="flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:px-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          
          {/* Column 1: Links & Metadata */}
          <div className="space-y-4 lg:col-span-4">
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
          <div className="space-y-4 lg:col-span-4">
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
          <div className="flex justify-end lg:col-span-4">
            <div className="flex aspect-[4/3] w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-md">
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







