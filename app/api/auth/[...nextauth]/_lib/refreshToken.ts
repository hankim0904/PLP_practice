import { IRequestParams, RefreshTokenAPI } from "@/types/refreshToken";

export const refreshToken = (
  options: IRequestParams<RefreshTokenAPI.Request>
) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options.params),
    ...options,
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail);

    return data;
  }) as Promise<RefreshTokenAPI.Response>;
};
