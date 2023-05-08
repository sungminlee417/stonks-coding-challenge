"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { BookmarksProvider } from "./context/BookmarksProvider";
import { MoviesProvider } from "./context/MoviesProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <MoviesProvider>
        <BookmarksProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </BookmarksProvider>
      </MoviesProvider>
    </CacheProvider>
  );
}
