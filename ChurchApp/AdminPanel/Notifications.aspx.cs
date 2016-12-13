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
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
         
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj=new DAL.Church();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectNewNotifications();
                    // ds = N

                    //Converting to Json
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
        #endregion GetAllNotifications

        #region GetNotificationByID
        [System.Web.Services.WebMethod]
        public static string GetNotificationByID(Notification NotificationsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
           
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectNotificationByID();
                    // ds = N

                    //Converting to Json
                   
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
        #endregion GetNotificationByID

        #region InsertNotification
        [System.Web.Services.WebMethod]
        public static string InsertNotification(Notification NotificationsObj)
        {

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
           
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    NotificationsObj.createdBy = UA.userName;
                    NotificationsObj.status = NotificationsObj.InsertNotification();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                NotificationsObj.status = ex.Message;
            }
            return jsSerializer.Serialize(NotificationsObj);
        }
        #endregion InsertNotification

        #region GetAllNotificationType
        [System.Web.Services.WebMethod]
        public static string GetAllNotificationType(NotificationType NotificationTypeObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
           
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationTypeObj.churchId = UA.ChurchID;
                    ds = NotificationTypeObj.SelectNotificationType();
                    // ds = N

                    //Converting to Json
                   
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
        #endregion GetAllNotificationType

        #region UpdateNotification
        [System.Web.Services.WebMethod]
        public static string UpdateNotification(Notification NotificationsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
             DAL.Security.UserAuthendication UA;
           
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    NotificationsObj.updatedBy = UA.userName;
                    NotificationsObj.status = NotificationsObj.UpdateNotification();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                NotificationsObj.status = ex.Message;
            }

            return jsSerializer.Serialize(NotificationsObj);
        }
        #endregion UpdateNotification

        #region DeleteNotification
        [System.Web.Services.WebMethod]
        public static string DeleteNotification(Notification NotificationsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
           
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    NotificationsObj.status = NotificationsObj.DeleteNotification();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
                
            }
            catch(Exception ex)
            {
                NotificationsObj.status = ex.Message;
            }
            return jsSerializer.Serialize(NotificationsObj);
        }
        #endregion DeleteNotification

        #region SelectOldNotifications
        [System.Web.Services.WebMethod]
        public static string SelectOldNotifications(Notification NotificationsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
           
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectOldtNotifications();
                    // ds = N

                    //Converting to Json
                    
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
        #endregion SelectOldNotifications

        #region SelectAllOldNotifications
        [System.Web.Services.WebMethod]
        public static string SelectAllOldNotifications(Notification NotificationsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
          
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectAllOldNotifications();
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
        #endregion SelectAllOldNotifications

        #region SelectAllNewNotifications
        [System.Web.Services.WebMethod]
        public static string SelectAllNewNotifications(Notification NotificationsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
            
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    ds = NotificationsObj.SelectAllNewNotifications();
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
        #endregion SelectAllNewNotifications
    }
}