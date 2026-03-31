import { Star } from "lucide-react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

export default function ProductReviews({
  reviews,
  avgRating,
  productId,
  sessionToken,
  refetch
}: any) {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>

        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${
                star <= Math.round(avgRating)
                  ? "fill-amber-500 text-amber-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <ReviewList reviews={reviews} />

      <ReviewForm productId={productId} sessionToken={sessionToken} refetch={refetch}/>
    </div>
  );
}
