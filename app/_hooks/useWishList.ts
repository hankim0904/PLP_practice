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
    staleTime: 0,
    refetchOnWindowFocus: true,
  });

  const wishList = wishListData?.data.results || [];

  const { mutate: wishMutate } = useMutation({
    mutationFn: (id: number) => postWishToggle(id, session?.accessToken),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["wishList"] });

      const previousWishList = queryClient.getQueryData(["wishList"]);

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

      return { previousWishList };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["wishList"], context?.previousWishList);
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
