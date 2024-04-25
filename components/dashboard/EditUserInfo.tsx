import React from "react";

import { SubmitButton } from "../buttons/SubmitButton";

import { UserProfile } from "@/types";
import { saveChangesMadeToUserProfile } from "@/server/user-profiles/actions";

interface EditUserInfoProps {
  user: UserProfile;
}
export default function EditUserInfo({ user }: EditUserInfoProps) {
  const saveUserChanges = async (formData: FormData) => {
    "use server";
    await saveChangesMadeToUserProfile(formData, user.id);
  };

  return (
    <div>
      <form className="mb-8 grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label htmlFor="first_name">First name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            defaultValue={user.first_name}
            placeholder="Matti"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            name="surname"
            defaultValue={user.surname}
            placeholder="Meikäläinen"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone_number">Phone number</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            defaultValue={user.phone_number}
            placeholder="0401234567"
          />
        </div>

        <SubmitButton
          formAction={saveUserChanges}
          className="mb-2 h-10 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
          pendingText="Saving changes..."
        >
          Save changes
        </SubmitButton>
      </form>
    </div>
  );
}
