function FeedbackAssistant(argFromPusher) {
}

FeedbackAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
	},
	cleanup: function() {
		Ares.cleanupSceneAssistant(this);
	},
	activityButton1Tap: function(inSender, event) {
		if(this.$.textField2.getValue() != ""){
			this.$.activityButton1.setActive(true);
			this.$.webService1.setMethod("POST");
			this.$.webService1.setUrl("http://webosmark.appspot.com/rest/feedback");
			this.$.webService1.setParameters({comment: encodeURIComponent(this.$.textField2.getValue()), deviceID: myDevice.nduid});
			this.$.webService1.execute();
		}
		else{
			this.$.activityButton1.setActive(false);
		}
	},
	webService1Success: function(inSender, inResponse, inRequest) {
		this.$.activityButton1.setActive(false);
		this.$.textField2.setValue("");
		this.$.textField2.setHintText("Thank you for your awesome feedback!");
	}
};