import childProcess from 'child_process';
import test from 'ava';

test.cb('main', t => {
	const cp = childProcess.spawn('./cli.js', {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 1);
		t.end();
	});
});

test.cb('UserID', t => {
	childProcess.execFile('./cli.js', ['RishiDotJS'], {
		cwd: __dirname
	}, (err, stdout) => {
		t.ifError(err);
		t.true(stdout === '\u001b[?25l\n› Fetching UserID. Please wait!\n\u001b[?25l\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\u001b[1A\u001b[1000D\u001b[K\n› Facebook ID of RishiDotJS is 100009171406504\n\n\u001b[?25h');
		t.end();
	});
});
