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
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

                
                DataSet ds = null;


                GalleryAlbumObj.churchId=UA.ChurchID.ToString();
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
            
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;


                GalleryItemsObj.churchId = UA.ChurchID;
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
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                GalleryAlbumObj.churchId = UA.ChurchID;
                GalleryAlbumObj.albumType = "image";
                GalleryAlbumObj.createdBy = UA.userName;
                GalleryAlbumObj.InsertGalleryAlbum();
            }
            catch(Exception ex)
            {

            }
            finally
            {

            }
           
            return jsSerializer.Serialize(GalleryAlbumObj);

        }
        #endregion InsertImageAlbum


        #region DeleteImageItem
        [System.Web.Services.WebMethod]
        public static string DeleteImageItem(GalleryItems GalleryItemsObj)
        {

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                GalleryItemsObj.churchId = UA.ChurchID;
                GalleryItemsObj.DeleteGalleryItem();
            
            }
            catch(Exception ex)
            {

            }
            finally
            {

            }
        
            return jsSerializer.Serialize(GalleryItemsObj);
        }

        #endregion DeleteImageItem

        #region DeleteAlbumItem
        [System.Web.Services.WebMethod]
        public static string DeleteAlbumItem(GalleryItems GalleryItemsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;

                GalleryItemsObj.GalleryAlbObj.churchId = UA.ChurchID;
                ds = GalleryItemsObj.SelectGalleryItems();
                if (ds != null)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        GalleryItemsObj.galleryItemID = dr["ID"].ToString();
                        GalleryItemsObj.url = dr["URL"].ToString();
                        GalleryItemsObj.DeleteGalleryItem();
                    }
                    GalleryItemsObj.GalleryAlbObj.DeleteGalleryAlbum();
                }
        
            }
            catch (Exception ex)
            {
 
            }
            finally
            {

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
   
    try
    {
        DAL.Security.UserAuthendication UA;
        DAL.Const Const = new DAL.Const();
        UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
        DataSet ds = null;
        GalleryAlbumObj.churchId = UA.ChurchID;
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
        DAL.Security.UserAuthendication UA;
        DAL.Const Const = new DAL.Const();
        UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
        GalleryItemsObj.churchId = UA.ChurchID;
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


#region DeleteVideoItem
[System.Web.Services.WebMethod]
public static string DeleteVideoItem(GalleryItems GalleryItemsObj)
{
    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    try
    {
        DAL.Security.UserAuthendication UA;
        DAL.Const Const = new DAL.Const();
        UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
        GalleryItemsObj.churchId = UA.ChurchID;
        GalleryItemsObj.DeleteGalleryItem();
    }
    catch(Exception ex)
    {

    }
    finally
    {

    }
    
 
    return jsSerializer.Serialize(GalleryItemsObj);
}
#endregion DeleteVideoItem

#region DeleteVideoAlbumItem
[System.Web.Services.WebMethod]
public static string DeleteVideoAlbumItem(GalleryItems GalleryItemsObj)
{
    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    try
    {
        DAL.Security.UserAuthendication UA;
        DAL.Const Const = new DAL.Const();
        UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

        DataSet ds = null;

        GalleryItemsObj.GalleryAlbObj.churchId = UA.ChurchID;
        ds = GalleryItemsObj.SelectGalleryItems();
        if (ds != null)
        {
            foreach (DataRow dr in ds.Tables[0].Rows)
            {
                GalleryItemsObj.galleryItemID = dr["ID"].ToString();
                GalleryItemsObj.url = dr["URL"].ToString();
                GalleryItemsObj.DeleteGalleryItem();
            }
            GalleryItemsObj.GalleryAlbObj.DeleteGalleryAlbum();
        }
    }
    catch(Exception ex)
    {

    }
    finally
    {

    }
      return jsSerializer.Serialize(GalleryItemsObj);
}
        #endregion DeleteVideoAlbumItem

    }
}