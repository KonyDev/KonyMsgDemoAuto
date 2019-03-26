/**
 * Name		:	preferences.
 * Author	:	Kony
 * Purpose	:	To handle the checkboxgroup event for the push subscription,
 * 				smsSubscription,emailSubscription.
 **/
function preferences() {
	firstRegister = false;
	var selectedKeys = frmPreference.checkBxPreference.selectedKeys;
	initialReg = false;
	audiencePushSubs = false;
	audienceSmsSubs = false;
	audienceEmailSubs = false;
	for (var i = 0; selectedKeys != null && i < selectedKeys.length; i++) {
		if (selectedKeys[i] == 0)
			audiencePushSubs = true;
		else if (selectedKeys[i] == 1)
			audienceSmsSubs = true;
		else
			audienceEmailSubs = true;
	}
	if ((audienceEmailSubs != emailStatusBefore) || (audienceSmsSubs != smsStatusBefore) || (audiencePushSubs != pushStatusBefore)) {
		kony.print("\naudiencePushSubs---------------->" + audiencePushSubs);
		kony.print("\naudienceSmsSubs---------------->" + audienceSmsSubs);
		kony.print("\naudienceEmailSubs---------------->" + audienceEmailSubs);
		kony.application.showLoadingScreen("sknLoading", "updating..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
		if (audiencePushSubs != pushStatusBefore) {
			if (audiencePushSubs == true) {
				kony.print("subscring push notification");
				//#ifdef android
				pushSubscription(registrationID, "android");
				//#else
				pushSubscription(registrationID, "iphone");
				//#endif
			} else {
				unSubscribePushSubscription();
				kony.print("unsubscring push notification");
			}
		} else {
			kony.print("update audience");
			updateAudience();
		}
	} else {
		frmHome.show();
	}
}
/**
 * Name		:	Setpreferences
 * Author	:	Kony
 * Purpose	:   To read the checkboxgroup selected status 
 *				for the push subscription,smsSubscription,
 *              emailSubscription.
 **/
function setpreferences() {
	var arr = [];
	smsStatusBefore = false;
	emailStatusBefore = false;
	pushStatusBefore = false;
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
	kony.print("array is " + arr);
}
