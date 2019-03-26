function AS_FlexContainer_c456c5f9c50e4ba8b9897794f2d70232(eventobject) {
    if (this.view.lblUsername.top == "6%") {
        this.view.flxLblUsername.isVisible = false;
        this.invokeTouch(this.view.lblUsername, "-1%");
    }
    this.view.forceLayout();
}