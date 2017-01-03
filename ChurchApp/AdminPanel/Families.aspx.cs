
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
using System.Web.Services;
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
        [WebMethod(EnableSession = true)]
        public static string GetAllFamilyUnits(FamilyUnits familyUnitsObj)
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
                    familyUnitsObj.churchId = UA.ChurchID;
                    ds = familyUnitsObj.SelectFamilyUnits();
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
        #endregion GetAllFamilyUnits

        #region GetAllFamilyUnitMembers
        [WebMethod(EnableSession = true)]
        public static string GetAllFamilyUnitMembers(FamilyUnits familyUnitsObj)
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
                    familyUnitsObj.churchId = UA.ChurchID;
                    ds = familyUnitsObj.SelectFamilyUnitMembers();
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
        #endregion GetAllFamilyUnitMembers

        #region InsertFamilyUnit
        [WebMethod(EnableSession = true)]
        public static string InsertFamilyUnit(FamilyUnits familyUnitsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    familyUnitsObj.createdBy = UA.userName;
                    familyUnitsObj.churchId = UA.ChurchID;
                    familyUnitsObj.InsertFamilyUnit();


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
                familyUnitsObj.status = ex.Message;
            }
         
            return jsSerializer.Serialize(familyUnitsObj);
        }
        #endregion InsertFamilyUnit

        #region UpdateFamilyUnit
        [WebMethod(EnableSession = true)]
        public static string UpdateFamilyUnit(FamilyUnits familyUnitsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    familyUnitsObj.churchId = UA.ChurchID;
                    familyUnitsObj.updatedBy = UA.userName;
                    familyUnitsObj.UpdateFamilyUnit();
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
                familyUnitsObj.status = ex.Message;
            }

            return jsSerializer.Serialize(familyUnitsObj);
          
        }
        #endregion UpdateFamilyUnit

        #region DeleteFamilyUnit
        [WebMethod(EnableSession = true)]
        public static string DeleteFamilyUnit(FamilyUnits familyUnitsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    familyUnitsObj.churchId = UA.ChurchID;
                    familyUnitsObj.DeleteFamilyUnit();
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
                familyUnitsObj.status = ex.Message;
            }

            return jsSerializer.Serialize(familyUnitsObj);
        
        }
        #endregion DeleteFamilyUnit

        //<-----------------------------Family Methods----------------------------->//

        #region GetAllFamilys
        [WebMethod(EnableSession = true)]
        public static string GetAllFamilys(Family familyObj)
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
                    familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    ds = familyObj.SelectFamilies();
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
        #endregion GetAllFamilys


        #region GetAllFamilyMembers
        [WebMethod(EnableSession = true)]
        public static string GetAllFamilyMembers(Family familyObj)
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
                    familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    ds = familyObj.SelectFamilyMembers();
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
        #endregion GetAllFamilyMembers

        #region InsertFamily
        [WebMethod(EnableSession = true)]
        public static string InsertFamily(Members memberObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    memberObj.churchId = UA.ChurchID;
                    memberObj.createdBy = UA.userName;
                    memberObj.updatedBy = UA.userName;
                    if (memberObj.familyObj.familyId != "" && memberObj.familyObj.familyId != null)
                    {   memberObj.familyID = memberObj.familyObj.familyId;
                        memberObj.InsertMember();
                    }
                    else
                    {
                        memberObj.familyID = memberObj.familyObj.InsertFamily();
                        if (memberObj.familyID != "" && memberObj.familyID != null)
                        {
                            memberObj.InsertMember();
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
            return jsSerializer.Serialize(memberObj);
        }
        #endregion InsertFamily

        #region SelectFamily
        [WebMethod(EnableSession = true)]
        public static string SelectFamily(Family familyObj)
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
                    familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    ds = familyObj.SelectFamily();
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
        #endregion SelectFamily

        #region UpdateFamily
        [WebMethod(EnableSession = true)]
        public static string UpdateFamily(Members memberObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    memberObj.churchId = UA.ChurchID;
                    memberObj.familyObj.familyUnitsObj.updatedBy = UA.userName;
                    if (memberObj.familyID != "" && memberObj.familyID != null)
                    {
                        memberObj.familyObj.familyId = memberObj.familyID;
                        memberObj.status=memberObj.familyObj.UpdateFamily();
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
            return jsSerializer.Serialize(memberObj);
           
        }
        #endregion UpdateFamily

        #region DeleteFamily
        [WebMethod(EnableSession = true)]
        public static string DeleteFamily(Family familyObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    familyObj.DeleteFamily();
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
            return jsSerializer.Serialize(familyObj);
          
        }
        #endregion DeleteFamily

        //<-----------------------------Family Member Methods----------------------------->//
        #region GetFamilyMember
        [WebMethod(EnableSession = true)]
        public static string GetFamilyMember(Members memberObj)
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
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    DataSet ds = null;
                    ds = memberObj.SelectFamilyMember();
                  
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
        #endregion GetFamilyMember

        #region UpdateFamilyMember
        [WebMethod(EnableSession = true)]
        public static string UpdateFamilyMember(Members memberObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    memberObj.churchId = UA.ChurchID;
                    memberObj.updatedBy = UA.userName;
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    memberObj.UpdateMember();
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
            return jsSerializer.Serialize(memberObj);
           
        }
        #endregion UpdateFamilyMember

        #region DeleteFamilyMember
        [WebMethod(EnableSession = true)]
        public static string DeleteFamilyMember(Members memberObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    memberObj.churchId = UA.ChurchID;
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;

                    memberObj.DeleteMember();
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
            return jsSerializer.Serialize(memberObj);
           
        }
        #endregion UpdateFamilyMember

        #region GetAllFamilyMember
        [WebMethod(EnableSession = true)]
        public static string GetAllFamilyMember(Members memberObj)
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
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    DataSet ds = null;
                    ds = memberObj.SelectMembers();

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
        #endregion GetAllFamilyMember

        //<-----------------------------Administrator Methods----------------------------->//

        #region  Insert Administrator
        /// <summary>
        /// Insert Administrator Details
        /// </summary>
        /// <param name="AdminObj"></param>
        /// <returns>Success/Failure</returns>
        [WebMethod(EnableSession = true)]
        public static string InsertAdministrator(ChurchApp.DAL.Administrators AdminObj)
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
                    AdminObj.createdBy = UA.userName;
                    AdminObj.InsertAdministrator();
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
            return jsSerializer.Serialize(AdminObj);
        }

        #endregion Insert Administrator

        #region DeleteAdministrator
        [WebMethod(EnableSession = true)]
        public static string DeleteAdministrator(ChurchApp.DAL.Administrators AdminObj)
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
                    AdminObj.DeleteAdministrator();
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
            return jsSerializer.Serialize(AdminObj);
           
        }

        #endregion DeleteAdministrator

        #region SelectAdministrator
        [WebMethod(EnableSession = true)]
        public static string SelectAdministrator(ChurchApp.DAL.Administrators AdminObj)
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
                    DataSet ds = null;
                    AdminObj.churchId = UA.ChurchID;
                    ds = AdminObj.SelectAdministrator();

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
        #endregion SelectAdministrator

        #region  Update Administrator
        /// <summary>
        /// Update Administrator Details
        /// </summary>
        /// <param name="AdminObj"></param>
        /// <returns>Success/Failure</returns>
        [WebMethod(EnableSession = true)]
        public static string UpdateAdministrator(ChurchApp.DAL.Administrators AdminObj)
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
                    AdminObj.updatedBy = UA.userName;
                    AdminObj.UpdateAdministrator();
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
            return jsSerializer.Serialize(AdminObj);
           
           

        }

        #endregion Update Administrator

        #region GetAdminMemberDetails
        [WebMethod(EnableSession = true)]
        public static string GetAdminMemberDetails(Members memberObj)
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
                    DataSet ds = null;
                    memberObj.familyObj.familyUnitsObj.churchId = UA.ChurchID;
                    ds = memberObj.SelectMemberDetailsForAdmin();
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
        #endregion GetAdminMemberDetails
    }
}