const { remote } = require('webdriverio');

const capabilities = {
  platformName: 'iOS',
  browserName: 'Safari',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 6s',
  'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '12.1',
};

const wdOptions = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOptions);
  await driver.url('https://www.google.com');
  const title = await driver.getTitle();
  if (title !== 'Google') {
    throw new Error(`title does not match: ${title}`);
  }

  await driver.deleteSession();
}

runTest().catch(console.error);
