export const cookieOption = {
  /**
   * @notice Apple Login Cookie Setting
   */
  pkceCodeVerifier: {
    name: "next-auth.pkce.code_verifier",
    options: {
      httpOnly: true,
      sameSite: "none",
      path: "/",
      secure: true,
    },
  },
  /**
   * @notice Apple Login 후 callback 페이지 이동
   */
  callbackUrl: {
    name: `__Secure-next-auth.callback-url`,
    options: {
      httpOnly: false,
      sameSite: "none",
      path: "/",
      secure: true,
    },
  },
};
