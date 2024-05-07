"use server";

import { createClient } from "@/utils/supabase/client";

export async function userChats(userID: string) {
  const supabase = createClient();
  const messages = supabase.channel("messages").on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "Messages",
    },
    (payload: any) => {
      console.log(payload);
    },
  );
  messages.subscribe();
}

export async function getUserChats(userID: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Messages")
    .select("*")
    .or(`sender.eq.${userID},reciever.eq.${userID}`);

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return data;
}
