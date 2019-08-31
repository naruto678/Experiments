#!/home/arnab/Node/bin/node
const express=require('express');
const mysql=require('mysql');
const path=require('path');
const fs=require('fs');
const parser=require('body-parser');
const session=require('express-session');
const logFile='/home/arnab/logFile'
const DOMParser=require('dom-parser');


const app=express();
const domParser=new DOMParser();


app.use(parser.urlencoded({extended: true}));
app.use(parser.json());


let con=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'naruto678@',
	socketPath:'/var/run/mysqld/mysqld.sock',
	database:'rent'

});


app.post('/login',function(req,res){
	console.log(req.body.emailAddress);
	res.setHeader("Set-cookie",Math.random);

	/*
	trying to do a sanity check;

	*/
	res.sendFile('/home/arnab/dashboard.html');



});
app.get('/dashboard',function(req,res){
	res.sendFile('/home/arnab/dashboard.html');
})

app.get('/',function(req,res){
	
	if(req.headers.cookie){
		return res.redirect('/dashboard');
	}

	res.sendFile('/home/arnab/login.html');

});


app.listen(3000,function(){
	console.log('Now listening to port 3000');
});
app.post('/post',function(req,res){
	
	let firstName=req.body.tenantName;
	let token=req.body.secretToken;
	let content=req.body.content;
	let amount=req.body.amount;
	let response={
		name:firstName,
		token:token,
		content:content,
		amount:amount
	}
	let result='';

	console.log(`${firstName} and his token ${token} and the content is ${content }`);
	
	con.query(`insert into RentTable values('${firstName}',${amount},'${content}',current_timestamp,0)`,function(err,res){
		if(err)thr
		console.log(res);
		result=res;
		
	});
	
	console.log(`This is the result ${result}`);
	

	res.send("your details have been entered successfully and waiting for approval by fellow tenants");

});

app.get('/requestsPending',function(request,response){
			/*
			This route will only receive ajax requests and then send the result Set back to the client*/
			con.query('select * from RentTable where approved=0',function(err,resultSet){
			if(err) throw err;
				let arr=[];
				resultSet.forEach((record)=>{
					
					arr.push(record);
				});
				console.log(JSON.stringify(arr));
				response.send(JSON.stringify(arr));
			
			});
	
	
});


