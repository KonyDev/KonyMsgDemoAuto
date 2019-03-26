function showOptionPopUp() {
	var parentTable = [];
	parentTable["widget"] = frmOption;
	parentTable["anchor"] = "bottom";
	optionPopup.setContext(parentTable);
	optionPopup.show();
}
function negativeSelection() {
	optionPopup.destroy();
	var parentTable = [];
	parentTable["widget"] = frmOption;
	parentTable["anchor"] = "bottom";
	infoPopup.setContext(parentTable);
	infoPopup.show();
	function timerFunc() {
		infoPopup.destroy();
		showOptionPopUp();
	}
	kony.timer.schedule("showOption", timerFunc, 3, false);

}
function positiveSelection() {
	var basicConf = {
		message : "Notifications may include alerts,\nsounds and icon badges.These can\nbe configured in settings.",
		alertType : constants.ALERT_TYPE_CONFIRMATION,
		alertTitle : '"Kony Engagement Services" Would Like to Send You\nPush Notifications',
		yesLabel : "OK",
		noLabel : "Don't Allow",
		"alertIcon" : "conf.png",
		alertHandler : handle2
	};
	var pspConf = {};
	kony.ui.Alert(basicConf, pspConf);
	function handle2(response) {
		kony.print(JSON.stringify(response));
		var response = JSON.stringify(response);
		if (response == "true") {

			frmUrl.show();
		} else {
			showOptionPopUp();
		}
	}
	optionPopup.destroy();
}
function registrationInfoAlert(msg) {
	var basicConf = {
		message : msg,
		alertType : constants.ALERT_TYPE_INFO,
		yesLabel : "OK",
		alertHandler : handle2
	};
	var pspConf = {};
	kony.ui.Alert(basicConf, pspConf);
	function handle2(response) {
		kony.print(JSON.stringify(response));
		var response = JSON.stringify(response);
		frmProfile.show();
	}
}
