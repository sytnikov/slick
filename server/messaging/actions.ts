"use server";

import { createClient } from "@/utils/supabase/client";

export async function getUserChats(userID: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Messages")
    .select("*")
    .or(`sender.eq.${userID},receiver.eq.${userID}`);

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return data;
}

// send message to channel

export async function sendMessage(
  sender: string,
  receiver: string,
  message: string,
) {
  const supabase = createClient();
  const { data, error } = await supabase.from("Messages").insert([
    {
      sender,
      receiver,
      message,
    },
  ]);

  if (error) {
    console.error("Error sending message:", error);
    return null;
  }

  return data;
}
