package test.KmsDemo.forms;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmSetting {


  public frmSetting() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmSetting_btnSubmitProfile"));
  }
public void btnReset() throws Exception{ 
  AppElement btnReset=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_btnReset"));
  btnReset.click();
  }
public void btnSubmitProfile() throws Exception{ 
  AppElement btnSubmitProfile=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_btnSubmitProfile"));
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
public void txtBoxurl1(String text) throws Exception{
  AppElement txtBoxurl1=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_txtBoxurl1"));
  txtBoxurl1.type(text);
  }




}