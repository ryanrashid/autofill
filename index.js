var puppeteer = require('puppeteer');
var readline = require('readline-sync');
var xpath = require('xpath-to-selector');
var fs = require('fs');

var data = require('./config.json');

async function run() {
  console.log();
  await initialPrompt();
};

function initialPrompt() {
  console.log('Welcome to SurveyBot2.0! Select an option:');
  index = readline.keyInSelect(['Login to rewards1.com', 'Update login information'],
    '', {guide: false, cancel: 'Quit'});
  if (index == 0) {
    login();
  } else if (index == 1) {
    storeLogin();
  }
}

async function login() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://rewards1.com');
  await page.waitForSelector('button.pull-right');
  await page.click('button.pull-right');
  await page.type('#sign-in-email', data.user);
  await page.type('input[type="password"]', data.pwd);
  await page.click('button.submit_button');
  console.log();
}

async function storeLogin() {
  var user = readline.questionEMail('Email Address: ');
  var pwd = readline.questionNewPassword('Password: ', {min: 0, max: 64,
    limitMessage: ''});
  var data = {
    user: user,
    pwd: pwd
  };
  fs.writeFile('./config.json', JSON.stringify(data), function (err) {
    if (err) {
      console.log('There has been an error saving your configuration data.');
      console.log(err.message);
      return;
    }
    console.log('Configuration saved successfully.');
  });
}

async function autopilot() {

};

run();
