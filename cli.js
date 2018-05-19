#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const logUpdate = require('log-update');
const facebookIdOf = require('./facebook-id-of');

const arg = process.argv[2];

if (!arg || arg === '-h' || arg === '--help') {
	help();
}

loading();

facebookIdOf(arg)
	.then(success)
	.catch(error);

function help() {
	console.log(`${chalk.cyan('Usage:')} facebook-id-of <username>`);
	process.exit(0);
}

function loading() {
	if (process.stdout.isTTY) {
		logUpdate(`${chalk.cyan.bold('›')} Contacting Facebook ...`);
	}
}

function success(id) {
	if (process.stdout.isTTY) {
		logUpdate(
			`${chalk.green.bold('›')} ${chalk.dim('Facebook ID of')} ${arg}: ${id}`,
		);
	} else {
		console.log(id);
	}
	process.exit(0);
}

function error(err) {
	if (process.stdout.isTTY) {
		logUpdate(`${chalk.red.bold('›')} ${err}`);
	} else {
		console.log(err);
	}
	process.exit(1);
}
