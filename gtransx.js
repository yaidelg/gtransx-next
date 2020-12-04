"use strict";
const puppeteer = require("puppeteer");
const { getChrome } = require("./chrome-script");
const encodeUrl = require("encodeurl");
const SERVICES = require("./services");

const process = async (browser, src, tgt, service, texts) => {
  const { URL, SELECTOR } = SERVICES[service];
  console.log("SELECTOR", SELECTOR);
  const urlTo = encodeUrl(URL(src, tgt, ""));
  await browser
    .defaultBrowserContext()
    .overridePermissions(urlTo, ["clipboard-write", "clipboard-read"]);
  const results = [];
  for (let i = 0; i < texts.length; i++) {
    const page = await browser.newPage();
    await page.goto(urlTo + texts[i]);

    let value = null;

    while (!value) {
      await page.waitForSelector(".lmt__translations_as_text__text_btn");
      let element = await page.$(".lmt__translations_as_text__text_btn");
      value = await page.evaluate((el) => el.textContent, element);
    }

    console.log(value);
    results.push({ src: texts[i], tgt: value });
    page.close();
  }
  return results;
};

module.exports.translate = async (event) => {
  console.log(JSON.parse(event.body));
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint,
  });

  const { src, tgt, service, texts } = JSON.parse(event.body);

  let results = await process(browser, src, tgt, service, texts);
  console.log(results);
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      rc: 0,
      msg: "Success!",
      texts: results,
    }),
  };
};
