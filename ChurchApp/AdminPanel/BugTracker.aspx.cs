using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace ChurchApp.AdminPanel
{
    public partial class BugTracker : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region GetAllErrorLog
        [WebMethod(EnableSession = true)]
        public static string GetAllErrorLog(ExceptionTrack exceptionObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    DataSet ds = null;
                    exceptionObj.ChurchID = UA.ChurchID;
                    ds = exceptionObj.GetAllNotFixedErrorDetails();
                    Dictionary<string, object> childRow;
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            childRow = new Dictionary<string, object>();
                            foreach (DataColumn col in ds.Tables[0].Columns)
                            {
                                childRow.Add(col.ColumnName, row[col]);
                            }
                            parentRow.Add(childRow);
                        }

                    }
                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetAllErrorLog

        #region GetErrorLogByID
        [WebMethod(EnableSession = true)]
        public static string GetErrorLogByID(ExceptionTrack exceptionObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    DataSet ds = null;
                    exceptionObj.ChurchID = UA.ChurchID;
                    ds = exceptionObj.GetErrorDetailByErrorID();
                    Dictionary<string, object> childRow;
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            childRow = new Dictionary<string, object>();
                            foreach (DataColumn col in ds.Tables[0].Columns)
                            {
                                childRow.Add(col.ColumnName, row[col]);
                            }
                            parentRow.Add(childRow);
                        }

                    }
                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetErrorLogByID

        #region UpdateErrorLog
        [WebMethod(EnableSession = true)]
        public static string UpdateErrorLog(ExceptionTrack exceptionObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    exceptionObj.ChurchID = UA.ChurchID;
                    exceptionObj.UpdatedBy = UA.userName;
                    exceptionObj.status=exceptionObj.UpdateErrorDetails();
                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {
                exceptionObj.status = ex.Message;
            }

            return jsSerializer.Serialize(exceptionObj);

        }
        #endregion UpdateErrorLog

        #region GetAllFixedErrorLog
        [WebMethod(EnableSession = true)]
        public static string GetAllFixedErrorLog(ExceptionTrack exceptionObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    DataSet ds = null;
                    exceptionObj.ChurchID = UA.ChurchID;
                    ds = exceptionObj.GetAllFixedErrorDetails();
                    Dictionary<string, object> childRow;
                    if (ds.Tables[0].Rows.Count > 0)
                    {
                        foreach (DataRow row in ds.Tables[0].Rows)
                        {
                            childRow = new Dictionary<string, object>();
                            foreach (DataColumn col in ds.Tables[0].Columns)
                            {
                                childRow.Add(col.ColumnName, row[col]);
                            }
                            parentRow.Add(childRow);
                        }

                    }
                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetAllFixedErrorLog
    }
}