const { resolve } = require('path');
const { remote } = require('webdriverio');

const { ANDROID_APK_PATH } = process.env;

const capabilities = {
  platformName: 'Android',
  'appium:app': ANDROID_APK_PATH || resolve(__dirname, '..', '..', 'apps', 'ApiDemos-debug.apk'),
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'Android',
};

const wdOpts = {
  host: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
  logLevel: 'info',
  capabilities,
};

async function runTest() {
  const driver = await remote(wdOpts);
  const res = await driver.status();

  if (typeof res.build !== 'object') {
    throw new Error('not an object');
  }

  const current_package = await driver.getCurrentPackage();
  if (current_package !== 'io.appium.android.apis') {
    throw new Error(`package name error: ${current_package} not equal`);
  }

  const delete_session = await driver.deleteSession();
  if (delete_session !== null) {
    throw new Error('session cannot be deleted');
  }
}

runTest().catch(console.error);
