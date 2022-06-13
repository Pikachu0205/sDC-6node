//
//node setNode.js t 11 2500 3750 5000 5 300000 0 0	//測量處理時間
//node setNode.js t 11 2500 3750 5000 5 300000 agg tp toget 0 0
//
//

express = require('express');
app = express();
app.use(express.json());

MongoClient = require('mongodb').MongoClient;

fs = require('fs');
args = process.argv;
myDeliver = require("./myDeliver.js");
myRecord = require("./myRecord.js");
sizeName = ["8MB", "4MB", "2MB", "1MB", "512KB", "256KB"];

height=0, round=0, fault=0, coefficient = 0, leader=0, aggregate=0;
ipList = [], publicKeyList = [], witnessList = [], awsUrlList = [], awsUrl = 'abc';
TO1 = 0, TO2 = 0, TimeRate = 1.1, threshold = 0;


ID = parseInt(args[13]);
mode = args[2];	//t : two step	m : msig
num_member = parseInt(args[3]);
TOs1 = parseInt(args[4]);
TOs2 = parseInt(args[5]);
dataSize = parseInt(args[6]);	//用來選擇不同大小的buffer
testTime = parseInt(args[7]);	//實驗要跑多久
testType = args[8];	//to : 測TO	tp : 測throught put	all : 兩個都測	
newHeightTogether = args[9];	//toget	ntoget
Advanced = parseInt(args[12]);	//不同DC設不同的TO
TimeRate = parseFloat(args[10]);
diff = parseInt(args[11]);




global.mgdb


//=====main=====		t 5f+1, m 3f+1
node();



function node(){	
	console.log(args);
	var rfReady=0, rfpReady = 0; dbReady=0, awsReady=0;
	
	if(mode == "t"){
		fault = (num_member-1)/5;
		coefficient = 4;
		threshold = coefficient * fault + 1;
		//console.log("fault : " + fault);
		//console.log("coefficient : " + coefficient);
		//console.log("threshold : " + threshold);
		//threshold = coefficient * fault;
	}
	if(mode == "m"){
		fault = (num_member-1)/3;
		coefficient = 2;
		threshold = coefficient * fault + 1;
		//threshold = coefficient * fault;
	}
	
	port = 3000;
	app.listen(port);
	
	
	
	if(num_member == 6)
		var readfile = 'traKey.txt'
	else if(num_member == 11)
		var readfile = 'key&url-11node.txt'
	
	fs.readFile(readfile, function(err, data) {
		if (err) return console.log(err);
		
		readfile = data.toString().split('\n');
		
		for(var i=0; i < num_member; i++)
			ipList[i] = readfile[i].replace(/[\r\n]/g,"");
		console.log(ipList[ID]);
		
		privateKey = ec.keyFromPrivate( readfile[2*num_member + ID].replace(/[\r\n]/g,"") );
		
		for(var i=0; i < num_member; i++)
			publicKeyList[i] = readfile[num_member + i].replace(/[\r\n]/g,"");
				
		myDeliver.ReadyDeliver(ID, 0);	//0為編號為0的節點也為預備.1為開始
		myRecord.endRecordTime_Of();
		
	});
	
	
	/*
	MongoClient.connect("mongodb://localhost:27017/YourDB", {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {
		if (err) return console.log(err);
		
		db = client.db(port.toString());
		db.createCollection('collection', function (err, collection){
			
			mgdb = collection;
			
			fs.readFile('key&url.txt', function(err, data) {
				if (err) return console.log(err);
				
				readfile = data.toString().split('\n');
				
				
				for(i=0; i < num_member; i++)
					//awsUrlList[i] = readfile[i].replace(/[\r\n]/g,"");
					ipList[i] = readfile[i].replace(/[\r\n]/g,"");
				
				privateKey = ec.keyFromPrivate( readfile[num_member + 100 + ID].replace(/[\r\n]/g,"") );
				
				for(i=0; i < num_member; i++)
					publicKeyList[i] = readfile[num_num_member + i].replace(/[\r\n]/g,"");
				
				myDeliver.ReadyDeliver(ID, 0);
				myRecord.endRecordTime_Of();
				
			});
			
		});
		
	});
	*/
	
}
