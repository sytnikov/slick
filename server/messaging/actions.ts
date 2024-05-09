"use server";

import { createClient } from "@/utils/supabase/client";

// get all messages in a conversation

export async function getConversationMessages(conversation_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Messages")
    .select("*")
    .eq("conversation_id", conversation_id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return data;
}

// get all messages user is a part of, either as sender or reciever

export async function getUserMessages(userID: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Messages")
    .select("*")
    .or(`sender.eq.${userID},receiver.eq.${userID}`)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return data;
}

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
