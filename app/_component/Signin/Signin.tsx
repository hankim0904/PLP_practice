"use client";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Signin() {
  const handleSignIn = async () => {
    try {
      const result = await signIn("credentials", {
        username: "",
        password: "",
        redirect: false,
      });

      if (result?.error) {
        console.error("로그인 실패:", result.error);
      } else {
        console.log("로그인 성공");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
    }
  };

  useEffect(() => {
    handleSignIn();
  }, []);

  return <></>;
}
