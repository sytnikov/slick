import { Conversation } from "@/types";

export default function getConversationHeader(
  conversation: Conversation,
  user: string,
) {
  if (conversation.receiver.id.toString() === user) {
    return `${conversation.sender.first_name} ${conversation.sender.surname}`;
  } else {
    return `${conversation.receiver.first_name} ${conversation.receiver.surname}`;
  }
}
