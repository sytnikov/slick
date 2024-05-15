import { sendMessage } from "@/server/messaging/actions";
import { Button } from "../ui/button";
import { Conversation } from "@/types";

interface SendMessageProps {
  sender: string;
  selectedConversation: Conversation | null;
}
export default async function SendMessage({
  selectedConversation,
  sender,
}: SendMessageProps) {
  const receiver = selectedConversation?.receiver;

  const sendUserMessage = async (formData: FormData) => {
    "use server";
    await sendMessage(
      formData,
      sender,
      receiver?.user_id,
      selectedConversation?.id,
    );
  };

  return (
    <form className={"flex flex-col justify-start border-2 p-12"}>
      <label htmlFor={"message"}>Message</label>
      <input
        type="text"
        name={"message"}
        title={"message"}
        className={"mb-4"}
      />
      <Button type="submit" formAction={sendUserMessage}>
        Send message
      </Button>
    </form>
  );
}
