"use client";

import { useSearchParams } from "next/navigation";

import { Message } from "@/types";
import { getConversationMessages } from "@/utils/messaging/message-utils";

interface ChatWindowProps {
  messages: Message[];
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const conversationID = useSearchParams().get("conversation");

  const conversationMessages = getConversationMessages(
    conversationID,
    messages,
  );

  return (
    <div
      className={
        "flex w-[50%] flex-col items-center justify-center border-2 p-8"
      }
    >
      {conversationMessages.map((message, index) => (
        <p key={index}>{message.message}</p>
      ))}
      <p>Amount of chats: ({conversationMessages.length})</p>
    </div>
  );
}
