//github
prevProximityUUIDString = null;
beaconManager = null;
proximityUUIDString = null;
major = null;
minor = null;

/**
 ****************************************************************
 *	Name    : monitoringCallback
 *	Author  : Kony
 *	Purpose : This function will perform monitoringCallback once BeaconRegionStateInside then startRangingBeacons in region.
 *****************************************************************/

function monitoringCallback(beaconRegion, beaconRegionState) {
	kony.print("BeaconRegion: ", kony.type(beaconRegion), " ", beaconRegion, " state is: ", beaconRegionState);
	if (beaconRegionState == "BeaconRegionStateInside") {
		beaconManager.startRangingBeaconsInRegion(beaconRegion);
	}
}

/**
 ****************************************************************
 *	Name    : rangingCallback
 *	Author  : Kony
 *	Purpose : In the rangingCallback, the developer can determine the relative distance of the beacon from the device.
 *****************************************************************/

function rangingCallback(beaconRegion, beacons) {
	kony.print("Beacons found for BeaconRegion: ", kony.type(beaconRegion), " ", beaconRegion, " Beacons: ", beacons);
	var beaconLabel = "No beacons";
	var proximityLabel = "...";
	if (beacons.length > 0) {
		beacon = beacons[0];
		proximityUUIDString = beacon.getProximityUUIDString();
		major = beacon.getMajor();
		minor = beacon.getMinor();
		beaconLabel = beacon.getProximityUUIDString() + " " + beacon.getMajor() + " " + beacon.getMinor();
		proximityLabel = beacon.getProximity();
	}

	if ((prevProximityUUIDString != proximityUUIDString) && (ksid != null)) {
			beaconUpdate();
	}

}

/**
 ****************************************************************
 *	Name    : errorCallback
 *	Author  : Kony
 *	Purpose : This function is used to get error updates from BeaconManager.
 *****************************************************************/

function errorCallback(beaconManagerError, errorName, errorInfo, beaconRegion) {
	kony.print("Error occurred: ", beaconManagerError, " Error Name: ", errorName, " erorrInfo: ", errorInfo);
	if (beaconRegion) {
		kony.print("For Region: ", kony.type(beaconRegion), " ", beaconRegion);
	}
}

/**
 ****************************************************************
 *	Name    : monitoringStartedForRegionCallback
 *	Author  : Kony
 *	Purpose : This function helps to start monitoring for the specified Beacon Region.
 *****************************************************************/
function monitoringStartedForRegionCallback(beaconRegion) {
	kony.print("Inside monitoringStartedForRegionCallback");
	kony.print("Monitoring started for region: ", kony.type(beaconRegion), " ", beaconRegion);
}

/**
 ****************************************************************
 *	Name    : authorizationStatusChangedCallback
 *	Author  : Kony
 *	Purpose : This Function helps to set the authorization status changed callback.
 *****************************************************************/
function authorizationStatusChangedCallback(status) {
	kony.print(">>>>>>>>>> Location Authorization status changed to: ", status);
	if (status === "BeaconManagerAuthorizationStatusAuthorized") {
		var proximityUUID = "CAD6ACBA-9D1C-4772-90AA-0FEEF6868D30";
		var major = 100;
		var minor = 1;
		var identifier = "com.kone.LatestKMSDemo"
			beaconRegion = new com.kony.BeaconRegion(proximityUUID, major, minor, identifier);
		beaconManager.startMonitoringBeaconRegion(beaconRegion);
		beaconManager.startRangingBeaconsInRegion(beaconRegion);
	}
}

function determineAuthorizationStatus() {
	if (beaconManager == null) {
		beaconManager = new com.kony.BeaconManager(monitoringCallback, rangingCallback, errorCallback);
		beaconManager.setMonitoringStartedForRegionCallback(monitoringStartedForRegionCallback);
		beaconManager.setAuthorizationStatusChangedCallback(authorizationStatusChangedCallback);
	}
	kony.print("Status : ", beaconManager.authorizationStatus());
	if (beaconManager.isMonitoringAvailableForBeaconRegions()) {
		kony.print("Monitoring available");
	} else {
		kony.print("Monitoring NOT available");
	}
	if (beaconManager.isRangingAvailableForBeaconRegions()) {
		kony.print("Ranging available");
	} else {
		kony.print("Ranging NOT available");
	}
	var proximityUUID = "CAD6ACBA-9D1C-4772-90AA-0FEEF6868D30";
	var major = 100;
	var minor = 1;
	var identifier = "com.kone.LatestKMSDemo"
	var beaconRegion = new com.kony.BeaconRegion(proximityUUID, major, minor, identifier);
	beaconManager.startMonitoringBeaconRegion(beaconRegion);
}

