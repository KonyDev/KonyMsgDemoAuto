var client;
var messagingSvc;
var isGeoBoundary = false;
var options = {};
var refreshBoundaryDetails = {};

function getGeoLocations() {
    client = client || kony.sdk.getCurrentInstance();
    konyRef.messagingsvc = {};
  //client.messagingsvc={};
  kony.application.showLoadingScreen(null, "Loading...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
   // client.setMessagingServiceEndPoint(KMSPROP.kmsServerUrl + "/api/v1");
    messagingSvc = client.getMessagingService();
    messagingSvc.setKmsAppId(KMSPROP.appId);
    messagingSvc.setKSID(kony.store.getItem("KSID"));
    registerGeoBoundary(10, "");
}

function registerGeoBoundary(radius, tags) {
  
    var count = 0;
    options.radius = radius;
    options.customLogicCallback = function(res) {
        eval(res.customLogic);
      //alert(res.metaData);
    };
    options.tags = tags;
  //alert(JSON.stringify(options));
kony.application.showLoadingScreen(null, "Loading...", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
    function successCallback(res) {
        kony.print(JSON.stringify(res));
        var myHttpObj = new kony.net.HttpRequest();
      var requestURL;
      if(options.tags==="" || options.tags===null)
        {
        requestURL = KMSPROP.kmsServerUrl + "/api/v1/geolocations/nearest/" + kony.store.getItem("KSID") + "?radius=" + radius + "&pageSize=20";
        }
      else
        {
          requestURL = KMSPROP.kmsServerUrl + "/api/v1/geolocations/nearest/" + kony.store.getItem("KSID") + "?radius=" + radius + "&pageSize=20&tags="+options.tags;
        }
        kony.print("#####Request URL is : " + requestURL);
        myHttpObj.open(constants.HTTP_METHOD_GET, requestURL);
        myHttpObj.onReadyStateChange = successCallbackLocation;
        myHttpObj.send();
        function successCallbackLocation(response) {
            var requiredReadyState = 4;
            if (response.readyState === requiredReadyState) {
                try {
                 // alert(JSON.stringify(konyRef.getDataStore().getItem("geoBoundaryData")));
                    kony.print("#####Start successCallbackLocation");
                    //details = konyRef.getDataStore().getItem("geoBoundaryData");
                    details = JSON.parse(response.responseText).locations;
                    refreshBoundaryDetails = JSON.parse(response.responseText).refreshBoundary;
                    kony.print("in set data" + details);
                    var data = {
                        "lblName": "locationName",
                        "lblDist": "radius",
                        "lblCount": "count"
                    };
                    frmGeoLocations.segLocations.widgetDataMap = data;
                    var keys = [];
                    var i = 0;
                    for (var k in details) {
                        i++;
                        details[k].radius = Math.abs(parseFloat(details[k].radius).toFixed(2)) + " Mi";
                        details[k].count = "" + i;
                        keys.push(details[k]);
                    }
                    details = keys;
                    frmGeoLocations.segLocations.setData(keys);
                    frmGeoLocations.segLocations.isVisible = true;
                    frmGeoLocations.mapLocations.isVisible = false;
                    isGeoBoundary = true;
                    geoPosition();
                    
                  	
                    kony.print("#####End successCallbackLocation");
                } catch (exception) {
                    kony.print("#####Exception in successCallbackLocation : " + exception.message);
                }
            }
        }
      kony.application.dismissLoadingScreen();
    }
    function failureCallback(err) {
        alert("Failed" + JSON.stringify(err));
    }
  //alert(JSON.stringify(options));
    messagingSvc.registerGeoBoundaries(options, successCallback, failureCallback);
}

function setMapPins() {
    locations = [];
    circles = [];
    var circleMain = {
        id: "circle1",
        centerLocation: {
            lat: lat,
            lon: lon
        },
        showCenterPin: false,
        navigatetoZoom: true,
        radius: options.radius * 1609.34,
        circleConfig: {
            lineColor: "0xA3A2A1FF",
            fillColor: "0xB1D2E6AA",
            lineWidth: 2
        },
    };
    var tempRadius = Math.abs((parseFloat(refreshBoundaryDetails.distance) * 1609.34));
//     if(tempRadius<0)
//       tempRadius=tempRadius*(-1);
  //alert(tempRadius);
    var refreshBoundaryCircle = {
        id: "circle2",
        centerLocation: {
            lat: lat,
            lon: lon
        },
        showCenterPin: false,
        navigatetoZoom: true,
        radius: tempRadius,
        circleConfig: {
            lineColor: "0x85AB61FF",
            fillColor: "0x85AB61A5",
            lineWidth: 2
        },
    };
    frmGeoLocations.mapLocations.removeCircle("circle1");
    frmGeoLocations.mapLocations.removeCircle("circle2");
//     for (i = 0; i < circles.length; i++) {
//         frmGeoLocations.mapLocations.removeCircle(circles[i].id);
//     }
    frmGeoLocations.mapLocations.locationData = [];
    var count = 1;
    for (var i = 0; i < details.length; i++) {
        location = {};
        circle = {};
        location.id = details[i].id;
        location.lat = details[i].latitude;
        location.lon = details[i].longitude;
        location.image = {
            source: "l" + (i + 1) + ".png"
        };
        locations.push(location);
//         circle = {
//             id: "circle" + details[i].id,
//             centerLocation: {
//                 lat: details[i].latitude,
//                 lon: details[i].longitude
//             },
//             showCenterPin: false,
//             navigatetoZoom: true,
//             radius: (parseFloat(details[i].radius) * 1609.34), //refreshBoundary.distance.slice(1, refreshBoundary.distance.length),
//             circleConfig: {
//                 lineColor: "0xFFFFFFFF",
//                 fillColor: "0xE9E6E651",
//                 lineWidth: 1
//             },
//         };
//         circles.push(circle);
    }
    frmDetails.mapDetails.zoomLevel = 13;
    frmGeoLocations.mapLocations.addCircle(circleMain);
    frmGeoLocations.mapLocations.addCircle(refreshBoundaryCircle);
//     for (i = 0; i < details.length; i++) {
//         frmGeoLocations.mapLocations.addCircle(circles[i]);
//     }
    
    frmGeoLocations.mapLocations.zoomLevel=13;
    frmGeoLocations.mapLocations.locationData = locations;
    getLocationName();
    return;
}

function onSegRowClick() {
    var index = frmGeoLocations.segLocations.selectedRowIndex[1];
    frmDetails.lblDescription.text = details[index].description;
    frmDetails.lblHeader.text = details[index].locationName;
    frmDetails.lblRadiusData.text = details[index].radius;
    frmDetails.lblLatData.text = details[index].latitude;
    frmDetails.lblLongData.text = details[index].longitude;
    frmDetails.lblAltitudeData.text = details[index].altitude;
    frmDetails.lblClientData.text = details[index].clientAction;
    frmDetails.lblMetadataData.text = JSON.stringify(details[index].metaData);
    frmDetails.mapDetails.locationData = [{
        id: "pinid",
        lat: details[index].latitude,
        lon: details[index].longitude,
        image: {
            source: "loc.PNG"
        },
        showCallout: true
    }];
    frmDetails.mapDetails.zoomLevel = 13;
    frmDetails.show();
}

function getLocationName() {
    var myHttpObj = new kony.net.HttpRequest();
    var outputType = "json";
    var apiKey = "AIzaSyD1bK86HeaXtvrQjsj7ZVkq0GhpdNRiru8";
    var requestURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=" + apiKey;
    kony.print("#####Request URL is : " + requestURL);
    myHttpObj.open(constants.HTTP_METHOD_GET, requestURL);
    myHttpObj.onReadyStateChange = autoSuggestCallback;
    myHttpObj.send();
    function autoSuggestCallback(response) {
        try {
            kony.print("#####Start autoSuggestCallback");
            var requiredReadyState = 4;
            if (response.readyState === requiredReadyState) {
                var result = JSON.parse(response.responseText);
             	kony.print("done"+JSON.stringify(result));
               frmGeoLocations.lblSearchLocation.text = result.results[0].formatted_address;
              kony.application.dismissLoadingScreen();
              frmGeoLocations.show();
              return;
            }
            kony.print("#####End autoSuggestCallback");
        } catch (exception) {
            kony.print("#####Exception in autoSuggestCallback : " + exception.message);
        }
    }
}