import { Flex, Text, SimpleGrid, GridItem } from "@chakra-ui/react";
import Movie from "./Movie";
import { useContext } from "react";
import { MoviesContext } from "../context/MoviesProvider";

export default function MoviesList() {
  const { movies } = useContext(MoviesContext);
  return (
    <Flex p={10} direction={"column"} align={"center"} gap={10}>
      {movies.length ? (
        <SimpleGrid gap={10} columns={{ xl: 4, lg: 2, base: 1 }}>
          {movies.map((movie) => (
            <GridItem key={movie.imdbID}>
              <Movie movie={movie} />
            </GridItem>
          ))}
        </SimpleGrid>
      ) : (
        <Text alignSelf={"start"}>No movies searched...</Text>
      )}
    </Flex>
  );
}
