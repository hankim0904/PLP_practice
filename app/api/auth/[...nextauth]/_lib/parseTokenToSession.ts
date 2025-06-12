import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const parseTokenToSession = ({
  accessToken,
  provider,
  providerId,
  expires_at,
  id,
  email,
  error,
}: JWT): Session => ({
  user: {
    email,
    id: id?.toString(),
    provider,
    providerId,
  },
  accessToken,
  expires: expires_at * 1000 - Date.now(),
  error,
});
