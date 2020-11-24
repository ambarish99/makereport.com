package com.tm.makereport;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import org.json.simple.*;
import org.json.simple.parser.*;
public class MakeNewReport extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
String jsonString;
System.out.println("REQUEST TO SAVE ARRIVED");
StringBuffer sb=new StringBuffer();
String line=null;
try
{
BufferedReader reader=request.getReader();
while((line=reader.readLine())!=null)
{
System.out.println("LINE="+line);
sb.append(line);
}
jsonString=sb.toString();


//--------problem hai-----niche
//json code not working
//JSONParser parser=new JSONParser();
//JSONObject jsonObj=(JSONObject)parser.parse(jsonString);
//System.out.println("JSONOBJ=="+jsonObj.toString());
//String fileName=(String)jsonObj.get("reportName");
//System.out.println("FILE NAME="+fileName);

//get file name
int i=jsonString.indexOf(":");
String fileName=jsonString.substring(i+2,jsonString.indexOf("\"",i+2));
System.out.println("FILE NAME="+fileName);

//get path to folder
String fs=File.separator;
ServletContext context=request.getServletContext();
String path=context.getRealPath(fs+"WEB-INF"+fs+"jsonFiles");
System.out.println("Path="+path);

//create folder for zip
path=path+fs+fileName;
File jsonFolder=new File(path);
if(!jsonFolder.exists()) jsonFolder.mkdir();

//make json file in folder
File jsonFile=new File(path+fs+fileName+".json");
RandomAccessFile raf=new RandomAccessFile(jsonFile,"rw");
raf.writeBytes(jsonString);
raf.close();

//code to copy python file
File utilFile= new File(context.getRealPath(fs+"WEB-INF"+fs+"utils"+fs+"reportGenerator.py"));
File newLoc=new File(path+fs+"reportGenerator.py");
Files.copy(utilFile.toPath(),newLoc.toPath());

ZipUtility.zipIt(new File(path),path+".zip");

response.setContentType("text/html");
PrintWriter pw=response.getWriter();
pw.println("OK");
pw.flush();
pw.close();

}catch(Exception e)
{
System.out.println("EXCEPTION OCCURED");
e.printStackTrace();
}
}


}


