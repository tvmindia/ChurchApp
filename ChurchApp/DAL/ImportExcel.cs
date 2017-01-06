using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class ImportExcel
    {

        #region Public Properties

        public string tableName
        {
            get;
            set;
        }

        #endregion Public Properties

        #region Methods

        #region GetTableDefinition
        /// <summary>
        /// Get Table Definition
        /// </summary>
        /// <returns>All Table Definition Data</returns>
        public DataSet GetTableDefinition()
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
                cmd.CommandText = "[GetTableDefinition]";
                cmd.Parameters.Add("@TableName", SqlDbType.NVarChar,100).Value = tableName;
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
        #endregion GetTableDefinition

        #endregion Methods

        public bool Validate()
        {
            bool status = true;

            return status;
        }

    }
}