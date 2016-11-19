using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using ChurchApp.DAL;

namespace ChurchApp.AdminPanel
{
    public partial class DashBoard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Request.QueryString["Session"] != null) && (Request.QueryString["Session"] != ""))
            {
                DAL.Church churchObj = new DAL.Church();
                DataTable ds;
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                string churchID = Request.QueryString["Session"].ToString();
                churchObj.churchId = churchID;
                ds = churchObj.GetChurchDetailsByChurchID();
                if (ds.Rows.Count > 0)
                {
                    DataRow dr = ds.Rows[0];
                    string ChurchName = dr["ChurchName"].ToString();

                    DAL.Security.UserAuthendication UA_Changed = new DAL.Security.UserAuthendication(UA.userName, churchID, ChurchName, UA.Role);
                    if (UA_Changed.ValidUser)
                    {
                        Session[Const.LoginSession] = UA_Changed;
                    }
                    Response.Redirect("/AdminPanel/DashBoard.aspx");
                }
            }
        }
        #region GetAllChurches
        [System.Web.Services.WebMethod]
        public static string GetAllChurches(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;
               
                ds = churchObj.GetAllChurches();
                //Converting to Json
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
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(parentRow);

        }

        #endregion GetAllChurches

        #region GetAllTowns
        [System.Web.Services.WebMethod]
        public static string GetAllTowns(TownMaster townMasterObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;

                ds = townMasterObj.SelectTownMastersIDandText();
                //Converting to Json
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
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(parentRow);

        }
#endregion GetAllTowns


        #region GetAllPriestsIDAndText
        [System.Web.Services.WebMethod]
        public static string GetAllPriestsIDAndText(Priest priestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;

                ds = priestObj.GetAllPriestsIDAndText();
                //Converting to Json
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
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(parentRow);

        }

        #endregion GetAllPriestsIDAndText


#region InsertChurch
        [System.Web.Services.WebMethod]
        public static string InsertChurch(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                churchObj.createdBy = UA.userName;
                churchObj.InsertChurch();

            }
            catch(Exception ex)
            {

            }
            return jsSerializer.Serialize(churchObj);
        }

#endregion InsertChurch
    }
}