package test.KmsDemo.forms;

import test.KmsDemo.KonyMsgDemoWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;

public class frmGeoLocations {


  public frmGeoLocations() throws Exception {
  AppElement lblHeader=new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmGeoLocations_frmGeoLocations"));
  }
public void btnBack() throws Exception{ 
  AppElement btnBack=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_btnBack"));
  btnBack.click();
  }
public void btnMap() throws Exception{ 
  AppElement btnMap=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_btnMap"));
  btnMap.click();
  }

public void txtSearch(String text) throws Exception{
  AppElement txtSearch=new AppElement(KonyMsgDemoWidgetId.getWidgetId("${frmname}_txtSearch"));
  txtSearch.type(text);
  }



public void segLocations(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(KonyMsgDemoWidgetId.getWidgetId("${frmname}_segLocations"),KonyMsgDemoWidgetId.getWidgetId("${frmname}_img"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 
public static frmDetails  clickFirstLocation() throws Exception{
	Segment segFrstLoc = new Segment(KonyMsgDemoWidgetId.getWidgetId("frmGeoLocations_segLocations"),
			KonyMsgDemoWidgetId.getWidgetId("tmpLocations_tmpLocations"));
	 AppElement firstLoc = segFrstLoc.getElementWithIndex(0);
	 firstLoc.click();
	 return new frmDetails();
	
}

}