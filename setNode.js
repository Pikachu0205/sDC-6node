//
//node setNode.js t 11 2500 3750 5000 5 300000 0 0	//測量處理時間
//node setNode.js t 11 2500 3750 5000 5 300000 agg tp toget 0 0
//node setNode.js 2500 3750 5 300000 to toget max nAdv 0

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

//num_member = parseInt(args[2]);
num_member = 6;
TOs1 = parseInt(args[2]);
TOs2 = parseInt(args[3]);
dataSize = parseInt(args[4]);	//用來選擇不同大小的buffer
testTime = parseInt(args[5]);	//實驗要跑多久
testType = args[6];	//to : 測TO	tp : 測throught put	all : 兩個都測		用於postProcess myDeliver myRecord
newHeightTogether = args[7];	//toget	ntoget		用於postProcess、timeOut
//TimeRate = parseFloat(args[8]);
whichDiff = args[8];		//max	mean	95%	- Adv才有用
Advanced = args[9];	//不同DC設不同的TO	nAdv:沒有	Adv:有
ID = parseInt(args[10]);

global.mgdb



//=====main=====		t 5f+1, m 3f+1
node();



function node(){	
	console.log(args);
	var rfReady=0, rfpReady = 0; dbReady=0, awsReady=0;
	
	fault = (num_member-1)/5;
	coefficient = 4;
	threshold = coefficient * fault + 1;
	//threshold = 1;
	
	port = 3000;
	app.listen(port);
	
	
	
	var readfile = 'key&url-6node-sameDC.txt'
	
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
	
	
}
