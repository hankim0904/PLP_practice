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
