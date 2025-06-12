import { Suspense } from "react";
import CardListServer from "./_component/CardList/CardList.server";
import SearchBar from "./_component/SearchBar/SearchBar";
import CardListSkeleton from "./_component/CardList/CardSkeleton";
import GroupFilter from "./_component/GroupFilter/GroupFilter";
import GroupSkeleton from "./_component/GroupFilter/GroupSkeleton";

export type SearchParams = Promise<{
  [key: string]: string;
}>;

export default async function Home(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  return (
    <div className="w-screen bg-red-100 flex justify-center">
      <div className="w-full h-screen lg:max-w-[425px] bg-white px-4 overflow-auto">
        <SearchBar />
        <Suspense fallback={<GroupSkeleton />}>
          <GroupFilter searchParams={searchParams} />
        </Suspense>
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<CardListSkeleton />}
        >
          <CardListServer searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
