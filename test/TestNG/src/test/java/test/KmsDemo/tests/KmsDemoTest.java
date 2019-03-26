package test.KmsDemo.tests;

import org.testng.asserts.SoftAssert;

import java.io.IOException;

import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import test.KmsDemo.KonyMsgDemoBaseTest;
import test.KmsDemo.forms.frmEvent;
import test.KmsDemo.forms.frmHome;
import test.KmsDemo.forms.frmPreference;
import test.KmsDemo.forms.frmProfile;
import test.KmsDemo.forms.frmUrl;
import test.common.Alerts;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.KmsDemo.KonyMsgDemoWidgetId;


public class KmsDemoTest extends KonyMsgDemoBaseTest {
	//@BeforeMethod
	/*
	 @Test
		public static void  submitUrl() throws Exception{
			SoftAssert sa = new SoftAssert();
			sa.assertTrue(AppElement.waitForEnable(KonyMsgDemoWidgetId.getWidgetId("frmUrl_btnSubmitProfile"), 3),
					"Done button is not available");
			frmUrl.btnSubmitProfile();
			Thread.sleep(2000);
			sa.assertEquals(frmProfile.getHeaderText(), "My Profile");
			sa.assertAll();
	 }
	 @Test
		public static void  enterProfileDetails() throws Exception{
		 SoftAssert sa = new SoftAssert();
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
			sa.assertEquals(frmPreference.getHeaderText(), "My Preferences");
			sa.assertAll();
	 }
	 @Test
		public static void  selectPreference() throws Exception{
		 SoftAssert sa = new SoftAssert();
			frmPreference.btnSubmitProfile();
			sa.assertEquals(frmHome.getHeaderText(), "Kony Engagement Service Demo App");
			//AppElement.scrollScreenUntilVisibleByID(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblEvent"));
			frmHome.scrollForm();
			sa.assertAll();
		
	}
 
 @Test
	public static void  updateProfile() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmHome.clickProfile();
		sa.assertEquals(frmProfile.getHeaderText(), "My Profile");
		frmProfile.txtBoxFname("autoTest");
		frmProfile.btnSubmitProfile();
		Thread.sleep(10000);
		if(Alerts.isAlertVisible())
		{
			Alerts.validateAlertMsg("User details added successfully");
		 Alerts.acceptAlert();		 
		}
		frmProfile.btnSubmitProfile();
		sa.assertEquals(frmHome.getHeaderText(), "Kony Engagement Service Demo App");
		//AppElement.scrollScreenUntilVisibleByID(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblEvent"));
		frmHome.scrollForm();
		sa.assertAll();
		}
 @Test
	public static void  updatePreferences() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmHome.clickPreferences();
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
		//AppElement.scrollScreenUntilVisibleByID(KonyMsgDemoWidgetId.getWidgetId("frmHome_lblEvent"));
		frmHome.scrollForm();
		sa.assertAll();
	}
 @Test
	public static void  triggerEvent() throws Exception{
		SoftAssert sa = new SoftAssert();
		frmHome.clickTriggerEvent();
		sa.assertEquals(frmEvent.getHeaderText(), "Trigger Event");
		frmEvent.txtBoxEventId("6011017058044149400");
		frmEvent.btnSubmitProfile();
		Thread.sleep(20000);
		if(Alerts.isAlertVisible())
		{
			Alerts.validateAlertMsg("Message: Hi all");
			Alerts.acceptAlert();
			Alerts.validateAlertMsg("Event Queued");
		 Alerts.acceptAlert();		 
		}
		AppElement.deviceBack();
		frmHome.scrollForm();
		sa.assertAll();
	}
		*/
 
}
