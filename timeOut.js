function timeOutStart(){
	
	t1 = setTimeout(function(){
		
		if(!blockBody && (ID != leader))	//我沒收到block也不是leader
			myDeliver.TimeOutVoteDeliver(height, round, ID);
			
	},TO1);
	
	
	if(newHeightTogether == "toget"){
		t2 = setTimeout(function(){
			
			if(commitBlock != null)	//一起進入下一height的模式中共識有成功
				myMain.newHeight();
				
			else	//不管有沒有要一起進入下一height的模式中.共識都沒有成功
				myMain.newRound(1);		//1為沒有在timeout內完成
				
		},TO2);
	}
	
	if(newHeightTogether == "ntoget")
		t2 = setTimeout(function(){	myMain.newRound(1);	},TO2);
		
	
	
}


function timeOutStop(){
	clearTimeout(t1);
	clearTimeout(t2);
	
	if(newHeightTogether == "ntoget")
		clearTimeout(t3);
}


function resetTimeOut(timeout, synround){
	/*
	if(synround > 1){
		TO1 = TOs1 * Math.pow(TimeRate, synround);
		TO2 = TOs2 * Math.pow(TimeRate, synround);
		TO3 = TOs3 * Math.pow(TimeRate, synround);
		round = synround;
	}
	*/
	
	if(timeout == 1 && (round / 6) > 1){		//先寫個間單板
		TO1 = TO1 * TimeRate;
		TO2 = TO2 * TimeRate;
		TO3 = TO3 * TimeRate;
	}
}


module.exports = {
	timeOutStart,
	timeOutStop,
	resetTimeOut
}