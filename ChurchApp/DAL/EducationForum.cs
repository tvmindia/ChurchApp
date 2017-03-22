using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class EducationForum
    {
        Common commonObj = new Common();
        #region Properties
        public string ID { get; set; }
        public string ChurchID { get; set; }
        public string EventName { get; set; }
        public string Description { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string ImageID { get; set; }
        public string URL { get; set; }
        public string NotificationID { get; set; }
        public string CreatedBY { get; set; }
        public string UpdatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public string Status { get; set; }
        #endregion Properties
        #region Methods
        #region Get Latest Events (Top 5)

        public DataSet GetLatestEduForumEvents()
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
                cmd.CommandText = "[GetLatestEduForumEvents]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
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

        #endregion Get Latest Events

        #region Get All Latest Events 

        public DataSet GetAllLatestEduForumEvents()
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
                cmd.CommandText = "[GetAllLatestEduForumEvents]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
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

        #endregion Get All Latest Events

        #region Get Old Events
        /// <summary>
        /// Which return datatset containing records with enddate or expire date less than current date
        /// </summary>
        /// <returns></returns>
        public DataSet SelectOldEduForumEvents()
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
                cmd.CommandText = "[GetOldEduForumEvents]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
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

        #endregion Get Old Events

        #region Get All Old Events
        /// <summary>
        /// Which return datatset containing records with enddate or expire date less than current date
        /// </summary>
        /// <returns></returns>
        public DataSet SelectAllOldEduForumEvents()
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
                cmd.CommandText = "[GetAllOldEduForumEvents]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
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

        #endregion Get All Old Events

        #region Get Events By EventID
        /// <summary>
        /// GetEventsByEventID
        /// </summary>
        /// <returns>All Events</returns>
        public void GetEduForumEventsByEventID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetEduForumEventByEventID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    ID = dr["ID"].ToString();
                    EventName = dr["EventName"].ToString();
                    Description = dr["Description"].ToString();
                    StartDate = dr["StartDate"].ToString() != "" ? (DateTime.Parse(dr["StartDate"].ToString().ToString()).ToString("dd-MMM-yyyy")) : "";
                    EndDate = dr["EndDate"].ToString() != "" ? (DateTime.Parse(dr["EndDate"].ToString().ToString()).ToString("dd-MMM-yyyy")) : "";
                    URL = dr["URL"].ToString();
                    ImageID = dr["ImageID"].ToString();
                    NotificationID = dr["NotificationID"].ToString();
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
            //return dt;
        }
        #endregion Get Events By EventID

        #region InsertEvent
        /// <summary>
        /// Add New Event
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertEduEventEvent()
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
                cmd.CommandText = "[InsertEduForumEvents]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
                cmd.Parameters.Add("@EventName", SqlDbType.NVarChar, 100).Value = EventName != null && EventName != "" ? EventName : null;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description != null && Description != "" ? Description : null;

                if (StartDate != string.Empty && StartDate != null)
                {
                    cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = commonObj.Changeformat(StartDate);
                    //Convert.ToDateTime(startDate);
                }

                if (EndDate != string.Empty && EndDate != null)
                {
                    cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = commonObj.Changeformat(EndDate);
                    //Convert.ToDateTime(endDate);

                }

               if (ImageID != string.Empty && ImageID != null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ImageID);
                }
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = CreatedBY;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                //DateTime.Now;
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

            if (outParam1.Value != null)
            {
                ID = outParam1.Value.ToString();
            }

            Status = outParam.Value.ToString();
            return outParam.Value.ToString();
        }
        #endregion InsertEvent

        #region UpdateEvent
        /// <summary>
        /// Edit Event
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateEduForumEvent()
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
                cmd.CommandText = "[UpdateEduForumEvent]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
                cmd.Parameters.Add("@EventName", SqlDbType.NVarChar, 100).Value = EventName != null && EventName != "" ? EventName : null;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description != null && Description != "" ? Description : null;
                if (StartDate != string.Empty && StartDate != null)
                {
                    cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = commonObj.Changeformat(StartDate);
                    //Convert.ToDateTime(startDate);
                }
                if (EndDate != string.Empty && EndDate != null)
                {
                    cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = commonObj.Changeformat(EndDate);
                    //Convert.ToDateTime(endDate);
                }
               
                if (ImageID != string.Empty && ImageID != null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ImageID);
                }
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = UpdatedBy != null && UpdatedBy != "" ? UpdatedBy : null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                //DateTime.Now;
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
            Status = outParam.Value.ToString();
            return outParam.Value.ToString();
        }
        #endregion UpdateEvent

        #region DeleteEvent
        /// <summary>
        /// Deletes an event
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteEvent()
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
                cmd.CommandText = "[DeleteEvents]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);
                cmd.Parameters.Add("@ChurchId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
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
        #endregion DeleteEvent
        #endregion Methods
    }
    public class EduForumMember
    {
        Common commonObj = new Common();
        #region Properties
        public string ID { get; set; }
        public string ChurchID { get; set; }
        public string Name { get; set; }
        public string ParentName { get; set; }
        public string DOB { get; set; }
        public string Class { get; set; }
        public string School { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public string MobileGoogleAC { get; set; }
        public bool isMobileVerified { get; set; }
        public string CreatedBY { get; set; }
        public string UpdatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string Status { get; set; }
        public string UpdatedDate { get; set; }
        #endregion Properties
        #region InsertForumMember
        /// <summary>
        /// Add New Event
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertForumMember()
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
                cmd.CommandText = "[InsertForumMember]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 250).Value = Name != null && Name != "" ? Name : null;
                cmd.Parameters.Add("@ParentName", SqlDbType.NVarChar, 250).Value = ParentName != null && ParentName != "" ? ParentName : null;
                cmd.Parameters.Add("@DOB", SqlDbType.Date).Value = commonObj.Changeformat(DOB);
                cmd.Parameters.Add("@Class", SqlDbType.NVarChar, 50).Value = Class;
                cmd.Parameters.Add("@School", SqlDbType.NVarChar, 250).Value = School;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 50).Value = Mobile;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 250).Value = Email;
                cmd.Parameters.Add("@MobileGoogleAC", SqlDbType.NVarChar, 250).Value = MobileGoogleAC;
                cmd.Parameters.Add("@isMobileVerified",SqlDbType.Bit).Value = isMobileVerified;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = CreatedBY;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                //DateTime.Now;
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

            if (outParam1.Value != null)
            {
                ID = outParam1.Value.ToString();
            }

            Status = outParam.Value.ToString();
            return outParam.Value.ToString();
        }
        #endregion InsertForumMember
        #region SelectEduMembers
        /// <summary>
        /// Get All Events based on churchID
        /// </summary>
        /// <returns>All Events</returns>
        public DataSet SelectAllForumMembers()
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
                cmd.CommandText = "[GetAllForumMembers]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
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
        #endregion SelectEduMembers
    }

    public class EduEventResponse
    {
        Common commonObj = new Common();
        #region Properties
        public string ID { get; set; }
        public string ChurchID { get; set; }
        public string EduEventID { get; set; }
        public string MemberID{get;set;}
        public string MemberName { get; set; }
        public string ResponseCode { get; set; }
        public string Response { get; set; }
        public string CreatedBY { get; set; }
        public string UpdatedBy { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public string Status { get; set; }
        public int TotalCount { get; set; }
        public int AttendCount { get; set; }
        public int NotSureCount { get; set; }
        public int NotAttendCount { get; set; }
        #endregion Properties
        #region InsertEduRedponse
        /// <summary>
        /// Add New Event
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertForumMember()
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
                cmd.CommandText = "[InsertForumResponse]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
                cmd.Parameters.Add("@EduEventID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(EduEventID);
                cmd.Parameters.Add("@MemberID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(MemberID);
                cmd.Parameters.Add("@ResponseCode", SqlDbType.Int).Value = ResponseCode;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = CreatedBY ;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                //DateTime.Now;
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

            if (outParam1.Value != null)
            {
                ID = outParam1.Value.ToString();
            }

            Status = outParam.Value.ToString();
            return outParam.Value.ToString();
        }
        #endregion InsertEduRedponse
        #region SelectEduResponse
        /// <summary>
        /// Get All Events based on churchID
        /// </summary>
        /// <returns>All Events</returns>
        public DataSet SelectEduResponse()
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
                cmd.CommandText = "[GetAllResponse]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
                cmd.Parameters.Add("@EduEventID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(EduEventID);
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
        #endregion SelectEduMembers
        #region Get Response For Event
        /// <summary>
        /// GetEventsByEventID
        /// </summary>
        /// <returns>All Events</returns>
        public void SelectCountsResponse()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectResponseCount]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
                cmd.Parameters.Add("@EduEventID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(EduEventID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    TotalCount = dr["Total"].ToString() != "" ? int.Parse(dr["Total"].ToString()) : TotalCount;
                    AttendCount = dr["Attend"].ToString() != "" ? int.Parse(dr["Attend"].ToString()) : AttendCount;
                    NotSureCount = dr["NotSure"].ToString() != "" ? int.Parse(dr["NotSure"].ToString()) : NotSureCount;
                    NotAttendCount = dr["NotAttend"].ToString() != "" ? int.Parse(dr["NotAttend"].ToString()) : NotAttendCount;
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
            //return dt;
        }
        #endregion Get Response For Event


    }
}