using System;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace Church.DAL
{
    public class dbConnection
    {
        public SqlConnection SQLCon = new SqlConnection(ConfigurationManager.ConnectionStrings["ChurchConnection"].ConnectionString);
        public SqlTransaction DBTrans;

        public int ConnectDB()
        {
            try
            {
                if (SQLCon.State == ConnectionState.Closed)
                {

                    SQLCon.Open();
                }
                return 1;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public SqlConnection GetDBConnection()
        {
            try
            {
                if (SQLCon.State == ConnectionState.Closed)
                {

                    SQLCon.Open();
                }
                return SQLCon;
            }
            catch (Exception)
            {
                try
                {
                    HttpContext.Current.Response.Redirect("~/General/Dbdown.aspx", true);
                }
                catch (Exception)
                {
                    throw;
                }

                return null;

            }
        }

        public int DisconectDB()
        {
            try
            {
                if (SQLCon.State == ConnectionState.Open)
                {
                    SQLCon.Close();
                }
                return 1;

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}