const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const database = {
	users: [
		{
			id: '1',
			name: 'Bernard',
			email: 'bernard@gmail.com',
			password: 'bernard666',
			entries: 0,
			joined: new Date()
		}
	]
};


app.use(bodyParser.json());


//Route Root
app.get('/', (req, res) => {
  res.send(database.users);
});

//Route Signin
app.post('/signin', (req, res) => {
	for(user of database.users) {
		if(req.body.email===user.email && req.body.password===user.password) {
			res.json('success');
			return;
		}
	}
	res.status(400).json("error logging in");
});

//Route Register
app.post('/register', (req, res) => {
	const {name, email, password} = req.body;
	if(name&&email&&password&&email.includes('@')) {
		database.users.push({
			id: database.users.length + 1,
			name: name,
			email: email,
			password: password,
			entries: 0,
			joined: new Date()
		});
		// res.json('success');
		res.json(database.users);
	}
	else res.status(400).json("invalid registration form");
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