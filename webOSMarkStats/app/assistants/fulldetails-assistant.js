function FulldetailsAssistant(argFromPusher) {	
	key = argFromPusher;
}

FulldetailsAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		this.$.webService1.setMethod("GET");
		this.$.webService1.setUrl("http://webosmark.appspot.com/rest/full?key=" + key);
		this.$.webService1.execute();
	},
	activate: function(arg){
		this.controller.stageController.setWindowOrientation("free");
		//if(arg != null){
		//	this.$.webService1.setUrl("http://webosmark.appspot.com/rest/full?key=" + arg);
		//	this.$.webService1.execute();
		//}
		//else{
		//	this.$.panelLoading.setShowing(false);
		//	this.$.panelDetails.setShowing(true);
		//}
	},
	cleanup: function() {
		Ares.cleanupSceneAssistant(this);
	},
	webService1Success: function(inSender, inResponse, inRequest) {
		
		this.$.labelScore.setLabel(inResponse.score);
		this.$.labelDeviceID.setLabel(inResponse.deviceID);
		this.$.labelModel.setLabel(inResponse.model);
		this.$.labelKernel.setLabel(inResponse.kernel);
		this.$.labelVersion.setLabel(inResponse.version);
		
		//expose the scene
		this.$.panelLoading.setShowing(false);
		this.$.panelDetails.setShowing(true);
	},
	label3Tap: function(inSender, event) {
		Mojo.Controller.stageController.pushScene('deviceView', this.$.labelDeviceID.getLabel());
	}
};