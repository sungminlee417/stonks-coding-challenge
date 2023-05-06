import { Flex, Link, Divider } from "@chakra-ui/react";

interface NavigationProps {
  setCurrentPage: (page: number) => void;
}

export default function Navigation({ setCurrentPage }: NavigationProps) {
  return (
    <Flex p={10} gap={5} borderBottom={"1px"} borderBottomColor={"gray"}>
      <Link onClick={() => setCurrentPage(1)}>Searched Movies</Link>
      <Divider orientation="vertical" height={"auto"} />
      <Link onClick={() => setCurrentPage(2)}>Bookmarked Movies</Link>
    </Flex>
  );
}
