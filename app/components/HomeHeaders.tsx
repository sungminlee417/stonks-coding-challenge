"use client";
import { Flex, Heading, Text } from "@chakra-ui/react";

export default function HomeHeaders() {
  return (
    <Flex direction={"column"} gap={4} align="flex-start">
      <Heading as="h1" size={{ lg: "4xl", md: "3xl", base: "2xl" }}>
        Welcome to ReelReminder
      </Heading>
      <Text fontSize={{ lg: "xl", md: "md", base: "sm" }}>
        Your one-stop-shop for never missing a great movie selection again!
      </Text>
    </Flex>
  );
}
