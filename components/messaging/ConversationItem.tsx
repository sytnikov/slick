interface ConversationItemProps {
  last_message: string;
}

export default async function ConversationItem({
  last_message,
}: ConversationItemProps) {
  return (
    <div
      className={
        "flex w-full flex-row items-center justify-start border-b-2 border-gray-200"
      }
    >
      <p>{last_message}</p>
    </div>
  );
}
