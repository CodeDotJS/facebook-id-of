const test = require('ava');
const childProcess = require('child_process');

test.cb('help', t => {
	const cp = childProcess.spawn('./cli.js');
	cp.on('error', t.ifError);
	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});

test.cb('exists', t => {
	const cp = childProcess.spawn('./cli.js', ['RishiDotJS']);
	cp.on('error', t.ifError);
	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});

test.cb('does-not-exists', t => {
	const cp = childProcess.spawn('./cli.js', ['_not_a_user_']);
	cp.on('error', t.ifError);
	cp.on('close', code => {
		t.is(code, 1);
		t.end();
	});
});
