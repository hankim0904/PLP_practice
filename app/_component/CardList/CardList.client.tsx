"use client";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { ISearchCard, ISearchResponse } from "@/types/search";
import {
  getSearchDataClient,
  getWishIdList,
  postWishToggle,
} from "@/app/_lib/api";
import Card from "./Card";
import CardListSkeleton from "./CardSkeleton";
import { useSession } from "next-auth/react";

interface CardListClientProps {
  initialData: ISearchResponse;
  searchParams: { [key: string]: string };
}

export default function CardListClient({
  initialData,
  searchParams,
}: CardListClientProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["cards", searchParams],
      queryFn: async ({ pageParam = 1 }) => {
        return await getSearchDataClient({
          page: pageParam.toString(),
          ...searchParams,
        });
      },
      initialPageParam: 1,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      getNextPageParam: (lastPage) => lastPage.data.next_page ?? undefined,
    });

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  const cards: ISearchCard[] = data.pages.flatMap((page) => page.data.results);

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

  return (
    <section className="py-4">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-x-3 gap-y-6">
        {cards.map((card, index) => {
          const isHeartOn = wishList.includes(card.id);
          return (
            <li key={`${card.id}${index}`}>
              <Card
                cardInfo={card}
                isHeartOn={isHeartOn}
                onClick={handleWishToggle}
              />
            </li>
          );
        })}
      </ul>
      <div className="pt-6">{isFetchingNextPage && <CardListSkeleton />}</div>
      <div ref={ref} className="h-1"></div>
    </section>
  );
}
