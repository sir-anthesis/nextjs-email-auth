import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import classes from "./checklist.module.css";

const getUserByEmail = async (email: string) => {
  const { data, error } = await createClient().rpc("check_email", { email });

  if (error) {
    throw error;
  }

  return data;
};

export default async function SignUp({
  searchParams,
}: {
  searchParams: { message: string; errpw?: string; email?: string };
}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/dashboard");
  }

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    let errorpw: number[] = [];

    //Check email n pw
    if (password.length < 8) {
      errorpw.push(0);
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errorpw.push(1);
    }
    if (!/\d/.test(password)) {
      errorpw.push(2);
    }
    if (!/[@#$%^&*!]/.test(password)) {
      errorpw.push(3);
    }
    const emailExists = await getUserByEmail(email);

    //Get url
    if (emailExists && errorpw.length > 0) {
      return redirect("/signup?email=used&&errpw=" + errorpw.join(","));
    } else if (emailExists) {
      return redirect("/signup?email=used&errpw=none");
    } else if (errorpw.length > 0) {
      return redirect("/signup?errpw=" + errorpw.join(","));
    } else {
      const { error } = await createClient().auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        return redirect("/signup?message=" + error.message);
      }
    }

    return redirect("/confirm?con=" + email);
  };

  const errpwIndices = searchParams.errpw
    ? searchParams.errpw.split(",").map(Number)
    : [];

  return (
    <div className="w-full sm:max-w-md px-5 justify-center">
      <h1 className="text-2xl mt-10 mb-5 font-bold">Sign up to Reflect!</h1>
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="name">
          Your Name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white border mb-6"
          name="name"
          placeholder="Your Name"
          required
        />

        <label className="text-md" htmlFor="email">
          Email Address
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />

        {searchParams.email && (
          <p className="bg-red-200 px-4 py-2 text-justify mb-6 text-gray-700">
            Oops! It seems this email is already in use. Please try another
            email address or sign in with your existing account
          </p>
        )}

        <label className="text-md" htmlFor="password">
          Create Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-white border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        {searchParams?.errpw && (
          <ul className="list-none bg-red-200 px-4 py-2 text-justify mb-6">
            <li
              className={`flex items-center ${
                errpwIndices.includes(0)
                  ? `${classes["wrong"]}`
                  : `${classes["correct"]}`
              }`}
            >
              <input
                type="checkbox"
                id="item1"
                className={`${classes["custom-checkbox"]}`}
              />
              <label htmlFor="item1" className="ml-2 text-gray-700">
                Contains at least 8 characters
              </label>
            </li>
            <li
              className={`flex items-center ${
                errpwIndices.includes(1)
                  ? `${classes["wrong"]}`
                  : `${classes["correct"]}`
              }`}
            >
              <input
                type="checkbox"
                id="item2"
                className={`${classes["custom-checkbox"]}`}
              />
              <label htmlFor="item2" className="ml-2 text-gray-700">
                Include both lowercase and uppercase letters
              </label>
            </li>
            <li
              className={`flex items-center ${
                errpwIndices.includes(2)
                  ? `${classes["wrong"]}`
                  : `${classes["correct"]}`
              }`}
            >
              <input
                type="checkbox"
                id="item3"
                className={`${classes["custom-checkbox"]}`}
              />
              <label htmlFor="item3" className="ml-2 text-gray-700">
                Contains number (e.g., 1, 2, 3)
              </label>
            </li>
            <li
              className={`flex items-center ${
                errpwIndices.includes(3)
                  ? `${classes["wrong"]}`
                  : `${classes["correct"]}`
              }`}
            >
              <input
                type="checkbox"
                id="item4"
                className={`${classes["custom-checkbox"]}`}
              />
              <label htmlFor="item4" className="ml-2 text-gray-700">
                Include symbols (e.g., @, #, $)
              </label>
            </li>
          </ul>
        )}

        <SubmitButton
          formAction={signUp}
          className="bg-black rounded-md px-4 py-2 text-foreground mb-2 text-white"
          pendingText="Signing Up..."
        >
          Sign Up
        </SubmitButton>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}

        <p className="text-center mt-8">
          By creating an account you agree with our{" "}
          <span className="underline">Terms of Services</span> and{" "}
          <span className="underline">Privacy Policy</span>
        </p>

        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
