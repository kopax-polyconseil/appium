/* eslint-disable no-console */

import ora from 'ora';

const JSON_SPACES = 4;

/***
 * Log an error to the console and exit the process.
 * @param {boolean} json - whether we should log json or text
 * @param {string} msg - error message
 */
function errAndQuit (json, msg) {
  if (json) {
    console.log(JSON.stringify({error: `${msg}`}), null, JSON_SPACES);
  } else {
    console.error(`${msg}`.red);
  }
  process.exit(1);
}

/**
 * Conditionally log something to the console
 * @param {boolean} json - whether we are in json mode (and should therefore not log)
 * @param {string} msg - string to log
 */
function log (json, msg) {
  !json && console.log(msg);
}

/**
 * Start a spinner, execute an async function, and then stop the spinner
 * @param {boolean} json - whether we are in json mode (and should therefore not log)
 * @param {string} msg - string to log
 * @param {function} fn - function to wrap with spinning
 */
async function spinWith (json, msg, fn) {
  if (json) {
    return await fn();
  }
  const spinner = ora(msg).start();
  let res;
  try {
    res = await fn();
    spinner.succeed();
    return res;
  } catch (err) {
    spinner.fail();
    throw err;
  }
}

export {
  errAndQuit,
  log,
  spinWith,
  JSON_SPACES
};