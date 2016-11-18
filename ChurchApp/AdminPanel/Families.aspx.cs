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
                    memberObj.churchId = UA.ChurchID;
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    memberObj.familyID = memberObj.familyObj.InsertFamily();
                    if (memberObj.familyID != null && memberObj.familyID != "")
                    {
                        status = memberObj.InsertMember();
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
    }
}