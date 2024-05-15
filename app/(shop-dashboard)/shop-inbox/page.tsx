import { redirect } from "next/navigation";

import { getUser } from "@/server/user-authentication/actions";
import {
  getConversationByID,
  getUserConversations,
} from "@/server/messaging/actions";

import { NewMessageModal } from "@/components/messaging/NewMessageModal";
import ChatWindow from "@/components/messaging/ChatWindow";
import SendMessage from "@/components/messaging/SendMessage";
import UserConversations from "@/components/messaging/UserConversations";
import NewConversation from "@/components/messaging/NewConversationForm";

export default async function ShopInbox({
  searchParams,
}: {
  searchParams: { conversation_id: string };
}) {
  const user = await getUser();

  if (user === null) {
    return redirect("/login");
  }

  const conversations = await getUserConversations(user.user_id);

  const selectedConversation = await getConversationByID(
    searchParams.conversation_id,
  );

  return (
    <div
      className={"flex min-h-screen w-screen flex-row items-center bg-gray-100"}
    >
      <div className={"h-screen w-[20%] border-l-2 border-r-2 border-gray-200"}>
        <div
          className={
            "flex h-[10%] w-full flex-row items-center justify-start bg-white pl-8"
          }
        >
          <h1 className={"text-2xl"}>Messages</h1>
        </div>
        <div>
          <NewMessageModal
            children={<NewConversation userID={user.user_id} />}
          />
          {conversations === null ? (
            <p>No conversations...</p>
          ) : (
            <UserConversations
              conversations={conversations}
              currentUserID={user.user_id}
            />
          )}
        </div>
      </div>
      <div
        className={"flex h-screen w-full flex-col items-start justify-start"}
      >
        <div
          className={
            "flex h-[10%] w-full flex-col items-start justify-center bg-white pl-8"
          }
        >
          Chat window
        </div>
        <ChatWindow conversationID={searchParams.conversation_id} />
        <SendMessage
          sender={user.user_id}
          selectedConversation={selectedConversation}
        />
      </div>
    </div>
  );
}
