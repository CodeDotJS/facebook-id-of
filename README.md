# facebook-id-of

Easily find user ID of any Facebook user

<a href="https://travis-ci.org/CodeDotJS/facebook-id-of">
	<img src="https://travis-ci.org/CodeDotJS/facebook-id-of.svg?branch=master">
</a>

## Getting started

### CLI usage

```
$ [sudo] npm install --global facebook-id-of
```

```
$ facebook-id-of
Usage: facebook-id-of <username>
```

### Programmatically

```
$ npm install --save facebook-id-of
```

```javascript
const facebookIdOf = require('facebook-id-of');

// using callback
facebookIdOf('an_user', function (err, facebookId) {
  if (err) return console.error(err);
  console.log(facebookId);
});

// using promise
facebookIdOf('an_user')
  .then((facebookId) => {
    console.log(facebookId);
  })
  .catch((err) => {
    console.error(err);
  });

// using async/await
async function () {
  try {
	  const facebookId = await facebookIdOf('an_user');
	  console.log(facebookId);
  } catch (err) {
	  console.error(err);
  }
}
```

## License

MIT © [Rishi Giri](http://rishigiri.com)
