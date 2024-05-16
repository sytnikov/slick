import { getConversationMessages } from "@/server/messaging/actions";
import ChatBubble from "./ChatBubble";
import { Message } from "@/types";

interface ChatWindowProps {
  conversationID?: string;
  currentUserID: string;
}
export default async function ChatWindow({
  conversationID,
  currentUserID,
}: ChatWindowProps) {
  const messages = await getConversationMessages(conversationID);
  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-end gap-4 border-2 p-8"
      }
    >
      {messages.map((message: Message) => (
        <div key={message.id} className={"w-full border-2"}>
          <ChatBubble message={message} currentUserID={currentUserID} />
        </div>
      ))}
    </div>
  );
}
