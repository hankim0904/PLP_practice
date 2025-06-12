import { Account, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";
import { EXPIRE_TIME_SECOND } from "../option";

/**
 *
 * @notice
 *
 * Credentails Email Login Poca API로부터 받은 token을 JWT Token 으로 변환
 */

export const generateEmailUserResponse = (
  account: Account,
  user: User | AdapterUser
): JWT => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const credentialsUser = user as any;
  return {
    provider: account.provider,
    accessToken: credentialsUser.access,
    refreshToken: credentialsUser.refresh,
    id: credentialsUser?.user?.pk,
    providerId: "",
    expires_at: Math.floor(Date.now() / 1000 + EXPIRE_TIME_SECOND),
  };
};
