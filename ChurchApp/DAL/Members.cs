﻿using Church.DAL;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace ChurchApp.DAL
{
    public class Members
    {
        public Family familyObj;
        Common commonObj = new Common();
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

        public string status
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
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyObj.familyUnitsObj.churchId);
                cmd.Parameters.Add("@UnitID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyObj.familyUnitsObj.unitId);
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

        #region SelectMemberDetailsForAdmin
        /// <summary>
        /// Select All Members based on Church
        /// </summary>
        /// <returns>Member Details</returns>
        public DataSet SelectMemberDetailsForAdmin()
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
                cmd.CommandText = "[GetMemberDetailsForAdmin]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyObj.familyUnitsObj.churchId);
                //cmd.Parameters.Add("@UnitID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyObj.familyUnitsObj.unitId);
                cmd.Parameters.Add("@memberID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(memberId);
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

        #region SelectPatronMaster
        /// <summary>
        /// Select All PatronMaster
        /// </summary>
        /// <returns>All PatronMaster</returns>
        public DataSet SelectAllMembers()
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
                cmd.CommandText = "[GetAllMembersAuto]";
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
        #endregion SelectPatronMaster

        #region InsertMember
        /// <summary>
        /// Add new member
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertMember()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam,outparam1 = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertMembers]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@FamilyName", SqlDbType.NVarChar, 250).Value = familyName!=null&&familyName!=""?familyName:null;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar, 100).Value = firstName!=null&&firstName!=""?firstName:null;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar, 100).Value = lastName!=null&&lastName!=""?lastName:null;
                cmd.Parameters.Add("@Contact", SqlDbType.NVarChar, 20).Value = contact!=null&&contact!=""?contact:null;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address!=null&&address!=""?address:null;
                if(imageId!=null && imageId!="")
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                cmd.Parameters.Add("@FamilyID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyID);
                cmd.Parameters.Add("@IsHead", SqlDbType.Bit).Value = Convert.ToBoolean(isHead);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy!=null&&createdBy!=""?createdBy:null;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                outparam1 = cmd.Parameters.Add("@memberId", SqlDbType.UniqueIdentifier);
                outparam1.Direction = ParameterDirection.Output;
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
            memberId = outparam1.Value.ToString();
            status=outParam.Value.ToString();
            return status;
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
                cmd.Parameters.Add("@FamilyName", SqlDbType.NVarChar, 250).Value = familyName!=null&&familyName!=""?familyName:null;
                cmd.Parameters.Add("@FirstName", SqlDbType.NVarChar, 100).Value = firstName!=null&&firstName!=""?firstName:null;
                cmd.Parameters.Add("@LastName", SqlDbType.NVarChar, 100).Value = lastName!=null&&lastName!=""?lastName:null;
                cmd.Parameters.Add("@Contact", SqlDbType.NVarChar, 20).Value = contact!=null&&contact!=""?contact:null;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address!=null&&address!=""?address:null;
                if (imageId != null && imageId != "")
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                if(familyObj!=null)
                {
                    cmd.Parameters.Add("@FamilyID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyObj.familyId);
                }
                else
                {
                    cmd.Parameters.Add("@FamilyID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyID);
                }
                
                cmd.Parameters.Add("@IsHead", SqlDbType.Bit).Value = Convert.ToBoolean(isHead);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy!=null&&updatedBy!=""?updatedBy:null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
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
            SqlParameter outParam1 = null;
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
                cmd.Parameters.Add("@FamilyID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyID);
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam1 = cmd.Parameters.Add("@UrlStatus", SqlDbType.NVarChar,-1);
                outParam.Direction = ParameterDirection.Output;
                outParam1.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                if(outParam1.Value.ToString() != ""&& outParam1.Value.ToString() != null)
                {
                    System.IO.File.Delete(HttpContext.Current.Server.MapPath(outParam1.Value.ToString()));
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
        #endregion DeleteMember

        #region DeleteMember
        /// <summary>
        /// Delete Member
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string CheckIsHead()
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
                cmd.CommandText = "[CheckIsHead]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(memberId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                outParam = cmd.Parameters.Add("@Status", SqlDbType.TinyInt);
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