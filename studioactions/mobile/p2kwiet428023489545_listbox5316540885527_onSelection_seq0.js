function p2kwiet428023489545_listbox5316540885527_onSelection_seq0(eventobject) {
    selectedCountry = frmProfile.listbox5316540885527.selectedKeyValue[1];
    if (selectedCountry == "United States") {
        frmProfile.lstboxStates.placeholder = "Select State";
        frmProfile.lstboxStates.setVisibility(true);
        frmProfile.lineState.setVisibility(true);
    } else {
        frmProfile.lstboxStates.setVisibility(false);
        frmProfile.lineState.setVisibility(false);
        selectedState = "";
    }
}