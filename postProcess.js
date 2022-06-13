function getBlock(block){
	receiveBlock = 1;
	/*
	blockBody = {
		height: block.height,
		maker: block.maker,
		blockHash: block.blockHash,
		signature: block.signature
	}
	*/
	
	blockBody = block.blockHash;
	
	if(!isVoteLock)
		myDeliver.VoteDeliver(height, round);
		
		
}


function isCommit(voteCollection){		//data = voteCollection[]		在S8-5./Vote
	
	//console.log("voteCollection");
	//console.log(voteCollection);
	
	if( commitBlock == null  ){
		commitBlock = legalVote(voteCollection, height, round);
		
		console.log("commitBlock : " + commitBlock);
		
		if(commitBlock != null){
			
			//console.log("insert", commitBlock, "to DB");
			saveblock.push(height);	//紀錄已經commit了這個height的block
			//mgdb.insertOne(commitBlock);
			
			lastBlockHash = commitBlock.blockHash;
			
			
			
			//另一個 要改/進入下一height或round 的地方在timeOut.js的timeOutStart的t3
			if(testType == "to" || testType == "all"){
				
				var endVote_TO = new Date().getTime();		//S8-5的post('/Vote')開始
				nonAgg_handle_Buffer3.push(endVote_TO - handle_TO3);
				
				var nowTime = new Date().getTime();
				console.log("commit好了  " + nowTime%1000000);
				
				if(testType == "to")		//準備測下一次的TO
					myDeliver.ReadyDeliver(ID, 0);	//0為編號為0的節點也為預備.1為開始
				
			}
			else if(newHeightTogether == "ntoget"){		//測效率 中 好了就先進入下回合
				
				console.log("commit好了  " + nowTime%1000000);
				myMain.newHeight();	//1為沒有在timeout內完成
				
			}
			
			
		}
		
	}
	
	
	
	//var endHandle_TO4 = new Date().getTime();
	//Handle4_Buffer.push(endHandle_TO4 - handle_TO4);
	
	
	//		=====測timeout的=====		//	另一個要改的地方在timeOut.js之timeOutStart
	//myDeliver.ReadyDeliver(ID, 0);
	
}


function legalVote(lockset, height, round){	//找出大於cf+1張合法票的人
	var memls = [], block = [], obj={}, max=0, ahead=0;
	
	for(var i in lockset)	//論文寫說4f+1投給同一個值.目前沒寫判斷是否同一個
	
		if(memls[lockset[i].sender] == null )		//檢查這個人的票是不是有被計算過
			
			if(lockset[i].vote != null &&  lockset[i].height == height  &&  lockset[i].round == round){
				
				//console.log("lockset[ " + lockset[i].sender + " ].vote : ");
				//console.log(lockset[i].vote);
				block.push(lockset[i].vote);
				memls[lockset[i].sender] = 1;	//每人的票只被計算一次.且只計算這回合的
			
			}
	
	
	for(var i in block){  	//找出最多人投的候選人
	
		var key = block[i]; 
		
		(obj[key]) ? obj[key]++ : obj[key] = 1;
		
		if(obj[key] > max){
			max =  obj[key];
			ahead = key;
			ahead2 = i;
		}
		
		//console.log("幾張票 : " + obj[ahead]);
		
		//console.log("obj : " + obj[key]);
		
		if(obj[ahead] >= coefficient * fault + 1){
			
			//console.log("達到門檻");
			//console.log("block[ahead2] : ");
			//console.log(block[ahead2]);
			
			return block[ahead2]
			
			/*
			for(var i in block){
				console.log("lockset[i].vote : " + lockset[i].vote);
				if(block[ahead2] == lockset[i].vote)
					return lockset[i];
			}
			*/
		
		}
		
	}
	
	return null;
}


function customVerify(message, type){
	
	if(type == 0)
		publicKey = ec.keyFromPublic(publicKeyList[message.sender], 'hex');
	
	if(type == 1)
		publicKey = ec.keyFromPublic(publicKeyList[message.maker], 'hex');
	
	return publicKey.verify(message.blockHash, message.signature);
}

//找出兩個陣列不同的值
function getArrDifference(arr1, arr2){	//用在msig.S8-5/Witness

    return arr1.concat(arr2).filter(function(v, i, arr) {

        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
	
}





module.exports = {
	customVerify,
	isCommit,
	legalVote,
	getBlock,
	getArrDifference
}