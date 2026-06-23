"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const services = [
  {
    title: "Fast Delivery",
    description: "Hot food, short routes, and precise arrival windows.",
  },
  {
    title: "Nearest Place",
    description: "We surface the closest kitchens first so orders stay fresh.",
  },
  {
    title: "Dine In",
    description: "Pick up or sit down with the same clean ordering flow.",
  },
];

const navItems = ["Home", "Menu", "Services", "About Us", "Blog", "Contact"];

export default function LandingPage() {
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/foods", {
          cache: "no-store",
        });
        const data = await res.json();
        setFoods(data);
      } catch (err) {
        console.log("Failed to fetch foods:", err);
      }
    };

    fetchFoods();
  }, []);

  return (
    <main
      className="min-h-screen bg-[#fff7f1] text-slate-900"
      style={
        {
          ["--primary" as string]: "#ff7a45",
          ["--primary-soft" as string]: "rgba(255, 122, 69, 0.14)",
        } as React.CSSProperties
      }
    >
      <section className="overflow-hidden bg-[linear-gradient(180deg,#fff4ef_0%,#fff8f4_68%,#ffffff_100%)]">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-6 rounded-full bg-white/55 px-5 py-3 shadow-[0_18px_50px_-32px_rgba(255,122,69,0.45)] backdrop-blur">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-black tracking-tight text-white shadow-[0_12px_25px_-12px_rgba(255,122,69,0.85)]">
                FD
              </span>
              <span className="hidden text-xs font-bold uppercase tracking-[0.4em] text-slate-500 sm:block">
                Food City
              </span>
            </Link>

            <nav className="hidden items-center gap-7 text-sm text-slate-500 lg:flex">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#menu"
                  className={`transition-colors hover:text-[var(--primary)] ${
                    index === 0 ? "text-[var(--primary)]" : ""
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/signup"
                className="hidden rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_-16px_rgba(255,122,69,0.8)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white"
              >
                Log In
              </Link>
            </div>
          </header>

          <div className="grid items-center gap-12 pb-8 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pt-16">
            <div className="max-w-2xl space-y-8">
              <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[4.4rem]">
                Instant Food, for Instant Hunger
              </h1>

              <p className="max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
                Retail food delivery is a courier service where a restaurant delivers food quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MENU SECTION (FIXED STRUCTURE ONLY) */}
      <section id="menu" className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.4em] text-[var(--primary)]">
              Special Menu For You
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Fresh picks made to order
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            {["All", "Burger", "Sushi", "Cake", "Steak", "Drink"].map((item, index) => (
              <button
                key={item}
                type="button"
                className={`rounded-full px-4 py-2 transition-colors ${
                  index === 0
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white text-slate-500 hover:text-[var(--primary)]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ FIXED: ONLY FETCH LOGIC USED, UI SAME */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {foods.map((item) => (
            <article
              key={item._id}
              className="group overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_22px_60px_-44px_rgba(15,23,42,0.6)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-56 items-center justify-center bg-[#f4e6dc] p-6">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-40 w-40 rounded-full object-cover"
                />
              </div>

              <div className="space-y-4 p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  {item.name}
                </h3>

                <div className="text-2xl font-black text-slate-950">
                  ${item.amount}
                </div>

                <button
                  type="button"
                  className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-[0_16px_30px_-16px_rgba(255,122,69,0.95)] transition-transform hover:-translate-y-0.5"
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICES (UNCHANGED) */}
      <section className="bg-[#fff6ef] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.title}
                className="rounded-[28px] border border-white bg-white p-6"
              >
                <div className="text-lg font-black text-[var(--primary)]">
                  0{index + 1}
                </div>
                <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}