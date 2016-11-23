using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class PiousOrg
    {
        #region Public Properties
        public string piousOrgID
        {
            get;
            set;
        }
        public string churchID
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string PatronID
        {
            get;
            set;
        }
        public string results
        {
            get;
            set;
        }
        public string Patron
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
        public string imagepath
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region SelectPiousOrg
        /// <summary>
        /// Select All PiousOrg By ChurchID
        /// </summary>
        /// <returns>All PiousOrg</returns>
        public DataSet SelectPiousOrg()
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
                cmd.CommandText = "[GetAllPiousOrg]";
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
        #endregion SelectPiousOrg

        #region InsertPiousOrg
        /// <summary>
        /// Add new PiousOrg
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertPiousOrg()
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
                cmd.CommandText = "[InsertPiousOrg]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(piousOrgID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar,150).Value = Name;
                cmd.Parameters.Add("@Desc", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@PatronID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(PatronID);
                if(albumId!=null)
                {
                    cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
                }
                else
                {
                    cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = albumId;
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
        #endregion InsertPiousOrg

        #region UpdatePiousOrg
        /// <summary>
        /// Update PiousOrg Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdatePiousOrg()
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
                cmd.CommandText = "[UpdatePiousOrg]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(piousOrgID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
                cmd.Parameters.Add("@PatronID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(PatronID);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = Name;
                cmd.Parameters.Add("@Desc", SqlDbType.NVarChar, -1).Value = description;
                if(albumId!=null)
                {
                    cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
                }
                else
                {
                    cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = albumId;
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
        #endregion UpdatePiousOrg

        #region DeletePiousOrg
        /// <summary>
        /// Delete PiousOrg
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeletePiousOrg()
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
                cmd.CommandText = "[DeletePiousOrg]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(piousOrgID);
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
        #endregion DeletePiousOrg

        #region SelectInstitutionusing InstituteID
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public void SelectOrganizationUsingID()
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
                cmd.CommandText = "[GetPiousDetails]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(piousOrgID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    piousOrgID = dr["ID"].ToString();
                    Name = dr["Name"].ToString();
                    description = dr["Desc"].ToString();
                    albumId = dr["AlbumID"].ToString();
                    Patron= dr["PatronName"].ToString();
                    churchID = dr["ChurchID"].ToString();
                    imagepath = dr["URL"].ToString();
                    //albumId = dr["AlbumID"].ToString();
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

        #endregion Methods
    }
}