using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ChurchApp.AdminPanel
{
    public partial class Gallery : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region GetAllGalleryImageAlbumByChurchID
        [System.Web.Services.WebMethod]
        public static string GetAllGalleryImageAlbumByChurchID(GalleryAlbum GalleryAlbumObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataSet ds = null;
            try
            {
                GalleryAlbumObj.churchId="41f453f6-62a4-4f80-8fc5-1124e6074287";
                ds = GalleryAlbumObj.GetAllGalleryImageAlbumByChurchID();
                //Converting to Json
                Dictionary<string, object> childRow;
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow row in ds.Tables[0].Rows)
                    {
                        childRow = new Dictionary<string, object>();
                        foreach (DataColumn col in ds.Tables[0].Columns)
                        {
                            childRow.Add(col.ColumnName, row[col]);
                        }
                        parentRow.Add(childRow);
                    }
                }
            }
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(parentRow);

        }

        #endregion GetAllGalleryImageAlbumByChurchID


    }
}