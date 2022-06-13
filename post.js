app.post('/SynReq', function(req, res){	
	if(postProcess.customVerify(req.body, 0)){
		console.log(" height : ", req.body.height, " round", req.body.round, " sender", req.body.sender);
		
		/*
		mgdb.find({
			
			height:{
				"$gte": req.body.height,
				"$lt": req.body.reqH
			}
		
		}).toArray(function(err,items){
			if(err) throw err;
			//myDeliver.SynResDeliver(height, round, ID, req.body.sender, req.body.reqH, items, VDF);
			myDeliver.SynResDeliver(height, round, ID, req.body.sender, req.body.reqH, items);
		});
		*/
		myDeliver.SynResDeliver(req.body.sender, req.body.reqH);
		
	}
	
	res.end();
});


app.post('/SynRes', function(req, res) {
	if(postProcess.customVerify(req.body, 0)){
		console.log(" height : ", req.body.height, " round", req.body.round, " sender", req.body.sender);
		
		/*
		for(var j in req.body.items){
					
			verifyblock = {
				height: req.body.items[j].height,
				maker: req.body.items[j].maker,
				blockHash: req.body.items[j].blockHash,
				signature: req.body.items[j].signature
			}
				
			if(saveblock.indexOf(req.body.items[j].height) == -1){
				saveblock.push(req.body.items[j].height);
				lastBlockHash = req.body.items[j].blockHash;
				//console.log("~~~~~Commit the syn block~~~~~");
				//mgdb.insertOne(verifyblock);
			}
				
		}
		*/
			
		//synH用來確定這個回傳的h比我高.有時我可能先收到更高的
		if(synH < req.body.synHeight){
			synH = req.body.synHeight;
			//height = req.body.synHeight-1;
			
			aheadBlock = req.body;
			
			//synround為要同步到的回合 因為要從height去同步所以-1
			//var synround = req.body.round-1;
			
			if(height <  req.body.synHeight){
				height = req.body.synHeight-1;
				myMain.newHeight();
			}
			
		}
		
		//}
		
	}
	
	res.end();
});
