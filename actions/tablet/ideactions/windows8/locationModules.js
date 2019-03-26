var lat, lon;

function updatedLoc() {
    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            kony.print("\n------result------>" + JSON.stringify(result));
            //	kony.application.dismissLoadingScreen();
            if (result["opstatus"] == 0) {
                kony.print("\ngeo coordinate updated..");
            }
        }
    }
    var locname = "xxxx";
    var payload = '{' + '"locname":' + '\"' + locname + '\",' + '"latitude":' + '\"' + lat + '\",' + '"longitude":' + '\"' + lon + '\",' + '"ksid":' + '\"' + ksid + '\",' + '}';
    var inputParamTable = {
        httpheaders: {
            "Content-Type": "application/json"
        },
        postdata: payload
    };
    var url = KMSPROP.kmsServerUrl + "/service/geolocupdate";
    kony.print("\n----url----->" + url);
    kony.print("\nIP update loc:-" + JSON.stringify(inputParamTable));
    try {
        var connHandle = kony.net.invokeServiceAsync(url, inputParamTable, asyncCallback);
    } catch (err) {
        kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));
        alert("Error" + err);
    }
}

function updatedLoc1() {
    function asyncCallback(status, result) {
        kony.print("\n------status------>" + status);
        if (status == 400) {
            kony.print("\n------result------>" + JSON.stringify(result));
            //	kony.application.dismissLoadingScreen();
            /*if(result["opstatus"]==0)
            {
            	kony.print("\ngeo coordinate updated..");
            }*/
        }
    }
    ipurl = KMSPROP.kmsServerUrl.substring(8);
    //ipurl="mobilefabric-demo.messaging.konycloud.com";
    var payload = {
        "ksid": "12345",
        "lat": "17.4",
        "locname": "xxx",
        "lon": "78.3"
    };
    var inputParamTable = {
        httpheaders: {
            "Content-Type": "application/json"
        },
        //channel:"rc",
        postdata: JSON.stringify(payload)
    };
    var url = KMSPROP.kmsServerUrl + "/service/geolocupdate";
    kony.print("\n----url----->" + url);
    kony.print("\nIP update loc:-" + JSON.stringify(inputParamTable));
    try {
        var connHandle = kony.net.invokeServiceAsync(url, inputParamTable, asyncCallback);
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
        if (lat == null) lat = 0;
        if (lon == null) lon = 0;
        kony.print("latitutde:-" + lat);
        kony.print("longitude:-" + lon);
        kony.application.dismissLoadingScreen();
        if (kony.os.deviceInfo().name == "android") updatedLocLatest();
        else updatedLoc();
    }

    function geoErrorCallBack(positionerror) {
        kony.print("Error occured while retrieving the data:-\n" + "Error code:" + positionerror.code + " : " + positionerror.message);
        kony.application.dismissLoadingScreen();
    }
    //var positionoptions1={};
    var positionoptions = new Object();
    //var positionoptions={};
    positionoptions.enablehighaccuracy = true;
    positionoptions.timeout = 10000;
    positionoptions.maximumage = 1000;
    watchFlag = false;
    //kony.application.showLoadingScreen("loadingscreen","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, false,null);
    try {
        kony.location.getCurrentPosition(geoSuccessCallBack, geoErrorCallBack, positionoptions);
    } catch (exception) {
        alert("Exception is ::" + exception.message);
    }
}

function updateLocations() {
    kony.timer.schedule("mytimer123", geoPosition, 3600, true);
    //The function timerFunc will be executed after every 3600 seconds.
}

function updatedLocLatest() {
    //onready state change.
    function onReadyStateChange() {
        kony.print("\nonReadyStateChange:-" + JSON.stringify(this));
        if (this.response !== null) {
            kony.print("\nResponse:- " + JSON.stringify(this.response));
            var jsonResponse = JSON.parse(this.response);
            if (this.statusText == "OK") {
                if (this.response.statusCode == 404) {
                    kony.print("error response:-" + this.response.description);
                }
                //update is successfull.
                else if (this.response.statusCode == 200) {
                    kony.print("response description:-" + this.response.description);
                }
                //kony.print("\n******update is successfull.******\n");	
            } else {
                alert(jsonResponse["message"]);
            }
            //kony.application.dismissLoadingScreen();
        }
    }
    //onready state change.
    var httpclient1 = new kony.net.HttpRequest();
    httpclient1.onReadyStateChange = onReadyStateChange;
    httpclient1.timeout = 0;
    var requestMethod = constants.HTTP_METHOD_POST;
    var async = true;
    //var url="https://kmsdev70.messaging.sit2-konycloud.com/service/geolocupdate";
    //var url="https://mfreddy-qa.messaging.qa-konycloud.com/service/geolocupdate";
    var url = KMSPROP.kmsServerUrl + "/service/geolocupdate";
    httpclient1.open(requestMethod, url, async);
    httpclient1.setRequestHeader("Content-Type", "application/json");
    var frmData = new kony.net.FormData();
    var locname = "xxxx";
    //var lat=lat;
    //var lon=lon;
    //var ksid=ksid;
    //var appId=KMSPROP.appId;
    //var deviceId=kony.os.deviceInfo().deviceid;
    //alert("lat is "+lat+"long is "+lon+"ksid is "+ksid);
    var payload = '{' + '"locname":' + '\"' + locname + '\",' + '"latitude":' + '\"' + lat + '\",' + '"longitude":' + '\"' + lon + '\",' + '"ksid":' + '\"' + ksid + '\",' + '}';
    frmData.append("postdata", payload);
    kony.print("\n---payload:-> " + payload);
    httpclient1.send(frmData);
}