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

//Route Profile
app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  if(Number.isInteger(Number(id)) && id <= database.users.length && id > 0) {
  	res.json(database.users[id-1]);
  }
  else res.status(400).json("invalid user id");
});

//Route Image
app.post('/image', (req, res) => {
	const {id} = req.body;
	let found = false;
	database.users.forEach( user => {
		if(user.id === id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if(!found) res.status(400).json("invalid user id");
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