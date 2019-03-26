package test.KmsDemo.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.KmsDemo.KonyMsgDemoWidgetId;

public class frmUrl {


  public frmUrl() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmUrl_btnSubmitProfile"));
  }
public static void btnSubmitProfile() throws Exception{ 
  AppElement btnSubmitProfile=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmUrl_btnSubmitProfile"));
  btnSubmitProfile.click();
  }

public void txtBoxAppId(String text) throws Exception{
  AppElement txtBoxAppId=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_txtBoxAppId"));
  txtBoxAppId.type(text);
  }
public void txtBoxSenderID(String text) throws Exception{
  AppElement txtBoxSenderID=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_txtBoxSenderID"));
  txtBoxSenderID.type(text);
  }
public void txtBoxUrl(String text) throws Exception{
  AppElement txtBoxUrl=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_txtBoxUrl"));
  txtBoxUrl.type(text);
  }




}