import type { Metadata } from "next";
import LoginForm from "@/components/login";

export const metadata: Metadata = {
  title: "Food Delivery Login",
  description: "Sign in to your food delivery account",
};

export default function LoginPage() {
  return <LoginForm />;
}