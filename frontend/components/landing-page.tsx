"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OrderForm from "@/components/OrderForm";
import AboutUs from "./about-us";
import ContactUs from "./contact"; // Imported new contact path component

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

const navItems = ["Menu", "About Us", "Contact"];

export default function LandingPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [filteredFoods, setFilteredFoods] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [activePage, setActivePage] = useState<"Menu" | "About Us" | "Contact">("Menu"); 

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/foods", {
          cache: "no-store",
        });
        const data = await res.json();
        // Ensure data is an array
        const foodsArray = Array.isArray(data) ? data : [];
        setFoods(foodsArray);
        setFilteredFoods(foodsArray);
      } catch (err) {
        console.log("Failed to fetch foods:", err);
        setFoods([]);
        setFilteredFoods([]);
      }
    };

    fetchFoods();
  }, []);

  // Filter foods when category changes
  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    // Ensure foods is an array before filtering
    const foodsArray = Array.isArray(foods) ? foods : [];
    
    if (category === "All") {
      setFilteredFoods(foodsArray);
    } else {
      const filtered = foodsArray.filter(
        (food) => food.category?.toLowerCase() === category.toLowerCase()
      );
      setFilteredFoods(filtered);
    }
  };

  // Helper title renderer for dynamic subpage hero strings
  const getHeroTitle = () => {
    if (activePage === "About Us") return "Who We Are & What We Do";
    if (activePage === "Contact") return "We are Here to Listen";
    return "Instant Food, for Instant Hunger";
  };

  const getHeroDescription = () => {
    if (activePage === "About Us") {
      return "Discover how Food City delivers unmatched premium service directly from your local neighborhoods to your kitchen counter.";
    }
    if (activePage === "Contact") {
      return "Have thoughts on how to make Food City better? Reach out directly and share your thoughts with our culinary support team.";
    }
    return "Retail food delivery is a courier service where a restaurant delivers food quickly.";
  };

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
      <section className="relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/video1.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-6 rounded-full bg-white/10 px-5 py-3 backdrop-blur-md">
            <button 
              onClick={() => setActivePage("Menu")} 
              className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-left focus:outline-none"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-black tracking-tight text-white shadow-[0_12px_25px_-12px_rgba(255,122,69,0.85)]">
                FD
              </span>
              <span className="hidden text-xs font-bold uppercase tracking-[0.4em] text-white sm:block">
                Food City
              </span>
            </button>

            {/* Interactive Navigation Items */}
            <nav className="hidden items-center gap-7 text-sm text-white lg:flex">
              {navItems.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActivePage(item as any)}
                  className={`transition-colors hover:text-[var(--primary)] cursor-pointer bg-transparent border-none font-medium focus:outline-none ${
                    activePage === item ? "text-[var(--primary)] font-bold" : "text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/homepage"
                className="hidden rounded-full bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_30px_-16px_rgba(255,122,69,0.8)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
              >
                Logout
              </Link>

              
            </div>
          </header>

          <div className="grid items-center gap-12 pb-8 pt-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pt-16">
            <div className="max-w-2xl space-y-8">
              <h1 className="max-w-xl text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-[4.4rem]">
                {getHeroTitle()}
              </h1>

              <p className="max-w-xl text-base leading-8 text-gray-200 sm:text-lg">
                {getHeroDescription()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE-WAY DYNAMIC ROUTER CONTAINER */}
      {activePage === "About Us" ? (
        <AboutUs />
      ) : activePage === "Contact" ? (
        <ContactUs />
      ) : (
        <>
          {/* DEFAULT MENU VIEW */}
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
                {["All", "Burger", "Sushi", "Cake", "Steak", "Drink"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => filterByCategory(item)}
                    className={`rounded-full px-4 py-2 transition-colors ${
                      selectedCategory === item
                        ? "bg-[var(--primary)] text-white"
                        : "bg-white text-slate-500 hover:text-[var(--primary)]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredFoods && filteredFoods.length > 0 ? (
                filteredFoods.map((item) => (
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

                      <div className="text-lg font-black text-slate-950">
                        {item.amount} ETB
                      </div>

                      {item.category && (
                        <div className="text-xs text-slate-400">
                           {item.category}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFood(item);
                          setShowOrderForm(true);
                        }}
                        className="cursor-pointer rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-[0_16px_30px_-16px_rgba(255,122,69,0.95)] transition-transform hover:-translate-y-0.5"
                      >
                        Order Now
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-gray-500">
                    {filteredFoods && filteredFoods.length === 0 && foods.length === 0 
                      ? "Loading foods..." 
                      : `No ${selectedCategory} items available right now 😅`}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* SERVICES DISPLAY PANEL */}
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
        </>
      )}

      {showOrderForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowOrderForm(false)}
              className="absolute right-4 top-4 z-50 text-white"
            >
              ✕
            </button>
            <OrderForm food={selectedFood} />
          </div>
        </div>
      )}
    </main>
  );
}