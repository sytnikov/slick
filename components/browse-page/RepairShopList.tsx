import RepairShopCard from "../cards/RepairShopCard";
import NoResults from "./NoResults";

import { RepairShop } from "@/types";

interface RepairShopListProps {
  shops: RepairShop[];
}

export default function RepairShopList({ shops }: RepairShopListProps) {
  return (
    <div
      className={
        "flex max-h-screen flex-row flex-wrap overflow-auto pl-4 pr-4 pt-4"
      }
    >
      {shops.length > 0 ? (
        shops.map((shop: RepairShop) => (
          <div className={"mb-4 w-1/2"} key={shop.id}>
            <RepairShopCard
              shopID={shop.id}
              name={shop.name}
              status={shop.status}
              description={shop.description}
              imageURL={shop.banner_img_url}
            />
          </div>
        ))
      ) : (
        <NoResults />
      )}
    </div>
  );
}
