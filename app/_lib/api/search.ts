// import { delay } from "@/app/util/delay";
import qs from "query-string";

export async function getSearchData(params: { [key: string]: string }) {
  try {
    const queryString = qs.stringify(params);
    // await delay(1000);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/card/gb/v2/search?${queryString}`,
      {
        next: { revalidate: 60 * 15 },
      }
    );

    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
