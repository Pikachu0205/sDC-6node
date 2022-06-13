lastLockset = [], thisLockset = [];
blockBody=null, lastRoundBlock=null, lastRoundVote={};
isVoteLock = 0, synH = 0, transaction123 = '';
size = [8, 4, 2, 1, 0.5, 0.25, 0.125, 0.0625];
require("./S8-5.js");
require("./post.js");
require("./setNode.js");
msigDeliver = require("./msigDeliver.js");
msigProcedure = require("./msigProcedure.js");

fs = require('fs');



function firstBlock(){	//決定leader要送什麼block
	
	//看上一回合有沒有block是超過一定比例但沒有成功commit的
	if(round != 1 && lastLockset.length >= coefficient * fault + 1)
		lastRoundBlock = maxVotesBlock(lastLockset, 2, fault);
	
	myDeliver.BlockDeliver(height, round, ID);
	
}


function maxVotesBlock(lockset, c, fault){	//選出上回合最多人支持的block
	var result = {};
	var max = 0;
	var mark = null;
	
	lockset = lockset.sort();
	
	for(var i in lockset)	//看這張票是不是加到result裡面了
		(result[lockset[i]]) ? result[lockset[i]]++ : result[lockset[i]] = 1;
	
	for(var i in lockset){
		
		if(result[lockset[i]] > max){
			max = result[lockset[i]];
			mark = lockset[i];
		}
		
	}
	
	return (max >= c*fault+1) ? mark.vote : null;
}


function setLockset(){
	lastLockset.length = 0;
	
	for(var i = 0; i < thisLockset.length; i++){
		var c = thisLockset[i];
		lastLockset.push(c);
	}
	
	thisLockset.length = 0;
	if(round > 1)
		feedbackVote.length = 0;
}


module.exports = {
	firstBlock,
	maxVotesBlock,
	setLockset
}