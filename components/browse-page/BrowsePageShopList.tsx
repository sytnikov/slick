import RepairShopCard from "../cards/RepairShopCard";
import { RepairShop } from "@/types";
import BrowseSearch from "./BrowseSearch";

interface BrowsePageShopListProps {
  shops: RepairShop[];
}

export default function BrowsePageShopList({ shops }: BrowsePageShopListProps) {
  return (
    <div className="relative col-span-3 min-h-screen bg-gray-100">
      <BrowseSearch />
      <div
        className={
          "flex max-h-screen flex-row flex-wrap overflow-auto pl-4 pr-4 pt-4"
        }
      >
        {shops.map((shop: RepairShop) => (
          <div className={"mb-4 w-1/2"} key={shop.id}>
            <RepairShopCard
              shopID={shop.id}
              name={shop.name}
              status={shop.status}
              description={shop.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
