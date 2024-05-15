import { getConversationMessages } from "@/server/messaging/actions";
import { Message } from "@/types";

interface ChatWindowProps {
  conversationID?: string;
}
export default async function ChatWindow({ conversationID }: ChatWindowProps) {
  const messages = await getConversationMessages(conversationID);
  return (
    <div
      className={
        "flex w-[50%] flex-col items-center justify-center border-2 p-8"
      }
    >
      {messages.map((message: Message) => (
        <div key={message.id} className={"border-2 p-4"}>
          <p>{message.message}</p>
        </div>
      ))}
    </div>
  );
}
