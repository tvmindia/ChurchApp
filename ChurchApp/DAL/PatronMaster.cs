using Church.DAL;
using System;
using System.Data;
using System.Data.SqlClient;

namespace ChurchApp.DAL
{
    public class PatronMaster
    {
        public Church churchObj;
        public AppImages appImagesObj;
        Common cmnObj = new Common();
        #region Public Properties
        public string patronMasterId
        {
            get;
            set;
        }
        public string patronMasterName
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string imageID
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
        public string imagepath
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region SelectPatronMaster
        /// <summary>
        /// Select All PatronMaster
        /// </summary>
        /// <returns>All PatronMaster</returns>
        public DataSet SelectPatronMaster()
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
                cmd.CommandText = "[GetAllPatronMaster]";
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
        #endregion SelectPatronMaster
        #region SelectAllPatronMasterByChurchID
        /// <summary>
        /// Select All PatronMaster
        /// </summary>
        /// <returns>All PatronMaster</returns>
        public DataSet SelectAllPatronMasterByChurchID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                if(churchObj.churchId==null||churchObj.churchId=="")
                {
                    throw new Exception("ChurchID is Empty");
                }
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectAllPatronMasterByChurchID]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchObj.churchId);

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
        #endregion SelectAllPatronMasterByChurchID
        #region InsertPatronMaster
        /// <summary>
        /// Add New PatronMaster
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertPatronMaster()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null,outPatronID=null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertPatronMaster]";
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = patronMasterName;
                if (description != null && description != string.Empty)
                {
                    cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                }
                if (imageID != null && imageID != string.Empty)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageID);
                }
               
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value =cmnObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outPatronID = cmd.Parameters.Add("@OutPatronID", SqlDbType.UniqueIdentifier);
                outPatronID.Direction = ParameterDirection.Output;
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
            patronMasterId = outPatronID.Value.ToString();
            status=outParam.Value.ToString();
            return status;
        }
           
        #endregion InsertPatronMaster

        #region UpdatePatronMaster
        /// <summary>
        /// Update PatronMaster Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdatePatronMaster()
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
                cmd.CommandText = "[UpdatePatronMaster]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronMasterId);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = patronMasterName;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                if (imageID != null && imageID != string.Empty)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageID);
                }
              
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = cmnObj.ConvertDatenow(DateTime.Now);
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
        #endregion UpdatePatronMaster

        #region DeletePatronMaster
        /// <summary>
        /// Delete PatronMaster
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeletePatronMaster()
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
                cmd.CommandText = "[DeletePatronMaster]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronMasterId);
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                if (outParam.Value.ToString()=="1")
                {
                    if ((imageID != null) && (imageID != ""))
                    {

                        appImagesObj.DeleteAppImage();
                    }
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
            status=outParam.Value.ToString();
            return status;
        }
        #endregion DeletePatronMaster

        //-----

        #region Get patron ID And Name
        
        public DataSet GetPatronIDAndName()
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
                cmd.CommandText = "[GetAllPatronIDAndName]";
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
        #endregion Get patron ID And Name

        #region SelectInstitutionusing InstituteID
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public void SelectPatronByID()
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
                cmd.CommandText = "[GetPatron]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronMasterId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    patronMasterId = dr["ID"].ToString();
                    patronMasterName = dr["Name"].ToString();
                    imageID = dr["ImageID"].ToString();
                    imagepath = dr["URL"].ToString();
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
        #endregion SelectInstitutionusing InstituteID

        #region GetPatronDetailByID
        public DataTable GetPatronDetailByID()
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
                cmd.CommandText = "[GetPatronDetailByID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronMasterId);
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
        #endregion GetPatronDetailByID

        #endregion Methods
    }
}