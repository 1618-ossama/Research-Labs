import * as redis from "redis";

const client = redis.createClient();

export {
  saveRefreshToken,
  verifyRefreshTokenInDb,
  blacklistRefreshToken,
  blacklistAllUserTokens,
  cleanupExpiredTokens,
  rotateRefreshToken,
};
