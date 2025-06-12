import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getWishIdList, postWishToggle } from "@/app/_lib/api/wish";

export function useWishList() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data: wishListData } = useQuery({
    queryKey: ["wishList"],
    queryFn: () => getWishIdList(session?.accessToken),
    enabled: !!session?.accessToken,
  });

  const wishList = wishListData?.data.results || [];

  const { mutate: wishMutate } = useMutation({
    mutationKey: ["wishMutate"],
    mutationFn: (id: number) => postWishToggle(id, session?.accessToken),
    onError: (err, _, context) => {
      queryClient.setQueryData(["wishMutate"], context);
    },
    onSuccess: (data, id) => {
      queryClient.setQueryData<{ data: { results: number[] } }>(
        ["wishList"],
        (old) => {
          if (!old) return old;

          const currentList = old.data.results || [];
          const isWishOn = currentList.includes(id);

          return {
            ...old,
            data: {
              ...old.data,
              results: isWishOn
                ? currentList.filter((itemId) => itemId !== id)
                : [...currentList, id],
            },
          };
        }
      );
    },
  });

  const handleWishToggle = (id: number) => {
    if (!session?.accessToken) {
      return;
    }
    wishMutate(id);
  };

  return {
    wishList,
    handleWishToggle,
  };
}
