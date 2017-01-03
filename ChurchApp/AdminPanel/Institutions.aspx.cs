#region Author
//Created By: Thomson Kattingal
//Created Month :November 2016
#endregion Author
#region namespaces
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
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
        [WebMethod(EnableSession = true)]
        public static string InserInstitute(ChurchApp.DAL.Institutions InstituteObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            string status = null;
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    InstituteObj.churchId = UA.ChurchID;
                    InstituteObj.createdBy = UA.userName;
                    if (InstituteObj.Founded == "")
                    {
                        InstituteObj.Founded = null;
                    }
                    status = InstituteObj.InsertInstitution().ToString();
                    InstituteObj.results = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {
               
                InstituteObj.results = ex.Message;
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
        [WebMethod(EnableSession = true)]
        public static string UpdateInstitution(ChurchApp.DAL.Institutions InstituteObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            
            string status = null;
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    InstituteObj.churchId = UA.ChurchID;
                    if (InstituteObj.Founded == "")
                    {
                        InstituteObj.Founded = null;
                    }
                    InstituteObj.updatedBy = UA.userName;
                    status = InstituteObj.UpdateInstitution().ToString();
                    InstituteObj.results = status;
                }
                else 
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {
                InstituteObj.results = ex.Message;
            }
            finally
            {
            }
            return jsSerializer.Serialize(InstituteObj);

        }

        #endregion Update Institution

        #region DeleteInstitution
        [WebMethod(EnableSession = true)]
        public static string DeleteInstitution(ChurchApp.DAL.Institutions InstituteObj)
        {
            string status = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
             Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    InstituteObj.churchId = UA.ChurchID;
                    status = InstituteObj.DeleteInstitution();
                    InstituteObj.results = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch(Exception ex)
            {
                InstituteObj.results = ex.Message;
            }
            
            return jsSerializer.Serialize(InstituteObj);
        }

        #endregion DeleteInstitution

        #region GetAllInstitute Details
        [WebMethod(EnableSession = true)]
        public static string GetInstituteList(ChurchApp.DAL.Institutions InstituteObj)
        {
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    InstituteObj.churchId = UA.ChurchID;
                    DataSet ds = null;
                    ds = InstituteObj.SelectInstitutions();


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
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception)
            {
                return "";
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
        [WebMethod(EnableSession = true)]
        public static string GetInstituteDetailsUsingID(ChurchApp.DAL.Institutions InstituteObj)
        {
             JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    if (InstituteObj.institutionID != "")
                    {
                        InstituteObj.SelectInstituteUsingID();

                    }
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                InstituteObj.results = ex.Message;
            }
            
            return jsSerializer.Serialize(InstituteObj);
        }
        #endregion GetInstituteUsingPriestID

        #region GetRoles Details
        [WebMethod(EnableSession = true)]
        public static string GetRoles(ChurchApp.DAL.Administrators AdminObj)
        {
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    DataSet ds = null;
                    ds = AdminObj.SelectRoles();


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

                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {

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
        [WebMethod(EnableSession = true)]
        public static string InsertAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    AdminObj.churchId = UA.ChurchID;
                    AdminObj.createdBy = UA.userName;
                    status = AdminObj.InsertAdministrator().ToString();
                    AdminObj.results = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception ex)
            {
                AdminObj.results = ex.Message;
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
        [WebMethod(EnableSession = true)]
        public static string UpdateAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    AdminObj.churchId = UA.ChurchID;
                    AdminObj.updatedBy = UA.userName;
                    status = AdminObj.UpdateAdministrator().ToString();
                    AdminObj.results = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception ex)
            {
                AdminObj.results = ex.Message;
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
        [WebMethod(EnableSession = true)]
        public static string GetAdministrators(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    AdminObj.churchId = UA.ChurchID;
                    DataSet ds = null;
                    ds = AdminObj.SelectAdminsINST();


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
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {

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
        [WebMethod(EnableSession = true)]
        public static string GetAdminDetails(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
           Security.UserAuthendication UA = null;
           try
           {
               DashBoard dashBoardObj = new DashBoard();
               UA = dashBoardObj.GetCurrentUserSession();
               if (UA != null)
               {
                   AdminObj.churchId = UA.ChurchID;

                   if (AdminObj.adminId != "")
                   {
                       AdminObj.SelectAdminUsingID();

                   }
               }
               else
               {
                   Common comonObj = new Common();
                   return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
               }
           }
            catch(Exception ex)
           {
               AdminObj.results = ex.Message;
           }
           
            return jsSerializer.Serialize(AdminObj);
        }
        #endregion GetAdministratorDetailsUsing ID

        #region DeleteAdministrator
        [WebMethod(EnableSession = true)]
        public static string DeleteAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            string status=null;
           JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
           Security.UserAuthendication UA = null;
           try
           {
               DashBoard dashBoardObj = new DashBoard();
               UA = dashBoardObj.GetCurrentUserSession();
               if (UA != null)
               {
                   AdminObj.churchId = UA.ChurchID;
                   status = AdminObj.DeleteAdministrator();
                   AdminObj.results = status;
               }
           }
            catch(Exception ex)
           {
               AdminObj.results = ex.Message;
           }
            
            return jsSerializer.Serialize(AdminObj);
        }

        #endregion DeleteAdministrator
    }
}