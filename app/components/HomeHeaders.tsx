"use client";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function HomeHeaders() {
  return (
    <Flex direction={"column"} gap={4} align="flex-start">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Heading as="h1" size={{ lg: "4xl", md: "3xl", base: "2xl" }}>
          Welcome to ReelReminder
        </Heading>
        <Text fontSize={{ lg: "xl", md: "md", base: "sm" }}>
          Your one-stop-shop for never forgetting a great movie selection again!
        </Text>
      </motion.div>
    </Flex>
  );
}
