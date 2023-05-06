"use client";
import { Flex, Heading } from "@chakra-ui/react";

export default function HomeHeaders() {
  return (
    <Flex direction={"column"} gap={2} p={10}>
      <Heading as="h1" size="4xl">
        ReelReminder
      </Heading>
      <Heading as="h2" size="lg">
        Never Miss a Movie Selection Again!
      </Heading>
    </Flex>
  );
}
