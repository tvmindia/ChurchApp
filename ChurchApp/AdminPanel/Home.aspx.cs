using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace ChurchApp.AdminPanel
{
    public partial class Home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region GetChurchDetailsByChurchID
        [WebMethod(EnableSession = true)]
        public static string GetDetailsDataByChurchID(DAL.ChurchDetails churchDetObj)
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

                    DataTable dt = null;
                    churchDetObj.churchId = UA.ChurchID;

                    dt = churchDetObj.SelectChurchDetails();
                    //Converting to Json
                    Dictionary<string, object> childRow;
                    if (dt.Rows.Count > 0)
                    {
                        foreach (DataRow row in dt.Rows)
                        {
                            childRow = new Dictionary<string, object>();
                            foreach (DataColumn col in dt.Columns)
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
        #endregion GetChurchDetailsByChurchID
        [WebMethod(EnableSession =true)]
        public static string GetChurchDetailsDataByDetailID(DAL.ChurchDetails churchDetObj)
        {
            DAL.Security.UserAuthendication UA;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    churchDetObj.GetChurchDretailsByChurchDetailsID();
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
            return jsSerializer.Serialize(churchDetObj);
        }
        #region InsertChurchDetails
        [WebMethod(EnableSession = true)]
        public static string InsertChurchDetailsData(DAL.ChurchDetails churchDetObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    churchDetObj.createdBy = UA.userName;
                    churchDetObj.churchId = UA.ChurchID;
                    churchDetObj.InsertChurchDetails();

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
                churchDetObj.status = ex.Message;

            }

            return jsSerializer.Serialize(churchDetObj);

        }
        #endregion InsertChurchDetails
        [WebMethod(EnableSession = true)]
        public static string UpdateChurchDetails(DAL.ChurchDetails churchDetObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    churchDetObj.updatedBy = UA.userName;
                    churchDetObj.churchId = UA.ChurchID;
                    churchDetObj.UpdateChurchDetails();

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
                churchDetObj.status = ex.Message;

            }

            return jsSerializer.Serialize(churchDetObj);

        }

        [WebMethod(EnableSession = true)]
        public static string DeleteChurchDetail(DAL.ChurchDetails churchDetObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    churchDetObj.updatedBy = UA.userName;
                    churchDetObj.churchId = UA.ChurchID;
                    churchDetObj.status=churchDetObj.DeleteChurchDetails();

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
                churchDetObj.status = ex.Message;

            }

            return jsSerializer.Serialize(churchDetObj);

        }
    }
}