import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface NewMessageProps extends React.ComponentProps<"form"> {
  userID: string;
}

export default async function NewMessage({
  userID,
  className,
}: NewMessageProps) {
  const handleStartChat = async (formData: FormData) => {
    "use server";
    const sender = formData.get("sender") as string;
    const receiver = formData.get("recipent") as string;
    const message = formData.get("message") as string;
    const conversation_id = formData.get("conversation-id") as string;

    // await sendMessage(sender, receiver, message, conversation_id);
  };

  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <label htmlFor="sender">Sender</label>
        <input type="text" id="sender" name={"sender"} defaultValue={userID} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="recipent">Send to</label>
        <input id="recipent" defaultValue="you" name={"recipent"} />
      </div>
      <div className="grid gap-2">
        <label htmlFor="recipent">Conversation ID</label>
        <input
          id="conversation-id"
          title={"conversation-id"}
          name={"conversation-id"}
          defaultValue={Math.floor(Math.random() * 1000000)}
        />
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
      <Button type="submit" formAction={handleStartChat}>
        Send message
      </Button>
    </form>
  );
}
