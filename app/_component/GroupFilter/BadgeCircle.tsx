"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface IBadgeInfo {
  id?: number;
  name: string;
  image: string;
  name_en: string;
}

export default function BadgeCircle({
  badgeInfo,
  isMain = false,
}: {
  badgeInfo: IBadgeInfo;
  isMain?: boolean;
}) {
  const searchParams = useSearchParams();
  const currentGroup = searchParams.get("group");
  const isCurrentMember =
    searchParams.get("member") === badgeInfo.id?.toString();

  return (
    <Link
      href={
        isMain
          ? "/"
          : currentGroup
          ? `/?group=${currentGroup}&member=${badgeInfo.id}`
          : `/?group=${badgeInfo.id}`
      }
      prefetch={false}
    >
      <div className="flex flex-col items-center w-[56px] gap-[2px] mr-2">
        <Image
          src={badgeInfo.image}
          width={48}
          height={48}
          alt={badgeInfo.name_en}
          className={`w-[48px] h-[48px] rounded-full border ${
            isMain ? "" : "border-gray-300"
          } ${isMain && currentGroup ? "border-red-400" : ""} ${
            isCurrentMember ? "border-red-400" : ""
          }`}
        />
        <div
          className={`h-[30px] text-[11px] text-center break-all flex items-center ${
            isMain ? "font-bold" : ""
          }`}
        >
          {badgeInfo.name_en}
        </div>
      </div>
    </Link>
  );
}
