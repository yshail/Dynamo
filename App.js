const express = require("express");
const path = require("path");
const app = express();
const scrapper = require("./MultiplePage");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/pages", (req, res) => {
  const { page } = req.query;

  const pageNumber = Array.from({ length: page }, (_, i) => i + 1);
  const result = scrapper(pageNumber);
  result.then((d) => {
    res.render("pages", { data: d });
  });
});

app.listen(3000, () => {
  console.log("App is listening..");
});
