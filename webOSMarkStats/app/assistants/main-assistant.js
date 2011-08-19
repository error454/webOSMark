function MainAssistant(argFromPusher) {
}

MainAssistant.prototype = {
	setup: function() {
		Ares.setupSceneAssistant(this);
		this.controller.serviceRequest('palm://com.palm.preferences/systemProperties', {
			method:"Get",
			parameters:{"key": "com.palm.properties.nduid" },
			onSuccess: function(response){
			 	myDevice.nduid = md5(response["com.palm.properties.nduid"]);
			}
		});
	},
	cleanup: function() {
		Ares.cleanupSceneAssistant(this);
	},
	activate: function(response) {
		this.controller.stageController.setWindowOrientation("up");
	},
	buttonChartTopTap: function(inSender, event) {
		Mojo.Controller.stageController.pushScene('chartTops');
	},
	button1Tap: function(inSender, event) {
		Mojo.Controller.stageController.pushScene('totals');
	},
	button2Tap: function(inSender, event) {
		Mojo.Controller.stageController.pushScene('deviceView', myDevice.nduid);
	},
	button4Tap: function(inSender, event) {
		Mojo.Controller.stageController.pushScene('feedback');
	}
};