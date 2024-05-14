"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import { getUserProfileByID } from "@/server/user-profiles/actions";
import { Conversation, Message, UserProfile } from "@/types";
import ConversationItem from "./ConversationItem";
import getConversationHeader from "@/utils/messaging/message-utils";
import { userAgent } from "next/server";

interface UserConversationProps {
  conversations: Conversation[] | null;
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

  const handleConversatioClick = (conversationID: number) => () => {
    const params = new URLSearchParams(searchParams);
    params.set("conversation_id", conversationID.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <h2>User conversations:</h2>
      {conversations?.map((conversation, index) => (
        <div
          key={index}
          onClick={handleConversatioClick(conversation.id)}
          className={"border-2 p-4"}
        >
          <h3>{getConversationHeader(conversation, currentUserID)}</h3>
          <p>{conversation.last_message_id.message}</p>
        </div>
      ))}
    </div>
  );
}
