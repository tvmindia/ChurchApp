using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Institutions
    {
        #region Public Properties
        public string institutionID
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string name
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string address
        {
            get;
            set;
        }
        public string phone1
        {
            get;
            set;
        }
        public string phone2
        {
            get;
            set;
        }
        public string imageId
        {
            get;
            set;
        }
        public string albumId
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

        #region SelectInstitutions
        /// <summary>
        /// Get All Institutions
        /// </summary>
        /// <returns>Success/Failure</returns>
        public DataSet SelectInstitutions()
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
                cmd.CommandText = "[GetAllInstitutions]";
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
        #endregion SelectInstitutions

        #region InsertInstitution
        /// <summary>
        /// Add New Institution
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertInstitution()
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
                cmd.CommandText = "[InsertInstitution]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar,250).Value = name;
                cmd.Parameters.Add("@desc", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar,-1).Value = address;
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2;
                cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
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
        #endregion InsertInstitution

        #region UpdateInstitution
        /// <summary>
        /// Update Institution Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateInstitution()
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
                cmd.CommandText = "[UpdateInstitution]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(institutionID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 250).Value = name;
                cmd.Parameters.Add("@desc", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2;
                cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdateStatus", SqlDbType.DateTime).Value = DateTime.Now;
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
        #endregion UpdateInstitution

        #region DeleteInstitution
        /// <summary>
        /// Delete Institution
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteInstitution()
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
                cmd.CommandText = "[DeleteInstitutions]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(institutionID);
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
            return outParam.Value.ToString();
        }
        #endregion DeleteInstitution

        #endregion Methods
    }
}