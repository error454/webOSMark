function ChartTopsAssistant(argFromPusher) {}

ChartTopsAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		this.$.webService1.setMethod("GET");
		this.$.webService1.execute();
},
cleanup: function() {
	Ares.cleanupSceneAssistant(this);
},
	webService1Success: function(inSender, inResponse, inRequest) {
		for(var i = 0; i < inResponse.length; i++){
			if(inResponse[i].device == "pre"){
				this.controller.get('listPre').mojo.noticeAddedItems(i, 
				[
					{
						label: inResponse[i].score, 
						value: inResponse[i].key
					}
				]);
			}
			else if(inResponse[i].device == "pixi"){
				this.controller.get('listPixi').mojo.noticeAddedItems(i, 
				[
					{
						label: inResponse[i].score, 
						value: inResponse[i].key
					}
				]);
			}
		}
		
		this.$.panelLoading.setShowing(false);
		this.$.panelText.setShowing(true);
	},
	listPreListtap: function(inSender, event) {
		Mojo.Controller.stageController.pushScene('fulldetails', event.item.value);
	},
	listPixiListtap: function(inSender, event) {
		Mojo.Controller.stageController.pushScene('fulldetails', event.item.value);
	}
};