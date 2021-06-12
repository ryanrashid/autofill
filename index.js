var puppeteer = require('puppeteer');
var readline = require('readline-sync');
var xpath = require('xpath-to-selector');

async function run() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://rewards1.com');
  await page.waitForSelector('button.pull-right');
  await page.click('button.pull-right');
  // await page.click('#sign-in-email');
  await page.type('#sign-in-email', 'ryan.rshd@gmail.com');
  await page.type('input[type="password"]', 'rashid');
  await page.click('button.submit_button');
  var prompt = readline.question('Are you ready to run');
  if (prompt == 'yes') {
    autopilot();
  }
};

asynch function autopilot() {

}

run();
