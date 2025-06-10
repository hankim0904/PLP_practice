import { getSearchDataServer } from "../_lib/api";
import CardListClient from "./CardList.client";

export default async function CardListServer({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const resolvedSearchParams = await searchParams;

  const initialData = await getSearchDataServer({
    page: "1",
    ...resolvedSearchParams,
  });

  return (
    <CardListClient
      initialData={initialData}
      searchParams={resolvedSearchParams}
    />
  );
}
