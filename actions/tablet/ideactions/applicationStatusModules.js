function setApplicationCallBacks()
{
	kony.print("\n===============setApplicationCallbacks executed=======\n");
	var callbacksObj = {onactive:onAppActive};
	kony.application.setApplicationCallbacks(callbacksObj);
}
function onAppActive(){
	if(kony.os.deviceInfo().name === "iPhone")
		kony.application.setApplicationBadgeValue("0");
	kony.print("\napplication is active.---\n");
}
function onAppForeGround(){
	kony.print("\napplication is in forground---\n");
}
