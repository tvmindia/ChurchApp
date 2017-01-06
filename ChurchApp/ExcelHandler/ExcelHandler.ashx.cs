using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchApp.ExcelHandler
{
    /// <summary>
    /// Summary description for ExcelHandler
    /// </summary>
    public class ExcelHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            context.Response.Write("Hello World");
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