import Image from "next/image";

import { useGetStorageAssets } from "@/hooks/useGetStorageAssets";
import { formatTimeStampToTime } from "@/utils/booking-system/date-utils";

import { Message } from "@/types";

interface ChatBubbleProps {
  message: Message;
  currentUserID: string;
}
export default function ChatBubble({
  message,
  currentUserID,
}: ChatBubbleProps) {
  console.log(message);
  const { getUserProfileImage } = useGetStorageAssets();
  const profileImage = getUserProfileImage(message.sender.avatar_url);

  return (
    <div className="flex items-start gap-2.5 rounded-md border-2 border-green-300">
      <Image
        className="h-8 w-8 rounded-full"
        src="/docs/images/people/profile-picture-3.jpg"
        alt="Jese image"
        width={32}
        height={32}
      />
      <div className="leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 p-4 dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {formatTimeStampToTime(message.created_at)}
          </span>
        </div>
        <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
          {message.message}
        </p>
      </div>
    </div>
  );
}
