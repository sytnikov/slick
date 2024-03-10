import MakeBookingModal from "./MakeBookingModal";

interface SingleServiceCardProps {
  serviceID: number;
  name: string;
  duration: number;
  price: number;
  shopID: number;
}

export default function SingleServiceCard({
  serviceID,
  name,
  duration,
  price,
  shopID,
}: SingleServiceCardProps) {
  return (
    <div className={"flex flex-row p-4 mb-4 border-2 rounded-md"}>
      <div className={"flex flex-col gap-2"}>
        <h1>{name}</h1>
        <p>Duration: {duration} minutes</p>
        <p>Price: {price} €</p>
        <MakeBookingModal id={serviceID} serviceName={name} shopID={shopID} />
      </div>
    </div>
  );
}
