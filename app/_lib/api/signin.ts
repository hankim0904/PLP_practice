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
