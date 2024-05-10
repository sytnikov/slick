"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { groupMessagesByConversationID } from "@/utils/messaging/message-utils";
import { Message } from "@/types";
import { createClient } from "@/utils/supabase/client";

interface UserChatsProps {
  messages: Message[];
}

export default function UserChats({ messages }: UserChatsProps) {
  const router = useRouter();

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const changes = createClient()
    .channel("messages")
    .on(
      "postgres_changes",
      {
        schema: "public",
        event: "*",
        table: "Messages",
      },
      (payload) => {
        router.refresh();
      },
    )
    .subscribe();

  const conversations = groupMessagesByConversationID(messages);
  const currentConversationId = searchParams.get("conversation");

  const handleConversationClick = (
    conversation_id: string,
    sender: string,
    receiver: string,
  ) => {
    const params = new URLSearchParams(searchParams);
    params.set("conversation", conversation_id);
    params.set("sender", sender);
    params.set("receiver", receiver);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className={"flex flex-col gap-2"}>
        <h2>User conversations:</h2>
        <h2>{conversations.length}</h2>
      </div>
      {conversations.map((conversation: any, index: number) => {
        const sortedMessages = [...conversation].sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
        );
        const mostRecentMessage = sortedMessages[sortedMessages.length - 1];
        return (
          <div
            key={index}
            className={
              currentConversationId ===
              mostRecentMessage.conversation_id.toString()
                ? "bg-white p-4"
                : "p-4"
            }
            onClick={() =>
              handleConversationClick(
                mostRecentMessage.conversation_id.toString(),
                mostRecentMessage.sender,
                mostRecentMessage.receiver,
              )
            }
          >
            <h3>
              Conversation {index + 1} {mostRecentMessage.length}
            </h3>
            <p key={mostRecentMessage.id}>{mostRecentMessage.message}</p>
          </div>
        );
      })}
    </>
  );
}
