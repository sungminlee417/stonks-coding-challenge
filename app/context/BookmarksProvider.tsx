import { createContext, useState } from "react";
import { MovieType } from "../types";

type BookmarksContextProps = {
  bookmarked: MovieType[];
  setBookmarked: (previous: (previous: MovieType[]) => MovieType[]) => void;
};

type BookmarksProviderProps = {
  children: React.ReactNode;
};

export const BookmarksContext = createContext<BookmarksContextProps>({
  bookmarked: [],
  setBookmarked: () => {},
});

export const BookmarksProvider = ({ children }: BookmarksProviderProps) => {
  const [bookmarked, setBookmarked] = useState<MovieType[]>([]);

  const contextValue: BookmarksContextProps = {
    bookmarked,
    setBookmarked,
  };

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
};
