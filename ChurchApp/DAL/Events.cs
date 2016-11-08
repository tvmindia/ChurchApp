using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Events
    {
        #region Public Properties
        public string eventId
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string eventName
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
        public string endDate
        {
            get;
            set;
        }
        public string eventExpiryDate
        {
            get;
            set;
        }
        public string isAutoHide
        {
            get;
            set;
        }
        public string imageId
        {
            get;
            set;
        }
        public string isDelete
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
        #endregion Public Properties

        #region Methods

        #region SelectEvents
        /// <summary>
        /// Get All Events based on churchID
        /// </summary>
        /// <returns>All Events</returns>
        public DataSet SelectEvents()
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
                cmd.CommandText = "[GetAllEvents]";
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
        #endregion SelectEvents

        #region Get Events By EventID
        /// <summary>
        /// GetEventsByEventID
        /// </summary>
        /// <returns>All Events</returns>
        public DataSet GetEventsByEventID()
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
                cmd.CommandText = "[GetEventsByEventID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(eventId);
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
        #endregion Get Events By EventID

        #region InsertEvent
        /// <summary>
        /// Add New Event
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertEvent()
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
                cmd.CommandText = "[InsertEvents]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@EventName", SqlDbType.NVarChar, 100).Value = eventName;
                cmd.Parameters.Add("@Descrtiption", SqlDbType.NVarChar,-1).Value = description;
                cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = Convert.ToDateTime(startDate);
                cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = Convert.ToDateTime(endDate);
                cmd.Parameters.Add("@EventExpiryDate", SqlDbType.DateTime).Value = Convert.ToDateTime(eventExpiryDate);
                cmd.Parameters.Add("@IsAutoHide", SqlDbType.Bit).Value = Convert.ToBoolean(true);

                if (imageId != string.Empty && imageId != null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId); 
                }
                
               // cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(isDelete);
                cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(false);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
        #endregion InsertEvent

        #region UpdateEvent
        /// <summary>
        /// Edit Event
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateEvent()
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
                cmd.CommandText = "[UpdateEvents]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(eventId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@EventName", SqlDbType.NVarChar, 100).Value = eventName;
                cmd.Parameters.Add("@Descrtiption", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = Convert.ToDateTime(startDate);
                cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = Convert.ToDateTime(endDate);
                cmd.Parameters.Add("@EventExpiryDate", SqlDbType.DateTime).Value = Convert.ToDateTime(eventExpiryDate);
                cmd.Parameters.Add("@IsAutoHide", SqlDbType.Bit).Value = Convert.ToBoolean(isAutoHide);
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(false);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(eventId);
                cmd.Parameters.Add("@ChurchId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
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
}