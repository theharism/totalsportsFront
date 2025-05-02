"use client";

import { AxiosError } from "axios";
import {
  HydrationBoundary,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { keys } from "@/lib/keys";
import { handleServerError } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function QueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, error) => {
              // eslint-disable-next-line no-console
              if (keys.env === "development")
                console.log({ failureCount, error });

              if (failureCount >= 0 && keys.env === "development") return false;
              if (failureCount > 3 && keys.env === "production") return false;

              return !(
                error instanceof AxiosError &&
                [401, 403].includes(error.response?.status ?? 0)
              );
            },
            refetchOnWindowFocus: keys.env === "production",
            staleTime: 10 * 1000, // 10s
          },
          mutations: {
            onError: (error) => {
              handleServerError(error);

              if (error instanceof AxiosError) {
                if (error.response?.status === 304) {
                  toast({
                    variant: "destructive",
                    title: "Content not modified!",
                  });
                }
              }
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error instanceof AxiosError) {
              if (error.response?.status === 500) {
                toast({
                  variant: "destructive",
                  title: "Internal Server Error!",
                });
                // router.navigate({ to: '/500' })
              }
              if (error.response?.status === 403) {
                // router.navigate({ to: '/403' })
              }
            }
          },
        }),
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
