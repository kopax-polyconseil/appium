const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('chai').assert;

// set it to your chrome driver location, ex debian CHROME_DRIVER_PATH=/usr/bin/chromedriver
const { CHROME_DRIVER_PATH } = process.env

describe('Create Chrome web session', function () {
  let driver;
  let service;
  before(function () {
    service = CHROME_DRIVER_PATH ? new chrome.ServiceBuilder(CHROME_DRIVER_PATH) : service;
    driver = new webdriver.Builder().forBrowser('chrome').setChromeService(service).setChromeOptions().build();
  });

  after(function () {
    driver.quit();
  });

  it('should create and destroy Chrome desktop browser session', async function () {
    await driver.get('https://passculture.app/accueil');
    const title = await driver.getTitle();
    assert.equal(title, 'Page d’accueil | pass Culture');
  });
});
