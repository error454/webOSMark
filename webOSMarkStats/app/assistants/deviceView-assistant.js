function DeviceViewAssistant(argFromPusher) {
	key = argFromPusher;
}

DeviceViewAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		if(key == myDevice.nduid){
			this.$.header1.setLabel("Device View (This is you)");
		}
		this.$.webService1.setMethod("GET");
		this.$.webService1.setUrl("http://webosmark.appspot.com/rest/device?deviceID=" + key);
		this.controller.listen(document, 'orientationchange', this.handleOrientation.bindAsEventListener(this));
		this.$.webService1.execute();
		doneLoading = false;		
	},
	activate: function(){
		this.controller.stageController.setWindowOrientation("free");
	},
	handleOrientation: function(event) {
		/*http://developer.palm.com/index.php?option=com_content&view=article&id=1554
			Numeric value from 0 to 5:
			0 = face up
			1 = face down
			2 = up, or normal portrait
			3 = down, or reverse portrait
			4 = left, or landscape, left side down
			5 = right, or landscape, right side down
		*/
		if(doneLoading){
			if (event.position == 4 || event.position == 5){
				this.$.panelGraph.setShowing(true);
				this.$.panelText.setShowing(false);
			}
			else if(event.position == 2 || event.position == 3){
				this.$.panelText.setShowing(true);
				this.$.panelGraph.setShowing(false);
			}
		}
	},
	cleanup: function() {
		Ares.cleanupSceneAssistant(this);
	},
	webService1Success: function(inSender, inResponse, inRequest) {
		//Stuff list
		var d1 = [];
		d1.push([0,0]);
		var scores = [];
		for(var i = 0; i < inResponse.length; i++){
			d1.push([i+1, inResponse[i].score]);
			scores.push(inResponse[i].score);
			this.controller.get('listScores').mojo.noticeAddedItems(i, 
				[
					{
						label: "Run " + (i+1) + ": " + inResponse[i].score, 
						value: inResponse[i].key
					}
				]);
		}
		 
		this.$.panelGraph.setShowing(true);
		//Build a chart
		var bar = new Proto.Chart(this.controller.get('deviceChart'),
			[
			{ data: d1, label: "Score"}
			//{ data: [[0,inResponse.other]], label: "Other"}
			//{ data: [[0, 3]], label: "Pre"},
			//{ data: [[0, 3]], label: "Pixi"}
			],
			{
				bars: {show: true},
				xaxis: {min: 0, max: inResponse.length + 1, tickSize: 1},
				yaxis: {min: Math.min.apply(Math, scores) - 10, max: Math.max.apply(Math, scores) + 10, ticksize: 1},
				legend: {show: true}
			});
		this.$.panelGraph.setShowing(false);
		this.$.panelLoading.setShowing(false);
		
		currentOrientation = this.controller.stageController.getWindowOrientation();
		if(currentOrientation == "up" || currentOrientation == "down"){
			this.$.panelText.setShowing(true);
		}
		else{
			this.$.panelGraph.setShowing(true);
		}
		
		doneLoading = true;
	},
	listScoresListtap: function(inSender, event) {
		//Mojo.Controller.stageController.popScenesTo('fulldetails', event.item.value);
		Mojo.Controller.stageController.pushScene('fulldetails', event.item.value);
	}
};