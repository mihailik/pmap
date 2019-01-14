namespace node {

  export async function main() {
    let puppeteer: typeof import("puppeteer");
    try {
      console.log('puppeteer...');
      puppeteer = require('puppeteer');
    }
    catch (error) {
      error.message = 'Google Puppeteer is missing: ' + error.message;
      throw error;
    }

    console.log('browser...');
    const browser = await puppeteer.launch({
      headless: false
    });

    try {

      console.log('mainPage...');
      const mainPage = (await browser.pages())[0] || await browser.newPage();

      console.log('setContent...');
      await mainPage.setContent('<html><head><title>Map Tile Scraper</title></head><body></body></html>');

      await withBrowser(browser, mainPage);
    }
    finally {
      console.log('close...');
      await browser.close();
    }
  }

  async function withBrowser(browser: import("puppeteer").Browser, mainPage: import("puppeteer").Page) {

  }
}