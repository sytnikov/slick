import { sendMessage } from "@/server/messaging/actions";
import { Button } from "../ui/button";
import { Conversation } from "@/types";
import { SendIcon } from "lucide-react";

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
    <form className={"mb-8 flex w-full flex-row items-end justify-start gap-4"}>
      <textarea
        name={"message"}
        title={"message"}
        placeholder={"Type your message here..."}
        className={"h-16 w-full rounded-lg border-2 p-4 text-lg"}
      />
      <Button type="submit" formAction={sendUserMessage} className={"gap-4"}>
        <SendIcon size={24} /> Send
      </Button>
    </form>
  );
}
