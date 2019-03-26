function AS_FlexContainer_a577f20bc92e4174a07871e987f1aa3d(eventobject) {
    if (this.view.lblPassword.top == "23%") {
        this.view.flxLblPassword.isVisible = false;
        this.invokeTouch(this.view.lblPassword, "16%");
    }
    this.view.forceLayout();
}