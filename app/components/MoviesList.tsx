import { Flex, Text, SimpleGrid, GridItem } from "@chakra-ui/react";
import Movie from "./Movie";
import { useContext } from "react";
import { MoviesContext } from "../context/MoviesProvider";

interface MoviesListProps {
  searched: boolean;
}

export default function MoviesList({ searched }: MoviesListProps) {
  const { movies } = useContext(MoviesContext);

  return (
    <Flex p={10} direction={"column"} align={"center"} gap={10} bg={"white"}>
      {movies.length ? (
        <SimpleGrid columns={{ xl: 4, lg: 3, sm: 2, base: 1 }} spacing={10}>
          {movies.map((movie) => (
            <GridItem key={movie.imdbID}>
              <Movie movie={movie} />
            </GridItem>
          ))}
        </SimpleGrid>
      ) : (
        <Flex
          direction={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {searched
              ? "Oops! No movies found."
              : "Welcome! Let's search for some movies."}
          </Text>
          <Text mt={2}>
            {searched
              ? "We couldn't find any movies matching your search. Please try again!"
              : "Start by entering a movie title in the search bar above."}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}
