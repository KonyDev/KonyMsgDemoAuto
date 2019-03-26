var accessSecret, accessToken;
var audienceID;
var audienceStatus, audienceFirstName, audienceLastName, audienceEmail, audienceSmsSubs, audiencePushSubs, audienceEmailSubs, audienceMob, audienceCountry, audienceState;
//var osVersion=7;
var ksid;
var kmsUrl;
var ipurl;
var KMSURL;
var subsFrom;
var selectedCountry;
var selectedCountryKey;
var selectedState;
var selectedStateKey;
audienceEmail = "xxx@xxx.com";
var registrationID;
var opSystem;
var isPushSubs = false;
var firstRegister;
var isDeleteAudience;
var nameRegExp = /[\W]/i;
/**
 ****************************************************************
 *	Name    : editAudience2
 *	Author  : Kony
 *	Purpose : This function will update the details of registered User.
 *****************************************************************/
function editAudience2() {
    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            if (result["opstatus"] == 0) {
                updateMessaageAlert("" + result["message"]);
                //registrationInfoAlert(""+result["message"]);
                smsStatusBefore = audienceSmsSubs;
                emailStatusBefore = audienceEmailSubs;
                pushStatusBefore = audiencePushSubs;
                if (audiencePushSubs == true && kony.os.deviceInfo().name == "iPhone") locate_iBeacons();
            } else if (result["opstatus"] == 8009) {
                if (result["message"] != undefined) updateMessaageAlert("" + result["message"]);
                else if (result["errmsg"] != undefined) {
                    updateMessaageAlert("Email/mobile already registered");
                }
                //updateMessaageAlert(""+result["errmsg"]);
                kony.print("\n------updated result--->" + JSON.stringify(result));
            } else {
                updateMessaageAlert("Unable to process please try later..");
                kony.print("\n------updated result--->" + JSON.stringify(result));
            }
            kony.application.dismissLoadingScreen();
        }
    }
    var inputParamTable = {
        httpheaders: {
            "AccessSecret": accessSecret,
            "AccessToken": accessToken,
            "Content-Type": "application/json"
        },
        httpconfig: {
            method: "POST"
        },
        serviceID: "EditAudience",
        appID: "kmsapp",
        channel: "rc",
        active: "\"" + audienceStatus + "\"",
        email: "\"" + audienceEmail + "\"",
        emailSubscription: "\"" + audienceEmailSubs + "\"",
        firstName: "\"" + audienceFirstName + "\"",
        lastName: "\"" + audienceLastName + "\"",
        mobileNumber: "\"" + audienceMob + "\"",
        pushSubscription: "\"" + audiencePushSubs + "\"",
        smsSubscription: "\"" + audienceSmsSubs + "\"",
        "audienceID": audienceID,
        kmsurl: ipurl
    };
    var url = appConfig.url;
    kony.print("\n-----inputparamtable is" + JSON.stringify(inputParamTable));
    kony.print("\n----url----->" + url);
    try {
        kony.application.showLoadingScreen("sknLoading", "updating...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        var connHandle = kony.net.invokeServiceAsync(url, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
    }
}

