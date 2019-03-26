package test.KmsDemo.tests;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.KmsDemo.KonyMsgDemoBaseTest;
import test.KmsDemo.KonyMsgDemoWidgetId;
import test.KmsDemo.forms.frmHome;
import test.KmsDemo.forms.frmPreference;
import test.KmsDemo.forms.frmProfile;
import test.KmsDemo.forms.frmUrl;
import test.common.Alerts;
import test.common.AppElement;

public class frmPreferenceTest extends KonyMsgDemoBaseTest {
	@BeforeMethod
	public void beforeMethod()  {
		AppElement chkHomeForm = null;
		
		try{
			//String chkProfile=frmProfile.getHeaderText();
			chkHomeForm = new AppElement(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblProfile"));			
			frmHome.clickPreferences();
		}catch(Exception e){
			if (chkHomeForm == null) {
				try {
					frmUrl.btnSubmitProfile();
					Thread.sleep(2000);
					frmProfile.txtBoxFname("auto");
					frmProfile.txtBoxLname("user");
					frmProfile.txtBoxEmail("auto.user@gmail.com");
					frmProfile.selectFromListBox("frmProfile_listbox5316540885527", "India");
					frmProfile.txtBoxMob("+919876543210");
					frmProfile.btnSubmitProfile();
					Thread.sleep(15000);
					if(Alerts.isAlertVisible())
					{
						Alerts.validateAlertMsg("User details added successfully");
					 Alerts.acceptAlert();
					 
					}
					frmProfile.btnSubmitProfile();
					frmPreference.btnSubmitProfile();
					frmHome.clickPreferences();
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}else{
				e.printStackTrace();
			}
		}
	}
	
	 @Test
		public static void  updatePreferences() throws Exception{
			SoftAssert sa = new SoftAssert();			
			sa.assertEquals(frmPreference.getHeaderText(), "My Preferences");
			frmPreference.selectCheckbox();
			frmPreference.btnSubmitProfile();
			Thread.sleep(10000);
			if(Alerts.isAlertVisible())
			{
				Alerts.validateAlertMsg("User details added successfully");
			 Alerts.acceptAlert();		 
			}
			frmPreference.btnSubmitProfile();
			sa.assertEquals(frmHome.getHeaderText(), "Kony Engagement Service Demo App");
			sa.assertAll();
		}

	
		
}
