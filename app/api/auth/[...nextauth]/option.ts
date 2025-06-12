import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookieOption } from "./_lib/cookieOption";
import { generateEmailUserResponse } from "./_lib/generateEmailUserResponse";
import { refreshToken } from "./_lib/refreshToken";
import { parseTokenToSession } from "./_lib/parseTokenToSession";
import { signInEmail } from "@/app/_lib/api/signin";

export const EXPIRE_TIME_SECOND = 3600;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize() {
        try {
          const tester = await signInEmail({
            email: process.env.TESTER_ID as string,
            password: process.env.TESTER_SECRET as string,
          });
          if (!tester) return null;
          if (!process.env.TESTER_USER_ID) return;

          return {
            id: Number(process.env.TESTER_USER_ID),
            email: process.env.TESTER_ID,
            ...tester,
          };
        } catch {
          throw new Error("Please check your email or password again.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  cookies: cookieOption,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.type === "credentials" && user) {
        return { ...token, ...generateEmailUserResponse(account, user) };
      }

      const expireTime = token.expires_at * 1000;
      if (Date.now() < expireTime) {
        return { ...token };
      }

      if (!token.refreshToken) throw new Error("Refresh Token is not existed");
      const { access } = await refreshToken({
        params: { refresh: token.refreshToken },
      });

      return {
        ...token,
        accessToken: access,
        expires_at: Math.floor(Date.now() / 1000 + EXPIRE_TIME_SECOND),
      };
    },
    async session({ token }) {
      return { ...parseTokenToSession(token) };
    },
  },
};
