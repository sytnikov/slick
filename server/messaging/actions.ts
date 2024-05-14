"use server";

import { Conversation, Message } from "@/types";
import { createClient } from "@/utils/supabase/client";

// get all messages

export async function getUserMessages(userID: string): Promise<Message[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Messages")
    .select(`*`)
    .or(`sender.eq.${userID},receiver.eq.${userID}`);

  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  const messages = data || [];

  return messages;
}

// get all messages in a conversation

export async function getConversationMessages(
  conversationID: string | undefined,
): Promise<Message[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Messages")
    .select(`*`)
    .eq("conversation_id", conversationID);

  if (error) {
    console.error("Error fetching conversation messages:", error);
    return [];
  }

  const messages = data || [];

  return messages;
}

// get all conversations where user is either sender or receiver

export async function getUserConversations(
  userID: string,
): Promise<Conversation[] | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Conversations")
    .select(`*, receiver(*), sender(*), last_message_id(*)`)
    .or(`receiver.eq.${userID},sender.eq.${userID}`);

  if (error) {
    console.error("Error fetching user conversations:", error);
    return null;
  }

  return data;
}

// send new message in chat window

export async function sendMessage(
  formData: FormData,
  sender: string,
  receiver: string | undefined,
  conversation_id: number | undefined,
) {
  const message = formData.get("message") as string;
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Messages")
    .insert([{ message, sender, receiver, conversation_id }])
    .select(`*`);

  if (error) {
    console.error("Error sending message:", error);
  }

  // then update the conversation with the last message id

  const messageID = data?.[0].id;
  const { error: conversationError } = await supabase
    .from("Conversations")
    .update({ last_message_id: messageID })
    .eq("id", conversation_id);

  if (conversationError) {
    console.error("Error updating conversation:", conversationError);
  }

  return data;
}

// get single conversation by ID

export async function getConversationByID(
  conversationID: string,
): Promise<Conversation | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("Conversations")
    .select(`*, receiver(*), sender(*)`)
    .eq("id", conversationID);

  if (error) {
    console.error("Error fetching conversation:", error);
    return null;
  }

  return data?.[0] || null;
}
