import CardListServer from "./_component/CardList/CardList.server";
import SearchBar from "./_component/SearchBar/SearchBar";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  return (
    <div className="w-screen bg-red-100 flex justify-center">
      <div className="w-full h-screen lg:max-w-[425px] bg-white px-4 overflow-auto">
        <SearchBar />
        <CardListServer searchParams={searchParams} />
      </div>
    </div>
  );
}
