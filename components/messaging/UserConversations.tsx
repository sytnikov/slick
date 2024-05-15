import ConversationItem from "./ConversationItem";
import { getUserProfileByID } from "@/server/user-profiles/actions";

import { Conversation } from "@/types";

interface UserConversationProps {
  conversations: Conversation[];
  currentUserID: string;
}

export default async function UserConversations({
  conversations,
  currentUserID,
}: UserConversationProps) {
  const getConversationPartner = (conversation: Conversation) => {
    if (conversation.sender.id.toString() === currentUserID) {
      return getUserProfileByID(conversation.receiver.user_id);
    } else {
      return getUserProfileByID(conversation.sender.user_id);
    }
  };

  return (
    <div>
      {conversations.map((conversation, index) => (
        <div key={index}>
          <ConversationItem
            conversation={conversation}
            conversationPartner={getConversationPartner(conversation)}
          />
        </div>
      ))}
    </div>
  );
}
