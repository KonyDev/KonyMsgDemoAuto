
function p2kwiet428023489458_btnReload_onClick_seq0(eventobject){

reloadCOntent.call(this);

};


function p2kwiet428023489469_frmEvent_preshow_seq0(eventobject,    neworientation){

frmEvent.lblInfo2.setVisibility(false);

};


function p2kwiet428023489469_txtBoxEventId_onTextChange_seq0(eventobject,    changedtext){

frmEvent.lblInfo2.setVisibility(false);

};


function p2kwiet428023489469_btnSubmitProfile_onClick_seq0(eventobject){

triggerEvent.call(this);

};


function p2kwiet428023489493_vbox214054342110889_onClick_seq0(eventobject){

frmProfile.show();
	
};


function p2kwiet428023489493_vbox214054342112105_onClick_seq0(eventobject){

frmPreference.show();
	
};


function p2kwiet428023489493_vbox214054342115915_onClick_seq0(eventobject){

frmEvent.show();
	
};


function p2kwiet428023489493_vbox15865480716587_onClick_seq0(eventobject){

frmEvent.show();
	
};


function p2kwiet428023489493_button158654807166987_onClick_seq0(eventobject){

locate_iBeacons.call(this);

};


function p2kwiet428023489493_button214054342124383_onClick_seq0(eventobject){

frmSetting.show();
	
};


function p2kwiet428023489501_frmOption_postshow_seq0(eventobject,    neworientation){

showOptionPopUp.call(this);

};


function p2kwiet428023489520_frmPreference_preshow_seq0(eventobject,    neworientation){

setpreferences.call(this);

};


function p2kwiet428023489520_btnSubmitProfile_onClick_seq0(eventobject){

preferences.call(this);

};


function p2kwiet428023489545_frmProfile_preshow_seq0(eventobject,    neworientation){

frmProfilePreShow.call(this);

};


function p2kwiet428023489545_frmProfile_postshow_seq0(eventobject,    neworientation){


 /* 
countryName.call(this);

 */ 

};


function p2kwiet428023489545_frmProfile_init_seq0(eventobject,    neworientation){

countryName.call(this);

};


function p2kwiet428023489545_listbox5316540885527_onSelection_seq0(eventobject){

selectedCountry=frmProfile.listbox5316540885527.selectedKeyValue[1];
if(selectedCountry=="United States"){
frmProfile.lstboxStates.placeholder="Select State";
frmProfile.lstboxStates.setVisibility(true);
frmProfile.lineState.setVisibility(true);
}else{

frmProfile.lstboxStates.setVisibility(false);
frmProfile.lineState.setVisibility(false);

selectedState="";
}

 /* 
CountryState.call(this);

 */ 

};


function p2kwiet428023489545_lstboxStates_onSelection_seq0(eventobject){

selectedState=frmProfile.lstboxStates.selectedKeyValue[1];
//alert(selectedState);

};


function p2kwiet428023489545_btnSubmitProfile_onClick_seq0(eventobject){

updatePushSubscription.call(this);

};


function p2kwiet428023489565_frmSetting_preshow_seq0(eventobject,    neworientation){

frmSetting.txtBoxurl.text=KMSPROP.kmsServerUrl;
frmSetting.txtBoxAppId.text=KMSPROP.appId;
frmSetting.txtBoxSenderID.text=KMSPROP.senderID;   

};


function p2kwiet428023489565_btnReset_onClick_seq0(eventobject){

resetDemo.call(this);

};


function p2kwiet428023489565_txtBoxurl1_onTextChange_seq0(eventobject,    changedtext){

frmSetting.txtBoxurl.text="https://mycompany.messaging. konycloud.com";


};


function p2kwiet428023489565_btnSubmitProfile_onClick_seq0(eventobject){

resetback.call(this);

};


function p2kwiet428023489589_frmUrl_preshow_seq0(eventobject,    neworientation){


frmUrl.txtBoxUrl.text=KMSPROP.kmsServerUrl;
frmUrl.txtBoxAppId.text=KMSPROP.appId;
frmUrl.txtBoxSenderID.text=KMSPROP.senderID;
firstRegister=true;



};


function p2kwiet428023489589_linkAccount_onClick_seq0(eventobject){

kony.application.openURL("http://www.kony.com/trials");

};


function p2kwiet428023489589_btnSubmitProfile_onClick_seq0(eventobject){

pushRegistration.call(this);

};


function p2kwiet428023489603_btnCancel_onClick_seq0(eventobject){

negativeSelection.call(this);

};


function p2kwiet428023489603_btnProceed_onClick_seq0(eventobject){

positiveSelection.call(this);

};


function kmsapppreappinit_seq0(params){

setApplicationCallBacks.call(this);

};


function kmsapppostappinit_seq0(params){

preAppinit.call(this);

};

