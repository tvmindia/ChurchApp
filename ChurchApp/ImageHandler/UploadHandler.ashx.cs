
#region Included Namespaces
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
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
            context.Response.ContentType = "text/plain";
            try
            {

                string TemplatePath = "";
               
                if (context.Request.Files.Count > 0)
                {

                    foreach (string s in context.Request.Files)
                    {
                        HttpPostedFile file = context.Request.Files[s];
                        switch (s)
                        {

                            case "tempfile":
                                    string fn = System.IO.Path.GetFileName(file.FileName);
                                    string guid = context.Request.Form.GetValues("GUID")[0];
                                    string SaveLocation = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                                    try
                                    {
                                        HttpPostedFile postedFile = context.Request.Files["tempfile"];
                                        //if (Directory.Exists(SaveLocation))
                                        //{
                                            postedFile.SaveAs(SaveLocation + @"\" + guid);
                                            string fileName = postedFile.FileName;

                                            //  context.Response.Write(matchesImgSrc.Count);
                                            TemplatePath = "~/AppImages/" + guid;
                                            TemplatePath=TemplatePath.Replace("~/", "");

                                        //}
                                        context.Response.Write(TemplatePath);

                                    }
                                    catch (Exception ex)
                                    {
                                        throw ex;
                                    }
                                    break;

                        }
                    }//end of loop

                } //end of if count

            }//try
            catch (Exception e)
            {
                throw e;
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