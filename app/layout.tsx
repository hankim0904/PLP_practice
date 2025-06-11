import "./globals.css";
import Signin from "./_component/Signin/Signin";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Signin />
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  );
}
