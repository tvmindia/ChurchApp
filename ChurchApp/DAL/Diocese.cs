using System;
using System.Data;
using System.Data.SqlClient;
using Church.DAL;

namespace ChurchApp.DAL
{
    public class Diocese
    {
       public Common cmnObj = new Common();
       public Forane foraneObj = null;
        

        #region Public Properties
        public string DioceseID
        {
            get;
            set;
        }
       
        public string DioceseName
        {
            get;
            set;
        }
        public string DioceseDiscription
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

        #region GetAllDioceseIDAndName
        /// <summary>
        /// Select All TownMaster
        /// </summary>
        /// <returns>All TownMaster</returns>
        public DataSet GetAllDioceseIDAndName()
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
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 250).Value = DioceseName;
                cmd.CommandText = "[GetAllDioceseIDAndName]";
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
        #endregion GetAllDioceseIDAndName
    }
    public class Forane
    {
        Common cmnObj = new Common();
        #region Public Properties
        public string ForaneID
        {
            get;
            set;
        }
        public string DioceseID
        {
            get;
            set;
        }
        public string ForaneName
        {
            get;
            set;
        }
        public string ForaneDiscription
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

        #region GetForaneOnDioses
        /// <summary>
        /// Select All TownMaster
        /// </summary>
        /// <returns>All TownMaster</returns>
        public DataSet GetForaneOnDiosesID()
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
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 250).Value = ForaneName;
                cmd.Parameters.Add("@DioceseID", SqlDbType.NVarChar, 250).Value = DioceseID;
                cmd.CommandText = "[GetForaneIDAndNameOnDioces]";
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
        #endregion GetAllDioceseIDAndName
    }
}