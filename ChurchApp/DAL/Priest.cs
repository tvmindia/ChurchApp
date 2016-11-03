using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Priest
    {
        #region Public Properties
        public string priestID
        {
            get;
            set;
        }
        public string priestName
        {
            get;
            set;
        }
        public string BaptisumName
        {
            get;
            set;
        }
        public string Parish
        {
            get;
            set;
        }
        public string Diocese
        {
            get;
            set;
        }
        public string Status
        {
            get;
            set;
        }
        public string dob
        {
            get;
            set;
        }
        public string about
        {
            get;
            set;
        }
        public string dateOrdination
        {
            get;
            set;
        }
        public string designation
        {
            get;
            set;
        }
        public string address
        {
            get;
            set;
        }
        public string emailId
        {
            get;
            set;
        }
        public string mobile
        {
            get;
            set;
        }
        public string imageId
        {
            get;
            set;
        }
        public string imagePath
        {
            get;
            set;
        }
        public string churchID
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
        public string result
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region SelectPriests
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public DataSet SelectPriests()
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
                cmd.CommandText = "[GetAllPriests]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
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
        #endregion SelectPriests
        #region SelectPriestsUsingPriestID
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public void SelectPriestsUsingPriestID()
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
                cmd.CommandText = "[GetPriests]";
                cmd.Parameters.Add("@priestID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    priestID = dr["ID"].ToString();
                    priestName = dr["Name"].ToString();
                    BaptisumName = dr["BaptismalName"].ToString();
                    Parish = dr["Parish"].ToString();
                    Diocese = dr["Diocese"].ToString();
                    Status = dr["Status"].ToString();
                    churchID = dr["ChurchID"].ToString();
                    dob = (DateTime.Parse(dr["DOB"].ToString().ToString()).ToString("dd-MM-yyyy"));
                    address=dr["Address"].ToString();
                    mobile = dr["Mobile"].ToString();
                    emailId = dr["Email"].ToString();
                    imagePath = dr["URL"].ToString();
                    about = dr["About"].ToString();
                    dateOrdination = (DateTime.Parse(dr["DateOrdination"].ToString()).ToString("dd-MM-yyyy"));
                    designation = dr["Designation"].ToString();
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
           
        }
        #endregion SelectPriestsUsingPriestID

        #region InsertPriest
        /// <summary>
        /// Add new Priest
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertPriest()
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
                cmd.CommandText = "[InsertPriest]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar,150).Value = priestName;
                cmd.Parameters.Add("@BaptismName", SqlDbType.NVarChar, 150).Value = BaptisumName;
                cmd.Parameters.Add("@Parish", SqlDbType.NVarChar, 150).Value = Parish;
                cmd.Parameters.Add("@Diocese", SqlDbType.NVarChar, 150).Value = Diocese;
                cmd.Parameters.Add("@Status", SqlDbType.NVarChar, 150).Value = Status;
                cmd.Parameters.Add("@DOB", SqlDbType.Date).Value = DateTime.Parse(dob);
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about;
                cmd.Parameters.Add("@DateOrdination", SqlDbType.Date).Value = DateTime.Parse(dateOrdination);
                cmd.Parameters.Add("@Designation", SqlDbType.NVarChar, 150).Value = designation;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar,255).Value = emailId;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = mobile;
                cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = true;
                cmd.Parameters.Add("@IsDeleted", SqlDbType.Bit).Value = false;
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
                if (imageId != string.Empty && imageId != null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
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
        #endregion InsertPriest

        #region UpdatePriest
        /// <summary>
        /// Update Priest
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdatePriest()
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
                cmd.CommandText = "[UpdatePriest]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = priestName;
                cmd.Parameters.Add("@BaptismName", SqlDbType.NVarChar, 150).Value = BaptisumName;
                cmd.Parameters.Add("@Parish", SqlDbType.NVarChar, 150).Value = Parish;
                cmd.Parameters.Add("@Diocese", SqlDbType.NVarChar, 150).Value = Diocese;
                cmd.Parameters.Add("@Status", SqlDbType.NVarChar, 150).Value = Status;
                cmd.Parameters.Add("@DOB", SqlDbType.Date).Value = DateTime.Parse(dob);
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about;
                cmd.Parameters.Add("@DateOrdination", SqlDbType.Date).Value = DateTime.Parse(dateOrdination);
                cmd.Parameters.Add("@Designation", SqlDbType.NVarChar, 150).Value = designation;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = emailId;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = mobile;
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
                if (imageId != string.Empty && imageId != null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
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
        #endregion UpdatePriest

        #region DeletePriest
        /// <summary>
        /// Delete Priest
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeletePriest()
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
                cmd.CommandText = "[DeletePriest]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
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
        #endregion DeletePriest

        #endregion Methods
    }
}