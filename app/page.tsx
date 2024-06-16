import Header from "@/components/Header";
import { Hero } from "@/components/Hero";
import { redirect } from "next/navigation";

export default async function Index() {
  return redirect("/signin");
}
