type Status = "Slow" | "Normal" | "Busy";

interface ShopStatusBadgeProps {
  status: Status;
}

export default function ShopStatusBadge({ status }: ShopStatusBadgeProps) {
  const statusColors: Record<Status, string> = {
    Slow: "bg-gray-100",
    Normal: "bg-gray-100",
    Busy: "bg-gray-100",
  };

  const backgroundColor = statusColors[status] || "bg-gray-500";

  return (
    <div className={`rounded-md p-2 text-black ${backgroundColor}`}>
      {status}
    </div>
  );
}
