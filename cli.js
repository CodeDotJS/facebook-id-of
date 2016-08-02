#!/usr/bin/env node

'use strict';

const dns = require('dns');
const https = require('https');
const logUpdate = require('log-update');
const colors = require('colors/safe');

const arg = process.argv[2];
const arrow = colors.cyan.bold('›');

if (!arg || arg === '-h' || arg === '--help') {
	console.log(`
 ${colors.cyan('Usage   :')} facebook-id-of ${colors.blue('<username>\n')}
 ${colors.cyan('Example :')} facebook-id-of ${colors.yellow('RishiDotJS\n')}
 ${colors.cyan('Help    :')} facebook-id-of ${colors.green('-h')} ${colors.dim('--help')}
 `);
	process.exit(1);
}

const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const userArgs = arg;
const pathReq = `/${userArgs}`;

const options = {
	hostname: 'www.facebook.com',
	port: 443,
	path: pathReq,
	method: 'GET',
	headers: {
		'accept': 'text/html,application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
		'Host': 'www.facebook.com',
		'Connection': 'Keep-Alive',
		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
	}
};

dns.lookup('facebook.com', err => {
	if (err && err.code === 'ENOTFOUND') {
		logUpdate(`\n${colors.red.bold(arrow)} Please check your internet connection`);
		process.exit(1);
	} else {
		logUpdate(`\n${arrow} ${colors.dim('Fetching UserID. Please wait!')}`);
	}
});

const req = https.request(options, res => {
	if (res.statusCode === 200) {
		logUpdate(`${colors.cyan.bold('\n›')} ${colors.yellow(arg)} ${colors.dim(`is a facebook user!`)}\n`);
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
			logUpdate();
			console.log(`${colors.cyan.bold(`${arrow}`)} ${colors.dim('Facebook ID of')} ${arg} ${colors.dim('is')} ${arrMatches[0].replace('entity_id":"', '')}\n`);
		} else {
			logUpdate(`${colors.cyan.bold('\n›')} ${colors.dim(`Sorry "${arg}" is not a facebook user!`)}\n`);
		}
	});
});
req.end();
