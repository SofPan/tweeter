module.exports = function generateRandomID() {
  return Math.random().toString(36).slice(2, 5);
};