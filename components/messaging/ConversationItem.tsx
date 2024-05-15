import getConversationPartnerID from "@/utils/messaging/message-utils";

import { Conversation } from "@/types";

interface ConversationItemProps {
  conversation: Conversation;
  currentUserID: string;
}

export default function ConversationItem({
  conversation,
  currentUserID,
}: ConversationItemProps) {
  const otherUserID = getConversationPartnerID(conversation, currentUserID);

  return (
    <div className={"border-2 p-4"}>
      <div>{otherUserID}</div>
    </div>
  );
}
