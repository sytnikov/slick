"use server";

import { Conversation, Message } from "@/types";
import { createClient } from "@/utils/supabase/client";

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

// start a new conversation with a new user

export async function startNewConversation(sender: string, formData: FormData) {
  const supabase = createClient();

  const message = formData.get("message") as string;
  const receiver = formData.get("recipent") as string;

  const conversation_id = Math.floor(Math.random() * 1000000);

  // Step 1: Create a new conversation entry
  const { data: conversationData, error: conversationError } = await supabase
    .from("Conversations")
    .insert([{ receiver, sender, last_message_id: null, id: conversation_id }])
    .select(`*`);

  if (conversationError) {
    console.error("Error starting conversation:", conversationError);
    return null;
  }

  const conversation = conversationData?.[0];

  // Step 2: Create a new message entry and add the conversation ID to the conversation_id field
  const { data: messageData, error: messageError } = await supabase
    .from("Messages")
    .insert([{ message, sender, receiver, conversation_id }])
    .select(`*`);

  if (messageError) {
    console.error("Error sending message:", messageError);
    return null;
  }

  const messageEntry = messageData?.[0];

  // Step 3: Update the conversation entry with the last message ID
  const { error: updateError } = await supabase
    .from("Conversations")
    .update({ last_message_id: messageEntry.id })
    .match({ id: conversation_id });

  if (updateError) {
    console.error("Error updating conversation:", updateError);
    return null;
  }

  return conversation;
}
