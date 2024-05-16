"use client";

import { sendMessage } from "@/server/messaging/actions";

import { Button } from "../ui/button";
import { SendIcon } from "lucide-react";

import { Conversation } from "@/types";
import { useRef } from "react";

interface SendMessageProps {
  currentUserID: string;
  selectedConversation: Conversation | null;
}
export default function SendMessage({
  selectedConversation,
  currentUserID,
}: SendMessageProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const getMessageReciever = (
    selectedConversation: Conversation | null,
  ): string | null => {
    if (!selectedConversation) {
      return null;
    }

    if (selectedConversation.sender.user_id.toString() === currentUserID) {
      return selectedConversation.receiver.user_id;
    } else {
      return selectedConversation.sender.user_id;
    }
  };

  const receiver = getMessageReciever(selectedConversation);

  return (
    <form
      className={"mb-8 flex w-full flex-row items-end justify-start gap-4"}
      ref={formRef}
      action={async (formData) => {
        await sendMessage(
          formData,
          currentUserID,
          receiver,
          selectedConversation?.id,
        );

        formRef.current?.reset();
      }}
    >
      <textarea
        name={"message"}
        title={"message"}
        placeholder={"Type your message here..."}
        className={"h-16 w-full rounded-lg border-2 p-4 text-lg"}
      />
      <Button type="submit" className={"gap-4"}>
        <SendIcon size={24} /> Send
      </Button>
    </form>
  );
}
