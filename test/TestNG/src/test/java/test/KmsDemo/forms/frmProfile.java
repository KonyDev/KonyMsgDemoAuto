package test.KmsDemo.forms;


import java.io.IOException;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmProfile {


  public frmProfile() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmProfile_btnSubmitProfile"));
  
  }
  public static String getHeaderText() throws Exception {
	  AppElement.waitForEnable(KonyMsgDemoWidgetId.getWidgetId("frmProfile_label158654807140518"));
	  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmProfile_label158654807140518"));
	  return lblHeader.getText();
	  }
public static void btnSubmitProfile() throws Exception{ 
  AppElement btnSubmitProfile=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmProfile_btnSubmitProfile"));
  btnSubmitProfile.click();
  }

public static void txtBoxCountry(String text) throws Exception{
  AppElement txtBoxCountry=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmProfile_txtBoxCountry"));
  txtBoxCountry.type(text);
  }
public static void txtBoxEmail(String text) throws Exception{
  AppElement txtBoxEmail=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmProfile_txtBoxEmail"));
  txtBoxEmail.type(text);
  }
public static void txtBoxFname(String text) throws Exception{
  AppElement txtBoxFname=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmProfile_txtBoxFname"));
  txtBoxFname.type(text);
  }
public static void txtBoxLname(String text) throws Exception{
  AppElement txtBoxLname=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmProfile_txtBoxLname"));
  txtBoxLname.type(text);
  }
public static void txtBoxMob(String text) throws Exception{
  AppElement txtBoxMob=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmProfile_txtBoxMob"));
  txtBoxMob.type(text);
  }
public void txtBoxState(String text) throws Exception{
  AppElement txtBoxState=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_txtBoxState"));
  txtBoxState.type(text);
  }
public static void selectFromListBox(String appElementId,String chooseText) throws IOException, Exception
{
    AppElement appElement = new AppElement(KonyMsgDemoWidgetId.getWidgetId(appElementId));
    appElement.click();
	AppElement.scrollUntilVisible(chooseText);
    AppElement.isElementVisible("name",chooseText);
    ListBox.selectFromListBox(chooseText);
}




}