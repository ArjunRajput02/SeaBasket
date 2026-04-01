import { Star } from "lucide-react";
import { useAddReview } from "./getProducts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useUpdateReview } from "./getProducts";

const reviewSchema = z.object({
  rating: z.number().min(1, "Please select a rating "),
  comment: z
    .string()
    .min(1, "Comment cannot be empty")
    .max(300, "Comment too long"),
});

type ReviewFormType = z.infer<typeof reviewSchema>;

export default function ReviewForm({
  productId,
  sessionToken,
  reviews,
  userId,
  refetch,
  editingReview,
  setEditingReview,
}: any) {
  const navigate = useNavigate();
  const addReviewMutation = useAddReview();
  const updateReviewMutation = useUpdateReview();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ReviewFormType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  useEffect(() => {
    if (editingReview) {
      reset({
        rating: editingReview.rating,
        comment: editingReview.comment,
      });
    } else {
      reset({
        rating: 0,
        comment: "",
      });
    }
  }, [editingReview, reset]);

  const rating = watch("rating");

  const onSubmit = (data: ReviewFormType) => {
    if (!sessionToken) {
      navigate("/login");
      toast.error("You have to login for Review");
      return;
    }

    if (editingReview) {
      updateReviewMutation.mutate(
        {
          productId: productId,
          rating: data.rating,
          comment: data.comment,
        },
        {
          onSuccess: async () => {
            toast.success("Review updated ");
            await refetch();
            reset();
            setEditingReview(null);
          },
          onError: () => toast.error("Failed to update review"),
        },
      );
      return;
    }

    const alreadyReviewed = reviews?.some(
      (review: any) => review.user?.id === userId,
    );

    if (alreadyReviewed) {
      toast.error("You already reviewed this product ");
      return;
    }

    addReviewMutation.mutate(
      {
        productId: productId.toString(),
        rating: data.rating,
        comment: data.comment,
      },
      {
        onSuccess: async () => {
          toast.success("Review submitted ");
          await refetch();
          reset();
        },
        onError: () => toast.error("Failed to submit review"),
      },
    );
  };
  return (
    <div className="bg-white rounded-2xl border p-8 mt-10">
      <h3 className="text-lg font-semibold mb-6">Write a Review</h3>

      <div className="mb-6">
        <p className="text-xs mb-2">Your Rating</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setValue("rating", star)}
            >
              <Star
                className={`h-6 w-6 ${
                  star <= rating
                    ? "fill-amber-500 text-amber-500"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>

        {errors.rating && (
          <p className="text-red-500 text-xs mt-1">{errors.rating.message}</p>
        )}
      </div>

      <textarea
        {...register("comment")}
        placeholder="Write your review..."
        className="w-full border rounded-xl p-3 mb-2"
      />

      {errors.comment && (
        <p className="text-red-500 text-xs mb-4">{errors.comment.message}</p>
      )}

      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-black text-white px-6 py-2 rounded-lg"
      >
        Submit Review
      </button>
    </div>
  );
}
