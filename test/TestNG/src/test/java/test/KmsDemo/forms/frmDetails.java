package test.KmsDemo.forms;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmDetails {


  public frmDetails() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmDetails_frmDetails"));
  }
public void btnBack() throws Exception{ 
  AppElement btnBack=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_btnBack"));
  btnBack.click();
  }





}