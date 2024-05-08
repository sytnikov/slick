import { sendMessage } from "@/server/messaging/actions";
import { Button } from "../ui/button";

export default async function SendMessage({ userID }: { userID: string }) {
  const handleSendMessage = async (formData: FormData) => {
    "use server";
    const message = formData.get("message") as string;
    const receiver = "5e53a1ac-e61f-4062-a917-27d1ae14a349";
    const sender = userID;
    await sendMessage(sender, receiver, message);
  };

  return (
    <form className={"flex flex-col justify-start border-2 p-12"}>
      <label htmlFor={"message"}>Message</label>
      <input
        type="text"
        name={"message"}
        title={"message"}
        className={"mb-4"}
      />
      <Button formAction={handleSendMessage}>Send message </Button>
    </form>
  );
}
