"use client";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import {
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MoviesContext } from "../context/MoviesProvider";

interface MovieSearchBar {
  setCurrentPage: (num: number) => void;
}

export default function MovieSearchBar({ setCurrentPage }: MovieSearchBar) {
  const { setMovies } = useContext(MoviesContext);

  const [searchInput, setSearchInput] = useState("");

  const searchMovies = async () => {
    const options = {
      method: "GET",
      url: "https://movie-database-alternative.p.rapidapi.com/",
      params: {
        s: searchInput,
        r: "json",
        y: "",
        page: 1,
      },
      headers: {
        "X-RapidAPI-Key": process.env.API_KEY,
        "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data.Search) {
        setMovies(response.data.Search);
        setCurrentPage(1);
      } else {
        setMovies([]);
        alert(`No movies with the name, "${searchInput}" found.`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex align={{ md: "end", sm: "start" }} direction={"column"} gap={2}>
      <Tooltip
        hasArrow
        label="Search movies"
        bg="gray.300"
        color="black"
        placement="bottom-start"
      >
        <InputGroup h={"fit-content"} w={"fit-content"}>
          <InputLeftElement>
            <FontAwesomeIcon icon={faSearch} />
          </InputLeftElement>
          <Input
            placeholder="Search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </InputGroup>
      </Tooltip>
      <Button
        w={"fit-content"}
        colorScheme="teal"
        variant="solid"
        style={{ backgroundColor: "teal" }}
        onClick={searchMovies}
      >
        Search
      </Button>
    </Flex>
  );
}
