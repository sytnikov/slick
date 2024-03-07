import CardBadge from "./CardBadge";

interface RepairShopCardProps {
  name: string;
  description: string;
  status: string;
}

export default function RepairShopCard({
  name,
  status,
  description,
}: RepairShopCardProps) {
  return (
    <div className="card bg-grey rounded-xl overflow-hidden mr-6 h-full">
      <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <CardBadge status={status} />
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <button className="btn btn-secondary">See detail</button>
      </div>
    </div>
  );
}