/**
 ****************************************************************
 *	Name    : locate_iBeacons
 *	Author  : Kony
 *	Purpose : This function is used to creating a BeaconManager with callbacks .
 *****************************************************************/

function locate_iBeacons() {
	kony.print("--Start locate_iBeacons--");
	if (beaconManager === null) {
		kony.print("--creating beaconManager--");
		beaconManager = new com.kony.BeaconManager(monitoringCallback, rangingCallback, errorCallback);
		kony.print("--beaconManager = new com.kony.BeaconManager(monitoringCallback, rangingCallback, errorCallback)--");
		beaconManager.setMonitoringStartedForRegionCallback(monitoringStartedForRegionCallback);
		kony.print("--beaconManager.setMonitoringStartedForRegionCallback(monitoringStartedForRegionCallback);--");
		beaconManager.setAuthorizationStatusChangedCallback(authorizationStatusChangedCallback);
	}
	if (beaconManager.authorizationStatus() != "BeaconManagerAuthorizationStatusAuthorized") {
		kony.print("Unathorized to use location services");
	}
	if (!beaconManager.isMonitoringAvailableForBeaconRegions()) {
		kony.print("Monitoring not available");
		return;
	}
	if (!beaconManager.isRangingAvailableForBeaconRegions()) {
		kony.print("Ranging not available");
		return;
	}
	var proximityUUID = "CAD6ACBA-9D1C-4772-90AA-0FEEF6868D30";
	var identifier = "com.kone.LatestKMSDemo"
	var beaconRegion = new com.kony.BeaconRegion(proximityUUID, null, null, identifier);
	beaconRegion.setNotifyEntryStateOnDisplay(true);
	beaconManager.startMonitoringBeaconRegion(beaconRegion);
}

/**
 ****************************************************************
 *	Name    : beaconUpdate
 *	Author  : Kony
 *	Purpose : This function will update the beacon details to the KMS Server .
 *****************************************************************/

function beaconUpdate() {
	function asyncCallback(status, result) {
		kony.print("\n------status------>" + status);
		if (status == 400) {
			if (result["opstatus"] == 0) {
				kony.print("\n------updated result--->" + JSON.stringify(result));

			} else if (result["opstatus"] == 8009) {
				kony.print("\ndescription is\n" + result["description"]);
				if (result["message"] != undefined)
					kony.print("\n------updated result--->" + JSON.stringify(result));
			} else {
				kony.print("\n------updated result--->" + JSON.stringify(result));
			}
			kony.application.dismissLoadingScreen();
		}
	}

	kony.print("**************** beconupdate service*****************");
	prevProximityUUIDString = proximityUUIDString;
	kony.print("prevProximityUUIDString after update is -------->", prevProximityUUIDString);
	var payload1 = {

		"ksid" : ksid,
		"beacons" : {
			"beacon" : {
				"uuid" : proximityUUIDString,
				"major" : "" + major + "",
				"minor" : "" + minor + ""
			}
		}
	};

	var inputParamTable = {
		httpheaders : {
			"Content-Type" : "application/json"
		},

		postdata : payload1
	};
	var url = KMSPROP.kmsServerUrl + "/api/v1/beaconupdate"
	kony.print("\n-----inputparamtable is" + JSON.stringify(inputParamTable));
	kony.print("\n----url----->" + url);
	try {
		kony.application.showLoadingScreen("sknLoading", "updating...", constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
		var connHandle = kony.net.invokeServiceAsync(
				url, inputParamTable, asyncCallback);
	} catch (err) {
		kony.print("\nexeption in invoking service---\n" + JSON.stringify(err));

	}

}
