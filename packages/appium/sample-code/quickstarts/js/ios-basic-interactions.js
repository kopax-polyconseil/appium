const { resolve } = require('path');
const { remote } = require('webdriverio');

const { IOS_ZIP_PATH } = process.env;

const capabilities = {
  platformName: 'iOS',
  'appium:app': IOS_ZIP_PATH || resolve(__dirname, '..', '..', 'apps', 'TestApp.app.zip'),
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 6s',
  'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '12.1',
};

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
}

async function runTest() {
  const driver = await remote(wdOpts);

   const elementId = await driver.findElement('accessibility id', 'IntegerA');
   console.log('abc',elementId);
  driver.elementSendKeys(elementId.ELEMENT, 'Hello World!');

  const elementValue = await driver.findElement('accessibility id', 'IntegerA');
  const attr = await driver.getElementAttribute(elementValue.ELEMENT, 'value')
  if (attr !== 'Hello World!') {
    throw new Error(`Attr doesn't match: ${attr}`);
  }
  await driver.deleteSession();
}

async function runClickTest() {
  const driver = await remote(wdOpts);
  const element = await driver.findElement('accessibility id', 'show alert');
  await driver.elementClick(element.ELEMENT);
  const alertText = await driver.getAlertText();
  if (alertText !== 'Cool title\nthis alert is so cool.') {
    throw new Error(`alert text does not match: ${alertText}`);
  }
  await driver.deleteSession();
}

runTest()
  .catch(console.error)
  .then(runClickTest)
  .catch(console.error);
