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
import { faHeart } from "@fortawesome/free-solid-svg-icons";

interface MovieProps {
  movie: MovieType;
}

export default function Movie({ movie }: MovieProps) {
  return (
    <Box>
      <Stack spacing={2} w="310px">
        <Image src={movie.Poster} alt={movie.Title} />
        <Flex justify={"space-between"} gap={2}>
          <Box>
            <Heading size="sm">{movie.Title}</Heading>
            <Text>{movie.Year}</Text>
          </Box>
          <Button colorScheme="teal" style={{ backgroundColor: "teal" }}>
            <FontAwesomeIcon icon={faHeart} />
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
}
