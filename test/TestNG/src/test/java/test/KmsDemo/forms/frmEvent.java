package test.KmsDemo.forms;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmEvent {


  public frmEvent() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmEvent_btnSubmitProfile"));
  }
public static void btnSubmitProfile() throws Exception{ 
  AppElement btnSubmitProfile=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmEvent_btnSubmitProfile"));
  btnSubmitProfile.click();
  }

public static void txtBoxEventId(String text) throws Exception{
  AppElement txtBoxEventId=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmEvent_txtBoxEventId"));
  txtBoxEventId.type(text);
  }
public static String getHeaderText() throws Exception {
	  AppElement.waitForEnable(KonyMsgDemoWidgetId.getWidgetId("frmEvent_label158654807140518"));
	  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmEvent_label158654807140518"));
	  return lblHeader.getText();
	  }



}