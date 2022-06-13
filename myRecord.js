//require("./exForAgg.js");

handle_TO1 =0, handle_TO2 =0, handle_TO3 =0, handle_TO4 = 0
TO1_Buffer = [], TO2_Buffer = [], TO3_Buffer = [], TO4_Buffer = []

traBlock1 = [], traBlock2 = [], traBlock3 = [], traBlock4 = [], traBlock5 = [], traBlock6 = []
traBlock7 = [], traBlock8 = [], traBlock9 = [], traBlock10 = [], traBlock11 = []
traVote1 = [], traVote2 = [], traVote3 = [], traVote4 = [], traVote5 = [], traVote6 = []
traVote7 = [], traVote8 = [], traVote9 = [], traVote10 = [], traVote11 = []

Handle1_Buffer = []
Handle2_Buffer = []
Handle3_Buffer = []	//收到足夠的票所需時間
Handle4_Buffer = []
DataSize1 = []
DataSize2 = []
DataSize3 = []
result = []


nonAgg_tran_Buffer1 = []
nonAgg_tran_Buffer2 = []
nonAgg_handle_Buffer1 = []
nonAgg_handle_Buffer2 = []
nonAgg_handle_Buffer3 = []

var sum = function(x,y){ 	return x + y;	};　　//求和函数
var square = function(x){	 return x * x;	};　　//数组中每个元素求它的平方

fileName = "timeout_" + args[8] + ".txt";
size = [8, 4, 2, 1, 0.5, 0.25];



function endRecordTime_Of(){		//在setNode實驗結束後輸出每階段耗時和效能
	
	setTimeout(function(){
		
		if(testType == "to" || testType == "all"){
			
			/*
			console.log("TO1_Buffer : " + TO1_Buffer);
			console.log("TO2_Buffer : " + TO2_Buffer);
			
			console.log("Handle1_Buffer : " + Handle1_Buffer);
			console.log("Handle2_Buffer : " + Handle2_Buffer);
			console.log("nonAgg_handle_Buffer3 : " + nonAgg_handle_Buffer3);
			
			*/
			
			/*
				
			stddevMean(TO1_Buffer);
			stddevMean(TO2_Buffer);
			
			stddevMean(Handle1_Buffer);
			stddevMean(Handle2_Buffer);
			
			stddevMean(nonAgg_handle_Buffer3);
			*/
			
			/*
			console.log("traBlock1 : " + traBlock1);
			console.log("traBlock2 : " + traBlock2);
			console.log("traBlock3 : " + traBlock3);
			console.log("traBlock4 : " + traBlock4);
			console.log("traBlock5 : " + traBlock5);
			console.log("traBlock6 : " + traBlock6);
			console.log("traBlock7 : " + traBlock7);
			console.log("traBlock8 : " + traBlock8);
			console.log("traBlock9 : " + traBlock9);
			console.log("traBlock10 : " + traBlock10);
			console.log("traBlock11 : " + traBlock11);
			console.log("traVote1 : " + traVote1);
			console.log("traVote2 : " + traVote2);
			console.log("traVote3 : " + traVote3);
			console.log("traVote4 : " + traVote4);
			console.log("traVote5 : " + traVote5);
			console.log("traVote6 : " + traVote6);
			console.log("traVote7 : " + traVote7);
			console.log("traVote8 : " + traVote8);
			console.log("traVote9 : " + traVote9);
			console.log("traVote10 : " + traVote10);
			console.log("traVote11 : " + traVote11);
			*/
			
			console.log("[" + traBlock1 + "],");
			console.log("[" + traBlock2 + "],");
			console.log("[" + traBlock3 + "],");
			console.log("[" + traBlock4 + "],");
			console.log("[" + traBlock5 + "],");
			console.log("[" + traBlock6 + "]");
			//console.log("[" + traBlock7 + "]");
			//console.log("[" + traBlock8 + "]");
			//console.log("[" + traBlock9 + "]");
			//console.log("[" + traBlock10 + "]");
			//console.log("[" + traBlock11 + "]");
			console.log();
			console.log("[" + traVote1 + "],");
			console.log("[" + traVote2 + "],");
			console.log("[" + traVote3 + "],");
			console.log("[" + traVote4 + "],");
			console.log("[" + traVote5 + "],");
			console.log("[" + traVote6 + "]");
			//console.log("[" + traVote7 + "]");
			//console.log("[" + traVote8 + "]");
			//console.log("[" + traVote9 + "]");
			//console.log("[" + traVote10 + "]");
			//console.log("[" + traVote11 + "]");
			
			
			console.log("result : " + result);
		}
		
		if(testType == "tp" || testType == "all"){
			
			console.log("height : " + height);
			console.log("size[dataSize] : " + size[dataSize]);
			console.log("testTime: " + testTime);
			
			var throughput = (height * size[dataSize] / (testTime / 1000) ).toFixed(3);
			console.log("==========00000==========");
			console.log();
			console.log();
			console.log("throughput : " + throughput);
			console.log();
			console.log();
			console.log("==========00000==========");
			
			/*
			//寫檔的部分
			var write = TOs1 + "\t" + TOs2 + "\t" + TOs3 + "\t" + height + "\t\t" + throughput + "\t" + sizeName[dataSize] + "\n";
			var write2 = throughput + ", ";
		
			fs.appendFile('throughput.txt', write, function (err) {	if(err)	console.log(err);	})
			
			fs.appendFile('throughput2.txt', write2, function (err) {	if(err)	console.log(err);	})
			*/
		}
		
		
		/*
		var write1 = stddev1.toFixed(3) + ",";
		var write2 = stddev2.toFixed(3) + ",";
		var write3 = stddev3.toFixed(3) + ",";
		var write4 = stddev4.toFixed(3) + ",";
		
		
		fs.appendFile(fileName, write, function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO1.txt", write1, function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO2.txt", write2, function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO3.txt", write3, function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO4.txt", write4, function (err) {	if(err)	console.log(err);	})
			
		fs.appendFile("TO1_dot.txt", TO1_Buffer + "\n", function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO2_dot.txt", TO2_Buffer + "\n", function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO3_dot.txt", TO3_Buffer + "\n", function (err) {	if(err)	console.log(err);	})
		fs.appendFile("TO4_dot.txt", TO4_Buffer + "\n", function (err) {	if(err)	console.log(err);	})
		*/
	
		//fs.appendFile("TO1_DS.txt", DataSize1 + "\n", function (err) {	if(err)	console.log(err);	})
		//fs.appendFile("TO2_DS.txt", DataSize2 + "\n", function (err) {	if(err)	console.log(err);	})
		//fs.appendFile("TO3_DS.txt", DataSize3 + "\n", function (err) {	if(err)	console.log(err);	})
		
		
		
		
		
	},testTime);
	
}


