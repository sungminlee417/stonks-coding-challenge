import axios from "axios";
import { useState, useContext, useEffect } from "react";
import {
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { MoviesContext } from "../context/MoviesProvider";
import { motion } from "framer-motion";

interface MovieSearchBar {
  setCurrentPage: (num: number) => void;
  setSearched: (bool: boolean) => void;
}

export default function MovieSearchBar({
  setCurrentPage,
  setSearched,
}: MovieSearchBar) {
  const { setMovies } = useContext(MoviesContext);

  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const searchMovies = async () => {
    setIsLoading(true);
    setIsError(false);

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
        setSearched(true);
      }
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
    setCurrentPage(1);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchInput.trim().length > 0) {
      searchMovies();
    }
  };

  return (
    <Flex align={{ md: "end", sm: "start" }} direction={"column"} gap={2}>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <InputGroup h={"fit-content"} w={"fit-content"}>
          <InputLeftElement>
            <FontAwesomeIcon icon={faSearch} />
          </InputLeftElement>
          <Input
            placeholder="Search for movies"
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            value={searchInput}
            isInvalid={isError}
          />
        </InputGroup>
      </motion.div>
      {isError && (
        <Text color="red.500">
          Oops! Something went wrong. Please try again.
        </Text>
      )}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          w={"fit-content"}
          colorScheme="teal"
          variant="solid"
          style={{ backgroundColor: "teal" }}
          onClick={searchMovies}
          disabled={searchInput.trim().length === 0 || isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </motion.div>
    </Flex>
  );
}
