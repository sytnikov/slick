"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { useRealtime } from "@/hooks/useRealtime";
import { getConversationMessages } from "@/server/messaging/actions";

import { Message } from "@/types";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const { subscribeToMessageUpdates } = useRealtime();

  const conversationID = useSearchParams().get("conversation");

  useEffect(() => {
    if (!conversationID) {
      return;
    }

    const fetchMessages = async () => {
      const chats = await getConversationMessages(conversationID as string);
      // console.log("chats", chats);
      setMessages(chats);
    };

    fetchMessages();

    const unsubscribe = subscribeToMessageUpdates(fetchMessages);

    return () => {
      unsubscribe();
    };
  }, [conversationID]);

  return (
    <div
      className={
        "flex w-[50%] flex-col items-center justify-center border-2 p-8"
      }
    >
      {messages.map((message, index) => (
        <p key={index}>{message.message}</p>
      ))}
    </div>
  );
}
