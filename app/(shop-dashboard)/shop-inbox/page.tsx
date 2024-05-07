import { getUserChats, userChats } from "@/server/messaging/actions";
import { getUser } from "@/server/user-authentication/actions";
import { getUserProfileByID } from "@/server/user-profiles/actions";
import { redirect } from "next/navigation";

export default async function ShopInbox() {
  const user = await getUser();

  if (user === null) {
    return redirect("/login");
  }

  const messages = await userChats(user.user_id);
  const userProfile = await getUserProfileByID(user.user_id);

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
        <div></div>
      </div>
      <div
        className={"flex h-screen w-full flex-col items-center justify-start"}
      >
        <div
          className={
            "flex h-[10%] w-full flex-col items-start justify-center bg-white pl-8"
          }
        ></div>
      </div>
    </div>
  );
}
