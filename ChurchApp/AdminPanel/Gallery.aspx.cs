using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace ChurchApp.AdminPanel
{
    public partial class Gallery : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
         #region GetAllGalleryImageAlbumByChurchID
        [WebMethod(EnableSession = true)]
        public static string GetAllGalleryImageAlbumByChurchID(GalleryAlbum GalleryAlbumObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    DataSet ds = null;
                    GalleryAlbumObj.churchId = UA.ChurchID.ToString();
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
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {

            }
          
            
            return jsSerializer.Serialize(parentRow);

        }

        #endregion GetAllGalleryImageAlbumByChurchID

         #region GetAllImageByAlbumID
        [WebMethod(EnableSession = true)]
        public static string GetAllImageByAlbumID(GalleryItems GalleryItemsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
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
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {

            }
           
            return jsSerializer.Serialize(parentRow);

        }
#endregion GetAllImageByAlbumID

        #region InsertImageAlbum
        [WebMethod(EnableSession = true)]
        public static string InsertImageAlbum(GalleryAlbum GalleryAlbumObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    GalleryAlbumObj.churchId = UA.ChurchID;
                    GalleryAlbumObj.albumType = "image";
                    GalleryAlbumObj.createdBy = UA.userName;
                    GalleryAlbumObj.InsertGalleryAlbum();

                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {
                GalleryAlbumObj.message = ex.Message;

            }
         
            return jsSerializer.Serialize(GalleryAlbumObj);

        }
        #endregion InsertImageAlbum


        #region DeleteImageItem
        [WebMethod(EnableSession = true)]
        public static string DeleteImageItem(GalleryItems GalleryItemsObj)
        {

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    GalleryItemsObj.churchId = UA.ChurchID;
                    GalleryItemsObj.DeleteGalleryItem();

                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {
                GalleryItemsObj.message = ex.Message;
            }
          
        
            return jsSerializer.Serialize(GalleryItemsObj);
        }

        #endregion DeleteImageItem

        #region DeleteAlbumItem
        [WebMethod(EnableSession = true)]
        public static string DeleteAlbumItem(GalleryItems GalleryItemsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
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
                       GalleryItemsObj.status= GalleryItemsObj.GalleryAlbObj.DeleteGalleryAlbum();
                    }
                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {
                GalleryItemsObj.message = ex.Message;
            }
           
            finally
            {

            }
       return jsSerializer.Serialize(GalleryItemsObj);
        }

        #endregion DeleteAlbumItem

        #region InsertVideoAlbum
        [WebMethod(EnableSession = true)]
        public static string InsertVideoAlbum(GalleryAlbum GalleryAlbumObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    GalleryAlbumObj.churchId = UA.ChurchID;
                    GalleryAlbumObj.albumType = "video";
                    GalleryAlbumObj.createdBy = UA.userName;
                    GalleryAlbumObj.InsertGalleryAlbum();

                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {
                GalleryAlbumObj.message = ex.Message;

            }

            return jsSerializer.Serialize(GalleryAlbumObj);

        }
        #endregion InsertImageAlbum

        #region InsertVideoItemsAlbum
        [WebMethod(EnableSession = true)]
        public static string InsertVideoItemAlbum(GalleryItems GalItemsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    GalItemsObj.createdBy = UA.userName;
                    GalItemsObj.Source = "EXTL";
                    GalItemsObj.InsertGalleryItem();

                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {
                GalItemsObj.message = ex.Message;

            }

            return jsSerializer.Serialize(GalItemsObj);

        }
        #endregion InsertImageAlbum
 #region GetAllGalleryVideoAlbumByChurchID
 [WebMethod(EnableSession = true)]
 public static string GetAllGalleryVideoAlbumByChurchID(GalleryAlbum GalleryAlbumObj)
 {

    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
    Security.UserAuthendication UA = null;
    try
    {
        DashBoard dashBoardObj = new DashBoard();
        UA = dashBoardObj.GetCurrentUserSession();
        if (UA != null)
        {
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
        //Session is out
        else
        {
            Common comonObj = new Common();
            return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
        }
    }
    catch (Exception ex)
    {

    }
  
    return jsSerializer.Serialize(parentRow);
 }
 #endregion GetAllGalleryVideoAlbumByChurchID



#region GetAllVideosByAlbumID
[WebMethod(EnableSession = true)]
public static string GetAllVideosByAlbumID(GalleryItems GalleryItemsObj)
{
    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
    Security.UserAuthendication UA = null;
    try
    {
        DashBoard dashBoardObj = new DashBoard();
        UA = dashBoardObj.GetCurrentUserSession();
        if (UA != null)
        {

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
        //Session is out
        else
        {
            Common comonObj = new Common();
            return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
        }
    }
    catch (Exception ex)
    {

    }
   
    return jsSerializer.Serialize(parentRow);
}
#endregion GetAllVideosByAlbumID


#region DeleteVideoItem
[WebMethod(EnableSession = true)]
public static string DeleteVideoItem(GalleryItems GalleryItemsObj)
{
    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    Security.UserAuthendication UA = null;
    try
    {
        DashBoard dashBoardObj = new DashBoard();
        UA = dashBoardObj.GetCurrentUserSession();
        if (UA != null)
        {

        DAL.Const Const = new DAL.Const();
        UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
        GalleryItemsObj.churchId = UA.ChurchID;
        GalleryItemsObj.DeleteGalleryItem();
        }
        //Session is out
        else
        {
            Common comonObj = new Common();
            return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
        }
    }
    catch (Exception ex)
    {
        GalleryItemsObj.message = ex.Message;
    }
  
    finally
    {

    }
    
 
    return jsSerializer.Serialize(GalleryItemsObj);
}
#endregion DeleteVideoItem

#region DeleteVideoAlbumItem
[WebMethod(EnableSession = true)]
public static string DeleteVideoAlbumItem(GalleryItems GalleryItemsObj)
{
    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
    Security.UserAuthendication UA = null;
    try
    {
        DashBoard dashBoardObj = new DashBoard();
        UA = dashBoardObj.GetCurrentUserSession();
        if (UA != null)
        {

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
        //Session is out
        else
        {
            Common comonObj = new Common();
            return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
        }
    }
    catch (Exception ex)
    {
        GalleryItemsObj.message = ex.Message;
    }
   
    finally
    {

    }
      return jsSerializer.Serialize(GalleryItemsObj);
}
        #endregion DeleteVideoAlbumItem

    }
}