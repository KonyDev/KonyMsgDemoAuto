/**
 *	Name    : resetDemo
 *	Author  : Kony
 *	Purpose : This function will show up the confirmation popup 
 			  "OK" : call the deleteAudience function
              "Cancel" : Remains the same page
 */
function resetDemo() {
	if (initialReg == true) {
		frmSetting.show();
	} else {
		var basicConf = {
			message : "Resetting the Demo App will remove all data stored locally on the server for this device.",
			alertType : constants.ALERT_TYPE_CONFIRMATION,
			alertTitle : "Alert",
			yesLabel : "OK",
			noLabel : "Cancel",
			"alertIcon" : "conf.png",
			alertHandler : handle2
		};
        var pspConf = {};
		kony.ui.Alert(basicConf, pspConf);
		function handle2(response) {
			kony.print(JSON.stringify(response));
			var response = JSON.stringify(response);
			if (response == "true") {
				deleteAudience();
				KMSPROP.kmsServerUrl = frmSetting.txtBoxurl.text;
				KMSPROP.appId = frmSetting.txtBoxAppId.text;
				KMSPROP.senderID = frmSetting.txtBoxSenderID.text;
			}
		}
		optionPopup.destroy();
	}
}
/**
 *	Name    : deleteAudience
 *	Author  : Kony
 *	Purpose : This function will delete the details of registered User.
 */
function deleteAudience() {
	kony.print("\n\n-----in deleteAudience------>\n");
	function asyncCallback(status, result) {
		kony.print("\n------status------>" + status);
		kony.print("\n----result---->" + JSON.stringify(result));
		if (status == 400) {
			if (result["httpresponse"] != undefined && result["httpresponse"]["responsecode"] == 200) {
				updateMessaageAlert("User Deleted Successfully");
				kony.store.clear();
                frmProfile.destroy();
                frmUrl.destroy();
                frmEvent.destroy();
				initialReg = true;
				audienceFirstName = null;
				audienceLastName = null;
				audienceMob = null;
				audienceEmail = null;
				audiencePushSubs = null;
				audienceSmsSubs = null;
				audienceEmailSubs = null;
				emailStatusBefore = null;
				smsStatusBefore = null;
				pushStatusBefore = null;
				isPushSubs = false;
				isDeleteAudience = true;
				unSubscribePushSubscription();
			} else {
				updateMessaageAlert("Unable to process please try later..");
				kony.print("\n------updated result--->" + JSON.stringify(result));
			}
			kony.application.dismissLoadingScreen();
		}
	}

	var inputParamTable = {
		httpconfig : {
			method : "POST"
		},
		channel : "rc"
	}
	var url = KMSPROP.kmsServerUrl + "/api/v1/subscribeaudience/" + ksid + "/delete";
	kony.print("\n-----inputparamtable is" + JSON.stringify(inputParamTable));
	kony.print("\n----url----->" + url);
	try {
		kony.application.showLoadingScreen("sknLoading", "deleting..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
		var connHandle = kony.net.invokeServiceAsync(
				url, inputParamTable, asyncCallback);
	} catch (err) {
		kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
		alert("Error" + err);
	}
}
/**
 *	Name    : resetback
 *	Author  : Kony
 *	Purpose : This function will take back to the options form 
 			  once the demo app is resetted on click on Done
 */
function resetback(){
 KMSPROP.kmsServerUrl=frmSetting.txtBoxurl.text;
     if(initialReg==true) {
		frmOption.show();
     }
     else{
        frmHome.show();
     }
 }