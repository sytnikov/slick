import { redirect } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/utils/supabase/server";

import { SubmitButton } from "../buttons/SubmitButton";
import { Button } from "../ui/button";

export default async function SmallLoginForm() {
  const logIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return data;
  };

  return (
    <div>
      <form className="flex w-full flex-1 flex-row items-center justify-center gap-8">
        <div className={"flex flex-col gap-2"}>
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="email"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className={"flex flex-col gap-2"}>
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>
        <SubmitButton
          formAction={logIn}
          className="mb-2 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          pendingText="Logging in..."
        >
          Log in
        </SubmitButton>
      </form>
      <div className={"flex items-center justify-center"}>
        <Link href="/signup">
          <Button variant={"link"} size={"lg"}>
            No account yet? Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
