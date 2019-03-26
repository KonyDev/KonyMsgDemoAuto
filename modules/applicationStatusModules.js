function setApplicationCallBacks()
{
	kony.print("\n===============setApplicationCallbacks executed=======\n");
	var callbacksObj = {onactive:onAppActive};
	kony.application.setApplicationCallbacks(callbacksObj);
}
function onAppActive(){
    kony.print("\n===============Into  onAppActive=======\n");
    kony.print("\n===============Into  onAppActive=======\n ==>"+kony.os.deviceInfo().name);
	if(kony.os.deviceInfo().name === "iPhone")
       kony.print("\n===============Into  deviceInfo=======\n");
		kony.application.setApplicationBadgeValue("0");
	kony.print("\napplication is active.---\n");
}
function onAppForeGround(){
	kony.print("\napplication is in forground---\n");
}
