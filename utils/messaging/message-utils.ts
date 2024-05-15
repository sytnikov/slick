import { Conversation } from "@/types";

export default function getConversationPartnerID(
  conversation: Conversation,
  currentUserID: string,
) {
  if (conversation.sender.id.toString() === currentUserID) {
    return conversation.receiver.user_id;
  } else {
    return conversation.sender.user_id;
  }
}
