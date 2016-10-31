using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class AppImages
    {
        #region Public Properties
        public string appImageId
        {
            get;
            set;
        }
        public string url
        {
            get;
            set;
        }
        public string type
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

        #region SelectAppImages
        /// <summary>
        /// Get All AppImages
        /// </summary>
        /// <returns>All AppImages</returns>
        public DataSet SelectAppImages()
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
                cmd.CommandText = "[GetAllAppImages]";
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
        #endregion SelectAppImages

        #region InsertAppImage
        /// <summary>
        /// Add new AppImage
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertAppImage()
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
                cmd.CommandText = "[InsertAppImages]";
                cmd.Parameters.Add("@Url", SqlDbType.NVarChar, -1).Value = url;
                cmd.Parameters.Add("@Type", SqlDbType.NVarChar, 20).Value = type;
                //cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(isDelete);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;


                outParam1 = cmd.Parameters.Add("@ImgID", SqlDbType.UniqueIdentifier);
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
            appImageId = outParam1.ToString();

            return outParam.Value.ToString();
        }
        #endregion InsertAppImage

        #region DeleteAppImage
        /// <summary>
        /// Delete AppImage
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteAppImage()
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
                cmd.CommandText = "[DeleteAppImages]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(appImageId);
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
        #endregion DeleteAppImage

        #endregion Methods
    }
}