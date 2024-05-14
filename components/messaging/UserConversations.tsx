"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

import { Conversation } from "@/types";
import ConversationItem from "./ConversationItem";

interface UserConversationProps {
  conversations: Conversation[];
  currentUserID: string;
}

export default function UserConversations({
  conversations,
  currentUserID,
}: UserConversationProps) {
  const router = useRouter();
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

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

  const handleConversationClick = (conversationID: number) => () => {
    const params = new URLSearchParams(searchParams);
    params.set("conversation_id", conversationID.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={"flex flex-col gap-2"}>
      {conversations.map((conversation, index) => (
        <div
          key={index}
          onClick={handleConversationClick(conversation.id)}
          className={"border-2 p-4"}
        >
          <ConversationItem
            selectedConversation={conversation}
            currentUserID={currentUserID}
          />
        </div>
      ))}
    </div>
  );
}
