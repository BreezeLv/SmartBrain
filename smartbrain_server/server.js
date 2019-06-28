const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const saltRounds = 10;
const database = {
	users: [
		{
			id: '1',
			name: 'Bernard',
			email: 'bernard@gmail.com',
			password: 'bernard666',
			hash: '$2b$10$r4maSHASKgEAMN2VsViuiePPif7QQYweZ0uIZffweCboOj4R63pKS',
			entries: 0,
			joined: new Date()
		}
	]
};


app.use(bodyParser.json());
app.use(cors());

//Route Root
app.get('/', (req, res) => {
  res.send(database.users);
});

//Route Signin
app.post('/signin', (req, res) => {
	const {email, password} = req.body;
	let flag = -1;

	for(i in database.users) {
		if(email===database.users[i].email) {flag = i;break;}
	}
	if(flag!==-1) {
		bcrypt.compare(password, database.users[i].hash, function(err, match) {
		    if(match) res.json(database.users[flag]);
		    else res.status(400).json("error logging in");
		});
	}
	else res.status(400).json("error logging in");
});

//Route Register
app.post('/register', (req, res) => {
	const {name, email, password} = req.body;

	if(name&&email&&password&&email.includes('@')) {
		bcrypt.hash(password, saltRounds, function(err, hash) {
			if(err) console.log(err);
			let newUser = {
				id: database.users.length + 1,
				name: name,
				email: email,
				password: password,
				hash: hash,
				entries: 0,
				joined: new Date()
			};
		  	database.users.push(newUser);
			// res.json('success');
			res.json(newUser);
		});
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