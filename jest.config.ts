import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest", // Use ts-jest for TypeScript files
  },
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["<rootDir>/src/tests/**/*.test.ts"], // Adjust to your test file path
};

export default config;
