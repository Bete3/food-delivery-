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
  const [showPopup, setShowPopup] = useState(false);

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

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({ amount: "", name: "", number: "", address: "", foodName: "", foodImage: "" });
    setShowPopup(true);
    
    // Auto close popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Soft glowing background blobs */}
      <div className="absolute top-10 left-10 h-40 w-40 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-52 w-52 rounded-full bg-[var(--primary)] opacity-10 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-lg rounded-3xl backdrop-blur-xl shadow-2xl border border-white p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-soft)]">
            <span className="text-xl">🛍️</span>
          </div>

          <h1 className="text-3xl font-bold text-[var(--primary)]">
            Place Your Order
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Fill your details and we'll handle the rest 
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Quantity */}
          <div>
            <label className="text-sm font-medium text-[var(--primary)]">
              Quantity
            </label>
            <input
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter quantity"
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

      {/* Modern Cute Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowPopup(false)}
          />
          
          {/* Popup Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 animate-bounce-in">
            {/* Decorative elements */}
            <div className="absolute -top-3 -right-3 h-16 w-16 rounded-full bg-pink-200 opacity-30 blur-xl" />
            <div className="absolute -bottom-3 -left-3 h-16 w-16 rounded-full bg-orange-200 opacity-30 blur-xl" />
            
            <div className="text-center relative">
              {/* Animated checkmark */}
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg animate-scale-in">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              {/* Success text */}
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Order Placed! 🎉
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                Your order has been submitted successfully! 
                <br />
                <span className="text-xs text-gray-400">We'll notify you when it's ready</span>
              </p>
              
              {/* Cute confetti dots */}
              
              
              {/* Close button */}
              <button
                onClick={() => setShowPopup(false)}
                className="mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-[var(--primary)] to-orange-500 text-white font-medium hover:scale-105 transition-transform duration-200 shadow-md text-sm"
              >
                Awesome! 😊
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          60% {
            transform: scale(1.05) translateY(-5px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out 0.2s both;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}