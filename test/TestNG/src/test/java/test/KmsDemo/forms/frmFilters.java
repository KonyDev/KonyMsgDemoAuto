package test.KmsDemo.forms;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmFilters {


  public frmFilters() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmFilters_btnSearch"));
  }
public void btnCancel() throws Exception{ 
  AppElement btnCancel=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_btnCancel"));
  btnCancel.click();
  }
public void btnSearch() throws Exception{ 
  AppElement btnSearch=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_btnSearch"));
  btnSearch.click();
  }

public void txtLocation(String text) throws Exception{
  AppElement txtLocation=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_txtLocation"));
  txtLocation.type(text);
  }



public void segSuggest(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(KonyMsgDemoWidgetId.getWidgetId("${frmname}_segSuggest"),KonyMsgDemoWidgetId.getWidgetId("${frmname}_flxTmpSuggest"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 

}