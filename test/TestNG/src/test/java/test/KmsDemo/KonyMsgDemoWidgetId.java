package test.KmsDemo;

import java.io.IOException;

import test.common.SgConfiguration;
import test.common.WidgetID;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class KonyMsgDemoWidgetId {
	static WidgetID widgetIds;
	FileInputStream widconfig;
    private static KonyMsgDemoWidgetId widconf;
    
	protected KonyMsgDemoWidgetId()
	{
		try {
			widconfig = new FileInputStream("mobilewidgetid.properties");
			Properties props = new Properties();
			props.load(widconfig);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	public static KonyMsgDemoWidgetId getInstance(){
		if (widconf != null)
			return widconf;
		widconf = new KonyMsgDemoWidgetId();
		return widconf;
	}
	
	public static String getWidgetId(String key) throws Exception,IOException{
		if(widgetIds==null){
			if(SgConfiguration.getInstance().getKeyValue("Device").equalsIgnoreCase("Tablet"))
				//widgetIds = new WidgetID("src/"+"mobilewidgetid.properties");
				widgetIds = new WidgetID("mobilewidgetid.properties");
			else
				//widgetIds = new WidgetID("src/"+"mobilewidgetid.properties");
				widgetIds = new WidgetID("mobilewidgetid.properties");
		}
			
		return widgetIds.getWidgetId(key);
	}

}