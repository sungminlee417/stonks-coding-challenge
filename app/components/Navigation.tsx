import { Flex, Link, Divider } from "@chakra-ui/react";

interface NavigationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Navigation({
  currentPage,
  setCurrentPage,
}: NavigationProps) {
  return (
    <Flex
      mx={{ lg: 10, base: 6 }}
      gap={5}
      pb={{ lg: 10, base: 4 }}
      borderBottom={"1px"}
      borderBottomColor={"gray"}
    >
      <Link
        onClick={() => setCurrentPage(1)}
        className={`${currentPage === 1 ? "text-[teal]" : "text-black"}`}
      >
        Searched Movies
      </Link>
      <Divider orientation="vertical" height={"auto"} />
      <Link
        onClick={() => setCurrentPage(2)}
        className={`${currentPage === 2 ? "text-[teal]" : "text-black"}`}
      >
        Bookmarked Movies
      </Link>
    </Flex>
  );
}
