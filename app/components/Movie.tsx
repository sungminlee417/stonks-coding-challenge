import {
  Flex,
  Box,
  Button,
  Image,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MovieType } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faSolidHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { BookmarksContext } from "../context/BookmarksProvider";

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
    for (let bookmark of bookmarked) {
      if (bookmark.imdbID === movie.imdbID) {
        setInBookmarks(true);
      }
    }
  }, [bookmarked, movie.imdbID, setInBookmarks]);

  const bookmarkMovie = () => {
    setBookmarked((previous: MovieType[]) => {
      const newState = [...previous];
      newState.push({ ...movie, watched: false });
      return newState;
    });
    const bookmarkedMovies = localStorage.getItem("bookmarkedMovies");
    if (bookmarkedMovies) {
      const parsed = JSON.parse(bookmarkedMovies);
      parsed.push({ ...movie, watched: false });
      localStorage.setItem("bookmarkedMovies", JSON.stringify(parsed));
    } else {
      localStorage.setItem(
        "bookmarkedMovies",
        JSON.stringify([{ ...movie, watched: false }])
      );
    }
  };

  const unbookmarkMovie = () => {
    if (setOrderedBookmarks) {
      setOrderedBookmarks((movies: MovieType[]) => {
        const newState = movies.filter(
          (bookmark) => bookmark.imdbID !== movie.imdbID
        );
        return newState;
      });
    }
    setBookmarked((previous: MovieType[]) => {
      const newState = previous.filter(
        (bookmark) => bookmark.imdbID !== movie.imdbID
      );
      return newState;
    });
    const bookmarkedMovies = localStorage.getItem("bookmarkedMovies");
    if (bookmarkedMovies) {
      const parsed = JSON.parse(bookmarkedMovies);
      const removed = parsed.filter(
        (bookmark: MovieType) => bookmark.imdbID !== movie.imdbID
      );
      localStorage.setItem("bookmarkedMovies", JSON.stringify(removed));
    } else {
      localStorage.setItem("bookmarkedMovies", JSON.stringify([]));
    }
  };

  return (
    <Box>
      <Stack spacing={2} w={{ lg: "300px" }}>
        <Image
          src={movie.Poster}
          alt={movie.Title}
          h={"400px"}
          objectFit={"cover"}
        />
        <Flex justify={"space-between"} gap={2}>
          <Box>
            <Heading size="sm">{movie.Title}</Heading>
            <Text>{movie.Year}</Text>
          </Box>
          <Button
            className="border border-[teal]"
            onClick={inBookmarks ? unbookmarkMovie : bookmarkMovie}
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
