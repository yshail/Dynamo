module.exports = (fn) => {
  return (...args) => {
    return fn(...args).catch((err) => {
      console.error("Error occurred:", err.message);
    });
  };
};
