import "@/styles/globals.css";
import "leaflet/dist/leaflet.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
          <Analytics />
        </Auth>
      ) : (
        <>
          <Component {...pageProps} />
          <Analytics />
        </>
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
