function AS_Button_a58fe8f0e0aa4b84b7c81e86b0e99294(eventobject) {
    if (frmGeoLocations.btnMap.text == "Map") {
        frmGeoLocations.segLocations.isVisible = false;
        frmGeoLocations.mapLocations.isVisible = true;
        frmGeoLocations.btnMap.text = "List";
    } else {
        frmGeoLocations.segLocations.isVisible = true;
        frmGeoLocations.mapLocations.isVisible = false;
        frmGeoLocations.btnMap.text = "Map";
    }
}