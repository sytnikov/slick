import { getRepairShopReviews } from "@/server/customer-review/actions";

interface RepairShopReviewProps {
  shopID: number;
}
export default async function RepairShopReview({
  shopID,
}: RepairShopReviewProps) {
  const reviews = await getRepairShopReviews(shopID);

  return (
    <div
      className={"mb-16 mt-16 flex w-full flex-col items-center justify-center"}
    >
      <h2 className={"mb-4 text-3xl"}>What have customers been saying?</h2>

      <div className={"grid w-full grid-cols-3 gap-4"}>
        {reviews.map((review) => (
          <div
            key={review.id}
            className={
              "flex flex-col items-start justify-start gap-2 rounded-md border-2 border-gray-200 bg-white p-4"
            }
          >
            <p className={"text-lg font-bold"}>
              {review.user_id.first_name} {review.user_id.surname}
            </p>
            <p className={"text-lg"}>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
