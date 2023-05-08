import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { BookmarksContext } from "../context/BookmarksProvider";
import { MovieType } from "../types";

interface MovieProps {
  movie: MovieType;
  setOrderedBookmarks?: (
    callback: (movies: MovieType[]) => MovieType[]
  ) => void;
}

export default function Movie({ movie, setOrderedBookmarks }: MovieProps) {
  const { bookmarked, setBookmarked } = useContext(BookmarksContext);
  const [inBookmarks, setInBookmarks] = useState(false);

  useEffect(() => {
    setInBookmarks(
      bookmarked.some((bookmark) => bookmark.imdbID === movie.imdbID)
    );
  }, [bookmarked, movie.imdbID]);

  const handleBookmarkToggle = () => {
    const bookmarkedMovies = [...bookmarked];
    const movieIndex = bookmarkedMovies.findIndex(
      (bookmark) => bookmark.imdbID === movie.imdbID
    );
    if (movieIndex >= 0) {
      bookmarkedMovies.splice(movieIndex, 1);
    } else {
      bookmarkedMovies.push({ ...movie, watched: false });
    }
    setBookmarked((previous: MovieType[]) => bookmarkedMovies);
    if (setOrderedBookmarks) {
      setOrderedBookmarks((movies: MovieType[]) => {
        if (movieIndex >= 0) {
          return movies.filter((bookmark) => bookmark.imdbID !== movie.imdbID);
        }
        return [...movies, { ...movie, watched: false }];
      });
    }
  };

  return (
    <Box>
      <Stack spacing={2} w={{ lg: "300px", base: "215px" }}>
        {movie.Poster === "N/A" ? (
          <Flex
            justify="center"
            align="center"
            h="400px"
            bg="gray.200"
            color="gray.500"
          >
            <Text>No Image Available</Text>
          </Flex>
        ) : (
          <Image
            src={movie.Poster}
            alt={movie.Title}
            h={"400px"}
            objectFit={"cover"}
          />
        )}
        <Flex justify={"space-between"} gap={2}>
          <Box>
            <Heading size="sm">{movie.Title}</Heading>
            <Text>{movie.Year}</Text>
          </Box>
          <Button
            className="border border-[teal]"
            onClick={handleBookmarkToggle}
          >
            <FontAwesomeIcon
              icon={inBookmarks ? faSolidHeart : faRegularHeart}
              className="text-[teal]"
            />
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
