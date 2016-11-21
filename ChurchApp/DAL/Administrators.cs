using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Administrators
    {
        #region Public Properties

        public string adminId
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string orgType
        {
            get;
            set;
        }
        public string orgId
        {
            get;
            set;
        }
        public string desigId
        {
            get;
            set;
        }
        public string memberId
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
        public string imageID
        {
            get;
            set;
        }
        public string results
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Phone
        {
            get;
            set;
        }
        public string imagePath
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Admin Methods

        #region SelectAdmins
        /// <summary>
        /// Get All Administrators
        /// </summary>
        /// <returns>All Administrators</returns>
        public DataSet SelectAdminsINST()
        {
            dbConnection dcon = null;
            SqlDataAdapter sda = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllAdministratorsINST]";
                cmd.Parameters.Add("@ChurchId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@OrgId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(orgId);
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

        #endregion SelectAdmins

        #region SelectAdministratorusing ID
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public void SelectAdminUsingID()
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
                cmd.CommandText = "[GetAdminByID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(adminId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    adminId = dr["ID"].ToString();
                    Name = dr["Name"].ToString();
                    Phone = dr["Phone"].ToString();
                    orgId = dr["OrgID"].ToString();
                    desigId = dr["DesigID"].ToString();                    
                    churchId = dr["ChurchID"].ToString();
                    imagePath = dr["URL"].ToString();
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
        #endregion SelectAdministratorusing ID

        #region SelectRoles
        /// <summary>
        /// Get All Administrators
        /// </summary>
        /// <returns>All Administrators</returns>
        public DataSet SelectRoles()
        {
            dbConnection dcon = null;
            SqlDataAdapter sda = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllRoles]";
                cmd.Parameters.Add("@OrgType", SqlDbType.NVarChar,10).Value = orgType;
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

        #endregion SelectRoles

        #region InsertAdministrator
        /// <summary>
        /// Insert new administrator
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertAdministrator()
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
                cmd.CommandText = "[InsertAdministrator]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(adminId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@OrgType", SqlDbType.NVarChar, 100).Value = orgType;
                cmd.Parameters.Add("@OrgID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(orgId);
                cmd.Parameters.Add("@DesigID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(desigId);
                if(memberId!=null)
                {
                    cmd.Parameters.Add("@MembID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(memberId);
                }
                else
                {
                    cmd.Parameters.Add("@MembID", SqlDbType.UniqueIdentifier).Value = memberId;
                }
                if (imageID != null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageID);
                }
                else
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = imageID;
                }
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = Name;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar, 20).Value = Phone;
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

        #endregion InsertAdministrator

        #region UpdateAdministrator
        /// <summary>
        /// Update Administrator
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateAdministrator()
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
                cmd.CommandText = "[UpdateAdministrators]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(adminId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@OrgType", SqlDbType.NVarChar, 100).Value = orgType;
                cmd.Parameters.Add("@OrgID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(orgId);
                cmd.Parameters.Add("@DesigID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(desigId);
                if(memberId!=null)
                {
                    cmd.Parameters.Add("@MembID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(memberId);
                }
                else
                {
                    cmd.Parameters.Add("@MembID", SqlDbType.UniqueIdentifier).Value = memberId;
                }

                if (imageID != null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageID);
                }
                else
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = imageID;
                }
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = Name;
                cmd.Parameters.Add("@Phone", SqlDbType.NVarChar, 100).Value = Phone;
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
        #endregion UpdateAdministrator

        #region DeleteAdministrator
        /// <summary>
        /// Delete GalleryItem From Gallery Album
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteAdministrator()
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
                cmd.CommandText = "[DeleteAdministrators]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(adminId);
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
        #endregion DeleteAdministrator

        //#region DeleteAdministrator
        ///// <summary>
        ///// Delete Administrator
        ///// </summary>
        ///// <returns>Success/Failure</returns>
        //public string DeleteAdministrator()
        //{
        //    dbConnection dcon = null;
        //    SqlCommand cmd = null;
        //    SqlParameter outParam = null;
        //    try
        //    {
        //        dcon = new dbConnection();
        //        dcon.GetDBConnection();
        //        cmd = new SqlCommand();
        //        cmd.Connection = dcon.SQLCon;
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.CommandText = "[DeleteAdministrators]";
        //        cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(adminId);
        //        cmd.Parameters.Add("@ChurchId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
        //        outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
        //        outParam.Direction = ParameterDirection.Output;
        //        cmd.ExecuteNonQuery();
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //    finally
        //    {
        //        if (dcon.SQLCon != null)
        //        {
        //            dcon.DisconectDB();
        //        }
        //    }
        //    return outParam.Value.ToString();
        //}
        //#endregion DeleteAdministrator

        #endregion Admin Methods
    }
}