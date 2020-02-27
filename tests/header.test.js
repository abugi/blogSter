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

test.only("Show logout button when a user login", async done => {
  const id = "5e543dd68c0b1d17dc1d0b02";

  const Buffer = require("safe-buffer").Buffer;
  const sessionObject = {
    passport: {
      user: id
    }
  };

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );

  const Keygrip = require("keygrip");
  const keys = require("../config/keys");
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign("session =" + sessionString);
  const verify = keygrip.verify("session =" + sessionObject, sig);

  console.log(verify);

  await page.setCookie({ name: "session", value: sessionString });
  await page.setCookie({ name: "session.sig", value: sig });
  await page.goto("http://localhost:3000");

  done();
});
