import { Star } from "lucide-react";
import type { Review } from "./productType";

export default function ReviewList({ reviews }: { reviews: Review[] }) {
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
      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <p className="font-semibold text-gray-900 text-sm">
              {review.user?.first_name || "Anonymous"}
            </p>
            <div className="flex">
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