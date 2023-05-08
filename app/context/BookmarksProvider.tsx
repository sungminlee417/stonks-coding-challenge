import { createContext, useState, useCallback, useEffect } from "react";
import { MovieType } from "../types";

type BookmarksContextProps = {
  bookmarked: MovieType[];
  setBookmarked: (previous: (previous: MovieType[]) => MovieType[]) => void;
};

type BookmarksProviderProps = {
  children: React.ReactNode;
};

const defaultContextValue: BookmarksContextProps = {
  bookmarked: [],
  setBookmarked: () => {},
};

export const BookmarksContext =
  createContext<BookmarksContextProps>(defaultContextValue);

export const BookmarksProvider: React.FC<BookmarksProviderProps> = ({
  children,
}) => {
  const [bookmarked, setBookmarked] = useState<MovieType[]>([]);

  const setBookmarkedCallback = useCallback(
    (previous: (previous: MovieType[]) => MovieType[]) => {
      setBookmarked(previous);
      localStorage.setItem("bookmarkedMovies", JSON.stringify(previous));
    },
    []
  );

  useEffect(() => {
    localStorage.setItem("bookmarkedMovies", JSON.stringify(bookmarked));
  }, [bookmarked]);

  const contextValue: BookmarksContextProps = {
    bookmarked,
    setBookmarked: setBookmarkedCallback,
  };

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
};
