/**
  * this module is for declaring all the global variables 
  * used over the app.
 */
var audienceStatus, audienceFirstName, audienceLastName, audienceEmail, audienceSmsSubs, audiencePushSubs, audienceEmailSubs, audienceMob, audienceCountry, audienceState;
var ksid;
var selectedCountry;
var selectedState;
var registrationID;
var opSystem;
var isPushSubs = false;
var firstRegister;
var isDeleteAudience;
var nameRegExp = /[\W]/i;
var emailReg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var mobReg = /^(\+)(\d{1,3})(\d{10})$/;
audienceEmail = "";
audienceStatus = true;
audienceEmailSubs = false;
audiencePushSubs = false;
audienceSmsSubs = false;
smsStatusBefore = false;
emailStatusBefore = false;
pushStatusBefore = false;
initialReg = false;
var KMSPROP = {		
		kmsServerUrl:"",
        senderID :"", 
  		appId:"" 
};
