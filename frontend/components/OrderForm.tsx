"use client";

import { useState } from "react";

export default function OrderForm({ food }: { food: any }) {
  const [formData, setFormData] = useState({
    amount: "",
    name: "",
    number: "",
    address: "",
    foodName: food?.name || "",
    foodImage: food?.imageUrl || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({ amount: "", name: "", number: "", address: "", foodName: "", foodImage: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      {/* Soft glowing background blobs */}
      <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-lg rounded-3xl  backdrop-blur-xl shadow-2xl border border-white p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-soft)]">
            <span className="text-xl">🛍️</span>
          </div>

          <h1 className="text-3xl font-bold text-[var(--primary)]">
            Place Your Order
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Fill your details and we’ll handle the rest 
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Amount */}
          <div>
            <label className="text-sm font-medium text-[var(--primary)]">
              Amount
            </label>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="mt-1 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
            />
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-[var(--primary)]">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
            />
          </div>

          {/* Number */}
          <div>
            <label className="text-sm font-medium text-[var(--primary)]">
              Phone Number
            </label>
            <input
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="09xxxxxxxx"
              className="mt-1 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-sm font-medium text-[var(--primary)]">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your delivery address..."
              rows={4}
              className="mt-1 w-full resize-none rounded-2xl border border-orange-200 bg-white px-4 py-3 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-2xl bg-[var(--primary)] py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:opacity-90 active:scale-[0.98]"
          >
             Submit Order
          </button>
        </form>

        
      </div>
    </div>
  );
}