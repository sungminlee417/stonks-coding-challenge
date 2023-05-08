"use client";
import { Stack, Flex } from "@chakra-ui/react";
import HomeHeaders from "./components/HomeHeaders";
import MovieSearchBar from "./components/MovieSearchBar";
import Navigation from "./components/Navigation";
import Bookmarked from "./components/Bookmarked";
import MoviesList from "./components/MoviesList";
import { useContext, useEffect, useState } from "react";
import { BookmarksContext } from "./context/BookmarksProvider";
import { MoviesContext } from "./context/MoviesProvider";

const Home = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searched, setSearched] = useState(false);
  const { setBookmarked } = useContext(BookmarksContext);

  useEffect(() => {
    const bookmarkedMovies = localStorage.getItem("bookmarkedMovies");

    try {
      if (bookmarkedMovies) {
        setBookmarked(JSON.parse(bookmarkedMovies));
      } else {
        localStorage.setItem("bookmarkedMovies", JSON.stringify([]));
      }
    } catch (error) {
      console.error("Failed to parse bookmarked movies:", error);
      localStorage.removeItem("bookmarkedMovies");
    }
  }, [setBookmarked]);

  return (
    <Stack spacing={{ lg: 20, base: 10 }}>
      <Flex
        justify="space-between"
        direction={["column", "column", "row"]}
        p={8}
        gap={10}
      >
        <HomeHeaders />
        <MovieSearchBar
          setCurrentPage={setCurrentPage}
          setSearched={setSearched}
        />
      </Flex>
      <Stack>
        <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
        {currentPage === 1 && <MoviesList searched={searched} />}
        {currentPage === 2 && <Bookmarked />}
      </Stack>
    </Stack>
  );
};

export default Home;
