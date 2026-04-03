import { Star } from "lucide-react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { jwtDecode } from "jwt-decode";
import { useDeleteReview } from "../../hooks/useProduct";
import { useState } from "react";
import type{ ProductReviewsProps, Review } from "./productType";

export default function ProductReviews({
  reviews,
  avgRating,
  productId,
  sessionToken,
  refetch,
}: ProductReviewsProps) {
  const decoded: any =
    sessionToken && typeof sessionToken === "string"
      ? jwtDecode(sessionToken)
      : null;

  const currentUserId = decoded?.id;
  const { mutate: deleteReviewMutate } = useDeleteReview();
  const [editingReview, setEditingReview] = useState<Review | null>(null);

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

      <ReviewList
        reviews={reviews}
        currentUserId={currentUserId}
        onEdit={(review) => {
          setEditingReview(review);
        }}
        onDelete={() => {
          deleteReviewMutate(productId);
        }}
      />

      <ReviewForm
        productId={productId}
        sessionToken={sessionToken}
        refetch={refetch}
        reviews={reviews}
        userId={currentUserId}
        editingReview={editingReview}
        setEditingReview={setEditingReview}
      />
    </div>
  );
}
