/**
 * Name		:	unSubscribePushSubscription
 * Author	:	Kony
 * Purpose	:	To unsubscribe the device from the push notification
 **/
function unSubscribePushSubscription() {
	kony.print("\n\n-----in unSubscribePushSubscription-----\n");
	function asyncCallback(status, result) {
		kony.print("\n------status------>" + status);
		if (status == 400) { 
			kony.application.dismissLoadingScreen();
			kony.print("\n\n----in result------>" + JSON.stringify(result));
			if (result["subscriptionResponse"] != undefined) {
				if (result["subscriptionResponse"]["statusCode"] == 200) {
					kony.print("\n unsubscribed successfully\n");
					audiencePushSubs = false;
					pushStatusBefore = false;
					isPushSubs = false;
                    if(isDeleteAudience==false){
                      updateAudience();
                    }
				}
			} else {
				audiencePushSubs = true;
				isPushSubs = true;
				kony.print("\n-----now updating audience-----\n");
			}

		}
	}
	var payload = {
		"subscriptionService" : {
			"unsubscribe" : {
				"ksid" : ksid
			}
		}
	};
	var inputParamTable = {
		httpheaders : {
			"Content-Type" : "application/json"
		},
		httpconfig : {
			method : "post"
		},
		postdata : JSON.stringify(payload)
	};
	var pushSubscUrl = KMSPROP.kmsServerUrl + "/subscription";
	kony.print("\n pushSubscUrl:-" + pushSubscUrl);
	kony.print("\ninputParamTable:-" + JSON.stringify(inputParamTable));
	try {
		var connHandle = kony.net.invokeServiceAsync(
				pushSubscUrl, inputParamTable, asyncCallback);
	} catch (err) {
		kony.print("\nexception in invoking service---\n" + JSON.stringify(err));
		alert("Error " + err);
		kony.application.dismissLoadingScreen();
	}
}
/**
 * Name		:	pushSubscription
 * Author	:	kony
 * Purpose	:	To get SubscritptionID for the push notification on the KMS.
 **/
function pushSubscription(regId, ostype) {
	registrationID = regId;
	kony.store.setItem("REGISTRATIONID", registrationID);
	if (ostype == "android")
		ostype = "androidgcm";
	opSystem = ostype;
	kony.store.setItem("OSTYPE", opSystem);
	var pushSubscUrl = frmUrl.txtBoxUrl.text + "/subscription";
	if (pushSubscUrl == null) {
		pushSubscUrl = kony.store.getItem("KMSURL");
		KMSPROP.kmsServerUrl = pushSubscUrl;
		KMSPROP.appId = kony.store.getItem("KMSAppID");
		KMSPROP.senderID = kony.store.getItem("KMSSenderID");
	}
	function asyncCallback(status, result) {
		kony.print("\n------status------>" + status);
		if (status == 400) {
			kony.print("\n\n----in result------>" + JSON.stringify(result));
			if (result["subscriptionResponse"] != undefined) {
				if (result["subscriptionResponse"]["statusCode"] != undefined && result["subscriptionResponse"]["statusCode"] == 200) {
					ksid = result["subscriptionResponse"]["ksid"];
					kony.store.setItem("KSID", ksid);
					kony.store.setItem("KMSAppID", KMSPROP.appId);
					kony.store.setItem("KMSSenderID", KMSPROP.senderID);
					kony.store.setItem("KMSURL", KMSPROP.kmsServerUrl);
					isPushSubs = true;
					audiencePushSubs = true;
					kony.print("\npush subscription message:-" + result["subscriptionResponse"]["message"]);
					if (kony.store.getItem("isFirstTime") === "false") {
						updateAudience();
					} else {
						kony.store.setItem("isFirstTime", "false");
					}
					frmProfile.show();
				} else {
					alert(result["subscriptionResponse"]["message"]);
				}
			} else if (result["errmsg"] != undefined) {
				alert(result["errmsg"]);
			}
			kony.application.dismissLoadingScreen();
		}
	}
	kony.print("\n\n<----------in subscribeKMS-------->\n\n");
	var payload = {
		"subscriptionService" : {
			"subscribe" : {
				"sid" : regId,
				"appId" : KMSPROP.appId,
				"osType" : ostype,
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
	kony.print("\n pushSubscUrl:-" + pushSubscUrl);
	kony.print("\ninputParamTable:-" + JSON.stringify(inputParamTable));
	try {
		var connHandle = kony.net.invokeServiceAsync(
				pushSubscUrl, inputParamTable, asyncCallback);
	} catch (err) {
		kony.print("\nexception in invoking service---\n" + JSON.stringify(err));
		alert("Error" + err);
		kony.application.dismissLoadingScreen();
	}
}
/**
 * Name		:	pushRegistration
 * Author	:	Kony
 * Purpose	:	To register the device to the GCM/APNS.
 **/
function pushRegistration() {
	if (frmUrl.txtBoxAppId.text !== "" && frmUrl.txtBoxSenderID.text !== "" && frmUrl.txtBoxUrl.text !== "") {
		KMSPROP.kmsServerUrl = frmUrl.txtBoxUrl.text;
		KMSPROP.appId = frmUrl.txtBoxAppId.text;
		KMSPROP.senderID = frmUrl.txtBoxSenderID.text;
	} else {
		alert("The URL, APPID and SenderId Should not be Empty");
		return;
	}
	kony.print("\n\n----in pushRegister----\n");
	isDeleteAudience = false;
	var devName = kony.os.deviceInfo().name;
	kony.application.showLoadingScreen("sknLoading", "please wait..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
	if (devName == "android") {
		callbackAndroidSetCallbacks();
		callbackAndroidRegister();
	} else if ((devName == "iPhone") || (devName == "iPhone Simulator") || (devName == "iPad") || (devName == "iPad Simulator")) {
		callbackiPhoneSetCallbacks();
		callbackiPhoneRegister();
	}
}
