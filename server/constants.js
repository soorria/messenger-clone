module.exports = {
  JWT_MAX_AGE: 3 * 24 * 60 * 60, // 3 days
  __prod__: process.env.NODE_ENV === "production",
};
