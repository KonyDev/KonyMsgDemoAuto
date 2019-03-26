/**
 * Name		:	updateAudience
 * Author	:	Kony
 * Purpose	:	To update or add the audience member 
 **/
function updateAudience() {
    kony.print("---Start : updateAudience--");
	function asyncCallback(status, result) {
        kony.print("---Start : asyncCallback updateAudience--");
		kony.print("\n------status------>" + status);
		kony.print("\n result:-" + JSON.stringify(result));
		if (status == 400 && result["httpresponse"] != undefined) {
			if (result["httpresponse"]["responsecode"] == 400) {
				alert("Invalid Request Format");
				kony.application.dismissLoadingScreen();
				return;
			} else if (result["httpresponse"]["responsecode"] == 200) {
				kony.print("\n result:-" + JSON.stringify(result));
				kony.store.setItem("AUDIENCE_FIRSTNAME", audienceFirstName);
				kony.store.setItem("AUDIENCE_LASTNAME", audienceLastName);
				kony.store.setItem("AUDIENCE_EMAIL", audienceEmail);
				kony.store.setItem("AUDIENCE_COUNTRY", audienceCountry);
				kony.store.setItem("AUDIENCE_STATE", audienceState);
				kony.store.setItem("AUDIENCE_MOB", audienceMob);
				kony.store.setItem("AUDIENCE_STATUS", audienceStatus);
				kony.store.setItem("AUDIENCE_SMS_SUBSCRIPTION", audienceSmsSubs);
				kony.store.setItem("AUDIENCE_EMAIL_SUBSCRIPTION", audienceEmailSubs);
				kony.store.setItem("AUDIENCE_PUSH_SUBSCRIPTION", audiencePushSubs);
                //calling preferences in preferences.js to reset the preferences
				setpreferences();
				kony.print("----message is----" + result["message"]);
				if (result["message"] === "Details added successfully") {
					updateMessaageAlert("User details added successfully");
					kony.application.dismissLoadingScreen();
				} else {
					updateMessaageAlert(result["message"]);
					kony.application.dismissLoadingScreen();
				}
			} else {
				alert("Something went wrong while adding details");
				kony.application.dismissLoadingScreen();
			}
		}
	kony.print("---End : asyncCallback updateAudience--");
	}

	audienceStatus = true;
	if (audienceSmsSubs == undefined || audienceSmsSubs == null) {
		audienceSmsSubs = true;
	}
	if (audienceEmailSubs == undefined || audienceEmailSubs == null) {
		audienceEmailSubs = true;
	}

	var payload1 = '{'
		 + '"ksid":' + ksid + ','
		 + '"lastName" :' + '\"' + audienceLastName + '\",'
		 + '"email" : ' + '\"' + audienceEmail + '\",'
		 + '"active" :' + audienceStatus + ','
		 + '"firstName" :' + '\"' + audienceFirstName + '\",'
		 + '"mobileNumber" :' + '\"' + audienceMob + '\",'
		 + '"smsSubscription" :' + audienceSmsSubs + ','
		 + '"emailSubscription":' + audienceEmailSubs + ','
		 + '"country":' + '\"' + audienceCountry + '\",'
		 + '"state":' + '\"' + audienceState + '\",'
		 + '"pushSubscription":' + audiencePushSubs
		 + '}';

	kony.print("\npayload1:-" + payload1);
	var inputParamTable = {
		httpheaders : {
			"Content-Type" : "application/json"
		},
		postdata : payload1

	};
	try {
		var url = KMSPROP.kmsServerUrl + "/api/v1/subscribeaudience";
		kony.print("\nurl-->" + url);
		kony.print("\n ipTable-->" + JSON.stringify(inputParamTable));
		kony.application.showLoadingScreen("sknLoading", "updating..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
		var connHandle = kony.net.invokeServiceAsync(
				url, inputParamTable, asyncCallback);
	} catch (err) {
		kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
		alert("Error" + err);
	}
  kony.print("---End : updateAudience--");
}

/**
 * Name		:	updatePushSubscription
 * Author	:	Kony
 * Purpose	:	To update update the push subscription with the user mail
 				once the user details are validated 
 **/
function updatePushSubscription() {
	kony.print("\n\n ------------in updatePushSubscription--------------------\n");
	if (frmProfile.txtBoxFname.text == null || frmProfile.txtBoxFname.text == "") {
		alert("Please enter first name");
		return;
	} else if (nameRegExp.test(frmProfile.txtBoxFname.text)) {
		alert("Invalid character " + "'" + nameRegExp.exec(frmProfile.txtBoxFname.text) + "'");
		return;
	}
	if (frmProfile.txtBoxLname.text == null || frmProfile.txtBoxLname.text == "") {
		alert("Please enter last name");
		return;
	} else if (nameRegExp.test(frmProfile.txtBoxLname.text)) {
		alert("Invalid character " + nameRegExp.exec(frmProfile.txtBoxLname.text));
		return;
	}
	if (frmProfile.txtBoxEmail.text == null || frmProfile.txtBoxEmail.text == "") {
		alert("Please enter email id");
		return;
	} else if (emailReg.test(frmProfile.txtBoxEmail.text) == false) {
		alert("Please enter valid email..");
		return;
	}

	if (selectedCountry == null || selectedCountry == "") {
		alert("Please select Country name");
		return;
	}
	if ((frmProfile.lstboxStates.isVisible == true) && (frmProfile.lstboxStates.selectedKeyValue[1] == null || frmProfile.lstboxStates.selectedKeyValue[1] == "")) {

		alert("Please select State name");
		return;
	}
	if (frmProfile.txtBoxMob.text == null || frmProfile.txtBoxMob.text == "") {
		alert("Please enter mobile number");
		return;
	} else if (mobReg.test(frmProfile.txtBoxMob.text) == false) {
		alert("Please enter valid mobile number with country code");
		return;
	}
	if ((audienceFirstName == frmProfile.txtBoxFname.text) && (audienceLastName == frmProfile.txtBoxLname.text) && (audienceCountry == selectedCountry) && (audienceState == selectedState) && (audienceEmail == frmProfile.txtBoxEmail.text) && (audienceMob == frmProfile.txtBoxMob.text) && (audienceEmailSubs == emailStatusBefore) && (audienceSmsSubs == smsStatusBefore) && (audiencePushSubs == pushStatusBefore)) {
		if (firstRegister == true) {
			frmPreference.show();
			return;
		}
		frmHome.show();
		return;
	} else {
		audienceFirstName = frmProfile.txtBoxFname.text;
		audienceLastName = frmProfile.txtBoxLname.text;
		audienceEmail = frmProfile.txtBoxEmail.text;
		audienceCountry = selectedCountry;
		audienceState = selectedState;
		audienceMob = frmProfile.txtBoxMob.text;
	}
	function asyncCallback(status, result) {
		kony.print("\n------status------>" + status);
		if (status == 400) {
			kony.print("\n\n----in result------>" + JSON.stringify(result));
			if (result["subscriptionResponse"] != undefined) {
				if (result["subscriptionResponse"]["statusCode"] == 200) {
					kony.print("\n subscription updated\n");
					isPushSubs = true;
					kony.application.dismissLoadingScreen();
					if (kony.os.deviceInfo().name == "android")
						updateAudience();
					else
						updateAudience();

				}else if(result["subscriptionResponse"]["statusCode"] == 404){
					alert(JSON.stringify(result["subscriptionResponse"]["message"]));
                    kony.application.dismissLoadingScreen();
                }
			} else
				kony.application.dismissLoadingScreen();
		}
	}
	kony.print("\n\n<----------in updateSubscription-------->\n\n");
	var payload = {
		"subscriptionService" : {
			"subscribe" : {
				"sid" : registrationID,
				"appId" : KMSPROP.appId,
				"ufid" : audienceEmail,
				"osType" : opSystem,
				"deviceId" : kony.os.deviceInfo().deviceid
			}
		}
	};
	var jsonPayload = JSON.stringify(payload);
	var inputParamTable = {
		httpheaders : {
			"Content-Type" : "application/json"
		},
		postdata : jsonPayload,
		channel : "rc"
	};
	var pushSubscUrl = KMSPROP.kmsServerUrl + "/subscription";
	kony.print("\ninputParamTable:-" + JSON.stringify(inputParamTable));
	try {
		if (firstRegister == true) {
			kony.application.showLoadingScreen("sknLoading", "Creating...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
		} else {
			kony.application.showLoadingScreen("sknLoading", "updating...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
		}

		var connHandle = kony.net.invokeServiceAsync(
				pushSubscUrl, inputParamTable, asyncCallback);
	} catch (err) {
		kony.print("\nexception in invoking service---\n" + JSON.stringify(err));
		alert("Error" + err);
		kony.application.dismissLoadingScreen();
	}
}
/**
 * Name		:	updateMessaageAlert
 * Author	:	Kony
 * Purpose	:	To display the messages as an alert.
 **/
function updateMessaageAlert(msg) {
	//Defining basicConf parameter for alert
	var basicConf = {
		message : msg,
		alertType : constants.ALERT_TYPE_INFO
	};
	//Defining pspConf parameter for alert
	var pspConf = {};
	//Alert definition
	var infoAlert = kony.ui.Alert(basicConf, pspConf);
}
/**
 * Name		:	frmProfilePreShow
 * Author	:	Kony
 * Purpose	:	To prepoluate the user details in the profilr form
 **/
function frmProfilePreShow(){
	frmProfile.txtBoxFname.text=audienceFirstName;
	frmProfile.txtBoxLname.text=audienceLastName;
	frmProfile.txtBoxEmail.text=audienceEmail;
	selectedCountry=audienceCountry;
	selectedState=audienceState;
	frmProfile.listbox5316540885527.selectedKey=audienceCountry;
	frmProfile.txtBoxState.text=audienceState;
	frmProfile.txtBoxMob.text=audienceMob;
}
