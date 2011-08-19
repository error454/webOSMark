function TotalsAssistant(argFromPusher) {}

TotalsAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		this.controller.listen(document, 'orientationchange', this.handleOrientation.bindAsEventListener(this));
		this.$.webService1.setMethod("GET");
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
		//{"other":0,"pixi":4,"pre":2,"unique":1}
		var total = (inResponse.pre + inResponse.pixi + inResponse.other);
		
		this.$.labelPre.setLabel(inResponse.pre);
		this.$.labelPixi.setLabel(inResponse.pixi);
		this.$.labelOther.setLabel(inResponse.other);
		this.$.labelUniqueScores.setLabel(inResponse.unique);
		this.$.labelTotalScore.setLabel(total);
		
		//Hack, whY?!?
		this.$.panelGraph.setShowing(true);
		//Build a chart
		var pie = new Proto.Chart(this.controller.get('totalsChart'),
			[
			{ data: [[0,inResponse.pre]], label: "Pre"},
			{ data: [[0,inResponse.pixi]], label: "Pixi"}
			//{ data: [[0,inResponse.other]], label: "Other"}
			//{ data: [[0, 3]], label: "Pre"},
			//{ data: [[0, 3]], label: "Pixi"}
			],
			{
				pies: {show: true, autoScale: true},
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
	}
};