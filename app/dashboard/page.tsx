import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="w-full sm:max-w-md px-5 justify-center">
      <h1 className="text-2xl mt-10 mb-6 font-bold">Dashboard</h1>
      <p className="bg-white p-5 text-justify">
        Welcome {session.user.email} to your dashboard! Explore and manage your
        account effortlessly.
      </p>
    </div>
  );
}
