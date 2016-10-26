using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Church
    {
        Administrators administratorsObj = new Administrators();
        AppImages appImagesObj = new AppImages();
        GalleryAlbum galleryAlbumObj = new GalleryAlbum();
        Members membersObj = new Members();

        #region Public Properties

        public string churchId
        {
            get;
            set;
        }
        public string churchName
        {
            get;
            set;
        }
        public string townCode
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string about
        {
            get;
            set;
        }
        public string mainImageId
        {
            get;
            set;
        }
        public string address
        {
            get;
            set;
        }
        public string latLong
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

        #region Church Methods

        #region SelectChurches
        /// <summary>
        /// Selects all Churches
        /// </summary>
        /// <returns>All Churches</returns>
        public DataSet SelectChurches()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {

                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllChurch]";
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
        #endregion SelectChurches

        #region InsertChurch
        /// <summary>
        /// Insert New Church
        /// </summary>
        /// <returns>success or failure</returns>
        public string InsertChurch()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertChurch]";
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = churchName;
                cmd.Parameters.Add("@TownCode", SqlDbType.NVarChar, 10).Value = townCode;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about;
                cmd.Parameters.Add("@MainImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(mainImageId);
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                cmd.Parameters.Add("@Latlong", SqlDbType.NVarChar, 100).Value = latLong;
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            return outParameter.Value.ToString();

        }

        #endregion InsertChurch

        #region UpdateChurch
        /// <summary>
        /// Edit Church
        /// </summary>
        /// <returns>success or failure</returns>
        public Int16 UpdateChurch()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;

            try
            {

                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateChurch]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = churchName;
                cmd.Parameters.Add("@TownCode", SqlDbType.NVarChar, 10).Value = townCode;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about;
                cmd.Parameters.Add("@MainImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(mainImageId);
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                cmd.Parameters.Add("@Latlong", SqlDbType.NVarChar, 100).Value = latLong;
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion UpdateChurch

        #region DeleteChurch
        /// <summary>
        /// Delete Church
        /// </summary>
        /// <param name="ChurchID"></param>
        /// <returns>success or failure</returns>
        public Int16 DeleteChurch()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;

            try
            {

                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteChurch]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion DeleteChurch

        #endregion Church Methods
    }

    public class ChurchDetails : Church
    {
        #region Public Properties

        public string churchDetailID
        {
            get;
            set;
        }
        public string caption
        {
            get;
            set;
        }
        public string imageId
        {
            get;
            set;
        }

        #endregion Public Properties

        #region ChurchDetail Methods

        #region SelectChurchDetail
        /// <summary>
        /// Get All Church Details
        /// </summary>
        /// <returns>All Church Details</returns>
        public DataSet SelectChurchDetail()
        {
            dbConnection dcon = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllChurchDetails]";
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
        #endregion SelectChurchDetail

        #region InsertChurchDetail

        /// <summary>
        /// Add New Church Detail
        /// </summary>
        /// <returns>Success or Failure</returns>
        public string InsertChurchDetail()
        {
            dbConnection dcon = null;
            SqlParameter param1 = null;
            SqlCommand cmd = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertChurchDetails]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, -1).Value = caption;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                param1 = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                param1.Direction = ParameterDirection.Output;
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
            return param1.Value.ToString();
        }
        #endregion InsertChurchDetail

        #region UpdateChurchDetail
        /// <summary>
        /// Edit Church Details
        /// </summary>
        /// <returns>Success/failure</returns>
        public string UpdateChurchDetail()
        {
            SqlParameter param1 = null;
            dbConnection dcon = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateChurchDetails]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, -1).Value = caption;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                param1 = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                param1.Direction = ParameterDirection.Output;
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
            return param1.Value.ToString();
        }
        #endregion UpdateChurchDetail

        #region DeleteChurchDetail
        /// <summary>
        /// Delete Church Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteChurchDetail()
        {
            SqlParameter outParam = null;
            SqlCommand cmd = null;
            dbConnection dcon = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteChurchDetails]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
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
        #endregion DeleteChurchDetail

        #endregion ChurchDetail Methods

    }
    public class MassTimings : Church
    {
        #region Public Properties
        public string massTimingID
        {
            get;
            set;
        }
        public string day
        {
            get;
            set;
        }
        public string massTime
        {
            get;
            set;
        }
        #endregion Public Properties

        #region MassTiming Methods

        #region SelectMassTimings
        /// <summary>
        /// Get All MassTimings
        /// </summary>
        /// <returns>All MassTimings</returns>
        public DataSet SelectMassTimings()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            DataSet ds = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllMassTiming]";
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
        #endregion SelectMassTimings

        #region InsertMassTiming
        /// <summary>
        /// Add New MassTiming
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertMassTiming()
        {
            dbConnection dcon = null;
            SqlParameter outParam = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertMassTiming]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Day", SqlDbType.NVarChar, 3).Value = day;
                cmd.Parameters.Add("@Time", SqlDbType.DateTime).Value = Convert.ToDateTime(massTime);
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

        #endregion InsertMassTiming

        #region UpdateMassTiming
        /// <summary>
        /// Update MassTiming
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateMassTiming()
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
                cmd.CommandText = "[UpdateMassTiming]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massTimingID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Day", SqlDbType.NVarChar, 3).Value = day;
                cmd.Parameters.Add("@Time", SqlDbType.DateTime).Value = Convert.ToDateTime(massTime);
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
        #endregion UpdateMassTiming

        #region DeleteMassTiming
        /// <summary>
        /// Delete MassTiming
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteMassTiming()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam1 = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteMassTiming]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massTimingID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                outParam1 = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
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
            return outParam1.Value.ToString();
        }
        #endregion DeleteMassTiming

        #endregion MassTiming Methods
    }
}