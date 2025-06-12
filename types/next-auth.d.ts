import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id?: string;
      provider: string;
      providerId?: string;
    } & DefaultSession["user"];
    accessToken: string;
    expires: number;
    error?: {
      message: string;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string;
    refreshToken?: string;
    id?: number;
    expires_at: number;
    provider: string;
    providerId?: string;
    error?: {
      message: string;
    };
  }
}
