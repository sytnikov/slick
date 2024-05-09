import { createClient } from "@/utils/supabase/client";

export const useRealtime = () => {
  /**
   * This hook allows us to subscribe to supabase realtime events.
   * Use the hooks to subscribe to changes in the Messages table.
   */

  // function to get the latest messages in a conversation...

  const subscribeToMessageUpdates = (callback: () => void) => {
    const supabase = createClient();
    const messagesSubscription = supabase.channel("messages").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "Messages",
      },
      async () => {
        callback();
      },
    );
    messagesSubscription.subscribe();
    return () => {
      messagesSubscription.unsubscribe();
    };
  };

  return {
    subscribeToMessageUpdates,
  };
};
