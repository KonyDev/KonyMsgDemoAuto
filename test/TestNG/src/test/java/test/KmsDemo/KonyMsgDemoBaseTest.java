package test.KmsDemo;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;

import org.codehaus.jettison.json.JSONObject;
import org.kony.qa.stargate.logger.SgLog;
import org.kony.qa.stargate.wrappers.appy.Driver;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.BeforeSuite;
import org.testng.annotations.Optional;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import test.common.Alerts;
import test.common.AppBaseTest;
import test.common.AppElement;
import test.common.SgConfiguration;

public class KonyMsgDemoBaseTest extends AppBaseTest{
	SgConfiguration sg = SgConfiguration.getInstance();
	
	@BeforeClass(alwaysRun = true)
	@Parameters({ "appNamePerClass", "packageNamePerClass",
		"activityNamePerClass", "bundleId" })

	public void beforeClass(
			@Optional("KonyMsgDemo") String appNamePerClass,
			@Optional("com.orgname.KonyMsgDemo") String packageNamePerClass,
			@Optional(".KonyMsgDemo") String activityNamePerClass,
			@Optional("com.orgname.KonyMsgDemo") String bundleId) throws Exception {

		super.beforeClass(sg.getKeyValue("appname"), sg.getKeyValue("apppackage"),
				sg.getKeyValue("launchactivity"),sg.getKeyValue("bundle_id"));
	}

	@BeforeSuite(alwaysRun = true)
	public void beforeSuite() throws Exception {
		super.beforeSuite(); 
	}
	
	@BeforeMethod(alwaysRun = true)
	public void beforeMethod(Object[] inputParamsOfTestMethod,Method method) throws Exception {
		super.beforeMethod(method);
	}

	@AfterMethod(alwaysRun = true)
	public void afterMethod(ITestResult result) throws Exception {
		super.afterMethod(result);		
		if ((result.getStatus() == ITestResult.FAILURE || result.getStatus() == ITestResult.SKIP)&& !AppBaseTest.skipAllTestsNow ){	    	
			String methodName=result.getMethod().getMethodName();
		
		}
	}
	
	
}