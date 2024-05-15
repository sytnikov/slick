"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import useRealtime from "@/hooks/useRealtime";
import { Conversation, UserProfile } from "@/types";

interface ConversationItemProps {
  conversation: Conversation;
  conversationPartner: Promise<UserProfile>;
}

export default function ConversationItem({
  conversation,
  conversationPartner,
}: ConversationItemProps) {
  const [partner, setPartner] = useState<UserProfile>();

  const { replace } = useRouter();

  useRealtime();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const fetchPartner = async () => {
      const result = await conversationPartner;
      setPartner(result);
    };

    fetchPartner();
  }, [conversationPartner]);

  const handleConversationClick = (conversationID: number) => () => {
    const params = new URLSearchParams(searchParams);
    params.set("conversation_id", conversationID.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const isSelectedConversation = () => {
    return searchParams.get("conversation_id") === conversation.id.toString();
  };

  return (
    <div
      className={`mb-2 mt-2 flex flex-col gap-2 p-4 ${isSelectedConversation() ? "bg-green-400" : "bg-gray-200"}`}
      onClick={handleConversationClick(conversation.id)}
    >
      <div>
        {partner ? `${partner.first_name} ${partner.surname}` : "Loading..."}
      </div>
      <div>{conversation.last_message_id.message}</div>
    </div>
  );
}
