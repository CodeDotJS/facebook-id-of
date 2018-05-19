'use strict';

const https = require('https');

const rePattern = new RegExp(/entity_id":"(\d*)"/);

function facebookIdOfPromise(username) {
	const options = {
		hostname: 'www.facebook.com',
		port: 443,
		path: `/${username}`,
		method: 'GET',
		headers: {
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36',
			'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6'
		}
	};

	return new Promise((resolve, reject) => {
		const request = https.request(options, response => {
			let body = '';
			response.setEncoding('utf8');

			response.on('data', chunk => {
				body += chunk;
			});
			response.on('end', () => {
				const arrMatches = body.match(rePattern);
				if (arrMatches && arrMatches.length > 1) {
					resolve(arrMatches[1]);
				} else {
					reject(new Error('Facebook user not found'));
				}
			});
		});
		request.on('error', err => reject(err));
		request.end();
	});
}

function facebookIdOfCallback(username, callback) {
	facebookIdOfPromise(username)
		.then(id => callback(null, id))
		.catch(err => callback(err));
}

function facebookIdOf(username, callback) {
	if (callback) {
		return facebookIdOfCallback(username, callback);
	}
	return facebookIdOfPromise(username);
}

module.exports = facebookIdOf;
