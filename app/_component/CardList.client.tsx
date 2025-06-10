"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { getSearchDataClient } from "../_lib/api";
import Card from "./Card";
import { ISearchCard, ISearchResponse } from "@/types/search";

interface CardListClientProps {
  initialData: ISearchResponse;
  searchParams: { [key: string]: string };
}

export default function CardListClient({
  initialData,
  searchParams,
}: CardListClientProps) {
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

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-x-3 gap-y-6">
      {cards.map((card, index) => (
        <li key={`${card.id}${index}`}>
          <Card cardInfo={card} />
        </li>
      ))}
      {isFetchingNextPage && <div>로딩 중....</div>}
      <div ref={ref} className="h-20"></div>
    </ul>
  );
}
