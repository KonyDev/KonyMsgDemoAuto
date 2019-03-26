/**
 * Name		:	callbackAndroidRegister
 * Author	:	Kony
 * Purpose	:	This function register the senderID on the google cloud.
**/
function callbackAndroidRegister()
{
	KMSPROP.senderID=frmUrl.txtBoxSenderID.text;
  	kony.print("senid:"+KMSPROP.senderID)
	var configToRegister = {senderid:KMSPROP.senderID};
	kony.push.register(configToRegister);
}
/**
 * Name		:	callbackAndroidSetCallbacks
 * Author	:	Kony
 * Purpose	:	This function sets the callback for registration,deregistration & pushnotification events.
**/
function callbackAndroidSetCallbacks()
{
	kony.print("\n\n\n<--------in callbackAndroidSetCallbacks--------->\n\n\n");
 	kony.push.setCallbacks({onsuccessfulregistration: regSuccessAndroidCallback, onfailureregistration: regFailureAndroidCallback,
 						    onlinenotification: onlinePushNotificationAndroidCallback, offlinenotification: offlinePushNotificationAndroidCallback,
 						    onsuccessfulderegistration: unregSuccessAndroidCallback, onfailurederegistration:unregFailureAndroidCallback });
	localAndroidNotificationCallBacks();
}

function localAndroidNotificationCallBacks() {
    try {
        kony.localnotifications.setCallbacks({
            "offlinenotification": offlineAndroidLocalNotification,
            "onlinenotification": onlineAndroidLocalNotification
    });
    } catch (err) {
        kony.print("Error Code " + err.errorCode + " Message " + err.message);
    }
}

function onlineAndroidLocalNotification(msg,id)
{
  
  kony.print("JSON.stringify(msg)");
//   frmHome.show();
}

function offlineAndroidLocalNotification(msg,id)
{
  kony.print("JSON.stringify(msg)");
//   frmHome.show();
}


/**
 * Name		:	regSuccessAndroidCallback
 * Author	:	Kony
 * Purpose	:	This function is the callback for the successful registration of the device to the GCM server & returns the callerID.
 * 
**/
function regSuccessAndroidCallback(regId)
{
	kony.print("\n\n\n<--------in regSuccessAndroidCallback--------->\n\n\n");
	kony.print("\nRegistration Id-->"+JSON.stringify(regId));
    kony.store.setItem("isFirstTime","true");
	pushSubscription(regId,"android");
}
/**
 * Name		:	regFailureAndroidCallback
 * Author	:	Kony
 * Purpose	:	This function is the callback for the registration failure to the GCM server.
**/
function regFailureAndroidCallback(errormsg)
{
	kony.print(errormsg);
	audiencePushSubs=false;
	kony.application.dismissLoadingScreen();
	alert("Registration Failed ");
}
/**
 * Name		:	onlinePushNotificationAndroidCallback
 * Author	:	Kony
 * Purpose	:	This function is the callback for the received push msg event while online.
**/
function onlinePushNotificationAndroidCallback(msg)
{
	kony.print("************ JS onlinePushNotificationCallback() called *********");
	kony.print(JSON.stringify(msg));
  if(msg["content-available"]!=1)
    {
	if(msg["isRichPush"]!=undefined){
		displayRichPush(msg);
	}else
	alert("Message: "+msg["content"]);
    }
  else
    {
      alert("Silent Push Received");
    }
} 
function displayRichPush(msg){
	var basicConf = {
		message: msg["content"],
		alertType: constants.ALERT_TYPE_CONFIRMATION,
		alertTitle:'"Rich Push Message"',yesLabel:"show",
	noLabel:"skip","alertIcon": "conf.png", alertHandler: handle2};
	var pspConf = {};
	kony.ui.Alert(basicConf,pspConf);
	function handle2(response)
	{
		kony.print(JSON.stringify(response));
		var response = JSON.stringify(response);
		if(response == "true")
		{
		   var url=KMSPROP.kmsServerUrl+"/api/v1/messages/rich/"+msg["mid"];
		   kony.print("rich push url:-"+url);
		   frmBrowser.txtBoxUrl.text=url;
		   frmBrowser.browserRichPush.url=url;
		   frmBrowser.show();
		}
		else
		{
		   return;
		 }
		
	}
}
function getRichMsg(mid){
	function asyncCallback(status,response){
		if(status==400){
		kony.print("\nRich text fetched successfully:-"+response);
		kony.application.dismissLoadingScreen();
		}
	}
	var inputParamTable={httpconfig:{method:"GET"}};
    var url=KMSPROP.kmsServerUrl+"/api/v1/messages/rich/"+mid;
    kony.print("\n-----inputparamtable is"+JSON.stringify(inputParamTable));
    kony.print("\n----url----->"+url) ; 
    try{ 
    kony.application.showLoadingScreen("sknLoading","updating...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
	   var connHandle = kony.net.invokeServiceAsync(
                        url,inputParamTable,asyncCallback);
	}catch(err){
     	kony.print("\nexeption in invoking service---\n"+JSON.stringify(err));
	  	alert("Error"+err);
    }	
}
/**
 * Name		:	offlinePushNotificationAndroidCallback
 * Author	:	Kony
 * Purpose	:	This function is the callback for the received push msg event while offline
**/
function offlinePushNotificationAndroidCallback(msg)
{
	kony.print("************ JS offlinePushNotificationCallback() called *********");
	kony.print(msg);
  if(msg["content-available"]!=1){
    	alert("Message: "+msg["content"]);}
  else{
    alert("silent push received");
  }
}
/**
 * Name		:	unregSuccessAndroidCallback
 * Author	:	Kony
 * Purpose	:	This is the callback for the successful unregistration from the GCM server.
**/
function unregSuccessAndroidCallback()
{
	kony.print("Unregisterd Succesfully!!");
	kony.application.dismissLoadingScreen();
	unsubscribeKMS();
}
/**
 * Name		:	unregFailureAndroidCallback
 * Author	:	Kony
 * Purpose	:	This is the callback for the unsuccessful deregistration from the GCM server.
**/
function unregFailureAndroidCallback(errormsg)
{
	alert(" Unregistration Failed!!");
	alert("Error message: "+JSON.stringify(errormsg));
	kony.application.dismissLoadingScreen();
}