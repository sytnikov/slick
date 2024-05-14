import { Conversation } from "@/types";

export default function getConversationHeader(
  conversation: Conversation,
  currentUserID: string,
) {
  if (conversation.sender.id.toString() === currentUserID) {
    return `${conversation.receiver.first_name} ${conversation.receiver.surname}`;
  } else {
    return `${conversation.sender.first_name} ${conversation.sender.surname}`;
  }
}
