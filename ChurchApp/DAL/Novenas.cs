using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace ChurchApp.DAL
{
    public class Novenas
    {
    public Common commonObj = new Common();
    public Church churchObj;
        #region Public Properties
        public string novenaId
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string patronId
        {
            get;
            set;
        }
        public string novenaCaption
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
        public string imageID
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
        public string Status
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Novenas Methods

        #region SelectNovenas
        /// <summary>
        /// Select All Novenas
        /// </summary>
        /// <returns>All Novenas</returns>
        public DataSet SelectNovenas()
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
                cmd.CommandText = "[GetAllNovenas]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@PatronID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronId);
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
        #endregion SelectNovenas

        #region InsertNovena
        /// <summary>
        /// Add New Novena
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertNovena()
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
                cmd.CommandText = "[InsertNovenas]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@PatronID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronId);
                cmd.Parameters.Add("@NovenaCaption", SqlDbType.NVarChar, 100).Value = novenaCaption;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                if (startDate!= null && startDate != string.Empty)
                {
                    cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = commonObj.Changeformat(startDate);
                    //Convert.ToDateTime(startDate);   
                }
                if (endDate != null && endDate != string.Empty)
                {
                    cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = commonObj.Changeformat(endDate);
                        //Convert.ToDateTime(endDate);
                }
                if (imageID != null && imageID != string.Empty)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageID);
                }
               
                cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(false);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
                novenaId = outParam1.Value.ToString();
            }

            return outParam.Value.ToString();
        }
        #endregion InsertNovena

        #region UpdateNovena
        /// <summary>
        /// Update Novena Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateNovena()
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
                cmd.CommandText = "[UpdateNovenas]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@PatronID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronId);
                cmd.Parameters.Add("@NovenaCaption", SqlDbType.NVarChar, 100).Value = novenaCaption;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                if (startDate != null && startDate != string.Empty)
                {
                    cmd.Parameters.Add("@StartDate", SqlDbType.DateTime).Value = commonObj.Changeformat(startDate);
                        //Convert.ToDateTime(startDate);
                }
                if (endDate != null && endDate != string.Empty)
                {
                    cmd.Parameters.Add("@EndDate", SqlDbType.DateTime).Value = commonObj.Changeformat(endDate);
                        //Convert.ToDateTime(endDate);
                }
                if (imageID != null && imageID != string.Empty)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageID);
                }
                cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(false);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
            return outParam.Value.ToString();
        }
        #endregion UpdateNovena

        #region DeleteNovena
        /// <summary>
        /// Delete Novena
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteNovena()
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
                cmd.CommandText = "[DeleteNovenas]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);
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
        #endregion DeleteNovena

        //------

        #region Get Novenas By patronID
        /// <summary>
        /// To Get Novenas By patronID
        /// </summary>
        /// <returns>Datatable contains filtered novena details</returns>
        public DataTable GetNovenaDetailsByPatronID()
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
                cmd.CommandText = "[GetNovenaDetailsByPatronID]";
                cmd.Parameters.Add("@PatronID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
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
            return dt;
        }

        #endregion Get Novenas By patronID

        #region GetAllChurchNovenaByPatronID
        /// <summary>
        /// To Get Novenas By patronID
        /// </summary>
        /// <returns>Datatable contains filtered novena details</returns>
        public DataTable GetAllChurchNovenaByPatronID()
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
                cmd.CommandText = "[GetAllChurchNovenaByPatronID]";
                cmd.Parameters.Add("@PatronID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronId);
               
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
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
            return dt;
        }

        #endregion GetAllChurchNovenaByPatronID

        #region GetNovenaDetailsByNovenaID

        public DataTable GetNovenaDetailsByNovenaID()
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
                cmd.CommandText = "[GetNovenaDetailsByNovenaID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
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
            return dt;
        }

        #endregion GetNovenaDetailsByNovenaID

      


        #region GetAllNovenasByChurchID
        public DataTable GetAllNovenasByChurchID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                if(churchObj.churchId==null||churchObj.churchId=="")
                {
                    throw new Exception("ChuchID is Empty");
                }
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllNovenasByChurchID]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchObj.churchId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
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
            return dt;
        }
        #endregion GetAllNovenasByChurchID

        #endregion Novenas Methods
    }
    public class NovenaTiming : Novenas
    {
        #region Public Properties
        public string NovenaTimingId
        {
            get;
            set;
        }
        public string day
        {
            get;
            set;
        }
        public string time
        {
            get;
            set;
        }
        
        #endregion Public Properties

        #region NovenaTiming Methods

        #region SelectNovenaTimings
        /// <summary>
        /// Select NovenaTimings
        /// </summary>
        /// <returns>Success/Failure</returns>
        public DataSet SelectNovenaTimings()
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
                cmd.CommandText = "[GetAllNovenaTiming]";
                cmd.Parameters.Add("@NovenaID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);
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
        #endregion SelectNovenaTimings

        #region InsertNovenaTiming
        /// <summary>
        /// Add new novena timing
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertNovenaTiming()
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
                cmd.CommandText = "[InsertNovenaTiming]";
                cmd.Parameters.Add("@NovenaId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);

                if (day != null && day != string.Empty)
                {
                    cmd.Parameters.Add("@Day", SqlDbType.NVarChar,3).Value = day; 
                }
                if (time != null && time != string.Empty)
                {
                    time = FormatTimeto24Hr(time);
                    cmd.Parameters.Add("@Time", SqlDbType.Time,7).Value =time;
                }
              
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                    //DateTime.Now;
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
        #endregion InsertNovenaTiming

        #region UpdateNovenaTiming
        /// <summary>
        /// Update novena timing details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateNovenaTiming()
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
                cmd.CommandText = "[UpdateNovenaTiming]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NovenaTimingId);
                cmd.Parameters.Add("@NovenaId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);
                cmd.Parameters.Add("@Day", SqlDbType.DateTime).Value = Convert.ToDateTime(day);
                cmd.Parameters.Add("@Time", SqlDbType.DateTime).Value = Convert.ToDateTime(time);
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
        #endregion UpdateNovenaTiming

        #region DeleteNovenaTiming
        /// <summary>
        /// Delete Novena Timing
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteNovenaTiming()
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
                cmd.CommandText = "[DeleteNovenaTiming]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(NovenaTimingId);
                cmd.Parameters.Add("@NovenaID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);
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
        #endregion DeleteNovenaTiming

        #region DeleteNovenaTiming By novenaID,day,time
        /// <summary>
        /// Delete Novena Timing By novenaID,day,time
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteNovenaTimingByTimingDetails()
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
                cmd.CommandText = "[DeleteNovenaTimingByTimingDetails]";
                cmd.Parameters.Add("@NovenaID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);
                cmd.Parameters.Add("@Day", SqlDbType.NVarChar, 3).Value = day;
                cmd.Parameters.Add("@Time", SqlDbType.Time,7).Value =FormatTimeto24Hr(time);
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
        #endregion DeleteNovenaTiming By novenaID,day,time

        #region DeleteNovenaTimingsByNovenaID
        /// <summary>
        /// Delete Novena Timing By novena ID
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteNovenaTimingsByNovenaID()
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
                cmd.CommandText = "[DeleteNovenaTimingsByNovenaID]";
                cmd.Parameters.Add("@NovenaID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(novenaId);
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
        #endregion DeleteNovenaTimingsByNovenaID

        #region format  time into 24 hr
        /// <summary>
        /// convert start time format into 24 hour format
        /// </summary>
        /// <param name="time"></param>
        /// <returns>time</returns>
        public string FormatTimeto24Hr(string time)
        {
            var ampmLen = 2;
            var ampm = time.Substring(time.Length - ampmLen, ampmLen);
            var hourIndex = 0;
            time = time.Replace(ampm, "");
            time = time.Trim();
            var hour = time.Split(':')[hourIndex];
            var minutes = time.Split(':')[1];
            var h = hour;
            if (ampm.Equals("AM"))
            {
                if (h == "12")
                {
                    h = "00";
                }
            }
            if (ampm.Equals("PM"))
            {
                if (h != "12")
                {
                    h = (int.Parse(hour) + 12).ToString();
                }
            }
            var TimeIn24HrFormat = h + ":" + minutes;
            TimeIn24HrFormat = Regex.Replace(TimeIn24HrFormat, @"\s+", "");
            return TimeIn24HrFormat;
        }
        #endregion format  time into 24 hr


        #endregion NovenaTiming Methods
    }
}