function stddevMean(TObuffer){
	//console.log("TObuffer : " + TObuffer);
	
	var total = TObuffer.reduce(sum);
	var mean = ( parseFloat(total) / TObuffer.length ).toFixed(2);
	
	
	var deviations = TObuffer.map(function(x){return parseFloat(x) - mean;});
	var stddev = ( Math.sqrt(deviations.map(square).reduce(sum)/(TObuffer.length-1)) ).toFixed(2);
	
	
	result.push(mean);
	result.push(stddev);
	
	
	//console.log("平均值：" + mean);
	//console.log("偏差：" + deviations.toFixed(3));
	//console.log("标准差：" + stddev);
	
	//return stddev;
	/*
	//var sum = TObuffer.reduce(function (a, b) {	return a + b;	}, 0);
	*/
}



function recordTime_Of_TO1(start_TO1, sender){		//S8-5.js	/Block
	//handle_TO2 = new Date().getTime();
	var end_TO1 = new Date().getTime();
	
	switch(sender){
		case 0 : 
			traBlock1.push(end_TO1 - start_TO1)
			break;
			
		case 1 : 
			traBlock2.push(end_TO1 - start_TO1)
			break;
			
		case 2 : 
			traBlock3.push(end_TO1 - start_TO1)
			break;
			
		case 3 : 
			traBlock4.push(end_TO1 - start_TO1)
			break;
			
		case 4 : 
			traBlock5.push(end_TO1 - start_TO1)
			break;
			
		case 5 : 
			traBlock6.push(end_TO1 - start_TO1)
			break;
	}
	
	if(num_member == 11){
		switch(sender){
			case 6 : 
				traBlock7.push(end_TO1 - start_TO1)
				break;
			
			case 7 : 
				traBlock8.push(end_TO1 - start_TO1)
				break;
			
			case 8 : 
				traBlock9.push(end_TO1 - start_TO1)
				break;
			
			case 9 : 
				traBlock10.push(end_TO1 - start_TO1)
				break;
			
			case 10 : 
				traBlock11.push(end_TO1 - start_TO1)
				break;
		}
	}
	
	TO1_Buffer.push(end_TO1 - start_TO1);
}


