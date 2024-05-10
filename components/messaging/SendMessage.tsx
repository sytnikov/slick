"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { sendMessage } from "@/server/messaging/actions";
import { Button } from "../ui/button";

export default function SendMessage() {
  const [message, setMessage] = useState("");

  const conversationID = useSearchParams().get("conversation");

  const sender = useSearchParams().get("sender");
  const receiver = useSearchParams().get("receiver");

  const handleSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    if (message === "") {
      return;
    }

    await sendMessage(
      sender as string,
      receiver as string,
      message,
      conversationID as string,
    );
    setMessage("");
  };

  return (
    <form
      className={"flex flex-col justify-start border-2 p-12"}
      onSubmit={handleSendMessage}
    >
      <label htmlFor={"message"}>Message</label>
      <input
        type="text"
        name={"message"}
        title={"message"}
        className={"mb-4"}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">Send message </Button>
    </form>
  );
}
