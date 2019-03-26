var country="India";
/**
 * Name		:	frmProfilePreShow
 * Author	:	Kony
 * Purpose	:	For setting some values to the form in the preshow of it.
**/
function frmProfilePreShow()
{
         if(audienceID!=null)
    			{   
    			  // getAudience();       
    			}
    			else{
    			 frmProfile.btnSubmitProfile.text ="DONE";   			  
    			}
	
}

////////////////////////////////////////
function updateAudience(){
	kony.print("\n\n-----------in update audience---------------\n");
	function onReadyStateChange()
	{
		kony.print("\nonReadyStateChange:-"+JSON.stringify(this));
		if(this.response!==null ){
  		  			kony.print("\nResponse:- "+JSON.stringify(this.response));	    
				   	var jsonResponse=JSON.parse(this.response);
       		if(this.statusText=="OK"){
  			//update is successfull.
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
    				setpreferences();
    				updateMessaageAlert(jsonResponse["message"]);
  			}else{
  				alert(jsonResponse["message"]);
  			}
  			kony.application.dismissLoadingScreen();
  		}
	}
	
	
  		audienceStatus=true;
    	if(audienceSmsSubs==undefined||audienceSmsSubs==null){
    		audienceSmsSubs=true;
    		}
    	if(audienceEmailSubs==undefined||audienceEmailSubs==null){
    		audienceEmailSubs=true;}
    		
    	var httpclient1 = new kony.net.HttpRequest();
  		httpclient1.onReadyStateChange=onReadyStateChange();
  		httpclient1.timeout=0;
		var requestMethod = constants.HTTP_METHOD_POST;	
		var async = true;
		var url=KMSPROP.kmsServerUrl+"/api/v1/subscribeaudience";
  		
  		//kony.print("\n httpclient1 before:-"+JSON.stringify(httpclient1));
  		httpclient1.open(requestMethod, url,async);
		httpclient1.setRequestHeader("Content-Type","application/json");
  		
  		//kony.print("\n httpclient1 after:-"+JSON.stringify(httpclient1));
  		var frmData = new kony.net.FormData();
		
		var payload1='{'
  		+'"ksid":'+ksid+',' 
  		+'"lastName" :'+'\"'+audienceLastName+'\",'
  		+'"email" : '+'\"'+audienceEmail+'\",'
  		+'"active" :'+ audienceStatus+','
  		+'"firstName" :'+'\"'+audienceFirstName+'\",'
  		+'"mobileNumber" :'+'\"'+audienceMob+'\",'
  		+'"smsSubscription" :'+ audienceSmsSubs+','
  		+'"emailSubscription":'+audienceEmailSubs+','
  		+'"country":'+'\"'+audienceCountry+'\",'
  		+'"state":'+'\"'+audienceState+'\",'
  		+'"pushSubscription":'+audiencePushSubs
  		+'}';
		frmData.append("postdata",payload1);
		if(firstRegister==true){
		kony.application.showLoadingScreen("sknLoading","creating..",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
		}
		else{
		kony.application.showLoadingScreen("sknLoading","updating..",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
		}
		kony.print("\npayload1:-"+payload1);
		httpclient1.send(frmData);
  		
  
	
}
///////////////////////////////////////

function updateAudienceIOS(){
	kony.print("\n\n-----------in update audience---------------\n");
	function asyncCallback(status, result) 
	{
    	kony.print("\n------status------>"+status);
    	kony.print("\n result:-"+JSON.stringify(result));
    	if(status==400 && result["httpresponse"]!=undefined)
    	{
    			if(result["httpresponse"]["responsecode"]==400){
    				kony.print("\nError in updateAudience:-\n"+ JSON.stringify(result));
    				alert("User already exists with this email/Mobile.");
    				return;
    			}else if(result["httpresponse"]["responsecode"]==200){
    				kony.print("\n result:-"+JSON.stringify(result));
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
    				setpreferences();
    				updateMessaageAlert(result["message"]);
    			}
    	//		frmTest.textArea1.text=frmTest.textArea1.text+"\n"+JSON.stringify(result);
    	}
    	kony.application.dismissLoadingScreen();
    }
  	
  		audienceStatus=true;
    	if(audienceSmsSubs==undefined||audienceSmsSubs==null){
    		audienceSmsSubs=true;
    		}
    	if(audienceEmailSubs==undefined||audienceEmailSubs==null){
    		audienceEmailSubs=true;}
    		
	  	var payload1='{'
	  		+'"ksid":'+ksid+',' 
	  		+'"lastName" :'+'\"'+audienceLastName+'\",'
	  		+'"email" : '+'\"'+audienceEmail+'\",'
	  		+'"active" :'+ audienceStatus+','
	  		+'"firstName" :'+'\"'+audienceFirstName+'\",'
	  		+'"mobileNumber" :'+'\"'+audienceMob+'\",'
	  		+'"smsSubscription" :'+ audienceSmsSubs+','
	  		+'"emailSubscription":'+audienceEmailSubs+','
	  		+'"country":'+'\"'+audienceCountry+'\",'
	  		+'"state":'+'\"'+audienceState+'\",'
	  		+'"pushSubscription":'+audiencePushSubs
	  		+'}';
	  		
	  	kony.print("\npayload1:-"+payload1);
		var inputParamTable={
				httpheaders:{
	            	"Content-Type":"application/json"
	            	},
				postdata:payload1
			
    };
    try{
		var url=KMSPROP.kmsServerUrl+"/api/v1/subscribeaudience";
	   	kony.print("\nurl-->"+url);
	   	kony.print("\n ipTable-->"+JSON.stringify(inputParamTable));
	   	kony.application.showLoadingScreen("sknLoading","updating..",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
	   	var connHandle = kony.net.invokeServiceAsync(
                        url,inputParamTable,asyncCallback);
	}catch(err){
    	kony.print("\nexeption in invoking service---\n"+JSON.stringify(err));
		alert("Error"+err);
    }	
}



/**
 * Name		:	ManageProfile
 * Author	:	Kony
 * Purpose	:	To Update the Audience modifications.
**/
function manageProfile(){
        if(audienceID==null )
        {   
             registerAudience();
        }
        else if(initialReg == true){
            frmPreference.show();
        }
        else if((audienceFirstName ==frmProfile.txtBoxFname.text) && (audienceLastName == frmProfile.txtBoxLname.text) && (audienceEmail==frmProfile.txtBoxEmail.text) && (audienceMob==frmProfile.txtBoxMob.text))
               {
                 frmHome.show();
                }
          else{
        
            updateDeatils();
        }
}



/**
 * Name		:	updateActivityStatus
 * Author	:	Kony
 * Purpose	:	To update the activity status of the User while updating the details.
**/
function updateActivityStatus(list){
	if(list["selectedKeys"][0]=="1")
		audienceStatus=true;
	else
		audienceStatus=false;
	
}

function pushPrefSubs(){
	function asyncCallback(status, result) 
	{
    	kony.print("\n------status------>"+status);
		if(status==400)
		{
			kony.print("\n\n----in result------>"+JSON.stringify(result) );
			if(result["subscriptionResponse"]!=undefined){
				if(result["subscriptionResponse"]["statusCode"]=200){
					kony.print("\n subscription updated\n");
					updateAudience();
				}
			}
			kony.application.dismissLoadingScreen();
		}
	}
	kony.print("\n\n<----------in updateSubscription-------->\n\n");
    var payload={
 			"subscriptionService": {
  				"subscribe": {
  	 				"sid": registrationID,
  	 				"appId": KMSPROP.appId,
   					"ufid": audienceEmail,
  	 				"osType":opSystem,
  		 			"deviceId":kony.os.deviceInfo().deviceid
  					}
 				}
			};
	var jsonPayload=JSON.stringify(payload);
	var inputParamTable={
			 httpheaders:{
            	"Content-Type":"application/json"
            	},
       			postdata:jsonPayload,
       		channel:"rc"
			};
    //var pushSubscUrl=KMSPROP.kmsServerUrl+"/subscription";
	var pushSubscUrl="http://10.10.12.64:8282/kpns/subscription";
   // kony.print("\n pushSubscUrl:-"+pushSubscUrl);
   // kony.print("\ninputParamTable:-"+JSON.stringify(inputParamTable));
    try{ 
   		// kony.application.showLoadingScreen("sknLoading","Please wait...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true,null);
	   var connHandle = kony.net.invokeServiceAsync(
                        pushSubscUrl,inputParamTable,asyncCallback);
	}catch(err){
     	kony.print("\nexception in invoking service---\n"+JSON.stringify(err));
	  	alert("Error"+err);
	  	kony.application.dismissLoadingScreen();
    }
}
function pushPrefUnSubs(){
}



/**
 * Name		:	updateDeatils
 * Author	:	Kony
 * Purpose	:	To update the details oh the User.
**/
function updateDeatils()
{
	kony.print("\nksid->"+ksid);
	if((isPushSubs==false) && (audiencePushSubs==true))
	{
		if(kony.os.deviceInfo().name=="iPhone Simulator"){
			alert("Push doesn't support in iPhone simulator.");
			return;
		}else{
			updatePushSubscription();
		}
	}else if((isPushSubs==true)&&(audiencePushSubs==false))
	{
		//pushdeRegister();
		kony.print("---------------push de registering-----------");
		unSubscribePushSubscription();
		
	}else
		updateAudience();
}



/**
 * Name		:	updateMessaageAlert
 * Author	:	Kony
 * Purpose	:	To display the messages as an alert.
**/
function updateMessaageAlert(msg)
{
	//Defining basicConf parameter for alert
	var basicConf = {message:msg ,alertType: constants.ALERT_TYPE_INFO};
	//Defining pspConf parameter for alert
	var pspConf = {};
	//Alert definition
	var infoAlert = kony.ui.Alert(basicConf,pspConf);
}

/**
 * Name		:	trigger updateMessaageAlert
 * Author	:	Kony
 * Purpose	:	To display the messages as an alert.
**/
function triggerUpdateMessaageAlert(msg)
{
	//Defining basicConf parameter for alert
	var basicConf = {message:msg ,alertType: constants.ALERT_TYPE_INFO, alertHandler: handle2};
	//Defining pspConf parameter for alert
	var pspConf = {};
	//Alert definition
	var infoAlert = kony.ui.Alert(basicConf,pspConf);
	function handle2(response)
	{
		kony.print(JSON.stringify(response));
		var response = JSON.stringify(response);
		if(response == "true")
		{
		   frmEvent.txtBoxEventId.text=null;
		}
	}	
}






