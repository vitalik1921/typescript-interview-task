import path from "path";
import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.*(css|sass|scss)$",
  ],
  setupFilesAfterEnv: [path.join(process.cwd(), "src/setupTests.ts")],
  moduleNameMapper: {
    "^.*(css|sass|scss)$": "identity-obj-proxy",
    "^~\/(.*)": "<rootDir>/src/$1"
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};

export default config;
