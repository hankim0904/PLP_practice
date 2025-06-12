import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export function useInfiniteScroll({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: UseInfiniteScrollProps) {
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        onLoadMore();
      }
    },
  });

  return { ref };
}
