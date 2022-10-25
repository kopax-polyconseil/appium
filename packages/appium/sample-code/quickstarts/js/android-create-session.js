const {resolve} = require('path');
const {remote} = require('webdriverio');

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
  console.log(res.build)
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


// const androidOptions = {
//   serverConfig: {
//     path: '/wd/hub',
//     host: process.env.APPIUM_HOST || 'localhost',
//     port: process.env.APPIUM_PORT || 4723,
//     logLevel: 'info'
//   },
//   capabilities:  {
//     platformName: 'Android',
//     automationName: 'UiAutomator2',
//     deviceName: process.env.ANDROID_DEVICE_NAME || 'My Android Device',
//     platformVersion:
//       process.env.ANDROID_PLATFORM_VERSION || null,
//     app: path.resolve(__dirname, '..', '..', 'apps', 'ApiDemos-debug.apk'),
//   }
// }
//
//
// describe('Create Android session', function () {
//   let client;
//
//   before(async function () {
//     client = await webdriverio.remote(androidOptions);
//   });
//
//   it('should create and destroy a session', async function () {
//     const res = await client.status();
//     if (typeof res.build === 'object') {
//       throw new Error('not an object');
//     }
//
//     const current_package = await client.getCurrentPackage();
//     if (current_package !== 'io.appium.android.apis') {
//       throw new Error('package name error');
//     }
//
//     const delete_session = await client.deleteSession();
//     if (delete_session !== null) {
//       throw new Error('session cannot be deleted');
//     }
//   });
// });
