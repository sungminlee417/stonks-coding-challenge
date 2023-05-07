import { useContext, useEffect } from "react";
import { MovieType } from "../types";
import { Flex, Wrap, WrapItem, Text, Heading, Stack } from "@chakra-ui/layout";
import Movie from "./Movie";
import { Button } from "@chakra-ui/button";
import { BookmarksContext } from "../context/BookmarksProvider";

export default function Bookmarked() {
  const { bookmarked, setBookmarked } = useContext(BookmarksContext);

  const toggleBookmarkWatched = (bookmark: MovieType) => {
    setBookmarked((previous: MovieType[]) => {
      const newState = [...previous];

      for (let i = 0; i < newState.length; i++) {
        if (newState[i].imdbID === bookmark.imdbID)
          newState[i].watched = !newState[i].watched;
      }

      return newState;
    });

    const bookmarkedMovies = localStorage.getItem("bookmarkedMovies");
    if (bookmarkedMovies) {
      const parsed = JSON.parse(bookmarkedMovies);
      for (let i = 0; i < parsed.length; i++) {
        if (parsed[i].imdbID === bookmark.imdbID)
          parsed[i].watched = !parsed[i].watched;
      }

      localStorage.setItem("bookmarkedMovies", JSON.stringify(parsed));
    } else {
      localStorage.setItem("bookmarkedMovies", JSON.stringify([]));
    }
  };

  return (
    <Flex p={10}>
      {bookmarked.length ? (
        <Stack spacing="50px">
          <Wrap spacing={10} justify={"center"}>
            {bookmarked.map((bookmark: MovieType) => (
              <WrapItem key={bookmark.imdbID}>
                <Flex direction={"column"} alignContent={"flex-start"} gap={2}>
                  <Movie movie={bookmark} />
                  <Button
                    className={`${
                      bookmark.watched
                        ? "bg-[teal] text-white"
                        : "bg-white text-[teal] border-[teal] border"
                    }`}
                    _hover={{ opacity: "80%" }}
                    _active={{ opacity: "50%" }}
                    onClick={() => toggleBookmarkWatched(bookmark)}
                  >
                    {bookmark.watched ? "Watched" : "Queued"}
                  </Button>
                </Flex>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      ) : (
        <Text>No bookmarked movies...</Text>
      )}
    </Flex>
  );
}
