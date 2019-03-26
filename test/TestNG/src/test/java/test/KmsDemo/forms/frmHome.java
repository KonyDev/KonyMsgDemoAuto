package test.KmsDemo.forms;

import java.io.IOException;
import java.util.HashMap;

import org.kony.qa.stargate.wrappers.appy.Driver;
import org.openqa.selenium.JavascriptExecutor;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmHome {


  public frmHome() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmHome_button214054342124383"));
  }
public void Button095e1cf7d187c45() throws Exception{ 
  AppElement Button095e1cf7d187c45=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_Button095e1cf7d187c45"));
  Button095e1cf7d187c45.click();
  }
public void button158654807166987() throws Exception{ 
  AppElement button158654807166987=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_button158654807166987"));
  button158654807166987.click();
  }
public void button214054342124383() throws Exception{ 
  AppElement button214054342124383=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_button214054342124383"));
  button214054342124383.click();
  }
public static String getHeaderText() throws IOException, Exception {
	AppElement.waitForEnable(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblInfo2"));
	  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblInfo2"));
	  return lblHeader.getText();
	
}
public static void clickProfile() throws Exception{ 
	  AppElement profile=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblProfile"));
	  profile.click();
	  }
public static void clickPreferences() throws Exception{ 
	  AppElement preference=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblPreference"));
	  preference.click();
	  }
public static void clickTriggerEvent() throws Exception{ 
	  AppElement event=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblEvent"));
	  event.click();
	  }
public static frmGeoLocations clickGeoboundaries() throws Exception{ 
	  AppElement event=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblGeoBoundaries"));
	  event.click();
	  Thread.sleep(20000);
	  return new frmGeoLocations();
	  }
public static void scrollForm() throws Exception{ 
	AppElement appElement = new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmHome_frmHome"));	
	appElement.swipeUp(30);
	  }





}