/*****************************************************************
 *	Name    : updateCurrentLocation
 *	Author  : Kony
 *	Purpose : The below function is to invoke 'kony.location.getCurrentPosition' API
 ******************************************************************/
function updateCurrentLocation() {
  
	function asyncCallback(status, result) {
		kony.print("\n------status------>" + status);
		if (status == 400) {
			kony.print("\n------result------>" + JSON.stringify(result));
			if (result["statusCode"] !== undefined && result["statusCode"] == 200) {
				kony.print("geo coordinate updated..");
              
			} else {
				alert("Something went wrong while updating the current location");
			}
		}
	}
	var locname = "xxxx";
	var payload = '{'
		 + '"locname":' + '\"' + locname + '\",'
		 + '"latitude":' + '\"' + lat + '\",'
		 + '"longitude":' + '\"' + lon + '\",'
		 + '"ksid":' + '\"' + ksid + '\",'
		 + '}';

	var inputParamTable = {
		httpheaders : {
			"Content-Type" : "application/json"
		},
		postdata : payload

	};
	var url = KMSPROP.kmsServerUrl + "/service/geolocupdate";
	kony.print("\n----url----->" + url);
	kony.print("\nIP update loc:-" + JSON.stringify(inputParamTable));
	try {
		var connHandle = kony.net.invokeServiceAsync(
				url, inputParamTable, asyncCallback);
	} catch (err) {
		kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
		alert("Error" + err);
	}
}
/*****************************************************************
 *	Name    : geoPosition
 *	Author  : Kony
 *	Purpose : The below function is to invoke 'kony.location.getCurrentPosition' API
 ******************************************************************/
function geoPosition() {
	kony.print("\n\n---in geo position---\n\n");
	function geoSuccessCallBack(position) {
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		if (lat == null)
			lat = 0;
		if (lon == null)
			lon = 0;
		kony.print("latitutde:-" + lat);
		kony.print("longitude:-" + lon);
		kony.application.dismissLoadingScreen();
      if(isGeoBoundary)
        {
          kony.print("Positions for GeoBoundary");
          setMapPins();
          isGeoBoundary=false;
        }
		else if (KMSPROP.kmsServerUrl) {
			updateCurrentLocation();
		}
	}
	function geoErrorCallBack(positionerror) {
		kony.print("Error occured while retrieving the data:-\n" + "Error code:" + positionerror.code + " : " + positionerror.message);
		kony.application.dismissLoadingScreen();
	}
	var positionoptions = new Object();
	positionoptions.enablehighaccuracy = true;
	positionoptions.timeout = 10000;
	positionoptions.maximumage = 1000;
	watchFlag = false;
	try {
		kony.location.getCurrentPosition(geoSuccessCallBack, geoErrorCallBack, positionoptions);
	} catch (exception) {
		alert("Exception is ::" + exception.message);
	}
}
