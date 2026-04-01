import {
  useAddAddress,
  useUpdateAddress,
} from "@/hooks/useTrendingProduct";
import { useQueryClient } from "@tanstack/react-query";

export const useAddressActions = () => {
  const { mutate: addAddress } = useAddAddress();
  const { mutate: updateAddress } = useUpdateAddress();
  const queryClient = useQueryClient();

  const handleAdd = (data: any, onSuccess?: () => void) => {
    addAddress(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        onSuccess?.();
      },
    });
  };

  const handleUpdate = (
    id: number,
    data: any,
    onSuccess?: () => void,
  ) => {
    updateAddress(
      { id, payload: data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          onSuccess?.();
        },
      },
    );
  };

  return { handleAdd, handleUpdate };
};