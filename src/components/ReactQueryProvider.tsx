"use client";
import { useState } from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { refreshAuthToken } from "@/lib/refreshFetch";

type Props = {
  children: React.ReactNode;
};
const ReactQueryProvider = ({ children }: Props) => {
  const [client] = useState(() => {
    let isRetrying = false;

    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retryOnMount: true,
          refetchOnReconnect: true,
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError: async (error, query) => {
          if (error.message && !isRetrying) {
            isRetrying = true;
            try {
              const accessToken = await refreshAuthToken();
              console.log("new accesstoken", accessToken);
              await query.fetch();
            } catch (refreshError) {
              console.error("refresh 갱신 실패", refreshError);
            } finally {
              isRetrying = false;
            }
          }
        },
      }),
    });
  });
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
