using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Members
    {
        public Family familyObj;

        #region Public Properties

        public string familyID
        {
            get;
            set;
        }
        public string memberId
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string familyName
        {
            get;
            set;
        }
        public string firstName
        {
            get;
            set;
        }
        public string lastName
        {
            get;
            set;
        }
        public string contact
        {
            get;
            set;
        }
        public string address
        {
            get;
            set;
        }
        public string imageId
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
        public string isHead
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region SelectMembers
        /// <summary>
        /// Select All Members based on Church
        /// </summary>
        /// <returns>All Members</returns>
        public DataSet SelectMembers()
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
                cmd.CommandText = "[GetAllMembers]";
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
        #endregion SelectMembers

        #region InsertMember
        /// <summary>
        /// Add new member
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertMember()
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
                cmd.CommandText = "[InsertMembers]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@FamilyName", SqlDbType.NVarChar, 250).Value = familyName;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar, 100).Value = firstName;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar, 100).Value = lastName;
                cmd.Parameters.Add("@Contact", SqlDbType.NVarChar, 20).Value = contact;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                if(imageId!=null && imageId!="")
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                cmd.Parameters.Add("@FamilyID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyID);
                cmd.Parameters.Add("@IsHead", SqlDbType.Bit).Value = Convert.ToBoolean(isHead);
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

        #endregion InsertMember

        #region UpdateMember
        /// <summary>
        /// Edit member
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateMember()
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
                cmd.CommandText = "[UpdateMember]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(memberId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@FamilyName", SqlDbType.NVarChar, 250).Value = familyName;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar, 100).Value = familyName;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar, 100).Value = lastName;
                cmd.Parameters.Add("@Contact", SqlDbType.NVarChar, 20).Value = contact;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
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
        #endregion UpdateMember

        #region DeleteMember
        /// <summary>
        /// Delete Member
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteMember()
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
                cmd.CommandText = "[DeleteMember]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(memberId);
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
        #endregion DeleteMember

        #region SelectFamilyMember
        /// <summary>
        /// Select Family Member based on churchId,memberID and familyID
        /// </summary>
        /// <returns>Member of a family</returns>
        public DataSet SelectFamilyMember()
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
                cmd.CommandText = "[SelectFamilyMember]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyObj.familyUnitsObj.churchId);
                cmd.Parameters.Add("@FamilyID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyObj.familyId);
                cmd.Parameters.Add("@MemberID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(memberId);
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
        #endregion SelectFamilyMember

        #endregion Methods
    }
}