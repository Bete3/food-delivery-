import type { Metadata } from "next";
import AdminBoard from "@/components/admin/admin-board";

export const metadata: Metadata = {
  title: "Food Delivery Admin",
  description: "Add food items with name, amount, and picture",
};

export default function AdminPage() {
  return <AdminBoard />;
}