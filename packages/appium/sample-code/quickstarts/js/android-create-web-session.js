const { resolve } = require('path');
const { remote } = require('webdriverio');

const { CHROME_DRIVER_PATH } = process.env;

const capabilities = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
  browserName: 'chrome',
  'appium:chromedriverExecutable': CHROME_DRIVER_PATH || resolve(__dirname, '../../../../../chromedriver'),
};

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);

  await driver.url('https://www.google.com');

  const title = await driver.getTitle();
  if (title !== 'Google') {
    throw new Error(`wrong title: ${title}`);
  }

  await driver.deleteSession()
}

runTest().catch(console.error);

