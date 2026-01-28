const cheerio = require("cheerio");
const axios = require("axios");

const wrapAsync = require("./wrapAsync");

const pageNumber = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50,
];

const pageData = wrapAsync(async (url) => {
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

const urls = pageNumber.map((Element, index) => {
  return `https://books.toscrape.com/catalogue/page-${Element}.html`;
});

urls.forEach((url) => {
  pageData(url);
});
