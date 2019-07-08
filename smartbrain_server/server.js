const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const pgdb = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'breezelv',
    password : '',
    database : 'smart-brain'
  }
});

//test db connection
// console.log(pgdb.select('*').from('users'));

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
	var errorCode = 0; //0 for no error; 1 for Register Error

	if(name&&email&&password&&email.includes('@')) {

		let newUser = {
			name: name,
			email: email,
			entries: 0,
			joined: new Date()
		};

		pgdb('users')
	  	.returning('*')
	  	.insert(newUser)
	  	.then(console.log)
	  	.catch(err=>{errorCode=1;});
	  	if(errorCode) {res.status(400).json("Unable to Register");return;}

		bcrypt.hash(password, saltRounds, function(err, hash) {
			if(err) {
				console.log(err);
				res.status(500).json("Unable to Hash PSW");
				return;
			}
			
			let newLogin = {
				email: email,
				hash: hash
			};

		  	pgdb('login')
		  	.returning('*')
		  	.insert(newLogin)
		  	.then(console.log)
		  	.catch(err=>{errorCode=1;});

		  	if(errorCode) {
		  		pgdb('users')
				.where('email', email)
				.del()
		  		res.status(400).json("Unable to Register");
		  		return;
		  	}
			else res.json(newUser);
		});
	}
	else res.status(400).json("Invalid registration form");
});

//Route Profile
app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  if(Number.isInteger(Number(id)) && id >= 0) {
  	pgdb('users').select('*').where({id:id})
  	.then(user=>{
  		if(user.length==0) res.status(400).json("User doesn't exist");
  		else res.json(user[0]);
  	}).catch(err=>{res.status(400).json("error getting user");});
  }
  else res.status(400).json("invalid user id");
});

//Route Image
app.put('/image', (req, res) => {
	const {id} = req.body;
	pgdb('users').where('id','=',id).increment('entries',1)
	.returning('entries')
	.then(entries=>{
		if(entries.length==0) res.status(400).json("User doesn't exist");
  		else res.json(entries[0]);
	})
	.catch(err=>{res.status(400).json("Unable to get entries");});
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