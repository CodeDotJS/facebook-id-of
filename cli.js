#!/usr/bin/env node

'use strict';

const dns = require('dns');
const https = require('https');
const logUpdate = require('log-update');
const ora = require('ora');
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();
const arg = process.argv[2];
const pre = chalk.cyan.bold('›');
const pos = chalk.red.bold('›');
const spinner = ora();

if (!arg || arg === '-h' || arg === '--help') {
	console.log(`
 ${chalk.cyan('Usage   :')} facebook-id-of ${chalk.blue('<username>\n')}
 ${chalk.cyan('Example :')} facebook-id-of ${chalk.yellow('RishiDotJS\n')}
 ${chalk.cyan('Help    :')} facebook-id-of ${chalk.green('-h')} ${chalk.dim('--help')}
 `);
	process.exit(1);
}

const options = {
	hostname: 'www.facebook.com',
	port: 443,
	path: `/${arg}`,
	method: 'GET',
	headers: {
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
	}
};

dns.lookup('facebook.com', err => {
	if (err && err.code === 'ENOTFOUND') {
		logUpdate(`\n${pos} Please check your internet connection\n`);
		process.exit(1);
	} else {
		logUpdate();
		spinner.text = `Fetching UserID. Please wait!`;
		spinner.start();
	}
});

const req = https.request(options, res => {
	if (res.statusCode === 200) {
		logUpdate();
		spinner.text = `${arg} ${chalk.dim('is a facebook user!')}`;
	}

	let store = '';
	res.setEncoding('utf8');

	res.on('data', d => {
		store += d;
	});

	res.on('end', () => {
		const rePattern = new RegExp(/entity_id":"\d*/);
		const arrMatches = store.match(rePattern);

		if (arrMatches && arrMatches[0]) {
			logUpdate(`\n${chalk.cyan.bold(`${pre}`)} ${chalk.dim('Facebook ID of')} ${arg} ${chalk.dim('is')} ${arrMatches[0].replace('entity_id":"', '')}\n`);
			spinner.stop();
		} else {
			logUpdate(`\n${chalk.red.bold(pre)} ${arg} ${chalk.dim('is not facebook user!')}\n`);
			spinner.stop();
		}
	});
});
req.end();
