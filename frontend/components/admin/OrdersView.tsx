"use client";

import { useEffect, useState } from "react";

export default function OrdersView() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // 🔴 LIVE ORDERS (AUTO REFRESH)
  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  fetchOrders();

  const interval = setInterval(fetchOrders, 3000);

  return () => clearInterval(interval);
}, []);

  // ⚙️ UPDATE STATUS
  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const updated = await res.json();

    setOrders((prev) =>
      prev.map((o) => (o._id === id ? updated : o))
    );

    // 🗑️ AUTO DELETE COMPLETED
    if (status === "Completed") {
      setTimeout(async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${id}`, {
          method: "DELETE",
        });

        setOrders((prev) => prev.filter((o) => o._id !== id));
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff7f1] p-4 sm:p-6">

      {/* HEADER */}
      <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border border-orange-100">

        <div className="flex flex-col gap-3 bg-gradient-to-r from-[var(--primary)] to-orange-400 p-4 text-white sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <h1 className="text-lg font-bold">
            🍔 Orders Dashboard
          </h1>

          <span className="flex items-center gap-2 text-xs bg-white/20 px-3 py-1 rounded-full">
            <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-orange-50 text-sm text-gray-700">
              <tr>
                <th className="p-3 sm:p-4">#</th>
                <th className="p-3 sm:p-4">Name</th>
                <th className="p-3 sm:p-4">Phone</th>
                <th className="p-3 sm:p-4">Status</th>
                <th className="p-3 sm:p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-orange-50/60 transition-all duration-300 hover:scale-[1.01]"
                >

                  {/* ID */}
                  <td className="p-3 font-bold text-[var(--primary)] sm:p-4">
                    {index + 1}
                  </td>

                  {/* NAME */}
                  <td className="p-3 font-semibold text-gray-800 sm:p-4">
                    {order.name}
                  </td>

                  {/* PHONE */}
                  <td className="p-3 text-gray-600 sm:p-4">
                    {order.number}
                  </td>

                  {/* STATUS DROPDOWN */}
                  <td className="p-3 sm:p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className="
                        rounded-full px-3 py-1 text-sm font-semibold
                        bg-[var(--primary)] text-white
                        shadow-md cursor-pointer
                        hover:scale-105 transition
                        focus:outline-none focus:ring-2 focus:ring-[var(--primary-soft)]
                      "
                    >
                      <option className="text-black bg-white">Pending</option>
                      <option className="text-black bg-white">Preparing</option>
                      <option className="text-black bg-white">Completed</option>
                    </select>
                  </td>

                  {/* VIEW BUTTON */}
                  <td className="p-3 sm:p-4">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="
                        rounded-full bg-[var(--primary)]
                        px-4 py-1.5 text-white text-sm font-semibold
                        shadow-md hover:scale-105 transition
                        active:scale-95
                      "
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">

          <div className="w-[calc(100vw-2rem)] max-w-[420px] rounded-3xl bg-white p-5 shadow-2xl sm:p-6">

            {/* IMAGE SAFE */}
            {selectedOrder.foodImage ? (
              <img
                src={selectedOrder.foodImage}
                className="h-44 w-full object-cover rounded-2xl"
              />
            ) : (
              <div className="h-44 w-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                No Image
              </div>
            )}

            {/* INFO */}
            <h2 className="mt-4 text-xl font-bold text-[var(--primary)]">
              {selectedOrder.foodName}
            </h2>

            <div className="mt-3 space-y-1 text-sm text-gray-600">
              <p><b>Name:</b> {selectedOrder.name}</p>
              <p><b>Phone:</b> {selectedOrder.number}</p>
              <p><b>Amount:</b> {selectedOrder.amount}</p>
              <p><b>Address:</b> {selectedOrder.address}</p>
              <p>
                <b>Status:</b>{" "}
                <span className="text-[var(--primary)] font-semibold">
                  {selectedOrder.status}
                </span>
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="
                mt-5 w-full py-2 rounded-xl
                bg-[var(--primary)] text-white
                hover:opacity-90 transition
              "
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}