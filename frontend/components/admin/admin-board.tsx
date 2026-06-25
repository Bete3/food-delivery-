"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar"; // Make sure path matches your project structure
import OrdersView from "@/components/admin/OrdersView";

type FoodItem = {
  _id: string;
  name: string;
  amount: number;
  imageUrl: string;
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default function AdminBoard() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders">("dashboard");
  const [formData, setFormData] = useState({ name: "", amount: "", imageUrl: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [items, setItems] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/foods`, {
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error("Failed to load saved foods");
        const data: FoodItem[] = await response.json();
        setItems(data);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Failed to load foods.");
      }
    };
    void loadFoods();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const primaryImage = imagePreview || formData.imageUrl;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setImagePreview("");
      setSelectedFile(null);
      return;
    }
    const previewUrl = URL.createObjectURL(file);
    setImagePreview((currentPreview) => {
      if (currentPreview) URL.revokeObjectURL(currentPreview);
      return previewUrl;
    });
    setSelectedFile(file);
    setFormData((current) => ({ ...current, imageUrl: "" }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedAmount = formData.amount.trim();
    const resolvedImage = primaryImage.trim();

    if (!trimmedName || !trimmedAmount) {
      setMessage("Please add a food name and amount.");
      return;
    }
    if (!selectedFile && !resolvedImage) {
      setMessage("Please upload a picture or add an image URL.");
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("name", trimmedName);
      payload.append("amount", trimmedAmount);
      if (selectedFile) {
        payload.append("image", selectedFile);
      } else {
        payload.append("imageUrl", resolvedImage);
      }

      const response = await fetch(`${apiBaseUrl}/api/foods`, {
        method: "POST",
        body: payload,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to save food item.");

      setItems((currentItems) => [data, ...currentItems]);
      setFormData({ name: "", amount: "", imageUrl: "" });
      setSelectedFile(null);
      setImagePreview("");
      setMessage(`Saved ${trimmedName} successfully.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to save food item.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main 
      className="min-h-screen bg-[#fff7f1] text-slate-900 flex flex-col md:flex-row font-sans selection:bg-[rgba(255,122,69,0.2)]" 
      style={{ ["--primary" as string]: "#ff7a45" }}
    >
      {/* SEPARATED SIDEBAR COMPONENT */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* VIEW CONTROLLER AREA */}
      <section className="flex-1 max-w-7xl px-4 py-6 sm:px-8 lg:px-10">
        {activeTab === "dashboard" ? (
          <div className="animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-full bg-white/70 px-5 py-3 shadow-[0_20px_50px_-34px_rgba(255,122,69,0.45)] backdrop-blur">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.4em] text-[var(--primary)]">Admin board</p>
                <h1 className="mt-1 text-xl font-bold tracking-tight text-slate-950">Food entry form</h1>
              </div>
              <Link
                href="/"
                className="md:hidden rounded-full border border-[var(--primary)] px-4 py-2 text-sm font-medium text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white"
              >
                Back to Home
              </Link>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <section className="rounded-[32px] border border-white bg-white p-6 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.55)] sm:p-8 h-fit">
                <div className="mb-6 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--primary)]">Add food</p>
<h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
Create menu item            </h2>                  <p className="text-sm leading-6 text-slate-500 font-normal">
                    Enter the food name, price amount, and picture for your admin menu board.
                  </p>
                </div>

                {message && (
                  <div className="mb-5 rounded-2xl border border-[rgba(255,122,69,0.18)] bg-[rgba(255,122,69,0.08)] px-4 py-3 text-sm font-normal text-slate-700">
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="pl-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Food Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Spicy Chicken Wrap"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgba(255,122,69,0.12)] font-normal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="pl-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="e.g. 250"
                      min="0"
                      step="1"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgba(255,122,69,0.12)] font-normal"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="pl-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Picture</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-[var(--primary)] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="pl-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Image URL</label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/food.jpg"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[rgba(255,122,69,0.12)] font-normal"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-[var(--primary)] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_18px_34px_-18px_rgba(255,122,69,0.95)] transition-transform hover:-translate-y-0.5"
                  >
                    {loading ? "Saving..." : "Save Food Item"}
                  </button>
                </form>
              </section>

              <section className="space-y-6">
                <div className="overflow-hidden rounded-[32px] border border-white bg-white shadow-[0_24px_70px_-48px_rgba(15,23,42,0.55)]">
                  <div className="bg-[linear-gradient(135deg,rgba(255,122,69,0.16),rgba(255,122,69,0.05))] p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--primary)]">Preview</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                      {formData.name || "Food preview"}
                    </h3>

                    <div className="mt-6 grid gap-5 rounded-[28px] bg-white p-5 shadow-[0_20px_50px_-36px_rgba(15,23,42,0.45)] sm:grid-cols-[160px_1fr] sm:items-center">
                      <div
                        className="relative h-40 overflow-hidden rounded-3xl bg-[#fff4ef]"
                        style={primaryImage ? { backgroundImage: `url(${primaryImage})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
                      >
                        {!primaryImage && (
                          <div className="flex h-full w-full items-center justify-center text-center text-sm font-normal text-slate-400">
                            Add a picture to show the preview
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">Amount</p>
                          <p className="mt-1 text-3xl font-semibold text-slate-950">{formData.amount || "0"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] border border-white bg-white p-6 shadow-[0_24px_70px_-48px_rgba(15,23,42,0.55)] sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--primary)]">Saved items</p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">Menu entries</h3>
                    </div>
                    <span className="rounded-full bg-[rgba(255,122,69,0.12)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">
                      {items.length} items
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {items.map((item) => (
                      <article key={item._id} className="flex items-center gap-4 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
                          {item.imageUrl ? (
                            <Image src={item.imageUrl} alt={item.name} fill unoptimized className="object-cover" />
                          ) : (
                            <span className="text-xs font-normal text-slate-400">No image</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-base font-semibold text-slate-950">{item.name}</p>
                          <p className="text-sm text-slate-500 font-normal">Amount: {item.amount}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : (
          /* SEPARATED ORDERS VIEW COMPONENT */
          <OrdersView />
        )}
      </section>
    </main>
  );
}