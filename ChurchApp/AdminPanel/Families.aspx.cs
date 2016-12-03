
#region CopyRight
/// Created By   : Anija G
/// Created date : 17- Nov- 2016
#endregion CopyRight

#region NameSpace
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
#endregion NameSpace
namespace ChurchApp.AdminPanel
{
    public partial class Families : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //<--------------------- Family Unit Methods----------------------------->//
        #region GetAllFamilyUnits
        [System.Web.Services.WebMethod]
        public static string GetAllFamilyUnits(FamilyUnits familyUnitsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    familyUnitsObj.churchId = UA.ChurchID;
                    ds = familyUnitsObj.SelectFamilyUnits();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion GetAllFamilyUnits

        #region GetAllFamilyUnitMembers
        [System.Web.Services.WebMethod]
        public static string GetAllFamilyUnitMembers(FamilyUnits familyUnitsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    familyUnitsObj.churchId = UA.ChurchID;
                    ds = familyUnitsObj.SelectFamilyUnitMembers();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion GetAllFamilyUnitMembers

        #region InsertFamilyUnit
        [System.Web.Services.WebMethod]
        public static string InsertFamilyUnit(FamilyUnits familyUnitsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if (UA != null)
                {
                    familyUnitsObj.createdBy = UA.userName;
                    familyUnitsObj.churchId = UA.ChurchID;
                    status = familyUnitsObj.InsertFamilyUnit();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion InsertFamilyUnit

        #region UpdateFamilyUnit
        [System.Web.Services.WebMethod]
        public static string UpdateFamilyUnit(FamilyUnits familyUnitsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if (UA != null)
                {
                    familyUnitsObj.churchId = UA.ChurchID;
                    familyUnitsObj.updatedBy = UA.userName;
                    status = familyUnitsObj.UpdateFamilyUnit();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion UpdateFamilyUnit

        #region DeleteFamilyUnit
        [System.Web.Services.WebMethod]
        public static string DeleteFamilyUnit(FamilyUnits familyUnitsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if (UA != null)
                {
                    familyUnitsObj.churchId = UA.ChurchID;
                    status = familyUnitsObj.DeleteFamilyUnit();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion DeleteFamilyUnit

        //<-----------------------------Family Methods----------------------------->//

        #region GetAllFamilys
        [System.Web.Services.WebMethod]
        public static string GetAllFamilys(Family familyObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null) 
                {
                    familyObj.familyUnitsObj.churchId = UA.ChurchID;
                   // familyUnitsObj.familyObj.unitId
                    ds = familyObj.SelectFamilies();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion GetAllFamilys

        #region GetAllFamilyMembers
        [System.Web.Services.WebMethod]
        public static string GetAllFamilyMembers(Family familyObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    // familyUnitsObj.familyObj.unitId
                    ds = familyObj.SelectFamilyMembers();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion GetAllFamilyMembers

        #region InsertFamily
        [System.Web.Services.WebMethod]
        public static string InsertFamily(Members memberObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if (UA != null)
                {
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    memberObj.churchId = UA.ChurchID;
                    memberObj.createdBy = UA.userName;
                    memberObj.updatedBy = UA.userName;
                    if (memberObj.familyObj.familyId != "" && memberObj.familyObj.familyId != null)
                    {
                        memberObj.familyID = memberObj.familyObj.familyId;
                        status = memberObj.InsertMember();
                    }
                    else
                    {
                        memberObj.familyID = memberObj.familyObj.InsertFamily();
                        if (memberObj.familyID != "" && memberObj.familyID != null)
                        {
                            status = memberObj.InsertMember();
                        }
                    }
                   
                    
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion InsertFamily

        #region SelectFamily
        [System.Web.Services.WebMethod]
        public static string SelectFamily(Family familyObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    // familyUnitsObj.familyObj.unitId
                    ds = familyObj.SelectFamily();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion SelectFamily

        #region UpdateFamily
        [System.Web.Services.WebMethod]
        public static string UpdateFamily(Members memberObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if (UA != null)
                {
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    memberObj.churchId = UA.ChurchID;
                    //memberObj.familyID = memberObj.familyObj.InsertFamily();
                    memberObj.familyObj.familyUnitsObj.updatedBy = UA.userName;
                    if (memberObj.familyID != "" && memberObj.familyID != null)
                    {
                        memberObj.familyObj.familyId = memberObj.familyID;
                        status = memberObj.familyObj.UpdateFamily();
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion UpdateFamily

        #region DeleteFamily
        [System.Web.Services.WebMethod]
        public static string DeleteFamily(Family familyObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if (UA != null)
                {
                    familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    status = familyObj.DeleteFamily();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion DeleteFamily

        //<-----------------------------Family Member Methods----------------------------->//
        #region GetFamilyMember
        [System.Web.Services.WebMethod]
        public static string GetFamilyMember(Members memberObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    // familyUnitsObj.familyObj.unitId
                    ds = memberObj.SelectFamilyMember();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion GetFamilyMember

        #region UpdateFamilyMember
        [System.Web.Services.WebMethod]
        public static string UpdateFamilyMember(Members memberObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if (UA != null)
                {
                    memberObj.churchId = UA.ChurchID;
                    memberObj.updatedBy = UA.userName;
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                   
                        status = memberObj.UpdateMember();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion UpdateFamilyMember

        #region DeleteFamilyMember
        [System.Web.Services.WebMethod]
        public static string DeleteFamilyMember(Members memberObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                if (UA != null)
                {
                    memberObj.churchId = UA.ChurchID;
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    
                        status = memberObj.DeleteMember();
                    
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion UpdateFamilyMember

        #region GetAllFamilyMember
        [System.Web.Services.WebMethod]
        public static string GetAllFamilyMember(Members memberObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    // familyUnitsObj.familyObj.unitId
                    ds = memberObj.SelectMembers();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion GetAllFamilyMember

        //<-----------------------------Administrator Methods----------------------------->//

        #region  Insert Administrator
        /// <summary>
        /// Insert Administrator Details
        /// </summary>
        /// <param name="AdminObj"></param>
        /// <returns>Success/Failure</returns>
        [System.Web.Services.WebMethod]
        public static string InsertAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                AdminObj.churchId = UA.ChurchID;
                AdminObj.createdBy = UA.userName;
                status = AdminObj.InsertAdministrator().ToString();

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return status;

        }

        #endregion Insert Administrator

        #region DeleteAdministrator
        [System.Web.Services.WebMethod]
        public static string DeleteAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                AdminObj.churchId = UA.ChurchID;
                status = AdminObj.DeleteAdministrator();

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return status;
        }

        #endregion DeleteAdministrator

        #region SelectAdministrator
        [System.Web.Services.WebMethod]
        public static string SelectAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    AdminObj.churchId = UA.ChurchID;
                    ds = AdminObj.SelectAdministrator();
                
                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion SelectAdministrator

        #region  Update Administrator
        /// <summary>
        /// Update Administrator Details
        /// </summary>
        /// <param name="AdminObj"></param>
        /// <returns>Success/Failure</returns>
        [System.Web.Services.WebMethod]
        public static string UpdateAdministrator(ChurchApp.DAL.Administrators AdminObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                AdminObj.churchId = UA.ChurchID;
                AdminObj.updatedBy = UA.userName;
                status = AdminObj.UpdateAdministrator().ToString();

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return status;

        }

        #endregion Update Administrator

        #region GetAdminMemberDetails
        [System.Web.Services.WebMethod]
        public static string GetAdminMemberDetails(Members memberObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string jsonResult = null;
            DataSet ds = null;
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            try
            {
                if (UA != null)
                {
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    // familyUnitsObj.familyObj.unitId
                    ds = memberObj.SelectMemberDetailsForAdmin();
                    // ds = N

                    //Converting to Json
                    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
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
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return jsonResult;
        }
        #endregion GetAdminMemberDetails
    }
}