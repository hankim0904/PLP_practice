import { getGroupData, getMemberData } from "@/app/_lib/api";
import { IGroup, IMember } from "@/types/group";
import GroupSwiper from "./GroupSwiper";

export default async function GroupFilter({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const groupData = await getGroupData();
  const groupList: IGroup[] = groupData.data.groups || [];
  const groupId = Number(searchParams.group);

  if (!groupId)
    return (
      <GroupSwiper
        mainBadge={{
          name: "See All",
          image: "/images/group-all-icon.svg",
          name_en: "See All",
        }}
        badgeList={groupList}
      />
    );

  const selectedGroup = groupList.find((item) => item.id === groupId)!;
  const memberData = await getMemberData(groupId);
  const memberList: IMember[] = memberData.data.members || [];

  return <GroupSwiper mainBadge={selectedGroup} badgeList={memberList} />;
}
