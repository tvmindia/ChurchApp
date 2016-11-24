#region Author
//Created By: Thomson Kattingal
//Created Month :November 2016
#endregion Author
#region namespaces
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
#endregion namespaces
namespace ChurchApp.AdminPanel
{
    public partial class Institutions : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region  Insert Institution
        /// <summary>
        /// Insert Institution Details
        /// </summary>
        /// <param name="InstituteObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string InserInstitute(ChurchApp.DAL.Institutions InstituteObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            InstituteObj.churchId = UA.ChurchID;
            string status = null;
            try
            {
                InstituteObj.createdBy = UA.userName;
                if(InstituteObj.Founded=="")
                {
                    InstituteObj.Founded = null;
                }
                status = InstituteObj.InsertInstitution().ToString();
                InstituteObj.results = status;

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(InstituteObj);

        }

        #endregion Insert Institution

        #region  Update Institution
        /// <summary>
        /// Update Institution Details
        /// </summary>
        /// <param name="InstituteObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string UpdateInstitution(ChurchApp.DAL.Institutions InstituteObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            InstituteObj.churchId = UA.ChurchID;
            string status = null;
            try
            {
                if (InstituteObj.Founded == "")
                {
                    InstituteObj.Founded = null;
                }
                InstituteObj.updatedBy =UA.userName;
                status = InstituteObj.UpdateInstitution().ToString();
                InstituteObj.results = status;

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(InstituteObj);

        }

        #endregion Update Institution

        #region DeleteInstitution
        [System.Web.Services.WebMethod]
        public static string DeleteInstitution(ChurchApp.DAL.Institutions InstituteObj)
        {
            string status = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            InstituteObj.churchId = UA.ChurchID;
            status = InstituteObj.DeleteInstitution();
            InstituteObj.results = status;
            return jsSerializer.Serialize(InstituteObj);
        }

        #endregion DeleteInstitution

        #region GetAllInstitute Details
        [System.Web.Services.WebMethod]
        public static string GetInstituteList(ChurchApp.DAL.Institutions InstituteObj)
        {
            
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            
                InstituteObj.churchId = UA.ChurchID;
                DataSet ds = null;
                ds = InstituteObj.SelectInstitutions();
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
                return jsSerializer.Serialize(parentRow);
        }
        #endregion GetAllInstitute Details

        #region GetInstituteUsingPriestID
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="InstituteObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetInstituteDetailsUsingID(ChurchApp.DAL.Institutions InstituteObj)
        {
            //    DAL.Security.UserAuthendication UA;
            //    UIClasses.Const Const = new UIClasses.Const();
            //    UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            if (InstituteObj.institutionID != "")
            {
                InstituteObj.SelectInstituteUsingID();

            }
            return jsSerializer.Serialize(InstituteObj);
        }
        #endregion GetInstituteUsingPriestID

        #region GetRoles Details
        [System.Web.Services.WebMethod]
        public static string GetRoles(ChurchApp.DAL.Administrators AdminObj)
        {

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            //AdminObj.orgType = "INST";
            //InstituteObj.churchId = UA.ChurchID;
            DataSet ds = null;
            ds = AdminObj.SelectRoles();
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
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetRoles Details

        #region  Insert Administrator
        /// <summary>
        /// Insert Institution Details
        /// </summary>
        /// <param name="AdminObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string InsertAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            AdminObj.churchId = UA.ChurchID;
            string status = null;
            try
            {
                AdminObj.createdBy = UA.userName;
                //AdminObj.orgType = "INST";
                status = AdminObj.InsertAdministrator().ToString();
                AdminObj.results = status;

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(AdminObj);

        }

        #endregion Insert Administrator

        #region  Update Administrator
        /// <summary>
        /// Update Institution Details
        /// </summary>
        /// <param name="AdminObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string UpdateAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            AdminObj.churchId = UA.ChurchID;
            string status = null;
            try
            {
                AdminObj.updatedBy = UA.userName;
                //AdminObj.orgType = "INST";
                status = AdminObj.UpdateAdministrator().ToString();
                AdminObj.results = status;

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(AdminObj);

        }

        #endregion Update Administrator

        #region GetAllAdministrator
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="InstituteObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetAdministrators(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            AdminObj.churchId = UA.ChurchID;
            DataSet ds = null;
            ds = AdminObj.SelectAdminsINST();
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
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetAllAdministrator

        #region GetAdministratorDetailsUsing ID
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="AdminObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetAdminDetails(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            AdminObj.churchId = UA.ChurchID;

            if (AdminObj.adminId != "")
            {
                AdminObj.SelectAdminUsingID();

            }
            return jsSerializer.Serialize(AdminObj);
        }
        #endregion GetAdministratorDetailsUsing ID

        #region DeleteAdministrator
        [System.Web.Services.WebMethod]
        public static string DeleteAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            string status=null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            AdminObj.churchId = UA.ChurchID;
            status=AdminObj.DeleteAdministrator();
            AdminObj.results = status;
            return jsSerializer.Serialize(AdminObj);
        }

        #endregion DeleteAdministrator
    }
}