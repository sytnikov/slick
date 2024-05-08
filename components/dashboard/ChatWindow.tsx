"use client";
import { useEffect, useState } from "react";

import { getUserChats } from "@/server/messaging/actions";
import { createClient } from "@/utils/supabase/client";

import { Message } from "@/types";

interface InboxListProps {
  userID: string;
}

export default function ChatWindow({ userID }: InboxListProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const chats = await getUserChats(userID);
      setMessages(chats);
    };

    fetchMessages();

    const supabase = createClient();
    const messagesSubscription = supabase.channel("messages").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Messages",
      },
      async (payload: any) => {
        console.log("Message payload:", payload.new.message);
        fetchMessages();
      },
    );
    messagesSubscription.subscribe();
    return () => {
      messagesSubscription.unsubscribe();
    };
  }, []);

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
