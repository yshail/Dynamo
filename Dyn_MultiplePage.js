const { chromium } = require("playwright");
const cheerio = require("cheerio");

let html;

const callYC = async () => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("https://www.ycombinator.com/companies/", {
    waitUntil: "networkidle",
  });

  await page.waitForSelector("span[class*='Name']");

  const cards = page.locator("span[class*='Name']");

  const target = 40;
  if (target > 40) {
    while ((await cards.count()) < target) {
      const before = await cards.count();
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
      await page.waitForTimeout(300);
    }
  }
  console.log(await cards.count());
  html = await page.content();
  await browser.close();
};

callYC().then(() => {
  const $ = cheerio.load(html);
  let companyNumber = 1;
  $("span[class*='Name']").each((_, el) => {
    let Name = $(el).text().trim();
    let Location = $(el).parent().find("span[class*='Location']").text().trim();
    let Description = $(el).parent().parent().children().eq(1).text().trim();
    let Batch = $(el)
      .parent()
      .parent()
      .parent()
      .find("a[href*='batch']")
      .text()
      .trim();
    let Industry = $(el)
      .parent()
      .parent()
      .parent()
      .find("a[href*='industry']")
      .map((_, e) => $(e).text().trim())
      .get();

    const companyData = {
      Number: companyNumber++,
      Name: Name,
      Location: Location,
      Description: Description,
      Batch: Batch,
      Industry: Industry,
    };
    console.log(companyData);
  });
});
