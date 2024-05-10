import { Message } from "@/types";

export function groupMessagesByConversationID(messages: any[]) {
  const groupedMessages: { [key: number]: any[] } = {};

  messages.forEach((message) => {
    if (message.conversation_id in groupedMessages) {
      groupedMessages[message.conversation_id].push(message);
    } else {
      groupedMessages[message.conversation_id] = [message];
    }
  });

  const groupedMessagesArray = Object.values(groupedMessages);

  // Return the grouped messages
  return groupedMessagesArray;
}

export function getConversationMessages(
  conversationID: string | null,
  messages: Message[],
): Message[] {
  if (conversationID === null) {
    return [];
  }

  return messages.filter(
    (message) => String(message.conversation_id) === conversationID,
  );
}
