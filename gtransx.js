"use strict";
const puppeteer = require("puppeteer");
const { getChrome } = require("./chrome-script");
const encodeUrl = require("encodeurl");
const SERVICES = require("./services");

const process = async (browser, src, tgt, service, texts) => {
  const { URL, SELECTOR } = SERVICES[service];
  const urlTo = encodeUrl(URL(src, tgt, ""));
  await browser.defaultBrowserContext().overridePermissions(urlTo, ["clipboard-read", "clipboard-write"]);
  return new Promise(async (resolve, reject) => {
    try {
      const results = [];
      await Promise.all(
        texts.map(async (text) => {
          const page = await browser.newPage();
          await page.goto(urlTo + text);
          await page.waitForSelector(SELECTOR);
          await page.click(SELECTOR);
          const textBack = await page.evaluate(() => {
            return navigator.clipboard.readText();
          });
          results.push({ src: text, tgt: textBack });
          page.close();
        })
      );
      resolve(results);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports.translate = async (event) => {
  console.log(JSON.parse(event.body));
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint,
  });

  const { src, tgt, service, texts } = JSON.parse(event.body);
  let results = await process(browser, src, tgt, service, texts);
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
