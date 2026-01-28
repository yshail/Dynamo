const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://quotes.toscrape.com/";

axios.get(url).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  $(".quote").each((index, element) => {
    const text = $(element).find(".text").text();
    const author = $(element).find(".author").text();
    const tags = $(element)
      .find(".tags .tag")
      .map((i, el) => $(el).text().trim())
      .get();
    const out = {
      text,
      author,
      tags,
    };
    console.log(out);
  });
});
