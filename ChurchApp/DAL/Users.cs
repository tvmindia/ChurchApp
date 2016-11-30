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
        public Church churchObj;
        public Roles rolesObj;
        #region Usersproperties
        public string ID
        {
            get;
            set;
        }
        public string Name
        {
            get;
            set;
        }
        public string Mobile
        {
            get;
            set;
        }
        public string Email
        {
            get;
            set;
        }
        public Boolean Active
        {
            get;
            set;
        }
        public string DOB
        {
            get;
            set;
        }
        public Boolean Administrator
        {
            get;
            set;
        }
        public string Gender
        {
            get;
            set;
        }
        public Boolean IsVerified
        {
            get;
            set;
        }
        public Boolean IsUnsubscribed
        {
            get;
            set;
        }
        public string Address
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


        #endregion Usersproperties

        #region App_Adminproperties 
        public string LoginName
        {
            get;
            set;

        }
        public string Password
        {
            get;
            set;
        }
        public string VerificationCode
        {
            get;
            set;
        }
        public string VerifyCodeDate
        {
            get;
            set;

        }
        public string status
        {
            get;
            set;
        }
        #endregion App_Adminproperties



        #region Methods
        #region  SelectAllUsers
        public DataSet SelectAllUsers()
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
                cmd.CommandText = "[SelectAllUsers]";
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
        #endregion SelectAllUsers

        #region GetUserDetailsByUserID
        public DataSet GetUserDetailsByUserID()
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
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);
                cmd.CommandText = "[GetUserDetailsByUserID]";
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
        #endregion GetUserDetailsByUserID

        #region InsertUsers
        public string InsertUsers()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
           
            try
            {
                

               
                dcon = new dbConnection();
                dcon.GetDBConnection();
                if ((churchObj.churchId == null) || (churchObj.churchId == ""))
                {
                    throw new Exception("ChurchID is Empty");
                }
                if((rolesObj.ID==null)||(rolesObj.ID==""))
                {
                    throw new Exception("RoleID is Empty");
                }
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertUser]";
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 255).Value = Mobile;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Email;
                cmd.Parameters.Add("@Active", SqlDbType.Bit).Value = Active;
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchObj.churchId);
                cmd.Parameters.Add("@DOB", SqlDbType.DateTime).Value = DOB;
                cmd.Parameters.Add("@Administrator", SqlDbType.Bit).Value = Administrator;
                cmd.Parameters.Add("@Gender", SqlDbType.NChar,6).Value = Gender;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = Address;
                cmd.Parameters.Add("@RoleID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(rolesObj.ID);
                cmd.Parameters.Add("@LoginName", SqlDbType.NVarChar, 255).Value = LoginName;
                //Encryption of password
                ChurchApp.DAL.Security.CryptographyFunctions cryptOBj = new ChurchApp.DAL.Security.CryptographyFunctions();
                Password = cryptOBj.Encrypt(Password);
                //Encryption of password
                cmd.Parameters.Add("@Password", SqlDbType.NVarChar, 255).Value = Password;
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
          
            status = outParam.Value.ToString();

            return status;
        }
        #endregion InsertUsers

        #region UpdateUser

        public string UpdateUser()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;

            try
            {
                //Encryption of password
                ChurchApp.DAL.Security.CryptographyFunctions cryptOBj = new ChurchApp.DAL.Security.CryptographyFunctions();
                Password = cryptOBj.Encrypt(Password);
                //Encryption of password
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateUser]";
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 255).Value = Name;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 255).Value = Mobile;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = Email;
                cmd.Parameters.Add("@Active", SqlDbType.Bit).Value = Active;
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchObj.churchId);
                cmd.Parameters.Add("@DOB", SqlDbType.DateTime).Value = DOB;
                cmd.Parameters.Add("@Administrator", SqlDbType.Bit).Value = Administrator;
                cmd.Parameters.Add("@Gender", SqlDbType.NChar, 6).Value = Gender;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = Address;
                cmd.Parameters.Add("@RoleID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(rolesObj.ID);
                cmd.Parameters.Add("@LoginName", SqlDbType.NVarChar, 255).Value = LoginName;
                cmd.Parameters.Add("@Password", SqlDbType.NVarChar, 255).Value = Password;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
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


        #endregion UpdateUser

        #region DeleteUser
        public string DeleteUser()
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
                cmd.CommandText = "[DeleteUser]";
                cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = updatedBy;
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

            status = outParam.Value.ToString();

            return status;
        }
        #endregion DeleteUser


        #endregion Methods

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

        #region GetAllRolesIDandText
        public DataSet GetAllRolesIDandText()
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
                cmd.Parameters.Add("@churchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchObj.churchId);
                cmd.CommandText = "[GetAllRolesIDandText]";
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
        #endregion GetAllRolesIDandText

        #region DeleteRole
        public string DeleteRole()
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
                cmd.CommandText = "[DeleteRole]";
                cmd.Parameters.Add("@RoleID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchObj.churchId);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
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
        #endregion DeleteRole

        #region GetRoleDetailByRoleID

        public DataTable GetRoleDetailByRoleID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetRoleDetailByRoleID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);
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
        #endregion GetRoleDetailByRoleID



        #region UpdateRoles
        public string UpdateRoles()
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
                cmd.CommandText = "[UpdateRoles]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ID);

                cmd.Parameters.Add("@RoleName", SqlDbType.NVarChar, 25).Value = RoleName;
                cmd.Parameters.Add("@ChurchID",SqlDbType.UniqueIdentifier).Value=Guid.Parse(churchObj.churchId);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
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
        #endregion UpdateRoles
        #endregion Methods

    }
}