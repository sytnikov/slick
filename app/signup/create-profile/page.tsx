import React from "react";
import { redirect } from "next/navigation";

import { SubmitButton } from "@/components/buttons/SubmitButton";
import PageLayout from "@/components/layouts/PageLayout";
import ShopOwnerToggle from "@/components/sign-up/ShopOwnerToggle";

import { createClient } from "@/utils/supabase/server";

import { UserProfile } from "@/types";

export default function CompleteProfile({
  searchParams,
}: {
  searchParams: { message: string; shop_owner: string };
}) {
  const createProfile = async (formData: FormData): Promise<UserProfile> => {
    "use server";

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const userData = await supabase
      .from("User Profiles")
      .select("*")
      .eq("user_id", user?.id);

    if (userData.data?.length !== 0) {
      return redirect(
        "/signup/create-profile?message=Could not create profile. This user already exists",
      );
    }

    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const phoneNumber = formData.get("tel");
    const shopOwner = searchParams.shop_owner === "true";

    const { data, error } = await supabase
      .from("User Profiles")
      .insert({
        user_id: user?.id,
        first_name: firstName,
        surname: lastName,
        phone_number: phoneNumber,
        shop_owner: shopOwner,
      })
      .select();

    if (error) {
      return redirect("create-profile?message=Could not create profile");
    }
    // add a toast to confirm the action is a success

    if (shopOwner) {
      return redirect("/complete-repair-shop-signup");
    } else {
      return redirect("/customer-dashboard");
    }
  };

  return (
    <PageLayout>
      <div className="flex w-full max-w-md flex-1 flex-col justify-evenly">
        <form className="flex w-full flex-1 flex-col justify-center gap-2 animate-in">
          <h2 className="mb-8 text-2xl font-bold">
            Finish creating your profile
          </h2>
          <label htmlFor="first-name" className="text-md">
            First name
          </label>
          <input
            type="text"
            id="first-name"
            name="first-name"
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            placeholder="John"
          />
          <label htmlFor="first-name">Last name</label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            placeholder="Doe"
          />
          <label htmlFor="tel">Phone number</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            className="mb-6 rounded-md border bg-inherit px-4 py-2"
            placeholder="+358 501234567"
          />
          <ShopOwnerToggle />
          <SubmitButton
            formAction={createProfile}
            pendingText="Creating profile..."
            className="mb-2 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          >
            Create profile
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 bg-foreground/10 p-4 text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </PageLayout>
  );
}
