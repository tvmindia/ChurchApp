#region CopyRight

// Created By   : SHAMILA T P
// Created Date : Oct 27 2016

#endregion CopyRight

#region Included Namespaces

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Collections;
using System.Drawing;
using System.IO;

#endregion Included Namespaces

namespace ChurchApp.WebServices
{
    /// <summary>
    /// Summary description for WebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {
        #region Churches
        [WebMethod]
        public string SearchChurch(string SearchTerm )
        {
            DataTable dt = new DataTable();
            try
            {
                ChurchApp.DAL.Church chrchobj = new DAL.Church();
                dt = chrchobj.SearchChurchesByChurchOrTownName(SearchTerm);
                
            }
            catch (Exception ex)
            {
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }


        #endregion Churches

        #region General Methods

        #region JSON converter
        /// <summary>
        /// JSON function without returning any images
        /// </summary>
        /// <param name="dt">Datatable to be converted</param>
        /// <returns>dt in JSON format</returns>
        public String getDbDataAsJSON(DataTable dt)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;

            try
            {
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    rows.Add(row);
                }
                this.Context.Response.ContentType = "";
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }

            return serializer.Serialize(rows);

        }
        /// <summary>
        /// JSON function with returning any images
        /// </summary>
        /// <param name="ds">Dataset</param>
        /// <param name="imgColName">Coloumn names array that contains images(data)</param>
        /// <param name="imgFileNameCol">Coloumn names array that contain file name</param>
        /// <param name="imgFileTypeCol">Coloumn names array that contain file type</param>
        /// <param name="isThumb">Optional parameter to say whether the thumbnail is enough for calling function</param>
        /// <returns>ds in JSON format with links to images that are temporarly stored in server folder</returns>
        public String getDbDataAsJSON(DataTable dt, ArrayList imgColName, ArrayList imgFileNameCol, ArrayList imgFileTypeCol, Boolean isThumb = false)
        {

            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;

            try
            {
                // DataTable dt = ds.Tables[0];
                String filePath = Server.MapPath("~/Media/");

                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    //adding data in JSON
                    foreach (DataColumn col in dt.Columns)
                    {
                        if (!imgColName.Contains(col.ColumnName))
                        {
                            row.Add(col.ColumnName, dr[col]);
                        }
                    }
                    //adding image details in JSON
                    for (int i = 0; i < imgColName.Count; i++)
                    {

                        if (dr[imgColName[i] as string] != DBNull.Value)
                        {
                            String fileURL;
                            if (imgFileTypeCol != null)
                                fileURL = filePath + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_") + dr[imgFileTypeCol[i] as string].ToString();
                            else
                                fileURL = filePath + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_") + ".jpg";

                            if (!System.IO.File.Exists(fileURL))
                            {
                                byte[] buffer;
                                if (isThumb)
                                {
                                    buffer = MakeThumbnail((byte[])dr[imgColName[i] as string], 400);//images are converted to thumbnails
                                    System.IO.File.WriteAllBytes(fileURL, buffer);
                                }
                                else
                                {
                                    buffer = (byte[])dr[imgColName[i] as string];
                                    System.IO.File.WriteAllBytes(fileURL, buffer);
                                }

                            }
                            row.Add(imgColName[i] as string, fileURL);
                        }

                    }
                    rows.Add(row);
                }

                this.Context.Response.ContentType = "";

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }

            return serializer.Serialize(rows);
        }
        #endregion JSON converter

        #region Utility Functions
        //----------------------------Function to make image thumbnail---------------------------------------------------
        public static byte[] MakeThumbnail(byte[] myImage, int thumbWidth)
        {
            Image img = Image.FromStream(new MemoryStream(myImage));
            int originalHeigth = img.Size.Height;
            int originalWidth = img.Size.Width;
            int thumbHeight = originalHeigth * thumbWidth / originalWidth;
            using (MemoryStream ms = new MemoryStream())
            using (Image thumbnail = img.GetThumbnailImage(thumbWidth, thumbHeight, null, new IntPtr()))
            {
                thumbnail.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                return ms.ToArray();
            }
        }
        #endregion Utility Functions

        #endregion General Methods

    }
}
