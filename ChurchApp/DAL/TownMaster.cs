using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{

    
    public class TownMaster
    {
        public AppImages appImagesObj;

        #region Public Properties
        public string code
        {
            get;
            set;
        }
        public string imageId
        {
            get;
            set;
        }
        public string name
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

        #region SelectTownMasters
        /// <summary>
        /// Select All TownMaster
        /// </summary>
        /// <returns>All TownMaster</returns>
        public DataSet SelectTownMasters()
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
                cmd.CommandText = "[GetAllTownMaster]";
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
        #endregion SelectTownMasters

        #region SelectTown
        /// <summary>
        /// Select Town
        /// </summary>
        /// <returns>Town Details</returns>
        public DataSet SelectTown()
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
                cmd.CommandText = "[SelectTownByCode]";
                cmd.Parameters.Add("@code", SqlDbType.NVarChar, 10).Value = code;
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
        #endregion SelectTownMasters

        #region SelectTownMastersIDandText
        /// <summary>
        /// Select All TownMaster
        /// </summary>
        /// <returns>All TownMaster</returns>
        public DataSet SelectTownMastersIDandText()
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
                cmd.CommandText = "[GetAllTownMasterIDAndText]";
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
        #endregion SelectTownMastersIDandText

        #region InsertTownMaster
        /// <summary>
        /// Add New TownMaster
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertTownMaster()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null,outParamCode=null;
            try
            {
                Common comnObj = new Common();
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertIntoTownMaster]";
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = name;
                if (imageId != null && imageId != "")
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                outParamCode = cmd.Parameters.Add("@OutCode", SqlDbType.NVarChar, 10);
                outParamCode.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                code = outParamCode.Value.ToString();
                status = outParam.Value.ToString();
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
            return status;
        }
        #endregion InsertTownMaster

        #region UpdateTownMaster
        /// <summary>
        /// Update TownMaster Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateTownMaster()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                Common comnObj = new Common();
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateTownMaster]";
                cmd.Parameters.Add("@Code", SqlDbType.NVarChar, 10).Value = code;
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = name;
                if(imageId!=null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
               
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
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
        #endregion UpdateTownMaster

        #region DeleteTownMaster
        /// <summary>
        /// Delete TownMaster
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteTownMaster()
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
                cmd.CommandText = "[DeleteTownMaster]";
                cmd.Parameters.Add("@Code", SqlDbType.NVarChar, 10).Value = code;
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();

                if ((imageId != null) && (imageId != ""))
                {
                    
                    appImagesObj.DeleteAppImage();
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
            status = outParam.Value.ToString();
            return status;
        }
        #endregion DeleteTownMaster

        #endregion Methods
    }
}