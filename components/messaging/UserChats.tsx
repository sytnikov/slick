"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { useRealtime } from "@/hooks/useRealtime";
import { getUserMessages } from "@/server/messaging/actions";
import { groupMessagesByConversationID } from "@/utils/messaging/message-utils";

interface UserChatsProps {
  userID: string;
}

export default function UserChats({ userID }: UserChatsProps) {
  const [messages, setMessages] = useState([]);

  const { subscribeToMessageUpdates } = useRealtime();

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAllUserMessages = async () => {
      const messages = await getUserMessages(userID);
      setMessages(messages as any);
      console.log("MESSAGES FROM COMPONENT: ", messages);
    };

    fetchAllUserMessages();

    const unsubscribe = subscribeToMessageUpdates(fetchAllUserMessages);

    return () => {
      unsubscribe();
    };
  }, []);

  const conversations = groupMessagesByConversationID(messages);
  console.log("CONVERSATIONS: ", conversations);

  const handleConversationClick = (
    conversation_id: string,
    sender: string,
    receiver: string,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("conversation", conversation_id);
    params.set("sender", sender);
    params.set("receiver", receiver);
    console.log("clicked");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h2>Your chats</h2>
      {conversations.map((conversation: any, index: number) => {
        const sortedMessages = [...conversation].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );
        const mostRecentMessage = sortedMessages[sortedMessages.length - 1];
        return (
          <div
            key={index}
            className={"mb-2 border-2 p-4"}
            onClick={() =>
              handleConversationClick(
                mostRecentMessage.conversation_id,
                mostRecentMessage.sender,
                mostRecentMessage.receiver,
              )
            }
          >
            <h3>Conversation {index + 1}</h3>
            <p key={mostRecentMessage.id}>{mostRecentMessage.message}</p>
          </div>
        );
      })}
    </div>
  );
}
