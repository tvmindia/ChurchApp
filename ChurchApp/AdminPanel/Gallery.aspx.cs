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

         #region GetAllImageByAlbumID
        [System.Web.Services.WebMethod]
        public static string GetAllImageByAlbumID(GalleryItems GalleryItemsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataSet ds = null;
            try
            {

                GalleryItemsObj.churchId = "41f453f6-62a4-4f80-8fc5-1124e6074287";
                ds = GalleryItemsObj.SelectGalleryItems();
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
#endregion GetAllImageByAlbumID

        #region InsertImageAlbum
        [System.Web.Services.WebMethod]
        public static string InsertImageAlbum(GalleryAlbum GalleryAlbumObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            GalleryAlbumObj.churchId = "41f453f6-62a4-4f80-8fc5-1124e6074287";
            GalleryAlbumObj.albumType="image";
            GalleryAlbumObj.createdBy = "albert";
            GalleryAlbumObj.InsertGalleryAlbum();
            return jsSerializer.Serialize(GalleryAlbumObj);

        }
        #endregion InsertImageAlbum


        #region DeleteImageItem
        [System.Web.Services.WebMethod]
        public static string DeleteImageItem(GalleryItems GalleryItemsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            GalleryItemsObj.churchId = "41f453f6-62a4-4f80-8fc5-1124e6074287";
            GalleryItemsObj.DeleteGalleryItem();
            
            return jsSerializer.Serialize(GalleryItemsObj);
        }

        #endregion DeleteImageItem

        #region DeleteAlbumItem
        [System.Web.Services.WebMethod]
        public static string DeleteAlbumItem(GalleryItems GalleryItemsObj)
        {
            DataSet ds = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            GalleryItemsObj.GalleryAlbObj.churchId = "41f453f6-62a4-4f80-8fc5-1124e6074287";
            ds=GalleryItemsObj.SelectGalleryItems();
            if(ds!=null)
            {
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    GalleryItemsObj.galleryItemID = dr["ID"].ToString();
                    GalleryItemsObj.url = dr["URL"].ToString();
                    GalleryItemsObj.DeleteGalleryItem();
                }
                GalleryItemsObj.GalleryAlbObj.DeleteGalleryAlbum();
            }
        
           


            return jsSerializer.Serialize(GalleryItemsObj);
        }

        #endregion DeleteAlbumItem

#region GetAllGalleryVideoAlbumByChurchID
[System.Web.Services.WebMethod]
public static string GetAllGalleryVideoAlbumByChurchID(GalleryAlbum GalleryAlbumObj)
{

    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
    DataSet ds = null;
    try
    {
       GalleryAlbumObj.churchId = "41f453f6-62a4-4f80-8fc5-1124e6074287";
       ds = GalleryAlbumObj.GetAllGalleryVideoAlbumByChurchID();
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
#endregion GetAllGalleryVideoAlbumByChurchID



#region GetAllVideosByAlbumID
[System.Web.Services.WebMethod]
public static string GetAllVideosByAlbumID(GalleryItems GalleryItemsObj)
{
    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
    DataSet ds = null;
    try
    {

        GalleryItemsObj.churchId = "41f453f6-62a4-4f80-8fc5-1124e6074287";
        ds = GalleryItemsObj.SelectGalleryItems();
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
#endregion GetAllVideosByAlbumID

    
    
    }
}