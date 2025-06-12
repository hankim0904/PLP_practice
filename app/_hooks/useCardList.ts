import { useInfiniteQuery } from "@tanstack/react-query";
import { ISearchResponse } from "@/types/search";
import { getSearchData } from "@/app/_lib/api/search";

interface UseCardListProps {
  initialData: ISearchResponse;
  searchParams: { [key: string]: string };
}

export function useCardList({ initialData, searchParams }: UseCardListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["cards", searchParams],
      queryFn: async ({ pageParam = 1 }) => {
        return await getSearchData({
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

  const cards = data.pages.flatMap((page) => page.data.results);

  return {
    cards,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
