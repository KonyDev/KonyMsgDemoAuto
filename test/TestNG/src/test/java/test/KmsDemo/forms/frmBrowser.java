package test.KmsDemo.forms;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmBrowser {


  public frmBrowser() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmBrowser_btnReload"));
  }
public void btnReload() throws Exception{ 
  AppElement btnReload=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_btnReload"));
  btnReload.click();
  }

public void txtBoxUrl(String text) throws Exception{
  AppElement txtBoxUrl=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_txtBoxUrl"));
  txtBoxUrl.type(text);
  }




}