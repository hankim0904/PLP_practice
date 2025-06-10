"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!keyword.trim()) {
      router.replace("/");
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("q", keyword);

    router.replace(`/?${params}`);
  };

  useEffect(() => {
    const currentKeyword = searchParams.get("q") || "";
    setKeyword(currentKeyword);
  }, [searchParams]);

  return (
    <form onSubmit={onSearch} className="py-1">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search your favorite photocards"
        className="w-full bg-gray-50 rounded-[18px] py-2 px-[15px] my-1"
      />
    </form>
  );
}
