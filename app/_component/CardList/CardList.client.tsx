"use client";

import { useState } from "react";
import { ISearchResponse } from "@/types/search";
import Card from "./Card";
import CardListSkeleton from "./CardSkeleton";
import { useCardList } from "@/app/_hooks/useCardList";
import { useWishList } from "@/app/_hooks/useWishList";
import { useInfiniteScroll } from "@/app/_hooks/useInfiniteScroll";

interface CardListClientProps {
  initialData: ISearchResponse;
  searchParams: { [key: string]: string };
}

export default function CardListClient({
  initialData,
  searchParams,
}: CardListClientProps) {
  const { cards, fetchNextPage, hasNextPage, isFetchingNextPage } = useCardList(
    {
      initialData,
      searchParams,
    }
  );

  const { wishList, handleWishToggle } = useWishList();

  const { ref } = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const [loadedCount, setLoadedCount] = useState(0);
  const handleImageLoad = () => {
    setLoadedCount((prev) => prev + 1);
  };
  // const allImagesLoaded = loadedCount === cards.length && cards.length > 0;

  return (
    <section className="py-4">
      {cards.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2 gap-x-3 gap-y-6">
          {cards.map((card, index) => {
            const isHeartOn = wishList.includes(card.id);
            return (
              <li key={`${card.id}${index}`}>
                <Card
                  cardInfo={card}
                  isHeartOn={isHeartOn}
                  onClick={handleWishToggle}
                  onImageLoad={handleImageLoad}
                />
              </li>
            );
          })}
        </ul>
      )}
      <div className="pt-6">{isFetchingNextPage && <CardListSkeleton />}</div>
      {loadedCount > 1 && !isFetchingNextPage && (
        <div ref={ref} className="h-1 bg-amber-600"></div>
      )}
    </section>
  );
}
