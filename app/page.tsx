"use client";
import { Stack, Flex } from "@chakra-ui/react";
import HomeHeaders from "./components/HomeHeaders";
import MovieSearchBar from "./components/MovieSearchBar";
import Navigation from "./components/Navigation";
import Bookmarked from "./components/Bookmarked";
import MoviesList from "./components/MoviesList";
import { useState } from "react";
import { MovieType } from "./types";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [movies, setMovies] = useState<MovieType[]>([]);

  return (
    <Stack spacing={20}>
      <Flex justify="space-between">
        <HomeHeaders />
        <MovieSearchBar setMovies={setMovies} />
      </Flex>
      <Stack>
        <Navigation setCurrentPage={setCurrentPage} />
        {currentPage === 1 && <MoviesList movies={movies} />}
        {currentPage === 2 && <Bookmarked />}
      </Stack>
    </Stack>
  );
};

export default Home;
