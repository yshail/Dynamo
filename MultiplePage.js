const cheerio = require("cheerio");
const axios = require("axios");

const wrapAsync = require("./wrapAsync");

const pageNumber = 1;
const url = `https://books.toscrape.com/catalogue/page-${pageNumber}.html`;

const pageData = wrapAsync(async () => {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  $(".product_pod").each((index, list) => {
    const bookTitle = $(list).find("h3 a").attr("title");
    const bookPrice = $(list).find("p.price_color").text();
    let rating = $(list).find(".star-rating").attr("class").split(" ");
    rating = rating[1];

    console.log({
      bookTitle,
      bookPrice,
      rating,
    });
  });
});

pageData();
