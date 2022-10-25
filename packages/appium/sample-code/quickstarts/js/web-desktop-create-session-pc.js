const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const { CHROME_DRIVER_PATH } = process.env;

async function runTest() {
  const service = new chrome.ServiceBuilder(CHROME_DRIVER_PATH);
  const driver = new Builder().forBrowser('chrome').setChromeService(service).build();
  await driver.get('https://passculture.app/accueil');
  const title = await driver.getTitle();

  if (title !== 'Page d’accueil | pass Culture') {
    throw new Error(`title is not equal ${title}`);
  }
  driver.quit();
}

runTest().catch(console.error);

