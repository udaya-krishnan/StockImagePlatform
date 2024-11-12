const jwt = require('jsonwebtoken');

const secretKey = "udayan"; // Replace with a more secure secret key in production
const refreshSecretKey = "refresh_udayan"; // Separate key for refresh token, for added security

const generateAccessToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '15m' }); // Shorter expiry for access token
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, refreshSecretKey, { expiresIn: '7d' }); // Longer expiry for refresh token
};

const generateTokens = (payload) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};

module.exports = {
  generateTokens
};
