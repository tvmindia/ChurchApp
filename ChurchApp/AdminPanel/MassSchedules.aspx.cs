#region CopyRight
/// Created By   : Anija G
/// Created date : 26- Oct- 2016
#endregion CopyRight

using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ChurchApp.AdminPanel
{
    public partial class MassSchedules : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #region GetAllMassTimings
        [System.Web.Services.WebMethod]
        public static string GetAllMassTimings(MassTimings MassTimingsObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
           
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    MassTimingsObj.massChurchId = UA.ChurchID;
                    ds = MassTimingsObj.SelectMassTimings();

                    //Converting to Json
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


                    jsonResult = jsSerializer.Serialize(parentRow);
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            

            return jsonResult;
        }
        #endregion GetAllMassTimings

        #region InsertMassTiming
        [System.Web.Services.WebMethod]
        public static string InsertMassTiming(MassTimings MassTimingsObj)
        {       
            string status = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
          
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    MassTimingsObj.massChurchId = UA.ChurchID;
                    status = MassTimingsObj.InsertMassTiming();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                status = ex.Message;
            }
           
            return status;
        }
        #endregion InsertMassTiming

        #region UpdateMassTiming
        [System.Web.Services.WebMethod]
        public static string UpdateMassTiming(MassTimings MassTimingsObj)
        {
            string status = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
                  
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    MassTimingsObj.churchId = UA.ChurchID;
                    status = MassTimingsObj.UpdateMassTiming();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                status = ex.Message;
            }
            
            return status;
        }
        #endregion UpdateMassTiming

        #region DeleteMassTiming
        [System.Web.Services.WebMethod]
        public static string DeleteMassTiming(MassTimings MassTimingsObj)
        {
            string status = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
          
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    status = MassTimingsObj.DeleteMassTiming();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                status = ex.Message;
            }
          
            return status;
        }
        #endregion DeleteMassTiming

        #region selectMassTimeByMassID
        [System.Web.Services.WebMethod]
        public static string selectMassTimeByMassID(MassTimings MassTimingsObj)
        {
            string jsonResult = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DataSet ds = null;
            DAL.Security.UserAuthendication UA;
            
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    MassTimingsObj.churchId = UA.ChurchID;
                    ds = MassTimingsObj.SelectMassTimingByMassID();

                    //Converting to Json
                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
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


                    jsonResult = jsSerializer.Serialize(parentRow);
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
           

            return jsonResult;
        }
        #endregion selectMassTimeByMassID

        #region selectMassTimeByDay
        [System.Web.Services.WebMethod]
        public static string selectMassTimeByDay(MassTimings MassTimingsObj)
        {
            string jsonResult = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DataSet ds = null;
            DAL.Security.UserAuthendication UA;
           
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    MassTimingsObj.massChurchId = UA.ChurchID;
                    ds = MassTimingsObj.SelectMassTimingByDay();

                    //Converting to Json
                    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
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


                    jsonResult = jsSerializer.Serialize(parentRow);
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
         

            return jsonResult;
        }
        #endregion selectMassTimeByDay
    }
}