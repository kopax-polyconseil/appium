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
  const driver = await remote(wdOpts)
  const res = await driver.status();

  if (typeof res.build !== 'object') {
    throw new Error('not an object');
  }

  const element = await driver.findElement('class name', 'XCUIElementTypeApplication');
  const attr = await driver.getElementAttribute(element.ELEMENT, 'name')
  if (attr !== 'TestApp') {
    throw new Error(`attr is different ${attr}`);
  }

  const destroySession = await client.deleteSession();
  if (destroySession !== null) {
    throw new Error('session cannot be deleted');
  }

}

runTest().catch(console.error);

