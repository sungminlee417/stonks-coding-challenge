import { createContext, useState } from "react";
import { MovieType } from "../types";

type MoviesContextProps = {
  movies: MovieType[];
  setMovies: (movies: MovieType[]) => void;
};

type MoviesProviderProps = {
  children: React.ReactNode;
};

export const MoviesContext = createContext<MoviesContextProps>({
  movies: [],
  setMovies: () => {},
});

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [movies, setMovies] = useState<MovieType[]>([]);

  const contextValue: MoviesContextProps = {
    movies,
    setMovies,
  };

  return (
    <MoviesContext.Provider value={contextValue}>
      {children}
    </MoviesContext.Provider>
  );
};
