using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Novenas
    {
        #region Public Properties
        public string novenaId
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string patronId
        {
            get;
            set;
        }
        public string novenaCaption
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string satrtDate
        {
            get;
            set;
        }
        public string endDate
        {
            get;
            set;
        }
        public string imageID
        {
            get;
            set;
        }
        public string isDelete
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
        #endregion Public Properties

        #region Novenas Methods

        #region SelectNovenas
        public DataSet SelectNovenas()
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
                cmd.CommandText = "[GetAllNovenas]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@PatronID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(patronId);
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
        #endregion SelectNovenas

        #endregion Novenas Methods
    }
}