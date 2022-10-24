const join = require('path').join;
const webdriverio = require('webdriverio');
const androidOptions = require('../../helpers/caps').androidOptions;
const assert = require('chai').assert;

androidOptions.capabilities.app = join(__dirname, '../../../apps/app-testing-android.apk');

describe('Create Android session', function () {
  let client;

  before(async function () {
    client = await webdriverio.remote(androidOptions);
  });

  it('should create and destroy a session', async function () {
    const res = await client.status();
    assert.isObject(res.build);

    const current_package = await client.getCurrentPackage();
    assert.equal(current_package, 'app.passculture.testing');

    const delete_session = await client.deleteSession();
    assert.isNull(delete_session);
  });
});
