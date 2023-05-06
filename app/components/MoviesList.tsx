import { Flex, Wrap, Text, WrapItem } from "@chakra-ui/react";
import Movie from "./Movie";
import { MovieType } from "../types";

interface MoviesList {
  movies: MovieType[];
}

export default function MoviesList({ movies }: MoviesList) {
  return (
    <Flex p={10}>
      {movies.length ? (
        <Wrap spacing={10} justify={"center"}>
          {movies.map((movie) => (
            <WrapItem key={movie.imdbID}>
              <Movie movie={movie} />
            </WrapItem>
          ))}
        </Wrap>
      ) : (
        <Text>Please search a movie...</Text>
      )}
    </Flex>
  );
}
