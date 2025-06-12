"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { ISearchCard, ISearchResponse } from "@/types/search";
import { getSearchDataClient, getWishIdList } from "@/app/_lib/api";
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

  const wishList = wishListData.data.results || [];

  return (
    <section className="py-4">
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-x-3 gap-y-6">
        {cards.map((card, index) => {
          const isHeartOn = wishList.includes(card.id);
          return (
            <li key={`${card.id}${index}`}>
              <Card cardInfo={card} isHeartOn={isHeartOn} />
            </li>
          );
        })}
      </ul>
      <div className="pt-6">{isFetchingNextPage && <CardListSkeleton />}</div>
      <div ref={ref} className="h-1"></div>
    </section>
  );
}