function initForm() {
    frmProfile.txtBoxFname.text = audienceFirstName;
    frmProfile.txtBoxLname.text = audienceLastName;
    frmProfile.txtBoxEmail.text = audienceEmail;
    frmProfile.txtBoxMob.text = audienceMob;
    if (audiencePushSubs == true) frmPreference.checkBxPreference.selectedKeys = ["0"];
    if (audienceSmsSubs == true) frmPreference.checkBxPreference.selectedKeys = ["1"];
    if (audienceEmail == true) frmPreference.checkBxPreference.selectedKeys = ["2"];
    //frmPreference.checkBxPreference.selectedKeys=[audiencePushSubs,audienceSmsSubs,audienceEmail];
    kony.print("\n--in init form--");
    frmProfile.show();
    //frmPreference.show();
}
/*function initAudience(result){
	audienceStatus=result["active"];
    audienceFirstName=result["firstName"];
    audienceLastName=result["lastName"];
    audienceEmail=result["email"];
    audienceSmsSubs=result["smsSubscription"];
    audiencePushSubs=result["pushSubscription"];
    audienceEmailSubs=result["emailSubscription"];
    audienceMob=result["mobileNumber"];
    initForm();
}*/
function getAudience() {
    // register audience.
    audienceStatus = true;
    audienceFirstName = "";
    audienceLastName = "";
    audienceEmail = "";
    audienceSmsSubs = true;
    audiencePushSubs = true;
    audienceEmailSubs = true;
    audienceMob = "";
    if (typeof audienceFirstName) frmProfile.txtBoxFname = audienceFirstName;
    frmProfile.txtBoxLname = audienceLastName;
    frmProfile.txtBoxEmail = audienceEmail;
    frmProfile.txtBoxMob = audienceMob;
}
/**
 * Name		:	getAudience
 * Author	:	Kony
 * Purpose	:	To recevice the details of this User from the KMS.
 **/
