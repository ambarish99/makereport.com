package com.tm.makereport;
import java.io.*;  
import javax.servlet.*;  
import javax.servlet.http.*;  
  
public class DownloadFile extends HttpServlet {  
  
public void doGet(HttpServletRequest request, HttpServletResponse response)  
{  
try
{
String fileName=request.getParameter("name");
System.out.println("name of file arrived======"+fileName);

ServletContext context=request.getServletContext();
String fs=File.separator;
 String downloadFilePath=null;

downloadFilePath=context.getRealPath(fs+"WEB-INF"+fs+"jsonFiles");


System.out.println("download files path==="+downloadFilePath);

fileName=fileName+".zip";
  
response.setContentType("text/html");  
PrintWriter out = response.getWriter();  
response.setContentType("APPLICATION/OCTET-STREAM");   
response.setHeader("Content-Disposition","attachment; filename=\"" +fileName + "\"");   
  
FileInputStream fileInputStream = new FileInputStream(downloadFilePath +fs+ fileName);  
            
int i;   
while ((i=fileInputStream.read()) != -1) 
{  
out.write(i);   
}   
fileInputStream.close();   
out.close();   

}catch(Exception e)
{
e.printStackTrace();
}
}  
  
}  