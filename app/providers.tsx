"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { BookmarksProvider } from "./context/BookmarksProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <BookmarksProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </BookmarksProvider>
    </CacheProvider>
  );
}
