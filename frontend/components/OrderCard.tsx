"use client";

export default function OrderCard({
  order,
}: {
  order: any;
}) {
  return (
    <div className="group overflow-hidden rounded-[32px] border border-white bg-white shadow-xl transition hover:-translate-y-1">

      <div className="relative h-48">
        <img
          src={order.image}
          alt={order.name}
          className="h-full w-full object-cover"
        />

        <span className="absolute top-4 right-4 rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white">
          #{order.orderNumber}
        </span>
      </div>

      <div className="p-5 sm:p-6">

        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">
            {order.name}
          </h3>

          <span className="font-bold text-[var(--primary)]">
            ETB {order.amount}
          </span>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {order.number}
        </p>

        <p className="mt-2 text-sm text-slate-500 line-clamp-2">
          {order.address}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span
            className={`px-4 py-2 rounded-full text-xs font-bold
            ${
              order.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : order.status === "Preparing"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {order.status}
          </span>

          <button className="rounded-xl bg-[var(--primary)] px-4 py-2 text-white font-semibold hover:opacity-90">
            View Order
          </button>
        </div>
      </div>
    </div>
  );
}