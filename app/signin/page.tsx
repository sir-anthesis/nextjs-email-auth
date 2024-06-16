import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";

export default async function Login({
  searchParams,
}: {
  searchParams: { log: string };
}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/dashboard");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/signin?log=false");
    }

    return redirect("/dashboard");
  };

  return (
    <div className="w-full sm:max-w-md px-5 justify-center">
      <h1 className="text-2xl mt-10 mb-1 font-bold">Welcome Back!</h1>
      <p className="mb-8 text-justify">
        Sign in below to access your workspace and continue your projects. Let's
        pick up where you left off!
      </p>
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />

        <label className="text-md flex justify-between" htmlFor="password">
          Password
          <span>
            <Link href={"/"} className="underline">
              Forgot?
            </Link>
          </span>
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        {searchParams?.log && (
          <p className="bg-red-200 px-4 py-2 text-justify mb-6 text-gray-700">
            The email and password you entered doesn't match. Please try again
          </p>
        )}

        <SubmitButton
          formAction={signIn}
          className="bg-black rounded-md px-4 py-2 text-foreground mb-2 text-white"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>

        <p className="text-center mt-8">
          Don't have an account?{" "}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
