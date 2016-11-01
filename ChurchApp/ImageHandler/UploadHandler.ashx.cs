
#region Included Namespaces
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
#endregion Included Namespaces

namespace ChurchApp.ImageHandler
{
    /// <summary>
    /// Summary description for UploadHandler
    /// </summary>
    public class UploadHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            string url = context.Request.QueryString["url"];

            if (url != string.Empty && url != null && url != "null")
            {
                context.Response.WriteFile(url); 
            }
            
            else{
            string fname=string.Empty;

        if (context.Request.Files.Count > 0)
        {
        HttpFileCollection files = context.Request.Files;
        for (int i = 0; i < files.Count; i++)
        {
        HttpPostedFile file = files[i];
        
        if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
        {
        string[] testfiles = file.FileName.Split(new char[] { '\\' });
        fname = testfiles[testfiles.Length - 1];
        }
        else
        {
        fname = file.FileName;
        }
        fname = Path.Combine(context.Server.MapPath("~/img/gallery"), fname);
        file.SaveAs(fname);
        }
        }

        context.Response.Write(fname);

        //context.Response.ContentType = "text/plain";
        //context.Response.Write("File Uploaded Successfully!");


                    //context.Response.ContentType = "text/plain";
            //context.Response.Write("Hello World");
        }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}