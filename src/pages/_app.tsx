import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <>
          <Head>
            <title>Youtube Converter</title>
            <meta name="description" content="Youtube Converter" />
            <link rel="icon" href="/favicon.ico" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, user-scalable=no"
            />
          </Head>
          <Component {...pageProps} />
        </>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
