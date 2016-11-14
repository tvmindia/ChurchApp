
#region CopyRight
/// Created By   : SHAMILA T P
/// Created date : Nov- 11- 2016
#endregion CopyRight

#region Included Namespaces
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
#endregion Included Namespaces

namespace ChurchApp.AdminPanel
{
    public partial class Novenas : System.Web.UI.Page
    {
        #region Events

        #region Page Load

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #endregion Page Load

        #endregion Events

        #region Methods

        #region Get All Patrons

        [System.Web.Services.WebMethod]
        public static string GetAllPatrons(PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataSet ds = null;
            try
            {
                ds = PatrnObj.SelectPatronMaster();
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
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);


        }

        #endregion Get All Patrons

        #region GetAllGalleryImageAlbumByChurchID
        [System.Web.Services.WebMethod]
        public static string GetAllGalleryImageAlbumByChurchID(GalleryAlbum GalleryAlbumObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataSet ds = null;
            try
            {
                GalleryAlbumObj.churchId = UA.ChurchID;
                GalleryAlbumObj.churchId = "41f453f6-62a4-4f80-8fc5-1124e6074287";


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

        #endregion Methods


    }
}