"use client";

import React from "react";

export default function AboutUs() {
  return (
    <section 
      className="min-h-screen bg-[#fff7f1] text-slate-900 py-16 px-6 sm:px-8 lg:px-10"
      style={{
        ["--primary" as string]: "#ff7a45",
        ["--primary-soft" as string]: "rgba(255, 122, 69, 0.14)",
      } as React.CSSProperties}
    >
      <div className="mx-auto max-w-7xl">
        
        {/* SECTION 1: HEADER & INTRO */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-extrabold uppercase tracking-[0.4em] text-[var(--primary)]">
            Who We Are
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Bringing Your Favorite Flavors Closer
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            Food City is more than a delivery app. We are the link between passionate kitchens 
            and hungry individuals, committed to delivering freshness without compromise.
          </p>
        </div>

        {/* SECTION 2: THE CORE STORY & FIRST IMAGE PLACEHOLDER */}
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Our Journey & Mission
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We started with a simple observation: great food shouldn't lose its character 
              on the ride over. Hot food should be steaming, crisp textures should stay crunchy, 
              and delivery estimates should look like real guarantees instead of wild guesses.
            </p>
            <p className="text-slate-600 leading-relaxed">
              By working strictly with localized networks and smart routing mechanisms, we ensure 
              that your kitchen selections spend less time sitting inside storage boxes and more time 
              being enjoyed directly at your dining table.
            </p>
          </div>
          
          {/* IMAGE 1: Clear, crisp image container */}
          <div className="relative h-[400px] w-full rounded-[28px] overflow-hidden bg-white border border-slate-100 shadow-md flex items-center justify-center">
            <img 
              src="/images/delivery1.png" 
              alt="Our Story Imagery" 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
            />
          </div>
        </div>

        {/* SECTION 3: DELIVERY ADVANTAGES (GRID STATS) */}
        <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-slate-100 shadow-[0_22px_60px_-44px_rgba(15,23,42,0.3)] mb-24">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <div className="text-4xl font-black text-[var(--primary)]">100%</div>
              <h4 className="text-base font-bold text-slate-900">Fresh Guarantee</h4>
              <p className="text-sm text-slate-500">We prioritize nearby culinary hubs so thermal maps stay optimized.</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-[var(--primary)]">24/7</div>
              <h4 className="text-base font-bold text-slate-900">Continuous Support</h4>
              <p className="text-sm text-slate-500">Our logistics dispatchers supervise system alerts constantly.</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-[var(--primary)]">15 Min</div>
              <h4 className="text-base font-bold text-slate-900">Average ETA</h4>
              <p className="text-sm text-slate-500">Point-to-point micro routing breaks standard transport delays.</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-[var(--primary)]">0 ETB</div>
              <h4 className="text-base font-bold text-slate-900">Hidden Fees</h4>
              <p className="text-sm text-slate-500">Total clarity across checkouts. No unexpected adjustments.</p>
            </div>
          </div>
        </div>

        {/* SECTION 4: HOW WE DO IT & SECOND IMAGE PLACEHOLDER */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* IMAGE 2: Clear, crisp image container */}
          <div className="relative h-[400px] w-full rounded-[28px] overflow-hidden bg-white border border-slate-100 shadow-md flex items-center justify-center order-2 lg:order-1">
            <img 
              src="/images/deliver2.png" 
              alt="Our Operations" 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none' }}
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              Behind the Scenes of Fast Delivery
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Speed requires exceptional planning. Our smart assignment matrix distributes incoming 
              requests to partners based on live cook times and driver coordinates. 
            </p>
            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-bold">1</span>
                <p className="text-sm text-slate-600"><strong className="text-slate-900">Eco-Friendly Packagings:</strong> We encourage containers that secure structural steam relief, preserving temperature settings cleanly.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-bold">2</span>
                <p className="text-sm text-slate-600"><strong className="text-slate-900">Trained Fleet Drivers:</strong> Our couriers are certified logistics specialists familiar with community shortcuts and gate codes.</p>
              </div>
              <div className="flex gap-4 items-start">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)] text-xs font-bold">3</span>
                <p className="text-sm text-slate-600"><strong className="text-slate-900">Strict Quality Checks:</strong> Kitchen items are verified under sanitary guidelines prior to final bag sealing.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}