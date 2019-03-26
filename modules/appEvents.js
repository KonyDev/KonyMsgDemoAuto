/**
  * @ function postAppinit
  * this function is to set the callbacks for pushnotification
  * to locate ibeacons for iphone
  * to update the current location for android
  * to update the global variables in KMSGlobals.js
  * this function is called by postAppinit of the App Events
  */
function postAppinit() {
    kony.print("--Start : postAppinit--");
	ksid = kony.store.getItem("KSID");
	isDeleteAudience = false;
	kony.print("\n ksid-->" + ksid);
	kony.print("\nKMSPROP.kmsServerUrl-->" + KMSPROP.kmsServerUrl);
	if (kony.os.deviceInfo().name == "iPhone") {
		kony.print("\nsetting iPhone callbacks:\n");
		locate_iBeacons();//this will call the function  in mbeacons.js
		callbackiPhoneSetCallbacks();//this will call the function  in iphonePush.js
	} else if (kony.os.deviceInfo().name == "android") {
		kony.print("\nsetting android callbacks:\n");
		geoPosition();//this will call the function  in locationModules.js
		callbackAndroidSetCallbacks();//this will call the function  in androidPush.js
	}
	if (ksid != null) {
		kony.print("entered with ksid & audience ID");
		audienceFirstName = kony.store.getItem("AUDIENCE_FIRSTNAME");
		audienceLastName = kony.store.getItem("AUDIENCE_LASTNAME");
		audienceEmail = kony.store.getItem("AUDIENCE_EMAIL");
		audienceCountry = kony.store.getItem("AUDIENCE_COUNTRY");
		audienceState = kony.store.getItem("AUDIENCE_STATE");
		audienceMob = kony.store.getItem("AUDIENCE_MOB");
		audienceStatus = kony.store.getItem("AUDIENCE_STATUS");
		audienceSmsSubs = kony.store.getItem("AUDIENCE_SMS_SUBSCRIPTION");
		audienceEmailSubs = kony.store.getItem("AUDIENCE_EMAIL_SUBSCRIPTION");
		audiencePushSubs = kony.store.getItem("AUDIENCE_PUSH_SUBSCRIPTION");
		registrationID = kony.store.getItem("REGISTRATIONID");
		opSystem = kony.store.getItem("OSTYPE");
		isPushSubs = audiencePushSubs;
		KMSPROP.kmsServerUrl = kony.store.getItem("KMSURL");
        KMSPROP.appId= kony.store.getItem("KMSAppID");
        KMSPROP.senderID = kony.store.getItem("KMSSenderID");
		frmProfile.txtBoxFname = audienceFirstName;
		frmProfile.txtBoxLname = audienceLastName;
		frmProfile.txtBoxCountry = audienceCountry;
		frmProfile.txtBoxState = audienceState;
		frmProfile.txtBoxEmail = audienceEmail;
		frmProfile.txtBoxMob = audienceMob;
		pushStatusBefore = true;
		smsStatusBefore = false;
		emailStatusBefore = false;
		var arr = [];
		if (audiencePushSubs == true) {
			arr.push("0");
			pushStatusBefore = true;
		}
		if (audienceSmsSubs == true) {
			arr.push("1");
			smsStatusBefore = true;
		}
		if (audienceEmailSubs == true) {
			arr.push("2");
			emailStatusBefore = true;
		}
		frmPreference.checkBxPreference.selectedKeys = arr;
		if (audienceFirstName == null) {
			audiencePushSubs = true;
			audienceSmsSubs = false;
			audienceEmailSubs = false;
			return frmProfile;
		}
		return frmHome;
	} else {
		audienceFirstName = "";
		audienceLastName = "";
		audienceEmail = "";
		audienceCountry = "";
		audienceState = "";
		audienceMob = "";
		kony.print("entered without ksid");
		return frmOption;
	}
  kony.print("---End : PostAppinit--");
}
/**
  * @function setApplicationCallBacks
  * this function is to set the application callbacks of the app
  */
function setApplicationCallBacks() {
	kony.print("\n===============setApplicationCallbacks executed=======\n");
	var callbacksObj = {
		onactive : onAppActive
	};
	kony.application.setApplicationCallbacks(callbacksObj);
}
/**
  * @function onAppActive
  * this function is to print the logs when the app is active
  */
function onAppActive() {
	kony.print("\n===============Into  onAppActive=======\n");
	kony.print("\n===============Into  onAppActive=======\n ==>" + kony.os.deviceInfo().name);
	if (kony.os.deviceInfo().name === "iPhone")
		kony.print("\n===============Into  deviceInfo=======\n");
	kony.application.setApplicationBadgeValue("0");
	kony.print("\napplication is active.---\n");
}

