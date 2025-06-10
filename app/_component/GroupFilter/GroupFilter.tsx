import { getGroupData } from "@/app/_lib/api";
import { IGroup } from "@/types/group";
import GroupCircle from "./GroupCircle";

export default async function GroupFilter() {
  const GroupData = await getGroupData();
  const GroupList: IGroup[] = GroupData.data.groups || [];

  return (
    <section className="flex">
      <div>
        <GroupCircle
          groupInfo={{
            name: "See All",
            image: "/images/group-all-icon.svg",
            name_en: "See All",
          }}
        />
      </div>
      <div className="overflow-x-auto">
        <ul className="flex">
          {GroupList.map((group) => (
            <li key={group.id}>
              <GroupCircle groupInfo={group} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
