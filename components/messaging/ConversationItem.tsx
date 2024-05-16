"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetStorageAssets } from "@/hooks/useGetStorageAssets";

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
  const { getUserProfileImage } = useGetStorageAssets();

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

  const profileImage = getUserProfileImage(partner?.avatar_url);

  return (
    <div
      className={`flex flex-row gap-2 p-4 ${isSelectedConversation() ? "bg-gray-200" : "bg-white"} border-b-2 border-t-2 border-gray-100`}
      onClick={handleConversationClick(conversation.id)}
    >
      <img
        src={profileImage}
        alt={"Profile Picture"}
        className={"h-12 w-12 rounded-full object-cover"}
      />
      <div className={"flex w-full flex-col"}>
        <div className={"mb-2 font-semibold"}>
          {partner ? `${partner.first_name} ${partner.surname}` : "Loading..."}
        </div>
        <div className={"font-light opacity-75"}>
          {conversation.last_message_id.message.substring(0, 45) + "..."}
        </div>
      </div>
    </div>
  );
}
