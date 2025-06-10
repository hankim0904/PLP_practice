import { IGroup } from "@/types/group";
import Image from "next/image";
import Link from "next/link";

type GroupWithoutId = Omit<IGroup, "id">;

export default function GroupCircle({
  groupInfo,
}: {
  groupInfo: IGroup | GroupWithoutId;
}) {
  const isSeeAll = !("id" in groupInfo);
  console.log(groupInfo);

  return (
    <Link href={isSeeAll ? "/" : `/?group=${groupInfo.id}`}>
      <div className="flex flex-col items-center w-[56px] gap-[2px] mr-2">
        <Image
          src={groupInfo.image}
          width={48}
          height={48}
          alt={groupInfo.name_en}
          className={`w-[48px] h-[48px] rounded-full border ${
            isSeeAll ? "" : "border-gray-300"
          }`}
        />
        <div
          className={`h-[30px] text-[11px] text-center break-all flex items-center ${
            isSeeAll ? "font-bold" : ""
          }`}
        >
          {groupInfo.name_en}
        </div>
      </div>
    </Link>
  );
}