function getAudience1() {
    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            if (result["httpresponse"] != undefined) {
                if (result["httpresponse"]["responsecode"] == 400) {
                    kony.print("\nNo User found mapping to the given KSID or Audience Id");
                }
            }
            //result1=JSON.parse(result);
            kony.print("\n------result------>" + result);
            kony.print("\n------result------>" + result["message"]);
            /*if(result["pushSubscription"] == true)
    		  ksid=kony.store.getItem("ksid");
    		else
    		  ksid=null;
    		if(result["errmsg"]!=undefined){
    			kony.print("\n---errmsg-->"+result["errmsg"]);
    			alert(result["errmsg"]);
    			kony.application.dismissLoadingScreen();
    			return;
    		}
    		audienceStatus=result["active"];
    		audienceFirstName=result["firstName"];
    		audienceLastName=result["lastName"];
    		audienceEmail=result["email"];
    		audienceSmsSubs=result["smsSubscription"];
    		audiencePushSubs=result["pushSubscription"];
    		audienceEmailSubs=result["emailSubscription"];
    		audienceMob=result["mobileNumber"];
    		frmProfile.txtBoxFname.text=audienceFirstName;
			frmProfile.txtBoxLname.text=audienceLastName;
			frmProfile.txtBoxEmail.text= audienceEmail;
			frmProfile.txtBoxMob.text=audienceMob;
			frmHome.show();
    		
    		
    		kony.print("ksid after getaudence is"+ksid);	*/
            kony.application.dismissLoadingScreen();
        }
    }
    /*	var inputParamTable={
            httpheaders:{
            	AccessSecret:accessSecret,
            	AccessToken:accessToken
				},
			httpconfig:{method:"get"}
    };*/
    var inputParamTable = {
        httpconfig: {
            method: "get"
        }
    }
    try {
        kony.application.showLoadingScreen("sknLoading", "loading details...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        //	var url=KMSPROP.kmsServerUrl+":443/api/v1/audience/"+audienceID;
        //var url=KMSPROP.kmsServerUrl+"api/v1/subscribeaudience/"+ksid;
        var url = "http://kms-demo.messaging.qa-konycloud.com/api/v1/subscribeaudience/4552892954829457249";
        kony.print("\nurl-->" + url);
        kony.print("\n ipTable-->" + inputParamTable);
        var connHandle = kony.net.invokeServiceAsync(url, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
    }
}
/**
 * Name		:	getAccessToken4
 * Author	:	Kony
 * Purpose	:	To get the access token,access secret from the KMS by authenticating the user. 
 **/
/*function getAccessToken4()
{
	function asyncCallback(status, result) 
	{
    	kony.print("\n------status------>"+status);
    	if(status==400)
    	{
    		kony.print("\n------result------>"+JSON.stringify(result));
    		if(result["401"]!=undefined)
    		{
    			updateMessaageAlert(""+result["401"]);
    			kony.application.dismissLoadingScreen();
    			return;
    		}
    		if(result["errmsg"]!=undefined)
    		{
    			updateMessaageAlert(result["errmsg"]);
    			kony.application.dismissLoadingScreen();
    			return;
    		}   		
    		if(result["AccessSecret"]!=undefined)
    		{
    			accessSecret=result["AccessSecret"];
    			accessToken=result["AccessToken"];
    			kony.store.setItem("accessSecret", accessSecret);
    			kony.store.setItem("accessToken", accessToken);
    			kony.store.setItem("KMSURL",KMSPROP.kmsServerUrl);
				kony.print("\naccessSecret-->"+accessSecret);
    			kony.print("\naccessToken-->"+accessToken);
    			kony.print("audience ID-->"+audienceID);
    		   if(audienceID!=null)
    			{   
    			    getAudience();
    			   // frmHome.show();       
    			}
    			else{
    			 	frmProfile.show();
    			} 
    			kony.application.dismissLoadingScreen();
    		}
    		kony.application.dismissLoadingScreen();
    	}
    }
 //	kmsUrl=frmUrl.txtBoxUrl.text;
 	KMSPROP.kmsServerUrl=frmUrl.txtBoxUrl.text;
 	if(KMSPROP.kmsServerUrl==""|| KMSPROP.kmsServerUrl==null){
 		alert("please enter valid URl..");
 		return;
 	}
    userId="vadithya.narayana@kony.com";
	pswd="kony#1234";
    var encryptedCredential=B64.encode(userId+":"+pswd);
	audienceID=kony.store.getItem("audienceID");
	 kony.print("kms url--->"+KMSPROP.kmsServerUrl);
    try{
    	kony.application.showLoadingScreen("sknLoading","redirecting...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
		var inputParamTable={
    		httpheaders:{
				"Authorization":"Basic "+encryptedCredential
				},
			httpconfig:{method:"get"}
           };
        var url=KMSPROP.kmsServerUrl+"/api/v1/oauth/accesstoken";       
	    kony.print("access token url:-"+url);
	    var connHandle = kony.net.invokeServiceAsync(url,inputParamTable,asyncCallback);
     }catch(err){
     	kony.print("\nexeption in invoking service---\n"+JSON.stringify(err));
	  	alert("unable to process please try later..");
	  	kony.application.dismissLoadingScreen();
     }
}*/
function unSubscribePushSubscription() {
    kony.print("\n\n-----in unSubscribePushSubscription-----\n");

    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            kony.print("\n\n----in result------>" + JSON.stringify(result));
            if (result["subscriptionResponse"] != undefined) {
                if (result["subscriptionResponse"]["statusCode"] == 200) {
                    kony.print("\n unsubscribed successfully\n");
                    //ksid=null;
                    //kony.store.setItem("KSID", ksid);
                    audiencePushSubs = false;
                    isPushSubs = false;
                    //if()
                    /*try{
                    kony.timer.cancel("mytimer123");
                    }catch(err)
                    {
                    	kony.print("error in canceling timer:: "+err);
                    }*/
                    if (isDeleteAudience == false) {
                        kony.print("\n-----now updating audience-----\n");
                        updateAudience();
                    }
                } else {
                    audiencePushSubs = true;
                    isPushSubs = true;
                    kony.print("\n-----now updating audience-----\n");
                    updateAudience();
                }
            } else {
                audiencePushSubs = true;
                isPushSubs = true;
                kony.print("\n-----now updating audience-----\n");
                updateAudience();
            }
            kony.application.dismissLoadingScreen();
        }
    }
    var payload = {
        "subscriptionService": {
            "unsubscribe": {
                "ksid": ksid
            }
        }
    };
    var jsonPayload = JSON.stringify(payload);
    var inputParamTable = {
        httpheaders: {
            "Content-Type": "application/json"
        },
        httpconfig: {
            method: "post"
        },
        postdata: JSON.stringify(payload)
            //	channel:"rc"
    };
    var pushSubscUrl = KMSPROP.kmsServerUrl + "/subscription";
    kony.print("\n pushSubscUrl:-" + pushSubscUrl);
    kony.print("\ninputParamTable:-" + JSON.stringify(inputParamTable));
    try {
        // kony.application.showLoadingScreen("sknLoading","Please wait...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
        var connHandle = kony.net.invokeServiceAsync(pushSubscUrl, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexception in invoking service---\n" + JSON.stringify(err));
        alert("Error " + err);
        kony.application.dismissLoadingScreen();
    }
}
//////////////////////////////////////////////
function updatePushSubscription2() {
    kony.print("\n\n ------------in updatePushSubscription--------------------\n");
    //audienceFirstName=frmProfile.txtBoxFname.text;
    if (frmProfile.txtBoxFname.text == null || frmProfile.txtBoxFname.text == "") {
        alert("Please enter first name");
        return;
    } else if (nameRegExp.test(frmProfile.txtBoxFname.text)) {
        alert("Invalid character " + "'" + nameRegExp.exec(frmProfile.txtBoxFname.text) + "'");
        return;
    }
    //	audienceLastName=frmProfile.txtBoxLname.text;
    if (frmProfile.txtBoxLname.text == null || frmProfile.txtBoxLname.text == "") {
        alert("Please enter last name");
        return;
    } else if (nameRegExp.test(frmProfile.txtBoxLname.text)) {
        alert("Invalid character " + nameRegExp.exec(frmProfile.txtBoxLname.text));
        return;
    }
    //audienceEmail=frmProfile.txtBoxEmail.text;
    if (frmProfile.txtBoxEmail.text == null || frmProfile.txtBoxEmail.text == "") {
        alert("Please enter email id");
        return;
    } else if (emailReg.test(frmProfile.txtBoxEmail.text) == false) {
        alert("Please enter valid email..");
        return;
    }
    if (selectedCountry == null || selectedCountry == "") {
        alert("Please enter Country name");
        return;
    }
    /*else if(nameRegExp.test(frmProfile.txtBoxCountry.text))
    {
    		alert("Invalid character "+"'"+nameRegExp.exec(frmProfile.txtBoxCountry.text)+"'");
    		return;
    }*/
    if (frmProfile.txtBoxState.text == null || frmProfile.txtBoxState.text == "") {
        frmProfile.txtBoxState.text == " ";
        //alert("Please enter State name");
        //return;
    }
    /*else if(nameRegExp.test(frmProfile.txtBoxState.text))
      	{
      			alert("Invalid character "+"'"+nameRegExp.exec(frmProfile.txtBoxState.text)+"'");
      			return;
      	}*/
    //audienceMob=frmProfile.txtBoxMob.text;
    if (frmProfile.txtBoxMob.text == null || frmProfile.txtBoxMob.text == "") {
        alert("Please enter mobile number");
        return;
    } else if (mobReg.test(frmProfile.txtBoxMob.text) == false) {
        alert("Please enter valid mobile number with country code");
        return;
    }
    /*kony.print("\n"+audienceFirstName);
    kony.print("\n"+audienceLastName);
    kony.print("\n"+audienceEmail);
    kony.print("\n"+audienceMob);
    kony.print("\n"+audienceEmailSubs);
    kony.print("\n"+audienceSmsSubs);
    kony.print("\nforms");
    kony.print("\n"+frmProfile.txtBoxFname.text);
    kony.print("\n"+frmProfile.txtBoxLname.text);
    kony.print("\n"+frmProfile.txtBoxEmail.text);*/
    if ((audienceFirstName == frmProfile.txtBoxFname.text) && (audienceLastName == frmProfile.txtBoxLname.text) && (audienceCountry == frmProfile.txtBoxCountry.text) && (audienceState == frmProfile.txtBoxState.text) && (audienceEmail == frmProfile.txtBoxEmail.text) && (audienceMob == frmProfile.txtBoxMob.text) && (audienceEmailSubs == emailStatusBefore) && (audienceSmsSubs == smsStatusBefore) && (audiencePushSubs == pushStatusBefore)) {
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
        audienceCountry = frmProfile.txtBoxCountry.text;
        audienceState = frmProfile.txtBoxState.text;
        audienceMob = frmProfile.txtBoxMob.text;
        //	audiencePushSubs=true;
        //	audienceSmsSubs=true;
        //	audienceEmailSubs=true;
        //	emailStatusBefore=true;
        //	smsStatusBefore=true;
        //	pushStatusBefore=true;
    }
    /*function asyncCallback(status, result) 
	{
    	kony.print("\n------status------>"+status);
		if(status==400)
		{
			kony.print("\n\n----in result------>"+JSON.stringify(result) );
			if(result["subscriptionResponse"]!=undefined){
				if(result["subscriptionResponse"]["statusCode"]==200){
					kony.print("\n subscription updated\n");
					isPushSubs=true;
					kony.application.dismissLoadingScreen();
				//	kony.timer.schedule("mytimer123",geoPosition,60, true);
					updateAudience();
					//geoPosition();
				}
			}else
				kony.application.dismissLoadingScreen();
		}
	}*/
    kony.print("\n\n<----------in updateSubscription-------->\n\n");
    var payload = {
        "subscriptionService": {
            "subscribe": {
                "sid": registrationID,
                "appId": KMSPROP.appId,
                "ufid": audienceEmail,
                "osType": opSystem,
                "deviceId": kony.os.deviceInfo().deviceid
            }
        }
    };
    var jsonPayload = JSON.stringify(payload);
    var inputParamTable = {
        httpheaders: {
            "Content-Type": "application/json"
        },
        postdata: jsonPayload,
        channel: "rc"
    };
    var pushSubscUrl = KMSPROP.kmsServerUrl + "/subscription";
    //var pushSubscUrl="http://10.10.12.64:8282/kpns/subscription";
    // kony.print("\n pushSubscUrl:-"+pushSubscUrl);
    // kony.print("\ninputParamTable:-"+JSON.stringify(inputParamTable));
    try {
        if (firstRegister == true) {
            kony.application.showLoadingScreen("sknLoading", "creating...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        } else {
            kony.application.showLoadingScreen("sknLoading", "updating...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        }
        var connHandle = kony.net.invokeServiceAsync(pushSubscUrl, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexception in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
        kony.application.dismissLoadingScreen();
    }
}
//////////////////////////////////////////////
//Subscribing to KMS server.
function updatePushSubscription() {
    kony.print("\n\n ------------in updatePushSubscription--------------------\n");
    //audienceFirstName=frmProfile.txtBoxFname.text;
    if (frmProfile.txtBoxFname.text == null || frmProfile.txtBoxFname.text == "") {
        alert("Please enter first name");
        return;
    } else if (nameRegExp.test(frmProfile.txtBoxFname.text)) {
        alert("Invalid character " + "'" + nameRegExp.exec(frmProfile.txtBoxFname.text) + "'");
        return;
    }
    //	audienceLastName=frmProfile.txtBoxLname.text;
    if (frmProfile.txtBoxLname.text == null || frmProfile.txtBoxLname.text == "") {
        alert("Please enter last name");
        return;
    } else if (nameRegExp.test(frmProfile.txtBoxLname.text)) {
        alert("Invalid character " + nameRegExp.exec(frmProfile.txtBoxLname.text));
        return;
    }
    //audienceEmail=frmProfile.txtBoxEmail.text;
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
    /*else if(nameRegExp.test(frmProfile.txtBoxCountry.text))
    {
    		alert("Invalid character "+"'"+nameRegExp.exec(frmProfile.txtBoxCountry.text)+"'");
    		return;
    }*/
    if ((frmProfile.lstboxStates.isVisible == true) && (frmProfile.lstboxStates.selectedKeyValue[1] == null || frmProfile.lstboxStates.selectedKeyValue[1] == "")) {
        alert("Please select State name");
        return;
    }
    /*else if(nameRegExp.test(frmProfile.txtBoxState.text))
    {
    		alert("Invalid character "+"'"+nameRegExp.exec(frmProfile.txtBoxState.text)+"'");
    		return;
    }*/
    //audienceMob=frmProfile.txtBoxMob.text;
    if (frmProfile.txtBoxMob.text == null || frmProfile.txtBoxMob.text == "") {
        alert("Please enter mobile number");
        return;
    } else if (mobReg.test(frmProfile.txtBoxMob.text) == false) {
        alert("Please enter valid mobile number with country code");
        return;
    }
    /*kony.print("\n"+audienceFirstName);
    kony.print("\n"+audienceLastName);
    kony.print("\n"+audienceEmail);
    kony.print("\n"+audienceMob);
    kony.print("\n"+audienceEmailSubs);
    kony.print("\n"+audienceSmsSubs);
    kony.print("\nforms");
    kony.print("\n"+frmProfile.txtBoxFname.text);
    kony.print("\n"+frmProfile.txtBoxLname.text);
    kony.print("\n"+frmProfile.txtBoxEmail.text);*/
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
        //	audiencePushSubs=true;
        //	audienceSmsSubs=true;
        //	audienceEmailSubs=true;
        //	emailStatusBefore=true;
        //	smsStatusBefore=true;
        //	pushStatusBefore=true;
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
                    //	kony.timer.schedule("mytimer123",geoPosition,60, true);
                    if (kony.os.deviceInfo().name == "android") updateAudienceIOS();
                    else updateAudienceIOS();
                    geoPosition();
                }
            } else kony.application.dismissLoadingScreen();
        }
    }
    kony.print("\n\n<----------in updateSubscription-------->\n\n");
    var payload = {
        "subscriptionService": {
            "subscribe": {
                "sid": registrationID,
                "appId": KMSPROP.appId,
                "ufid": audienceEmail,
                "osType": opSystem,
                "deviceId": kony.os.deviceInfo().deviceid
            }
        }
    };
    var jsonPayload = JSON.stringify(payload);
    var inputParamTable = {
        httpheaders: {
            "Content-Type": "application/json"
        },
        postdata: jsonPayload,
        channel: "rc"
    };
    var pushSubscUrl = KMSPROP.kmsServerUrl + "/subscription";
    //var pushSubscUrl="http://10.10.12.64:8282/kpns/subscription";
    // kony.print("\n pushSubscUrl:-"+pushSubscUrl);
    kony.print("\ninputParamTable:-" + JSON.stringify(inputParamTable));
    try {
        if (firstRegister == true) {
            kony.application.showLoadingScreen("sknLoading", "Creating...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        } else {
            kony.application.showLoadingScreen("sknLoading", "updating...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        }
        var connHandle = kony.net.invokeServiceAsync(pushSubscUrl, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexception in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
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
    if (ostype == "android") ostype = "androidgcm";
    opSystem = ostype;
    kony.store.setItem("OSTYPE", opSystem);
    KMSPROP.kmsServerUrl = frmUrl.txtBoxUrl.text;
    KMSPROP.appId = frmUrl.txtBoxAppId.text;
    KMSPROP.senderID = frmUrl.txtBoxSenderID.text;

    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            kony.print("\n\n----in result------>" + JSON.stringify(result));
            if (result["subscriptionResponse"] != undefined) {
                if (result["subscriptionResponse"]["statusCode"] != undefined && result["subscriptionResponse"]["statusCode"] == 200) {
                    ksid = result["subscriptionResponse"]["ksid"];
                    kony.store.setItem("KSID", ksid);
                    /*KMSPROP.kmsServerUrl=frmUrl.txtBoxUrl.text;
                    KMSPROP.appId=frmUrl.txtBoxAppId.text;
                    KMSPROP.senderID=frmUrl.txtBoxSenderID.text;*/
                    kony.store.setItem("KMSURL", KMSPROP.kmsServerUrl);
                    kony.store.setItem("KMSAppID", KMSPROP.appId);
                    kony.store.setItem("KMSSenderID", KMSPROP.senderID);
                    isPushSubs = true;
                    audiencePushSubs = true;
                    kony.print("\npush subscription message:-" + result["subscriptionResponse"]["message"]);
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
        "subscriptionService": {
            "subscribe": {
                "sid": regId,
                "appId": KMSPROP.appId,
                //	"ufid": "xxx@xxxx.com",
                "osType": ostype,
                "deviceId": kony.os.deviceInfo().deviceid
            }
        }
    };
    var jsonPayload = JSON.stringify(payload);
    var inputParamTable = {
        httpheaders: {
            "Content-Type": "application/json"
        },
        postdata: jsonPayload,
        channel: "rc"
    };
    var pushSubscUrl = frmUrl.txtBoxUrl.text + "/subscription";
    //var pushSubscUrl="http://10.10.12.64:8282/kpns/subscription";
    kony.print("\n pushSubscUrl:-" + pushSubscUrl);
    kony.print("\ninputParamTable:-" + JSON.stringify(inputParamTable));
    try {
        // kony.application.showLoadingScreen("sknLoading","Please wait...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
        var connHandle = kony.net.invokeServiceAsync(pushSubscUrl, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexception in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
        kony.application.dismissLoadingScreen();
    }
}
/**
 * Name		:	subscribeKMS
 * Author	:	kony
 * Purpose	:	To subscribe for the push notification on the KMS.
 **/
function subscribeKMS(regId, ostype) {
    if (ostype == "android") ostype = "androidgcm";
    //audiencePushSubs=false;
    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            //kony.application.dismissLoadingScreen();
            kony.print("\n\n----in KMSregCallback------>\n");
            kony.print("Result$#.------>" + JSON.stringify(result));
            var tmp = result["subscriptionResponse"][0];
            kony.print("\n tmp->" + result["subscriptionResponse"][0]);
            if (result["subscriptionResponse"][0]["statusCode"] == "200") {
                ksid = result["subscriptionResponse"][0]["ksid"];
                kony.print("Device subscribed to Kony Engagement service sucessfully..");
                //alert("Device subscribed to Kony Engagement service sucessfully..");
                //kony.store.setItem("ksid",ksid);
                //audiencePushSubs=true;
                //if(subsFrom=="preference")
                //	editAudience2();
                //updateLocations();
                //	kony.timer.schedule("mytimer123",geoPosition, 60, true);
            } else {
                alert("Failed to subscribe to Kony Engagement Service!!" + result["subscriptionResponse"][0]["message"]);
                ksid = null;
                audiencePushSubs = false;
                kony.application.dismissLoadingScreen();
            }
        }
    }
    kony.print("\n\n<----------in subscribeKMS-------->\n\n");
    var ipurl = KMSPROP.kmsServerUrl.substring(8);
    var inputParamTable = {
        serviceID: "subkms",
        appID: "kmsapp",
        channel: "rc",
        appId: KMSPROP.appId,
        deviceId: kony.os.deviceInfo().deviceid,
        ufid: audienceEmail,
        sid: regId,
        osType: ostype,
        kmsurl: ipurl
    };
    kony.print("\n-----inputparamtable is" + JSON.stringify(inputParamTable));
    var url = appConfig.url;
    kony.print("\n----url----->" + url);
    try {
        // kony.application.showLoadingScreen("sknLoading","Please wait...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
        var connHandle = kony.net.invokeServiceAsync(url, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexception in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
        kony.application.dismissLoadingScreen();
    }
}
/**
 * Name		:	unsubscribeKMS
 * Author	:	Kony
 * Purpose	:	To unsubscribe from the push notification.
 **/
function unsubscribeKMS() {
    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            kony.print("\nUnsubscription result" + JSON.stringify(result));
            if (result["subscriptionResponse"] != undefined) {
                if (result["subscriptionResponse"][0]["statusCode"] != undefined && result["subscriptionResponse"][0]["statusCode"] == "200") {
                    kony.print("\n" + result["subscriptionResponse"][0]["message"]);
                    ksid = null;
                    kony.store.removeItem("ksid");
                    //kony.store.setItem("ksid", ksid);
                    try {
                        kony.timer.cancel("mytimer123");
                    } catch (err) {
                        kony.print("error in canceling timer:: " + err);
                    }
                    kony.print("----------------ksid after registration is------ " + ksid);
                    kony.print("ksid after uncubscription is " + ksid);
                    kony.print("unsubscription successful");
                    kony.print("ksid after registration is " + ksid);
                    //alert("Device Unsubscribed to Kony Engagement service sucessfully..");
                }
            } else {
                alert("Unable to unsubscribe from KMS\nplease try later..");
                //frmPreference.checkBxPreference
            }
            //	kony.application.dismissLoadingScreen();
        }
    }
    kony.print("\n\n<----------in UnsubscribeKMS-------->\n\n");
    var ipurl = KMSPROP.kmsServerUrl.substring(8);
    var inputParamTable = {
        serviceID: "unsubkms",
        appID: "kmsapp",
        channel: "rc",
        ksId: ksid,
        appId: KMSPROP.appId,
        deviceId: KMSPROP.deviceId,
        kmsurl: ipurl
    };
    var url = appConfig.url;
    kony.print("\n----url----->" + url);
    kony.print("input paramenters for unsubscription \n" + JSON.stringify(inputParamTable));
    try {
        kony.application.showLoadingScreen("sknLoading", "Unsubscribing from push notification...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        var connHandle = kony.net.invokeServiceAsync(url, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
        kony.application.dismissLoadingScreen();
    }
}
/**
 * Name		:	KMSunregCallback
 * Author	:	Kony
 * Purpose	:	Callback for the deregistration event from the KMS.
 **/
function KMSunregCallback(status, result) {
    kony.print(JSON.stringify(result));
    if (status == 400) {
        kony.print("$#." + JSON.stringify(result));
        // alert("result:"+result);
        var tmp = result["subscriptionResponse"][0];
        //ksid = tmp["ksid"];
        if ((tmp["statusCode"] == 200)) {
            //alert("Device unsubscribed from Kony Engagement Service sucessfully..");
            kony.print(tmp["message"]);
            alert(tmp["message"]);
        } else alert("Failed to unsubscribe from Kony Engagement Service!!" + tmp["message"]);
    }
}
/**
 * Name		:	pushdeRegister
 * Author	:	Kony
 * Purpose	:	To deregister from the GCM/APNS.
 **/
function pushdeRegister() {
    //kony.print("************ JS unregisterFromAPNS() called *********");
    kony.application.showLoadingScreen("sknLoading", "Deregistering from push notification..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
    kony.push.deRegister({});
    audiencePushSubs = false;
    editAudience2();
}
/**
 * Name		:	pushRegistration
 * Author	:	Kony
 * Purpose	:	To register the device to the GCM/APNS.
 **/
function pushRegistration() {
    kony.print("\n\n----in pushRegister----\n");
    //subsFrom=from;
    isDeleteAudience = false;
    var devName = kony.os.deviceInfo().name;
    //	alert("devName" + devName);
    kony.application.showLoadingScreen("sknLoading", "please wait..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
    if (devName == "android") {
        callbackAndroidSetCallbacks();
        callbackAndroidRegister();
    } else if ((devName == "iPhone") || (devName == "iPhone Simulator") || (devName == "iPad") || (devName == "iPad Simulator")) {
        callbackiPhoneSetCallbacks();
        callbackiPhoneRegister();
    }
}

function checkStorage() {
    audienceID = kony.store.getItem("audienceID");
    accessSecret = kony.store.getItem("accessSecret");
    accessToken = kony.store.getItem("accessToken");
    kmsUrl = kony.store.getItem("KMSURL");
    kony.print("\naccessSecret-->" + accessSecret);
    kony.print("\naccessToken-->" + accessToken);
    kony.print("\naudienceID-->" + audienceID);
    if ((accessSecret != null) && (accessToken != null) && (audienceID != null)) {
        kony.print("entered with access token and secrete");
        ipurl = kmsUrl.substring(8);
        getAudience();
        return frmHome;
    } else {
        kony.print("entered without access token and secrete");
        return frmOption;
        //  frmSplash.destroy();
        //return for
    }
}

function CountryState() {}