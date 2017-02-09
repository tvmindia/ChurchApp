using Church.DAL;
using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Text;
using System.Web.Script.Serialization;

namespace ChurchApp.DAL
{
    public class Notification
    {
        Common commonObj = new Common();
        #region Public Properties
        public string notificationID
        {
            get;
            set;
        }
        public string notificationType
        {
            get;
            set;
        }
        public string linkID
        {
            get;
            set;
        }
        public string caption
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string startDate
        {
            get;
            set;
        }
        public string expiryDate
        {
            get;
            set;
        }
        public string isDelete
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string createdBy
        {
            get;
            set;
        }
        public DateTime createdDate
        {
            get;
            set;
        }
        public string updatedBy
        {
            get;
            set;
        }
        public DateTime updatedDate
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region SelectNewNotifications
        /// <summary>
        /// Select Top 10 New Notifications By ChurchID
        /// </summary>
        /// <returns>Top 10 New Notifications</returns>
        public DataSet SelectNewNotifications()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectTopNewNotifications]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion SelectNewNotifications

        #region InsertNotification
        /// <summary>
        /// Add New Notification
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertNotification()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            SqlParameter outParam1 = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertNotifications]";
                cmd.Parameters.Add("@Type", SqlDbType.NVarChar,20).Value = notificationType!=null&&notificationType!=""?notificationType:null;
                if (linkID!=null && linkID !=string.Empty)
                {
                    cmd.Parameters.Add("@LinkID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(linkID);
                }
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, 100).Value = caption!=null&&caption!=""?caption:null;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description!=null&&description!=""?description:null;
                if (startDate != null && startDate != string.Empty)
                {
                    cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = commonObj.Changeformat(startDate); 
                }
                if (expiryDate != null && expiryDate != string.Empty)
                {
                    cmd.Parameters.Add("@ExpiryDate", SqlDbType.DateTime).Value = commonObj.Changeformat(expiryDate);
                }
                
              //  cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(isDelete);
                cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(false);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy!=null&&createdBy!=""?createdBy:null;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value =commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                outParam1 = cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier);
                outParam1.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            status=outParam.Value.ToString();
            notificationID= outParam1.Value.ToString();
            return status;
        }
        #endregion InsertNotification

        #region UpdateNotification
        /// <summary>
        /// Update Notification Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateNotification()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateNotifications]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(notificationID);
                cmd.Parameters.Add("@Type", SqlDbType.NVarChar, 20).Value = notificationType!=null&&notificationType!=""?notificationType:null;
                if(linkID!=null&&linkID!="")
                {
                    cmd.Parameters.Add("@LinkID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(linkID);
                }
                
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, 100).Value = caption!=null&&caption!=""?caption:null;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description!=null&&description!=""?description:null;
                if(startDate!=null && startDate !=string.Empty)
                {
                    cmd.Parameters.Add("@StartDate", SqlDbType.Date).Value = commonObj.Changeformat(startDate);
                }
                if(expiryDate!=null && expiryDate!=string.Empty)
                {
                    cmd.Parameters.Add("@ExpiryDate", SqlDbType.Date).Value = commonObj.Changeformat(expiryDate);
                }                
                cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(isDelete);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy!=null&&updatedBy!=""?updatedBy:null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            status=outParam.Value.ToString();
            return status;
        }
        #endregion UpdateNotification

        #region DeleteNotification
        /// <summary>
        /// Delete Notiication By ChurchId
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteNotification()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteNotifications]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(notificationID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            status=outParam.Value.ToString();
            return status;
        }
        #endregion DeleteNotification

        #region SelectNotificationByID
        /// <summary>
        /// Select Notifications By ChurchID and ID
        /// </summary>
        /// <returns>Notification</returns>
        public DataSet SelectNotificationByID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectNotificationByID]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(notificationID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    DataRow dr = ds.Tables[0].Rows[0];
                    notificationID = dr["ID"].ToString();
                    linkID = dr["LinkID"].ToString();
                    notificationType= dr["Type"].ToString();
                    caption = dr["Caption"].ToString();
                    description = dr["Description"].ToString();
                    startDate = (dr["StartDate"].ToString()!=null&& dr["StartDate"].ToString()!="")?(DateTime.Parse(dr["StartDate"].ToString().ToString()).ToString("dd-MMM-yyyy")):"";
                    expiryDate = (dr["ExpiryDate"].ToString() != null && dr["ExpiryDate"].ToString() != "") ? (DateTime.Parse(dr["ExpiryDate"].ToString()).ToString("dd-MMM-yyyy")):"";
                   
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion SelectNotificationByID

        #region SelecOldtNotifications
        /// <summary>
        /// Select Top 10 Old Notifications By ChurchID
        /// </summary>
        /// <returns>Top 10 Old Notifications</returns>
        public DataSet SelectOldtNotifications()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectOldNotifications]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion SelecOldtNotifications

        #region SelectAllNewNotifications
        /// <summary>
        /// Select All New Notifications By ChurchID
        /// </summary>
        /// <returns>All New Notifications</returns>
        public DataSet SelectAllNewNotifications()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllNotifications]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion SelectAllNewNotifications

        #region SelectAllOldNotifications
        /// <summary>
        /// Select All Old Notifications By ChurchID
        /// </summary>
        /// <returns>All Old Notifications</returns>
        public DataSet SelectAllOldNotifications()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllOldNotifications]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion SelectAllOldNotifications

        #region Notification message to Cloud messaging system
        /// <summary>
        /// Function to communicate with Firebase Cloud Messaging system by Google, for sending app notifications
        /// </summary>
        /// <param name="titleString">Title of notification</param>
        /// <param name="descriptionString">Description of notification</param>
        /// <param name="isCommon">Specify whether the notification is common for all app users or a specific church</param>
        /// <param name="churchID">church id in the case of notification for a specific church's user(User might set it as 'Mychurch' in app)</param>
        public void SendToFCM(string titleString,string descriptionString,Boolean isCommon,string churchID="")
        {
            //Validation
            if (!isCommon)//if not a message to all apps, churchID should be provided
            {
                if (churchID == "" || churchID == null)
                    throw new Exception("No ChurchID");
            }
            if (titleString == "" || titleString== null)
                throw new Exception("No title");
            if (descriptionString == "" || descriptionString == null)
                throw new Exception("No description");
            //Sending notification through Firebase Cluod Messaging
            try
            {                
                        WebRequest tRequest = WebRequest.Create("https://fcm.googleapis.com/fcm/send");
                        tRequest.Method = "post";
                        tRequest.ContentType = "application/json";

                        string to_String = "";
                        if (isCommon)
                            to_String = "/topics/common";
                        else
                            to_String = "/topics/" + churchID;

                        var objNotification = new
                        {
                            to =to_String,

                            data = new
                            {
                                title = titleString,
                                body = descriptionString,
                                sound = "default"
                            }
                        };
                        JavaScriptSerializer js = new JavaScriptSerializer();
                        string jsonNotificationFormat = js.Serialize(objNotification);
                        Byte[] byteArray = Encoding.UTF8.GetBytes(jsonNotificationFormat);

                        //Put here the Server key from Firebase
                        string FCMServerKey = ConfigurationManager.AppSettings["FCMServerKey"].ToString();
                        tRequest.Headers.Add(string.Format("Authorization: key={0}", FCMServerKey));
                        //Put here the Sender ID from Firebase
                        string FCMSenderID = ConfigurationManager.AppSettings["FCMSenderID"].ToString(); 
                        tRequest.Headers.Add(string.Format("Sender: id={0}", FCMSenderID));

                        tRequest.ContentLength = byteArray.Length;
                        tRequest.ContentType = "application/json";
                        using (Stream dataStream = tRequest.GetRequestStream())
                        {
                            dataStream.Write(byteArray, 0, byteArray.Length);
                            using (WebResponse tResponse = tRequest.GetResponse())
                            {
                                using (Stream dataStreamResponse = tResponse.GetResponseStream())
                                {
                                    using (StreamReader tReader = new StreamReader(dataStreamResponse))
                                    {
                                        String responseFromFirebaseServer = tReader.ReadToEnd();

                                        tReader.Close();
                                        dataStream.Close();
                                        tResponse.Close();

                                        if (!responseFromFirebaseServer.Contains("message_id"))//Doesn't contain message_id means some error occured
                                              throw new Exception(responseFromFirebaseServer);                                    
                                    }
                                }
                            }
                        }
            }
            catch (Exception ex)
            {
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.Description = ex.Message;
                ETObj.Date = commonObj.ConvertDatenow(DateTime.Now).ToString();
                ETObj.Module = "Notification";
                ETObj.Method = "SendToFCM";
                ETObj.ChurchID = churchID;
                ETObj.ErrorSource = "Firebase Cloud Messaging System";
                ETObj.IsMobile = false;
                ETObj.InsertErrorDetails();

                throw ex;
            }
        }
        #endregion Notification message to Cloud messaging system

        #region Update Notification Status
        /// <summary>
        /// Update Notification Status
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateNotificationStatus()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateNotificationStatus]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(notificationID);
                cmd.Parameters.Add("@Status", SqlDbType.Int).Value = Int32.Parse(status);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy != null && updatedBy != "" ? updatedBy : null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            status = outParam.Value.ToString();
            return status;
        }
        #endregion Update Notification Status

        #region SelectAllNotifications
        /// <summary>
        /// Select All New Notifications By ChurchID
        /// </summary>
        /// <returns>All New Notifications</returns>
        public DataSet SelectAllNotifications()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectAllNotifications]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion SelectAllNotifications
        #endregion Methods
    }

    public class NotificationType : Notification
    {
        Common commonObj = new Common();
        #region NotificationType Methods

        #region SelectNotificationType
        /// <summary>
        /// Select All NotificationType
        /// </summary>
        /// <returns>All NotificationType</returns>
        public DataSet SelectNotificationType()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllNotificationType]";
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion SelectNotificationType

        #region InsertNotificationType
        /// <summary>
        /// Add New NotificationType
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertNotificationType()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertNotificationType]";
                cmd.Parameters.Add("@Desc", SqlDbType.NVarChar, -1).Value = description!=null&&description!=""?description:null;
                cmd.Parameters.Add("@Type", SqlDbType.NVarChar, 20).Value = notificationType!=null&&notificationType!=""?notificationType:null;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy!=null&&createdBy!=""?createdBy:null;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return outParam.Value.ToString();
        }
        #endregion InsertNotificationType

        #region UpdateNotificationType
        /// <summary>
        /// Update NotificationType
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateNotificationType()      //SP might have errors. Don't use without checking
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateNotificationType]";
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description!=null&&description!=""?description:null;
                cmd.Parameters.Add("@NoticeType", SqlDbType.NVarChar, 20).Value = notificationType!=null&&notificationType!=""?notificationType:null;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy!=null&&updatedBy!=""?updatedBy:null;
                cmd.Parameters.Add("@UpdateStatus", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return outParam.Value.ToString();
        }
        #endregion UpdateNotificationType

        #region DeleteNotificationType
        /// <summary>
        /// Delete NotificationType
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteNotificationType()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteNotificationType]";
                cmd.Parameters.Add("@Type", SqlDbType.NVarChar, 20).Value = notificationType;
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return outParam.Value.ToString();
        }
        #endregion DeleteNotificationType

        #endregion NotificationType Methods
    }

    public class NotificationSchedule : Notification
    {
        Common commonObj = new Common();
        #region Properties
        public string notifiScheduleID
        {
            get;
            set;
        }
        public string scheduleDate
        {
            get;
            set;
        }
        public string scheduleStatus
        {
            get;
            set;
        }
        #endregion

        #region NotificationSchedule Methods

        #region Select Notification Schedule
        public DataSet SelectNotificationSchedule()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetNotificationSchedule]";
                cmd.Parameters.Add("@NotificationId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(notificationID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion Select Notification Schedule

        #region Insert Notification Schedule        
        public string InsertNotificationSchedule()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertNotificationSchedule]";
                cmd.Parameters.Add("@NotificationID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(notificationID);
                cmd.Parameters.Add("@ScheduledDate", SqlDbType.Date).Value = scheduleDate;
                cmd.Parameters.Add("@Status", SqlDbType.Int).Value = scheduleStatus;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy != null && createdBy != "" ? createdBy : null;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return outParam.Value.ToString();
        }
        #endregion Insert Notification Schedule   

        #region Delete Notification Schedule
        public string DeleteNotificationSchedule()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteNotificationSchedule]";
                cmd.Parameters.Add("@NotificationID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(notificationID);
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return outParam.Value.ToString();
        }
        #endregion Delete Notification Schedule

        #endregion NotificationSchedule Methods
    }
}