const cheerio = require("cheerio");
const axios = require("axios");

const url = "https://quotes.toscrape.com/";

axios.get(url).then((res) => {

    const html = res.data;
    const $ = cheerio.load(html);
    const quote = $('.text').first().text();
    console.log(quote);
});
