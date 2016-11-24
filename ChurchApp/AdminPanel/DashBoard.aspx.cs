using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using ChurchApp.DAL;
using GoogleMaps.LocationServices;

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


        #region GetAllChurchIDandText
        [System.Web.Services.WebMethod]
        public static string GetAllChurchIDandText(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;

                ds = churchObj.GetAllChurchIDandText();
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
        #endregion GetAllChurchIDandText

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


        #region UpdateChurch
        [System.Web.Services.WebMethod]
        public static string UpdateChurch(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                churchObj.updatedBy = UA.userName;
                churchObj.UpdateChurch();

            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(churchObj);
        }

        #endregion UpdateChurch

        #region DeleteChurch
        [System.Web.Services.WebMethod]
        public static string DeleteChurch(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                churchObj.updatedBy = UA.userName;
                churchObj.DeleteChurch();

            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(churchObj);
        }
        #endregion DeleteChurch

        #region GetChurchDetailsByChurchID
        [System.Web.Services.WebMethod]
        public static string GetChurchDetailsByChurchID(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataTable dt = null;

                dt = churchObj.GetChurchDetailsByChurchID();
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
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(parentRow);

        }
       #endregion GetChurchDetailsByChurchID



        #region SelectAllRoles

        [System.Web.Services.WebMethod]
        public static string SelectAllRoles(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;

                ds = rolesObj.SelectAllRoles();
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
        #endregion SelectAllRoles


        #region GetAllRolesIDandText
        [System.Web.Services.WebMethod]
        public static string GetAllRolesIDandText(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;

                ds = rolesObj.GetAllRolesIDandText();
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
        #endregion GetAllRolesIDandText

        #region InsertRoles
        [System.Web.Services.WebMethod]
        public static string InsertRoles(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                rolesObj.createdBy= UA.userName;
                rolesObj.InsertRole();
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(rolesObj);
        }
        #endregion InsertRoles

        #region DeleteRole
        [System.Web.Services.WebMethod]
        public static string DeleteRole(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                rolesObj.updatedBy = UA.userName;
                rolesObj.DeleteRole();
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(rolesObj);
        }
        #endregion DeleteRole

        #region GetRoleDetailByRoleID
        [System.Web.Services.WebMethod]
        public static string GetRoleDetailByRoleID(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {

                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataTable dt = null;

                dt = rolesObj.GetRoleDetailByRoleID();
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
            catch (Exception ex)
            {
            }
            return jsSerializer.Serialize(parentRow);

        }

        #endregion GetRoleDetailByRoleID


        #region UpdateRoles

        [System.Web.Services.WebMethod]
        public static string UpdateRoles(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                rolesObj.updatedBy = UA.userName;
                rolesObj.UpdateRoles();
            }
            catch (Exception ex)
            {

            }
            return jsSerializer.Serialize(rolesObj);
        }

        #endregion UpdateRoles


        #region SelectAllUsers

        [System.Web.Services.WebMethod]
        public static string SelectAllUsers(Users usersObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                DataSet ds = null;
                ds = usersObj.SelectAllUsers();
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
        #endregion SelectAllUsers

        #region InsertUsers
        [System.Web.Services.WebMethod]
        public static string InsertUsers(Users usersObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                usersObj.createdBy = UA.userName;
              //  usersObj.InsertUsers();
            }
            catch (Exception ex)
            {

            }
            return "";
        }
        #endregion InsertUsers


    }
}