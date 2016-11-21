#region CopyRight
/// Created By   : Anija G
/// Created date : 03- Nov- 2016
#endregion CopyRight

#region NameSpace
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
#endregion NameSpace

namespace ChurchApp.AdminPanel
{
    public partial class Notifications : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region GetAllNotifications
        [System.Web.Services.WebMethod]
        public static string GetAllNotifications(Notification NotificationsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj=new DAL.Church();
            try
            {
                if (UA != null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectNewNotifications();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
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


                    jsonResult = jsSerializer.Serialize(parentRow);
                }
            }
           catch(Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion GetAllNotifications

        #region GetNotificationByID
        [System.Web.Services.WebMethod]
        public static string GetNotificationByID(Notification NotificationsObj)
        {

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectNotificationByID();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
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


                    jsonResult = jsSerializer.Serialize(parentRow);

                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            
            return jsonResult;
        }
        #endregion GetNotificationByID

        #region InsertNotification
        [System.Web.Services.WebMethod]
        public static string InsertNotification(Notification NotificationsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    status = NotificationsObj.InsertNotification();
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion InsertNotification

        #region GetAllNotificationType
        [System.Web.Services.WebMethod]
        public static string GetAllNotificationType(NotificationType NotificationTypeObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if(UA!=null)
                {
                    NotificationTypeObj.churchId = UA.ChurchID;
                    ds = NotificationTypeObj.SelectNotificationType();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
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


                    jsonResult = jsSerializer.Serialize(parentRow);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            
            return jsonResult;
        }
        #endregion GetAllNotificationType

        #region UpdateNotification
        [System.Web.Services.WebMethod]
        public static string UpdateNotification(Notification NotificationsObj)
        {
             DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    status = NotificationsObj.UpdateNotification();
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
           
            return status;
        }
        #endregion UpdateNotification

        #region DeleteNotification
        [System.Web.Services.WebMethod]
        public static string DeleteNotification(Notification NotificationsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    status = NotificationsObj.DeleteNotification();
                }
                
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion DeleteNotification

        #region SelectOldNotifications
        [System.Web.Services.WebMethod]
        public static string SelectOldNotifications(Notification NotificationsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectOldtNotifications();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
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


                    jsonResult = jsSerializer.Serialize(parentRow);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return jsonResult;
        }
        #endregion SelectOldNotifications

        #region SelectAllOldNotifications
        [System.Web.Services.WebMethod]
        public static string SelectAllOldNotifications(Notification NotificationsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectAllOldNotifications();
                }

                // ds = N

                //Converting to Json
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
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


                jsonResult = jsSerializer.Serialize(parentRow);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            
            return jsonResult;
        }
        #endregion SelectAllOldNotifications

        #region SelectAllNewNotifications
        [System.Web.Services.WebMethod]
        public static string SelectAllNewNotifications(Notification NotificationsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectAllNewNotifications();
                }
                // ds = N

                //Converting to Json
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
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


                jsonResult = jsSerializer.Serialize(parentRow);
            }
            catch(Exception ex)
            {
                throw ex;
            }
           
            return jsonResult;
        }
        #endregion SelectAllNewNotifications
    }
}