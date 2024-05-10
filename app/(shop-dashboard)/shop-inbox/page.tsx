import { redirect } from "next/navigation";

import { NewMessageModal } from "@/components/messaging/NewMessageModal";
import ChatWindow from "@/components/messaging/ChatWindow";
import SendMessage from "@/components/messaging/SendMessage";
import UserChats from "@/components/messaging/UserChats";
import NewMessage from "@/components/messaging/NewMessageForm";

import { getUser } from "@/server/user-authentication/actions";
import { getUserMessages } from "@/server/messaging/actions";

export default async function ShopInbox() {
  const user = await getUser();

  if (user === null) {
    return redirect("/login");
  }

  const messages = await getUserMessages(user.user_id);

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
          <NewMessageModal children={<NewMessage userID={user.user_id} />} />
          <UserChats messages={messages} />
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
        <ChatWindow messages={messages} />
        <SendMessage />
      </div>
    </div>
  );
}
