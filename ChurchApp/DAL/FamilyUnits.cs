using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using ChurchApp.DAL;

namespace ChurchApp.DAL
{
    public class FamilyUnits
    {
        Common commonObj = new Common();
        //public Family familyObj;
        #region Public Properties
        public string unitId
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string unitName
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

        #region FamilyUnit Methods

        #region SelectFamilyUnits
        /// <summary>
        /// Selects All FamilyUnits By churchID
        /// </summary>
        /// <returns>All FamilyUnits</returns>
        public DataSet SelectFamilyUnits()
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
                cmd.CommandText = "[GetAllFamilyUnits]";
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
        #endregion SelectFamilyUnits

        #region InsertFamilyUnit
        /// <summary>
        /// Add new familyUnit
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertFamilyUnit()
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
                cmd.CommandText = "[InsertFamilyUnit]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@UnitName", SqlDbType.NVarChar, 250).Value = unitName;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
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
        #endregion InsertFamilyUnit

        #region UpdateFamilyUnit
        /// <summary>
        /// Edit FamilyUnit
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateFamilyUnit()
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
                cmd.CommandText = "[UpdateFamilyUnit]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(unitId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@UnitName", SqlDbType.NVarChar, 250).Value = unitName;
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
            status=outParam.Value.ToString();
            return status;
        }
        #endregion UpdateFamilyUnit

        #region DeleteFamilyUnit
        /// <summary>
        /// Delete FamilyUnit
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteFamilyUnit()
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
                cmd.CommandText = "[DeleteFamilyUnits]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(unitId);
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
            status=outParam.Value.ToString();
            return status;
        }
        #endregion DeleteFamilyUnit

        #region SelectFamilyUnitMembers
        /// <summary>
        /// Selects All Family Unit Members By churchID
        /// </summary>
        /// <returns>All FamilyUnits</returns>
        public DataSet SelectFamilyUnitMembers()
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
                cmd.CommandText = "[SelectMembersOfFamilyUnits]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                if(unitId!=null && unitId!=string.Empty)
                {
                    cmd.Parameters.Add("@unitID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(unitId);
                }
                else
                {
                    cmd.Parameters.Add("@unitID", SqlDbType.UniqueIdentifier).Value = Guid.Empty;
                }
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
        #endregion SelectFamilyUnitMembers

        #endregion FamilyUnit Methods
    }
    public class Family 
    {
        public FamilyUnits familyUnitsObj;
        Common commonObj = new Common();
        #region Public Properties
        public string familyId
        {
            get;
            set;
        }
        public string familyName
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

        #region Families Methods

        #region SelectFamilyMembers
        /// <summary>
        /// Select All Families based on churchId and UnitId
        /// </summary>
        /// <returns>All Families</returns>
        public DataSet SelectFamilyMembers()
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
                cmd.CommandText = "[SelectFamilyMembers]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.churchId);
                cmd.Parameters.Add("@FamilyID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyId);
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
        #endregion SelectFamilyMembers
               
        #region SelectFamilies
        /// <summary>
        /// Select All Families based on churchId and UnitId
        /// </summary>
        /// <returns>All Families</returns>
        public DataSet SelectFamilies()
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
                cmd.CommandText = "[GetAllFamily]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.churchId);
                cmd.Parameters.Add("@UnitID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.unitId);
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
        #endregion SelectFamilys

        #region InsertFamily
        /// <summary>
        /// Add new family
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertFamily()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam,familyIdOut = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertFamily]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.churchId);
                cmd.Parameters.Add("@UnitID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.unitId);
                cmd.Parameters.Add("@FamilyName", SqlDbType.NVarChar, 250).Value = familyName;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = familyUnitsObj.createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value =DateTime.Now;
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                familyIdOut = cmd.Parameters.Add("@FamilyIDOut", SqlDbType.UniqueIdentifier);
                familyIdOut.Direction = ParameterDirection.Output;
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
            return familyIdOut.Value.ToString();
        }
        #endregion InsertFamily

        #region UpdateFamily
        /// <summary>
        /// Edit Family details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateFamily()
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
                cmd.CommandText = "[UpdateFamily]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.churchId);
                cmd.Parameters.Add("@UnitID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.unitId);
                cmd.Parameters.Add("@FamilyName", SqlDbType.NVarChar, 250).Value = familyName;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = familyUnitsObj.updatedBy;
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
            status=outParam.Value.ToString();
            return status;
        }
        #endregion UpdateFamily

        #region DeleteFamily
        /// <summary>
        /// Delete family 
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteFamily()
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
                cmd.CommandText = "[DeleteFamily]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyId);
                cmd.Parameters.Add("@churchId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.churchId);
                cmd.Parameters.Add("@UnitID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.unitId);
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
            status=outParam.Value.ToString();
            return status;
        }
        #endregion DeleteFamily

        #region SelectFamily
        /// <summary>
        /// Select a family based on churchId,familyId and UnitId
        /// </summary>
        /// <returns>All Families</returns>
        public DataSet SelectFamily()
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
                cmd.CommandText = "[SelectFamily]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.churchId);
                cmd.Parameters.Add("@FamilyID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyId);
                cmd.Parameters.Add("@UnitID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(familyUnitsObj.unitId);
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
        #endregion SelectFamily
        #endregion Families Methods
    }
}