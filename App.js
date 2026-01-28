const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/pages", (req, res) => {
  const pgNumber = req.body();
});

app.listen(3000, () => {
  console.log("App is listening..");
});
