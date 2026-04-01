import { Star, Trash2, Edit2 } from "lucide-react";
import type { Review } from "./productType";

type ReviewListProps = {
  reviews: Review[];
  currentUserId?: number;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: number) => void;
}

export default function ReviewList({
  reviews,
  currentUserId,
  onEdit,
  onDelete,
}: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="border border-dashed border-gray-300 rounded-xl p-10 text-center">
        <p className="text-gray-500 font-medium">No reviews yet</p>
        <p className="text-gray-400 text-sm mt-1">
          Be the first to share your experience
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <p className="font-semibold text-gray-900 text-sm">
              {review.user?.first_name || "Anonymous"}
            </p>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= review.rating
                      ? "fill-amber-500 text-amber-500"
                      : "text-gray-200"
                  }`}
                />
              ))}

              {review.user?.id === currentUserId && (
                <div className="flex space-x-1 ml-2">
                  <button
                    onClick={() => onEdit(review)}
                    className="text-blue-500"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(review.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-sm">
            {review.comment || "No comment provided."}
          </p>
        </div>
      ))}
    </div>
  );
}
