import { startNewConversation } from "@/server/messaging/actions";
import { getAllUserProfiles } from "@/server/user-profiles/actions";

import { cn } from "@/lib/utils";
import { SubmitButton } from "../buttons/SubmitButton";

interface NewMessageProps extends React.ComponentProps<"form"> {
  userID: string;
}

export default async function NewConversation({
  userID,
  className,
}: NewMessageProps) {
  const handleStartChat = async (formData: FormData) => {
    "use server";
    const sender = userID;

    await startNewConversation(sender, formData);
  };

  const listOfAllUsers = (await getAllUserProfiles()) || [];

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <label htmlFor="recipent">Send to</label>
        <select id="recipent" name={"recipent"}>
          {listOfAllUsers.map((user) => (
            <option key={user.id} value={user.user_id} title="recipent">
              {user.first_name} {user.surname}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label htmlFor="username">Message</label>
        <input
          id="message"
          name={"message"}
          title={""}
          defaultValue="Hey, it's me, feel free to edit!"
        />
      </div>
      <SubmitButton type="submit" formAction={handleStartChat}>
        Send message
      </SubmitButton>
    </form>
  );
}
