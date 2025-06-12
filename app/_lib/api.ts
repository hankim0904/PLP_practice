import qs from "query-string";

interface SearchParams {
  [key: string]: string | undefined;
  page?: string;
}

export async function getSearchDataClient(params: SearchParams) {
  const queryString = qs.stringify(params);

  const res = await fetch(`apis/card/gb/v2/search?${queryString}`, {
    next: { revalidate: 60 },
  });

  return res.json();
}

export async function getSearchDataServer(params: SearchParams) {
  const queryString = qs.stringify(params);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/card/gb/v2/search?${queryString}`,
    {
      next: { revalidate: 60 },
    }
  );

  return res.json();
}

export async function getGroupData() {
  try {
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

export async function signInEmail(account: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getWishIdList(token: string | undefined) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/card/gb/v1/wish-id`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export async function postWishToggle(id: number, token: string | undefined) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/card/gb/v1/${id}/wish`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!res.ok) throw new Error();
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
