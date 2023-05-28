/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,

  roots: ["./src"],
  rootDir: ".",
  /**
   * jest支持别名
   */
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
