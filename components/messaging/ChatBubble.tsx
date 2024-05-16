import Image from "next/image";

import { useGetStorageAssets } from "@/hooks/useGetStorageAssets";
import { formatTimeStampToTime } from "@/utils/booking-system/date-utils";

import { Message, MessageSender } from "@/types";

interface ChatBubbleProps {
  message: Message;
  messageSender: MessageSender;
}

interface MessageContentProps {
  message: string;
  timestamp: string;
  senderType: MessageSender["type"];
  senderInfo: string;
}

function MessageContent({
  message,
  timestamp,
  senderType,
  senderInfo,
}: MessageContentProps) {
  const textColor =
    senderType === "currentUser" ? "text-white" : "text-gray-900";

  return (
    <div
      className={`leading-1.5 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl border-2 border-white ${senderType === "currentUser" ? "bg-green-500" : "bg-gray-200"} p-4`}
    >
      <div
        className={`flex items-center space-x-2 rtl:space-x-reverse ${textColor}`}
      >
        <span className="text-sm font-semibold">{senderInfo}</span>
        <span className="text-sm font-normal">{timestamp}</span>
      </div>
      <p className={`py-2.5 text-sm font-normal ${textColor}`}>{message}</p>
    </div>
  );
}

export default function ChatBubble({
  message,
  messageSender,
}: ChatBubbleProps) {
  const { getUserProfileImage } = useGetStorageAssets();
  const profileImage = getUserProfileImage(message.sender.avatar_url);
  const senderInfo = `${messageSender.userProfile.first_name} ${messageSender.userProfile.surname}`;

  return (
    <div
      className={`flex items-start gap-2.5 ${messageSender.type === "currentUser" ? "justify-end" : "justify-start"}`}
    >
      <Image
        className="h-8 w-8 rounded-full"
        src={profileImage}
        alt="Jese image"
        width={32}
        height={32}
      />
      <MessageContent
        message={message.message}
        timestamp={formatTimeStampToTime(message.created_at)}
        senderType={messageSender.type}
        senderInfo={senderInfo}
      />
    </div>
  );
}
