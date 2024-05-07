import {
  getCustomerFavorites,
  addRepairShopToFavorites,
  removeRepairShopFromFavorites,
} from "@/server/favorites/actions";
import { getUser } from "@/server/user-authentication/actions";

import { HeartIcon } from "lucide-react";
import { Button } from "../ui/button";

export default async function AddToFaveriots({ shopID }: { shopID: number }) {
  const user = await getUser();

  if (user == null) {
    return null;
  }

  const userFavertiots = await getCustomerFavorites(user.user_id);

  const isFaveriot = userFavertiots?.some((fav) => fav.shop_id === shopID);

  const handleAddToFaveriotes = async () => {
    "use server";
    const repairShopID = shopID;
    const customerID = user.user_id;

    await addRepairShopToFavorites(repairShopID, customerID);
  };

  const handleRemoveFromFavorites = async () => {
    "use server";
    const repairShopID = shopID;
    const customerID = user.user_id;

    await removeRepairShopFromFavorites(repairShopID, customerID);
  };

  return (
    <form>
      <Button
        variant={"secondary"}
        formAction={
          isFaveriot ? handleRemoveFromFavorites : handleAddToFaveriotes
        }
      >
        <div className={"mr-2"}>
          <HeartIcon />
        </div>
        {isFaveriot ? "Remove from favorites" : "Add to favorites"}
      </Button>
    </form>
  );
}
