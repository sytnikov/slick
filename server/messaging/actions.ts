"use server";

import { createClient } from "@/utils/supabase/client";

// send a message

export async function sendMessage(
  sender: string,
  receiver: string,
  message: string,
  conversation_id: string,
) {
  const supabase = createClient();
  const { data, error } = await supabase.from("Messages").insert([
    {
      sender,
      receiver,
      message,
      conversation_id,
    },
  ]);

  if (error) {
    console.error("Error sending message:", error);
    return null;
  }

  return data;
}

// get all messages

export async function getUserMessages(userID: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Messages")
    .select("*")
    .or(`sender.eq.${userID},receiver.eq.${userID}`);

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  const messages = data || [];

  return messages;
}
