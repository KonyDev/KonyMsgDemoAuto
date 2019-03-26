var eventID;

function checkEvent() {
    if (frmEvent.txtBoxEventId.text == null) {
        alert("Please enter Event Id");
        return;
    }
    eventID = (frmEvent.txtBoxEventId.text).trim();
    if (eventID == "") {
        alert("Please enter Event Id");
        return;
    }
    //eventID=frmEvent.txtBoxEventId.text;
    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            kony.print("\nEvent details:->" + JSON.stringify(result));
            if (result.errcode != undefined || result.errmsg != undefined) {
                kony.print("error message:");
                alert("Unable to trigger this event..");
                kony.application.dismissLoadingScreen();
                return;
            } else {
                if (result.isPush == false) {
                    kony.print("\n\n-push disabled event\n");
                    var inputParamTable = {
                        httpheaders: {
                            "AccessSecret": accessSecret,
                            "AccessToken": accessToken,
                            "Content-Type": "application/json"
                        },
                        serviceID: "ExceptPush",
                        appID: "kmsapp",
                        channel: "rc",
                        "audienceID": audienceID,
                        "lname": audienceLastName,
                        "fname": audienceFirstName,
                        "eventID": eventID,
                        "kmsurl": ipurl
                    };
                    /*	var inputParamTable={
            				httpheaders:{
                				"AccessSecret":"1db816f00982124a3e4d069ddf5eada8cd624f52",
            					"AccessToken":"103e28fd07da33a4ae3e2029eacf0d8f2733e722",
            					"Content-Type":"application/json"
            					},
							serviceID:"ExceptPush",appID:"kmsapp",channel:"rc",
							"audienceID":"446",
							"lname":"Narayana",
							"fname":"Vadithya",
							"eventID":"12",
							"kmsurl":"mobilefabric-demo.messaging.konycloud.com"
					};*/
                    kony.application.dismissLoadingScreen();
                    triggerEvent(inputParamTable);
                } else if (result.isPush == true) {
                    kony.print("\n\n--push enabled event\n");
                    var inputParamTable = {
                        httpheaders: {
                            "AccessSecret": accessSecret,
                            "AccessToken": accessToken,
                            "Content-Type": "application/json"
                        },
                        serviceID: "WithPush",
                        appID: "kmsapp",
                        channel: "rc",
                        "audienceID": audienceID,
                        "lname": audienceLastName,
                        "fname": audienceFirstName,
                        "ksid": ksid,
                        "eventID": eventID,
                        "kmsurl": ipurl
                    };
                    /*	var inputParamTable={
            				httpheaders:{
                				"AccessSecret":"1db816f00982124a3e4d069ddf5eada8cd624f52",
            					"AccessToken":"103e28fd07da33a4ae3e2029eacf0d8f2733e722",
            					"Content-Type":"application/json"
            					},
							serviceID:"ExceptPush",appID:"kmsapp",channel:"rc",
							"audienceID":"446",
							"lname":"Narayana",
							"fname":"Vadithya",
							"eventID":"11",
							"kmsurl":"mobilefabric-demo.messaging.konycloud.com",
							"ksid":"2365876614831262922"
					};*/
                    kony.application.dismissLoadingScreen();
                    triggerEvent(inputParamTable);
                }
            }
            //kony.application.dismissLoadingScreen();  		
        }
    }
    var inputParamTable = {
        httpheaders: {
            AccessSecret: accessSecret,
            AccessToken: accessToken,
            Accept: "*/*"
        },
        httpconfig: {
            method: "get"
        }
    };
    //var url="https://mobilefabric-demo.messaging.konycloud.com/api/v1/events/"+eventID;
    var url = KMSPROP.kmsServerUrl + "/api/v1/events/" + eventID;
    kony.print("\n-----inputparamtable is" + JSON.stringify(inputParamTable));
    kony.print("\nurl:-" + url);
    try {
        kony.application.showLoadingScreen("sknLoading", "fetching details..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        var connHandle = kony.net.invokeServiceAsync(url, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
    }
}
/**
 * Name		:	TriggerEvent
 * Author	:	kony
 * Purpose	:	To Trigger the existing event with Event ID on the KMS.
 **/
function triggerEvent() {
    if (frmEvent.txtBoxEventId.text == null || frmEvent.txtBoxEventId.text == "") {
        alert("Please enter event ID");
        return;
    }
    var payload1 = {
        "event": {
            "message": {
                "content": {
                    "priorityService": "false",
                    "mimeType": "text/plain"
                },
                "subscribers": {
                    "subscriber": [{
                        "ksid": ksid
                    }]
                }
            },
            "eventNamePairs": {
                "key": [{
                    "content": audienceLastName,
                    "name": "lastname"
                }, {
                    "content": audienceFirstName,
                    "name": "firstname"
                }]
            },
            "email": {
                "content": {
                    "priorityService": "false"
                },
                "recipients": {
                    "recipient": [{
                        "emailId": audienceEmail
                    }]
                },
                "from": {}
            },
            "sms": {
                "content": {
                    "priorityService": "false",
                    "mimeType": "text/plain"
                },
                "recipients": {
                    "recipient": [{
                        "mobile": audienceMob
                    }]
                }
            },
            "eventid": frmEvent.txtBoxEventId.text
        }
    };

    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        kony.print("\n result:-" + JSON.stringify(result));
        if (status == 400 && result["httpresponse"] != undefined) {
            if (result["httpresponse"]["responsecode"] == 400) {
                kony.print("\nError in updateAudience:-\n" + JSON.stringify(result));
                frmEvent.lblInfo2.setVisibility(false);
            } else if (result["httpresponse"]["responsecode"] == 200) {
                kony.print("\n result:-" + JSON.stringify(result));
                if (result["event"]["messageResponse"]["code"] == 200) {
                    frmEvent.lblInfo2.setVisibility(true);
                }
                alert(result["event"]["messageResponse"]["description"]);
            }
            kony.application.dismissLoadingScreen();
        }
    }
    var jsonPayload = JSON.stringify(payload1);
    var inputParamTable = {
        httpheaders: {
            "Content-Type": "application/json"
        },
        postdata: jsonPayload
            //channel:"rc"
    };
    try {
        var url = KMSPROP.kmsServerUrl + "/service/eventpushmessage";
        //var url="http://10.10.12.64:8282/kpns/api/v1/subscribeaudience/";
        //var url="https://kms-demo.messaging.qa-konycloud.com/service/eventpushmessage";
        kony.print("\nurl-->" + url);
        kony.print("\n ipTable-->" + JSON.stringify(inputParamTable));
        kony.application.showLoadingScreen("sknLoading", "triggering..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
        var connHandle = kony.net.invokeServiceAsync(url, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
    }
}