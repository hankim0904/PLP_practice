import { getSearchData } from "@/app/_lib/api/search";
import CardListClient from "./CardList.client";

export default async function CardListServer({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const initialData = await getSearchData({
    page: "1",
    ...searchParams,
  });

  return (
    <CardListClient initialData={initialData} searchParams={searchParams} />
  );
}
