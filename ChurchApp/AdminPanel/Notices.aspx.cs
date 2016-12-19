
#region CopyRight
/// Created By   : SHAMILA T P
/// Created date : Oct- 29- 2016
#endregion CopyRight

#region Included Namespaces
using ChurchApp.DAL;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
#endregion Included Namespaces

namespace ChurchApp.AdminPanel
{
    public partial class Notices : System.Web.UI.Page
    {
        #region Global Variables

        #endregion Global Variables

        #region Events

        #region Page Load 
        
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        #endregion Page Load

        #endregion Events

        #region Methods

        //-------------* General  Methods *--------------//

        #region Delete From Server Folder
          [System.Web.Services.WebMethod]
        public static void DeleteFileFromFolder(string imgPath)
        {
            if (imgPath.Contains('/'))
            {
            string imgName = imgPath.Split('/').Last();

            string ServerPath = HttpContext.Current.Server.MapPath("~/img/AppImages/" + imgName);

            FileInfo file = new FileInfo(ServerPath);
            if (file.Exists)
            {
                file.Delete();
            }

            }
        }

        #endregion 

        //-------------* Notice  Methods *--------------//

        #region Get Notice Types

        [System.Web.Services.WebMethod]
        public static string GetNoticeTypes(ChurchApp.DAL.NoticeType NoticeTypeObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            DAL.Security.UserAuthendication UA;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    ds = NoticeTypeObj.SelectNoticeType();

                    //Converting to Json

                    //       if (ds.Tables[0] != null)
                    //{

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
                    //}
                    jsonResult = jsSerializer.Serialize(parentRow);
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
          

            return jsonResult;
        }


        #endregion Get Notice Types

        #region Get All Notices

        [System.Web.Services.WebMethod]
        public static string GetNotices(ChurchApp.DAL.Notices  NoticeObj)
        {
            DAL.Security.UserAuthendication UA;
             
             JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
             List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
             Dictionary<string, object> childRow;
            string jsonResult = null;
            DataSet ds = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NoticeObj.churchId = UA.ChurchID;
                    ds = NoticeObj.SelectNotices();

                    //Converting to Json

                    //       if (ds.Tables[0] != null)
                    //{

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
                    //}
                    jsonResult = jsSerializer.Serialize(parentRow);
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch(Exception ex)
            {
                throw ex;
            }
           

            return jsonResult;
        }

        #endregion Get Notices

        #region Get Latest Notices

        [System.Web.Services.WebMethod]
        public static string GetLatestNotices(ChurchApp.DAL.Notices NoticeObj)
        {
            DAL.Security.UserAuthendication UA;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
          

            string jsonResult = null;
            DataSet ds = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NoticeObj.churchId = UA.ChurchID;
                    ds = NoticeObj.SelectLatestNotices();

                    //Converting to Json
                   
                    //       if (ds.Tables[0] != null)
                    //{

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
                    //}
                    jsonResult = jsSerializer.Serialize(parentRow);
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
           

            return jsonResult;
        }


        #endregion Get Latest Notices

        #region Get Notice By NoticeID

        [System.Web.Services.WebMethod]
        public static string GetNoticeDetailsByNoticeID(ChurchApp.DAL.Notices NoticeObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
            try
            {

                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    ds = NoticeObj.GetNoticesByNoticeID();

                    //Converting to Json

                    //       if (ds.Tables[0] != null)
                    //{

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
                    //}
                    jsonResult = jsSerializer.Serialize(parentRow);

                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

           return jsonResult;
        }


        #endregion  Get Notice By NoticeID

        #region  Insert Notice

        [System.Web.Services.WebMethod]
        public static string InsertNotice(ChurchApp.DAL.Notices NoticeObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            string status = null;
            DAL.Security.UserAuthendication UA;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NoticeObj.churchId = UA.ChurchID;
                    NoticeObj.createdBy = UA.userName;
                    status = NoticeObj.InsertNotice().ToString();
                    NoticeObj.status = status;
                }
                else
                {

                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return jsSerializer.Serialize(NoticeObj);
            
        }

        #endregion Insert Notice

        #region  Update Notice

        [System.Web.Services.WebMethod]
        public static string UpdateNotice(ChurchApp.DAL.Notices NoticeObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
          
            
             string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NoticeObj.churchId = UA.ChurchID;
                    NoticeObj.createdBy = UA.userName;
                    status = NoticeObj.UpdateNotice().ToString();
                    NoticeObj.status = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
               
            }
            catch (Exception ex)
            {
                throw ex;
            }
          
            return jsSerializer.Serialize(NoticeObj);

        }

        #endregion Update Notice

        #region Delete Notice

        [System.Web.Services.WebMethod]
        public static string DeleteNotice(ChurchApp.DAL.Notices NoticeObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            
           
            string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NoticeObj.churchId = UA.ChurchID;
                    if (NoticeObj.noticeId != string.Empty || NoticeObj.noticeId != null)
                    {
                        status = NoticeObj.DeleteNotice().ToString();
                        NoticeObj.status = status;
                    }
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
              

            }
            catch (Exception ex)
            {
                throw ex;
            }
            
            return jsSerializer.Serialize(NoticeObj);

        }


        #endregion Delete Notice

        //-------------* AppImage  Methods *--------------//

        #region  Insert App Image

        [System.Web.Services.WebMethod]
        public static string InsertAppImage(ChurchApp.DAL.AppImages AppImgObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            string status = null;


            DAL.Security.UserAuthendication UA;
           
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    AppImgObj.createdBy = UA.userName;
                    status = AppImgObj.InsertAppImage();
                }
               else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
            return jsSerializer.Serialize(AppImgObj);

        }

        #endregion Insert App Image

        #region Delete App Image

        [System.Web.Services.WebMethod]
        public static string DeleteAppImage(ChurchApp.DAL.AppImages AppImgObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            string status = null;
            DAL.Security.UserAuthendication UA;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    status = AppImgObj.DeleteAppImage();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
                
            }
            catch (Exception ex)
            {
                throw ex;
            }
          
            return jsSerializer.Serialize(AppImgObj);

        }


        #endregion Delete App Image

        //-------------* Notification  Methods *--------------//
        #region Insert Notification

        [System.Web.Services.WebMethod]
        public static string InsertNotification(ChurchApp.DAL.Notification NotificationObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
           
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationObj.churchId = UA.ChurchID;
                    NotificationObj.createdBy = UA.userName;
                    NotificationObj.status = NotificationObj.InsertNotification().ToString();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
               
               // NotificationObj.status = status;
              
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsSerializer.Serialize(NotificationObj);
        }


        #endregion  Insert Notification

       //--Below events or methods are  Not Using now

        #region  Get Server Map Path

        [System.Web.Services.WebMethod]
        public static string GetServerMapPath(string Path)
        {
            string ServerPath = HttpContext.Current.Server.MapPath("~/img/" + Path);
            return ServerPath;

        }

        #endregion Get Server Map Path

        #endregion Methods

    }
}