"use client";

import getConversationPartnerID from "@/utils/messaging/message-utils";

import { Conversation, UserProfile } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import useRealtime from "@/hooks/useRealtime";

interface ConversationItemProps {
  conversation: Conversation;
  conversationPartner: Promise<UserProfile>;
}

export default function ConversationItem({
  conversation,
  conversationPartner,
}: ConversationItemProps) {
  const [partner, setPartner] = useState<UserProfile>();

  const router = useRouter();
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

  return (
    <div
      className={"flex flex-col gap-2 bg-gray-200 p-4"}
      onClick={handleConversationClick(conversation.id)}
    >
      <div>
        {partner?.first_name} {partner?.surname}
      </div>
      <div>{conversation.last_message_id.message}</div>
    </div>
  );
}
