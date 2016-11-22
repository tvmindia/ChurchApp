using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Users
    {
    }
    public class Roles
    {
        public Church churchObj;
        #region Rolesproperties
        public string ID
        {
            get;
            set;
        }
        public string RoleName
        {
            get;
            set;
        }
        public string createdBy
        {
            get;
            set;
        }
        public string createdDate
        {
            get;
            set;
        }
        public string updatedBy
        {
            get;
            set;
        }
        public string updatedDate
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }

        #endregion Rolesproperties

        #region Methods

        #region InsertRole
        public string InsertRole()
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
                cmd.CommandText = "[InsertRole]";
                cmd.Parameters.Add("@RoleName", SqlDbType.NVarChar, 25).Value = RoleName;
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchObj.churchId);
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
            ID = outParam1.Value.ToString();
            status=outParam.Value.ToString();

            return status;
        }
        #endregion InsertRole

        #region SelectAllRoles

        public DataSet SelectAllRoles()
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
                cmd.CommandText = "[SelectAllRoles]";
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
        #endregion SelectAllRoles

        #endregion Methods

    }
}