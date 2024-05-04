import { getRepairShopReviews } from "@/server/customer-review/actions";
import { Button } from "../ui/button";

interface LatestReviewsProps {
  shopID: number;
}

export default async function LatestReviews({ shopID }: LatestReviewsProps) {
  const customerReviews = await getRepairShopReviews(shopID);

  return (
    <div className={"min-h-full flex-grow rounded-md bg-white p-10"}>
      <div className={"mb-8 flex w-full flex-row items-center justify-between"}>
        <p className={"text-md text-xl font-bold"}>Latest reviews</p>
        <Button variant={"secondary"}>See all reviews</Button>
      </div>
      {customerReviews.map((review) => (
        <div
          key={review.id}
          className={
            "mb-4 flex w-full flex-row items-center justify-between gap-12 rounded-md border-2 border-gray-300 p-2"
          }
        >
          <div className={"flex flex-col"}>
            <p className={"text-md mb-2 font-bold"}>
              {review.user_id.first_name} {review.user_id.surname}
            </p>
            <p className={"text-md"}>{review.review}</p>
          </div>
          <div className={"flex flex-col"}>
            <p className={"text-md"}>Rating: {review.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
