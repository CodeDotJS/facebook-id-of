#!/usr/bin/env node

'use strict';

const https = require('https');
const colors = require('colors');

colors.setTheme({
	error: ['red', 'bold']
});

colors.setTheme({
	info: ['cyan', 'bold']
});

colors.setTheme({
	normal: ['green', 'bold']
});

const argv = require('yargs')
    .usage('\nUsage: $0 -u [/user.name]'.info)
    .demand(['u'])
    .describe('u', 'facebook username')
    .argv;

const options = {
	hostname: 'www.facebook.com',
	port: 443,
	path: argv.u,
	method: 'GET',
	headers: {
		'accept': 'text/html,application/json,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
		'Host': 'www.facebook.com',
		'Connection': 'Keep-Alive',
		'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
	}
};

const req = https.request(options, res => {
	if (res.statusCode === 200) {
		console.log('\n Status Code  : '.info, '😀'.info);
	} else {
		console.log('\n Sorry '.error + argv.u.replace('/', '').toUpperCase().toString().info + ' is not a Facebook User.\n'.error);
		process.exit(1);
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
			console.log('\n', argv.u.replace('/', '').toUpperCase().toString().info + '\'s Facebook ID is '.info + arrMatches[0].replace('entity_id":"', '').toString().normal, '\n');
		} else {
			/* do nothing */
		}
	});
});
req.end();

