interface CardBadgeProps {
  status: string;
}

export default function CardBadge({ status }: CardBadgeProps) {
  const statusColors = {
    Slow: "bg-green",
    Normal: "bg-yellow-500",
    Busy: "bg-red-500",
  };

  // @ts-ignore
  const backgroundColor = statusColors[status] || "bg-gray-500";

  return <div className={`badge text-white ${backgroundColor}`}>{status}</div>;
}
