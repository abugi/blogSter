const puppeteer = require("puppeteer");

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  page = await browser.newPage();
  await page.goto("http://localhost:3000");
});

afterEach(async () => {
  // await browser.close();
});

test("Header has the correct brand name", async done => {
  const text = await page.$eval("a.brand-logo", el => el.innerHTML);

  expect(text).toEqual("Blogster");

  done();
});

test("Clicking login starts OAuth flow", async done => {
  await page.click(".right a");

  const url = await page.url();
  console.log(url);
  expect(url).toMatch(/accounts\.google\.com/);

  done();
});
