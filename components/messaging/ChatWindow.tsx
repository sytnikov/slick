import { getConversationMessages } from "@/server/messaging/actions";
import ChatBubble from "./ChatBubble";
import { Message, MessageSender } from "@/types";

interface ChatWindowProps {
  conversationID?: string;
  currentUserID: string;
}
export default async function ChatWindow({
  conversationID,
  currentUserID,
}: ChatWindowProps) {
  const messages = await getConversationMessages(conversationID);

  const getMessageSender = (message: Message): MessageSender => {
    return {
      userProfile: message.sender,
      type:
        message.sender.user_id === currentUserID ? "currentUser" : "otherUser",
    };
  };

  return (
    <div
      className={
        "flex h-full w-full flex-col items-center justify-end gap-4 p-8"
      }
    >
      {messages.map((message: Message) => (
        <div key={message.id} className={"w-full"}>
          <ChatBubble
            message={message}
            messageSender={getMessageSender(message)}
          />
        </div>
      ))}
    </div>
  );
}
