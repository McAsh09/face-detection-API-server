const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors());


const Database = {
	user:[
	{
		id:"123",
		name:"jatin",
		email:"jatin@gmail.com",
		password:"00",
		entries: 0,
		joined: new Date()
	},
	{
		id:'124',
		name:"jonny",
		email:"jonny@gmail.com",
		password:"password",
		entries: 0,
		joined: new Date()
	}
	]
}


app.get('/',(req,res)=>{
	res.send(Database.user);
})


app.post('/signin',(req,res)=>{
	if(req.body.email===Database.user[0].email&&
		req.body.password===Database.user[0].password){
		res.json(Database.user[0]);
	}else{
		res.status(404).json('failed');
	}
})


app.post('/register',(req,res)=>{
	const {email,name,password} = req.body;
	Database.user.push({
		name:name,
		email:email,
		password:password,
		entries: 0,
		joined: new Date()
	})
	res.send(Database.user[Database.user.length - 1]);
})


app.get('/profile/:id',(req,res)=>{
	const {id} = req.params;
	let flag = false;
	Database.user.forEach(user =>{
		if(id===user.id){
			flag = true;
			return res.son(user);
		}
	})
	if(!flag){
		res.status(404).send("Not Found");
	}
})


app.put('/image',(req,res)=>{
	const {id} = req.body;
	let flag = false;
	Database.user.forEach(user =>{
		if(id===user.id){
			flag = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if(!flag){
		res.status(404).send("Not Found");
	}
})


app.listen(3030,()=>{
	console.log('working!!');
})


