//node testTraVote.js 6 0 0

fs = require('fs');
args = process.argv;

express = require('express');
app = express();
app.use(express.json());

axios = require('axios');

crypto = require('crypto');
EC = require('elliptic').ec;
ec = new EC('secp256k1');


ID = parseInt(args[4]);
member = parseInt(args[2]);
leader = parseInt(args[3]);

ipList = [], publicKeyList = [], VoteTO_Buffer = [];


go();


function go(){
	
	setShowTime();
	
	fs.readFile('traKey.txt', function(err, data) {
		if (err) return console.log(err);
		
		readfile = data.toString().split('\n');
		
		for(var i=0; i < member; i++)
			ipList[i] = readfile[i].replace(/[\r\n]/g,"");
		
		console.log(ipList);
		
		
		privateKey = ec.keyFromPrivate( readfile[2*member + ID].replace(/[\r\n]/g,"") );
		
		for(var i=0; i < member; i++)
			publicKeyList[i] = readfile[member + i].replace(/[\r\n]/g,"");
		
		
		port = 3000;
		app.listen(port);
		
		
		var data = {	type: "Block",	sender: ID}
		data = signature(data);
		blockBody = {	messageHash: data.messageHash,	signature: data.signature	}
		
		
		ReadyDeliver(ID, leader);	//0為編號為0的節點也為預備.1為開始
		console.log("GO");
	
	});
	
}




app.post('/Ready', function(req, res) {		
	
	VoteDeliver(req.body.sender);
	
	res.end();
});



app.post('/Vote', function(req, res) {
	
	var endVoteTO = new Date().getTime();
	
	VoteTO_Buffer.push(endVoteTO - req.body.voteTO);
	
	ReadyDeliver(ID, leader);
	
	res.end();
});



function VoteDeliver(receiver){
	
	var data = {	type: "Vote",	sender: ID,	vote : blockBody	}
	
	data = signature(data);
	data.voteTO = new Date().getTime();
	
	mesDeliver(receiver, data);
}



function mesDeliver(receiver, data){
	
	axios({
		method: 'post',
		//url: 'http://' + ipList[receiver].concat("/" + data.type),
		url: 'http://' + ipList[receiver].concat(":3000/" + data.type),
		data: data
	}).then(function(res){/*console.log(res);*/}).catch(function(err){/*console.log(err);*/});
	
}

function ReadyDeliver(ID, leader){
	
	var data = {	type: "Ready",	sender: ID	}
	
	data = signature(data);
	
	//console.log("送ready給leader");
	mesDeliver(leader, data);
	
}

function signature(data){
	
	const messageHash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
	const signature = privateKey.sign(messageHash, 'base64').toDER('hex');
	
	data.messageHash = messageHash;
	data.signature = signature;
	
	return data;
}

function setShowTime(){
	
	setTimeout(function(){	console.log("VoteTO_Buffer : " + VoteTO_Buffer);	},600000);
	
}