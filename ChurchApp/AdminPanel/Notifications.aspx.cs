#region CopyRight
/// Created By   : Anija G
/// Created date : 03- Nov- 2016
#endregion CopyRight

#region NameSpace
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Services;

#endregion NameSpace

namespace ChurchApp.AdminPanel
{
    public partial class Notifications : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region GetAllNotifications
        [WebMethod(EnableSession = true)]
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
        [WebMethod(EnableSession = true)]
        public static string GetNotificationByID(Notification NotificationsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    NotificationsObj.churchId = UA.ChurchID;
                    NotificationsObj.SelectNotificationByID();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
                return jsSerializer.Serialize(NotificationsObj);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        #endregion GetNotificationByID

        #region InsertNotification
        [WebMethod(EnableSession = true)]
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

        #region Insert Notification Schedule
        [WebMethod(EnableSession = true)]
        public static string InsertNotificationSchedule(List<NotificationSchedule> NotScheduleObj)
        {

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;

            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    foreach (var schedule in NotScheduleObj)
                    {
                        schedule.createdBy = UA.userName;
                        schedule.InsertNotificationSchedule();
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
            return jsSerializer.Serialize(NotScheduleObj);
        }
        #endregion Insert Notification Schedule


        #region GetAllNotificationType
        [WebMethod(EnableSession = true)]
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
        [WebMethod(EnableSession = true)]
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

        #region Send Notification To App
        [WebMethod(EnableSession = true)]
        public static string SendNotificationToApp(List<Notification> NotificationsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;

            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {                   
                    foreach(var notification in NotificationsObj)
                    {
                        try
                        {
                            notification.churchId = UA.ChurchID;
                            notification.SendToFCM(notification.caption, notification.description, false, notification.churchId);
                            notification.status = "1";//Processed status to db
                            notification.UpdateNotificationStatus();
                        }
                        catch(Exception e)
                        {
                            notification.status = "2";//Failure status to db
                            notification.UpdateNotificationStatus();
                        }
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
                NotificationsObj[0].status = ex.Message;
            }
           return jsSerializer.Serialize(NotificationsObj);
        }
        #endregion Send Notification To App

        #region DeleteNotification
        [WebMethod(EnableSession = true)]
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
        [WebMethod(EnableSession = true)]
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
        [WebMethod(EnableSession = true)]
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
        [WebMethod(EnableSession = true)]
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

        #region SelectNewNotifications
        [WebMethod(EnableSession = true)]
        public static string SelectNewNotifications(Notification NotificationsObj)
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
                    ds = NotificationsObj.SelectAllNotifications();
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
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion SelectAllNotifications
    }
}