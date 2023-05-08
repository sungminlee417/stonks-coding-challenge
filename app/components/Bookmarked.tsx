import { useState, useContext } from "react";
import { MovieType } from "../types";
import { Stack, Flex, SimpleGrid, GridItem, Text } from "@chakra-ui/layout";
import Movie from "./Movie";
import { Button } from "@chakra-ui/button";
import { BookmarksContext } from "../context/BookmarksProvider";
import { Select } from "@chakra-ui/react";

export default function Bookmarked() {
  const { bookmarked, setBookmarked } = useContext(BookmarksContext);
  const [orderedBookmarks, setOrderedBookmarks] = useState(bookmarked);
  const [selectedOption, setSelectedOption] = useState("Default");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    switch (selectedValue) {
      case "Alphabetical":
        setOrderedBookmarks((bookmarks) => {
          return [...bookmarks].sort((a: MovieType, b: MovieType) =>
            a.Title.localeCompare(b.Title)
          );
        });
        break;
      case "Watched":
        setOrderedBookmarks((bookmarks) => {
          return [...bookmarks].sort((a: MovieType, b: MovieType) =>
            a.watched && !b.watched ? -1 : !a.watched && b.watched ? 1 : 0
          );
        });
        break;
      case "Unwatched":
        setOrderedBookmarks((bookmarks) => {
          return [...bookmarks].sort((a: MovieType, b: MovieType) =>
            a.watched && !b.watched ? 1 : !a.watched && b.watched ? -1 : 0
          );
        });
        break;
      default:
        setOrderedBookmarks(bookmarked);
        break;
    }
  };

  const toggleBookmarkWatched = (bookmark: MovieType) => {
    const newBookmarks = [...bookmarked];
    const updatedBookmark = newBookmarks.find(
      (bm) => bm.imdbID === bookmark.imdbID
    );

    if (updatedBookmark) {
      updatedBookmark.watched = !updatedBookmark.watched;
      setBookmarked((previous: MovieType[]) => newBookmarks);
      localStorage.setItem("bookmarkedMovies", JSON.stringify(newBookmarks));
    }
  };

  return (
    <Flex p={10} direction={"column"} align={"center"} gap={10}>
      <Stack>
        <Select
          variant="flushed"
          placeholder=""
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="Default">Sort By</option>
          <option value="Alphabetical">Title A-Z</option>
          <option value="Watched">Watched</option>
          <option value="Unwatched">Unwatched</option>
        </Select>
      </Stack>
      {orderedBookmarks.length ? (
        <SimpleGrid gap={10} columns={{ xl: 4, lg: 2, base: 1 }}>
          {orderedBookmarks.map((bookmark: MovieType) => (
            <GridItem key={bookmark.imdbID}>
              <Flex direction={"column"} align={"space-between"} gap={2}>
                <Movie
                  movie={bookmark}
                  setOrderedBookmarks={setOrderedBookmarks}
                />
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
                  {bookmark.watched ? "Watched" : "Unwatched"}
                </Button>
              </Flex>
            </GridItem>
          ))}
        </SimpleGrid>
      ) : (
        <Text>No bookmarks added yet!</Text>
      )}
    </Flex>
  );
}
