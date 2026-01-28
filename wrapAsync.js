module.exports = (fn) => {
  return (...args) => {
    fn(...args).catch((err) => {
      console.error("Error occurred:", err.message);
    });
  };
};
