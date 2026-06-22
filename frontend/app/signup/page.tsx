import type { Metadata } from "next";
import SignupForm from "@/components/signup";

export const metadata: Metadata = {
  title: "Food Delivery Signup",
  description: "Create a food delivery account",
};

export default function SignupPage() {
  return <SignupForm />;
}
