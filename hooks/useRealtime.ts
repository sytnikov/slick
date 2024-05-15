import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

function useRealtime() {
  const router = useRouter();

  const changes = createClient()
    .channel("messages")
    .on(
      "postgres_changes",
      {
        schema: "public",
        event: "*",
        table: "Messages",
      },
      (payload) => {
        router.refresh();
      },
    )
    .subscribe();

  return () => {
    changes.unsubscribe();
  };
}

export default useRealtime;
