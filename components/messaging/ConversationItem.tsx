import { Conversation } from "@/types";
import getConversationHeader from "@/utils/messaging/message-utils";

interface ConversationItemProps {
  selectedConversation: Conversation;
  currentUserID: string;
}

export default function ConversationItem({
  selectedConversation,
  currentUserID,
}: ConversationItemProps) {
  const header = getConversationHeader(selectedConversation, currentUserID);

  return (
    <>
      <div>{header}</div>
      <div>{selectedConversation.last_message_id.message}</div>
    </>
  );
}
