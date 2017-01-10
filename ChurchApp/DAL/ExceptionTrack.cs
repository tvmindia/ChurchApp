using Church.DAL;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace ChurchApp.DAL
{
    public class ExceptionTrack
    {
        Common cmnObj = new Common();
        #region properties

        public string ChurchName
        {
            get;
            set;
        }
        public string UserName
        {
            get;
            set;
        }
        public string ErrorID
        {
            get;
            set;
        }
        public string ChurchID
        {
            get;
            set;
        }
        public string UserID
        {
            get;
            set;
        }
        public string Description
        {
            get;
            set;
        }
        public string Date
        {
            get;
            set;
        }
        public string Module
        {
            get;
            set;
        }
        public string Method
        {
            get;
            set;
        }
        public Boolean IsFixed
        {
            get;
            set;
        }
        public string BugFixDate
        {
            get;
            set;
        }
        public string ErrorSource
        {
            get;
            set;
        }
        public Boolean IsMobile
        {
            get;
            set;
        }
        public string AppBuild
        {
            get;
            set;
        }
        public string AppLogCat
        {
            get;
            set;
        }
        public string CreatedBy
        {
            get;
            set;
        }
        public string CreatedDate
        {
            get;
            set;
        }
        public string UpdatedBy
        {
            get;
            set;
        }
        public string UpdatedDate
        {
            get;
            set;
        }
        public string Version
        {
            get;
            set;
        }
        public string status
        {
            get;
            set;
        }
        public int ROWNUMBER
        {
            get;
            set;
        }
        public int TotalCount
        {
            get;
            set;
        }
        public int StartIndex
        {
            get;
            set;
        }
        public int EndIndex
        {
            get;
            set;
        }

        public string SearchText
        {
            get;
            set;
        }

        public int PageNumber
        {
            get;
            set;
        }
        public string startDate
        {
            get;
            set;
        }
        #endregion properties


        #region Methods
        #region InsertErrorDetails
        public Int16 InsertErrorDetails()
        {
            Common cmnObj = new Common();
            DAL.Security.UserAuthendication UA;
            Const Const = new Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter, outParameter2 = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertErrorLog]";
                if (ChurchID != null)
                {
                    cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
                }
                else
                {
                    cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UA.ChurchID);
                }
                if (UserID != null)
                {
                    cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UserID);
                }
                else
                {
                    cmd.Parameters.Add("@UserID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(UA.UserID);
                }
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description!=null&&Description!=""?Description:null;

                cmd.Parameters.Add("@Date", SqlDbType.DateTime).Value = (Date == null) ? cmnObj.ConvertDatenow(DateTime.Now) : DateTime.Parse(Date);
                cmd.Parameters.Add("@Module", SqlDbType.NVarChar, 50).Value = Module!=null&&Module!=""?Module:null;
                cmd.Parameters.Add("@Method", SqlDbType.NVarChar, 50).Value = Method!=null&&Method!=""?Method:null;
                //  cmd.Parameters.Add("@IsFixed", SqlDbType.Bit, -1).Value = IsFixed;
                //  cmd.Parameters.Add("@BugFixDate", SqlDbType.DateTime).Value = BugFixDate;
                cmd.Parameters.Add("@ErrorSource", SqlDbType.NVarChar, 25).Value = ErrorSource!=null&&ErrorSource!=""?ErrorSource:null;
                cmd.Parameters.Add("@IsMobile", SqlDbType.Bit).Value = IsMobile;
                if (CreatedBy != null)
                {
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = CreatedBy!=null&&CreatedBy!=""?CreatedBy:null;
                }
                else
                {
                    cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = UA.userName;
                }
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = cmnObj.ConvertDatenow(DateTime.Now);
                if (Version != null)
                {
                    cmd.Parameters.Add("@Version", SqlDbType.NVarChar, 50).Value = Version!=null&&Version!=""?Version:null;
                }
                
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParameter2 = cmd.Parameters.Add("@OutErrorID", SqlDbType.NVarChar, 50);
                outParameter2.Direction = ParameterDirection.Output;
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            ErrorID = outParameter2.Value.ToString();
            return Int16.Parse(outParameter.Value.ToString());

        }

        public Int16 InsertErrorDetailsFromApp()
        {
            IsMobile = true;
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter, outParameter2 = null;
            Common cmn = new Common();
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertErrorLog]";
                cmd.Parameters.Add("@ErrorID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ErrorID);
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                cmd.Parameters.Add("@Date", SqlDbType.DateTime).Value = (Date == null) ? cmn.ConvertDatenow(DateTime.Now) : DateTime.Parse(Date);
                cmd.Parameters.Add("@Module", SqlDbType.NVarChar, 50).Value = Module;
                cmd.Parameters.Add("@ErrorSource", SqlDbType.NVarChar, 25).Value = ErrorSource;
                cmd.Parameters.Add("@IsMobile", SqlDbType.Bit).Value = IsMobile;
                cmd.Parameters.Add("@AppBuild", SqlDbType.NVarChar, -1).Value = AppBuild;
                cmd.Parameters.Add("@AppLogCat", SqlDbType.NVarChar, -1).Value = AppLogCat;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = cmn.ConvertDatenow(DateTime.Now);
                cmd.Parameters.Add("@Version", SqlDbType.NVarChar, 50).Value = Version;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParameter2 = cmd.Parameters.Add("@OutErrorID", SqlDbType.NVarChar, 50);
                outParameter2.Direction = ParameterDirection.Output;
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            return Int16.Parse(outParameter.Value.ToString());
        }

        public Int16 InsertErrorDetailsFromWebService()
        {
            Common cmnObj = new Common();
            Const constants = new Const();
            if (Description == constants.NoItems)   //Not actually a logable exception
                return 0;
            IsMobile = false;
            CreatedBy = "WebServices";
            ErrorSource = "WebService";
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter, outParameter2 = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertErrorLog]";
                if (ChurchID != null) cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ChurchID);
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = Description;
                cmd.Parameters.Add("@Date", SqlDbType.DateTime).Value = (Date == null) ? cmnObj.ConvertDatenow(DateTime.Now) : DateTime.Parse(Date);
                cmd.Parameters.Add("@Module", SqlDbType.NVarChar, 50).Value = Module;
                cmd.Parameters.Add("@Method", SqlDbType.NVarChar, 50).Value = Method;
                cmd.Parameters.Add("@ErrorSource", SqlDbType.NVarChar, 25).Value = ErrorSource;
                cmd.Parameters.Add("@IsMobile", SqlDbType.Bit).Value = IsMobile;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 200).Value = CreatedBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = cmnObj.ConvertDatenow(DateTime.Now);
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParameter2 = cmd.Parameters.Add("@OutErrorID", SqlDbType.NVarChar, 50);
                outParameter2.Direction = ParameterDirection.Output;
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            return Int16.Parse(outParameter.Value.ToString());
        }
        #endregion  InsertErrorDetails

        #region UpdateErrorDetails
        public string UpdateErrorDetails()
        {
            Common cmnObj = new Common();
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;
            if (ErrorID == string.Empty)
            {
                throw new Exception("ErrorID IS NULL");
            }
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateErrorLog]";
                cmd.Parameters.Add("@ErrorID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ErrorID);
                cmd.Parameters.Add("@IsFixed", SqlDbType.Bit, -1).Value = IsFixed;
                BugFixDate = cmnObj.ConvertDatenow(DateTime.Now).ToString();
                cmd.Parameters.Add("@BugFixDate", SqlDbType.DateTime).Value = BugFixDate;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 255).Value = UpdatedBy!=null&&UpdatedBy!=""?UpdatedBy:null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = cmnObj.ConvertDatenow(DateTime.Now);
                outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                outParameter.Direction = ParameterDirection.Output;
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

            return outParameter.Value.ToString();

        }
        #endregion UpdateErrorDetails

        #region GetAllErrorDetails
        public DataSet GetAllNotFixedErrorDetails()
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
                cmd.CommandText = "[SelectNotFixedBugs]";
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
                //TotalCount = int.Parse(outparmeter.Value.ToString());

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
        #endregion GetAllErrorDetails

        #region GetErrorDetailByErrorID
        public DataSet GetErrorDetailByErrorID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            if (ErrorID == string.Empty)
            {
                throw new Exception("ErrorID IS NULL");
            }
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetErrorDetailByErrorID]";
                cmd.Parameters.Add("@ErrorID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ErrorID);
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
        #endregion GetErrorDetailByErrorID

        #region GetAllFixedErrorDetails
        public DataSet GetAllFixedErrorDetails()
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
                cmd.CommandText = "[GetAllErrorDetails]";
                cmd.Parameters.Add("@thirtydaysago", SqlDbType.DateTime).Value = cmnObj.Changeformat(startDate);
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
        #endregion GetAllFixedErrorDetails


        #endregion Methods
    }
}