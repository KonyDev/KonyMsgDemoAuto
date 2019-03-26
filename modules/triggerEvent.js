var eventID;
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
		"event" : {
			"message" : {
				"content" : {
					"priorityService" : "false",
					"mimeType" : "text/plain"
				},
				"subscribers" : {
					"subscriber" : [{
							"ksid" : ksid
						}
					]
				}
			},
			"eventNamePairs" : {
				"key" : [{
						"content" : audienceLastName,
						"name" : "lastname"
					}, {
						"content" : audienceFirstName,
						"name" : "firstname"
					}
				]
			},
			"email" : {
				"content" : {
					"priorityService" : "false"
				},
				"recipients" : {
					"recipient" : [{
							"emailId" : audienceEmail
						}
					]
				},
				"from" : {}
			},
			"sms" : {
				"content" : {
					"priorityService" : "false",
					"mimeType" : "text/plain"
				},
				"recipients" : {
					"recipient" : [{
							"mobile" : audienceMob
						}
					]
				}
			},
			"eventid" : frmEvent.txtBoxEventId.text
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
				if ((result["event"]["messageResponse"] !== undefined) && (result["event"]["messageResponse"]["code"] == 200)) {
					frmEvent.lblInfo2.setVisibility(true);
				} else if ((result["event"]["code"] !== undefined) && (result["event"]["code"] === 406)) {
					alert("Please Enter the Valid Event Id");
					kony.application.dismissLoadingScreen();
					return;
				}
				alert("Event Queued");
			}
			kony.application.dismissLoadingScreen();
		}

	}
	var jsonPayload = JSON.stringify(payload1);
	var inputParamTable = {
		httpheaders : {
			"Content-Type" : "application/json",
		},
		postdata : jsonPayload
	};
	try {
		var url = KMSPROP.kmsServerUrl + "/service/eventpushmessage";
		kony.print("\nurl-->" + url);
		kony.print("\n ipTable-->" + JSON.stringify(inputParamTable));
		kony.application.showLoadingScreen("sknLoading", "triggering..", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
		var connHandle = kony.net.invokeServiceAsync(
				url, inputParamTable, asyncCallback);
	} catch (err) {
		kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
		alert("Error" + err);
	}
}
