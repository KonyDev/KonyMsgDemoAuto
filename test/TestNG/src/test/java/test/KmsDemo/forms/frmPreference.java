package test.KmsDemo.forms;

import java.util.List;

import org.kony.qa.stargate.wrappers.appy.SgElement;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmPreference {


  public frmPreference() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmPreference_btnSubmitProfile"));
  }
public static void btnSubmitProfile() throws Exception{ 
  AppElement btnSubmitProfile=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmPreference_btnSubmitProfile"));
  btnSubmitProfile.click();
  }
public static String getHeaderText() throws Exception {
	  AppElement.waitForEnable(KonyMsgDemoWidgetId.getWidgetId("frmPreference_label158654807140518"));
	  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmPreference_label158654807140518"));
	  return lblHeader.getText();
	  }
public static void selectCheckbox() throws Exception{
	List<SgElement> chkElement = (List<SgElement>) SgElement.getSgElements("class","android.widget.CheckBox");
	SgElement element = chkElement.get(2);
	element.click();

}




}