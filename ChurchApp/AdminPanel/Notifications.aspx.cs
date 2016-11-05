﻿using ChurchApp.DAL;
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
    public partial class Notifications : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region GetAllNotifications
        [System.Web.Services.WebMethod]
        public static string GetAllNotifications(Notification NotificationsObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj=new DAL.Church();
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

            return jsonResult;
        }
        #endregion GetAllNotifications

        #region GetNotificationByID
        [System.Web.Services.WebMethod]
        public static string GetNotificationByID(Notification NotificationsObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
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

            return jsonResult;
        }
        #endregion GetNotificationByID

        #region InsertNotification
        [System.Web.Services.WebMethod]
        public static string InsertNotification(Notification NotificationsObj)
        {
            string status = null;
            status = NotificationsObj.InsertNotification();
            return status;
        }
        #endregion InsertNotification

        #region GetAllNotificationType
        [System.Web.Services.WebMethod]
        public static string GetAllNotificationType(NotificationType NotificationTypeObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
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

            return jsonResult;
        }
        #endregion GetAllNotificationType

        #region UpdateNotification
        [System.Web.Services.WebMethod]
        public static string UpdateNotification(Notification NotificationsObj)
        {
            string status = null;
            status = NotificationsObj.UpdateNotification();
            return status;
        }
        #endregion UpdateNotification

        #region DeleteNotification
        [System.Web.Services.WebMethod]
        public static string DeleteNotification(Notification NotificationsObj)
        {
            string status = null;
            status = NotificationsObj.DeleteNotification();
            return status;
        }
        #endregion DeleteNotification

        #region SelectOldNotifications
        [System.Web.Services.WebMethod]
        public static string SelectOldNotifications(Notification NotificationsObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
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

            return jsonResult;
        }
        #endregion SelectOldNotifications
    }
}