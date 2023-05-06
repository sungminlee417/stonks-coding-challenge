require("dotenv").config();

const apiKey = process.env.API_KEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: apiKey,
  },
};

module.exports = nextConfig;
