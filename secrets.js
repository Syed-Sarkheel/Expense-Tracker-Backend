import crypto from "crypto";

const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

const ACCESS_TOKEN_SECRET = generateRandomString(32);
const REFRESH_TOKEN_SECRET = generateRandomString(32);

console.log(`Generated ACCESS_TOKEN_SECRET: ${ACCESS_TOKEN_SECRET}`);
console.log(`Generated REFRESH_TOKEN_SECRET: ${REFRESH_TOKEN_SECRET}`);
