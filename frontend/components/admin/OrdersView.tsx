"use client";

import { useEffect, useState } from "react";

export default function OrdersView() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // 🔴 LIVE ORDERS (AUTO REFRESH)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchOrders();

    const interval = setInterval(fetchOrders, 3000);

    return () => clearInterval(interval);
  }, []);

  // ⚙️ UPDATE STATUS
  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
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
        await fetch(`http://localhost:5000/api/orders/${id}`, {
          method: "DELETE",
        });

        setOrders((prev) => prev.filter((o) => o._id !== id));
      }, 1000);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[#fff7f1]">

      {/* HEADER */}
      <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border border-orange-100">

        <div className="bg-gradient-to-r from-[var(--primary)] to-orange-400 text-white p-5 flex items-center justify-between">
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

            <thead className="bg-orange-50 text-gray-700 text-sm">
              <tr>
                <th className="p-4">#</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-orange-50/60 transition-all duration-300 hover:scale-[1.01]"
                >

                  {/* ID */}
                  <td className="p-4 font-bold text-[var(--primary)]">
                    {index + 1}
                  </td>

                  {/* NAME */}
                  <td className="font-semibold text-gray-800">
                    {order.name}
                  </td>

                  {/* PHONE */}
                  <td className="text-gray-600">
                    {order.number}
                  </td>

                  {/* STATUS DROPDOWN */}
                  <td>
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
                  <td>
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

          <div className="w-[420px] bg-white rounded-3xl shadow-2xl p-6">

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