function recordTime_Of_TO2(start_TO2, sender){		//S8-5.js	/Vote
	//handle_TO3 = new Date().getTime();
	var end_TO2 = new Date().getTime();
	
	switch(sender){
		case 0 : 
			traVote1.push(end_TO2 - start_TO2)
			break;
			
		case 1 : 
			traVote2.push(end_TO2 - start_TO2)
			break;
			
		case 2 : 
			traVote3.push(end_TO2 - start_TO2)
			break;
			
		case 3 : 
			traVote4.push(end_TO2 - start_TO2)
			break;
			
		case 4 : 
			traVote5.push(end_TO2 - start_TO2)
			break;
			
		case 5 : 
			traVote6.push(end_TO2 - start_TO2)
			break;
	}
	
	if(num_member == 11){
		switch(sender){
			case 6 : 
				traVote7.push(end_TO2 - start_TO2)
				break;
				
			case 7 : 
				traVote8.push(end_TO2 - start_TO2)
				break;
				
			case 8 : 
				traVote9.push(end_TO2 - start_TO2)
				break;
				
			case 9 : 
				traVote10.push(end_TO2 - start_TO2)
				break;
				
			case 10 : 
				traVote11.push(end_TO2 - start_TO2)
				break;
		}
	}
	
	TO2_Buffer.push(end_TO2 - start_TO2);
}


function recordTime_Of_TO3(start_TO3){		//S8-5.js	/fromAggregateVote
	//handle_TO4 = new Date().getTime();
	var end_TO3 = new Date().getTime();
	
	TO3_Buffer.push(end_TO3 - start_TO3);
}


function recordTime_Of_TO4(){
	var end_TO4 = new Date().getTime();
	
	TO4_Buffer.push(end_TO4 - start_TO4);
}


module.exports = {
	endRecordTime_Of,
	recordTime_Of_TO1,
	recordTime_Of_TO2,
	recordTime_Of_TO3,
	recordTime_Of_TO4
	//recordTime_Of_Height
}




/*
function recordTime_Of_Height(){
	endTime = new Date().getTime();
		
	heightTime = endTime - nowTime;
	
	var write = height + "," + heightTime + "\n";
	fs.appendFile('time_height.txt', write, function (err) {	if(err)	console.log(err);	})
		
	var write2 = heightTime + ", ";
	fs.appendFile('time_height2.txt', write2, function (err) {	if(err)	console.log(err);	})
	
	nowTime = new Date().getTime();
}
*/



		//console.log("TO1_Stddev : " + stddev1);
		//console.log("TO2_Stddev : " + stddev2);
		//console.log("TO3_Stddev : " + stddev3);
		//stddev4 = stddevMean(TO4_Buffer);
		
		/*
		console.log("TO1_Buffer : " + TO1_Buffer + "\nTO2_Buffer : " + TO2_Buffer + "\nTO3_Buffer : " + TO3_Buffer + "\nTO4_Buffer : " + TO4_Buffer);
		console.log("stddev1 : " + stddev1);		console.log("stddev2 : " + stddev2);		console.log("stddev3 : " + stddev3);		console.log("stddev4 : " + stddev4);
		*/
		/*
		var write = 
			"TO1 : " + stddev1[0] + "\t\t" + stddev1[1] + "\t\t" + stddev1[2] + "\t\t" + stddev1[3] + "\t\t" + stddev1[4] + 
			"\nTO2 : " + stddev2[0] + "\t\t" + stddev2[1] + "\t\t" + stddev2[2] + "\t\t" + stddev2[3] + "\t\t" + stddev2[4] + 
			"\nTO3 : " + stddev3[0] + "\t\t" + stddev3[1] + "\t\t" + stddev3[2] + "\t\t" + stddev3[3] + "\t\t" + stddev3[4] + 
			"\nTO4 : " + stddev4[0] + "\t\t" + stddev4[1] + "\t\t" + stddev4[2]	+ "\t\t" + stddev4[3] + "\t\t" + stddev4[4] + 
			"\nthroughput : " + height + "\t\t" + (height*size[dataSize] / (testTime / 1000) ).toFixed(5);
		*/
		/*
		var write = 
			"TO1 : " + stddev1.toFixed(3) + 
			"\nTO2 : " + stddev2.toFixed(3) + 
			"\nTO3 : " + stddev3.toFixed(3) + 
			//"\nTO4 : " + stddev4.toFixed(3) + 
			"\nthroughput : " + height + "\t\t" + (height*size[dataSize] / (testTime / 1000) ).toFixed(5) + "\n";
		*/