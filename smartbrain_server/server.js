const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);



/*
	Big Picture of Services we gonna build

	url			method		res
	/			GET			static data
	/singin 	POST		success/fail
	/register	POST		user
	/profile/:userid GET	user
	/image		PUT			user
*/