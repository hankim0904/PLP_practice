import { delay } from "@/app/util/delay";

export async function getGroupData() {
  try {
    await delay(1000);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/card/gb/v1/group`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getMemberData(groupId: number) {
  try {
    await delay(1500);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/card/gb/v1/group/${groupId}/member`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
