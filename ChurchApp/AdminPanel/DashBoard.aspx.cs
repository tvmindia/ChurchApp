﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Web;
using System.Web.Script.Serialization;
using ChurchApp.DAL;
using System.Web.Services;


namespace ChurchApp.AdminPanel
{
    public partial class DashBoard : System.Web.UI.Page
    {
        DAL.Const Const = new DAL.Const();
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Request.QueryString["eid"] != null) && (Request.QueryString["eid"] != ""))
            {
                DAL.Church churchObj = new DAL.Church();
                DataTable ds;
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                string churchID = Request.QueryString["eid"].ToString();
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
                    //If church not found
                else
                {
                    Session.Remove(Const.LoginSession);
                    Response.Redirect("/Login.aspx");
                }
            }

        
        }

        /// <summary>
        /// Check Whether session is out or not
        /// </summary>
        public Security.UserAuthendication GetCurrentUserSession()
        {
            Security.UserAuthendication UA = null;
            try
            {
                if (HttpContext.Current.Session[Const.LoginSession] != null)
                {
                    UA = (Security.UserAuthendication)Session[Const.LoginSession];
                }
                   

            }

            catch (NullReferenceException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return UA;
        }

        #region GetAllChurches
        [WebMethod(EnableSession = true)]
        public static string GetAllChurches(DAL.Church churchObj)
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
                       // return JsonConvert.SerializeObject(ds.Tables[0]);
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

            //JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            //List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            //Security.UserAuthendication UA = null;
            //try
            //{
            //    DashBoard dashBoardObj = new DashBoard();
            //    UA = dashBoardObj.GetCurrentUserSession();
            //    if (UA != null)
            //    {
            //        DataSet ds = null;
            //        ds = churchObj.GetAllChurches();
            //        //Converting to Json
            //        Dictionary<string, object> childRow;
            //        if (ds.Tables[0].Rows.Count > 0)
            //        {
            //            foreach (DataRow row in ds.Tables[0].Rows)
            //            {
            //                childRow = new Dictionary<string, object>();
            //                foreach (DataColumn col in ds.Tables[0].Columns)
            //                {
            //                    childRow.Add(col.ColumnName, row[col]);
            //                }
            //                parentRow.Add(childRow);
            //            }
            //        }

            //    }
            //    //Session is out
            //    else
            //    {
            //        Common comonObj = new Common();
            //        return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
            //    }
            //}
            //catch (Exception ex)
            //{
               
            //}
          
            //return jsSerializer.Serialize(parentRow);

        }

        #endregion GetAllChurches

        #region GetRoleForUserAuthentication
        [WebMethod(EnableSession = true)]
        public static string GetRoleForUserAuthentication()
        {
            string Rolename = null;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    Rolename = UA.Role;
                }

                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch (Exception ex)
            {

            }


            return jsSerializer.Serialize(Rolename);

        }
        #endregion GetAllChurchIDandText
        #region GetAllChurchIDandText
        [WebMethod(EnableSession = true)]
        public static string GetAllChurchIDandText(DAL.Church churchObj)
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
        #endregion GetAllChurchIDandText

        #region GetAllTowns
        [WebMethod(EnableSession = true)]
        public static string SelectTownMastersIDandText(TownMaster townMasterObj)
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
        #endregion GetAllTowns

        #region GetAllDiocese
        [WebMethod(EnableSession = true)]
        public static string GetAllDioceseIDAndName(Diocese dioceseObj)
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

                    ds = dioceseObj.GetAllDioceseIDAndName();
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
        #endregion GetAllDiocese


        #region GetForaneOnDiocese
        [WebMethod(EnableSession = true)]
        public static string GetForaneOnDiocese(Diocese dioceseObj)
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

                    ds = dioceseObj.foraneObj.GetForaneOnDiosesID();
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
        #endregion GetForaneOnDiocese

        #region GetAllChurchStatus
        [WebMethod(EnableSession = true)]
        public static string GetChurchStatus(DAL.Church ChurchObj)
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

                    ds = ChurchObj.GetAllStatus();
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
        #endregion GetAllChurchStatus

        #region GetAllRite
        [WebMethod(EnableSession = true)]
        public static string GetChurchRite(DAL.Church ChurchObj)
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

                    ds = ChurchObj.GetAllRite();
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
        #endregion GetAllRite

        #region InsertChurch
        [WebMethod(EnableSession = true)]
        public static string InsertChurch(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    
                    churchObj.createdBy = UA.userName;
                    churchObj.InsertChurch();
                    
                }
                //Session is out
                else
                {
                   Common comonObj = new Common();
                   return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                churchObj.status = ex.Message;

            }
          
            return jsSerializer.Serialize(churchObj);
           
        }

        #endregion InsertChurch


        #region UpdateChurch
        [WebMethod(EnableSession = true)]
        public static string UpdateChurch(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    churchObj.updatedBy = UA.userName;
                    churchObj.UpdateChurch();

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
                churchObj.status = ex.Message;
            }
            
            return jsSerializer.Serialize(churchObj);
        }

        #endregion UpdateChurch

        #region DeleteChurch
        [WebMethod(EnableSession = true)]
        public static string DeleteChurch(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    //Check church has image and delete it
                    //if ((churchObj.mainImageId != null) && (churchObj.mainImageId != ""))
                    //{
                    //    //overwrite appImagesObj.appImageId to townObj.imageId
                    //    churchObj.appImagesObj.appImageId = churchObj.mainImageId;
                    //    churchObj.appImagesObj.SelectAppImageByID();
                    //}
                    churchObj.updatedBy = UA.userName;
                    churchObj.DeleteChurch();

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
                churchObj.status = ex.Message;
            }
          
            return jsSerializer.Serialize(churchObj);
        }
        #endregion DeleteChurch

        #region GetChurchDetailsByChurchID
        [WebMethod(EnableSession = true)]
        public static string GetChurchDetailsByChurchID(DAL.Church churchObj)
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
                    if (churchObj.churchId==null)
                    {
                        churchObj.churchId = UA.ChurchID;
                    }
                    
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

        #region GetAllRolesByChurch
         [WebMethod(EnableSession = true)]
        public static string GetAllRolesByChurch(Roles rolesObj)
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

                   ds = rolesObj.GetAllRolesByChurch();
                  
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
        #endregion GetAllRolesByChurch

        #region SelectAllRoles

        [WebMethod(EnableSession = true)]
        public static string SelectAllRoles(Roles rolesObj)
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
        #endregion SelectAllRoles


        #region GetAllRolesIDandText
        [WebMethod(EnableSession = true)]
        public static string GetAllRolesIDandText(Roles rolesObj)
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
        #endregion GetAllRolesIDandText

        #region InsertRoles
        [WebMethod(EnableSession = true)]
        public static string InsertRoles(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    rolesObj.createdBy = UA.userName;
                    rolesObj.InsertRole();
                    

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
                rolesObj.status = ex.Message;
            }
           
            return jsSerializer.Serialize(rolesObj);
        }
        #endregion InsertRoles

        #region DeleteRole
        [WebMethod(EnableSession = true)]
        public static string DeleteRole(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    rolesObj.updatedBy = UA.userName;
                    rolesObj.DeleteRole();


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
                rolesObj.status = ex.Message;
            }
          
            return jsSerializer.Serialize(rolesObj);
        }
        #endregion DeleteRole

        #region GetRoleDetailByRoleID
        [WebMethod(EnableSession = true)]
        public static string GetRoleDetailByRoleID(Roles rolesObj)
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

        #endregion GetRoleDetailByRoleID


        #region UpdateRoles

        [WebMethod(EnableSession = true)]
        public static string UpdateRoles(Roles rolesObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    rolesObj.updatedBy = UA.userName;
                    rolesObj.UpdateRoles();
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
                rolesObj.status = ex.Message;
            }
            
            return jsSerializer.Serialize(rolesObj);
        }

        #endregion UpdateRoles


        #region SelectAllUsers

        [WebMethod(EnableSession = true)]
        public static string SelectAllUsers(Users usersObj)
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
        #endregion SelectAllUsers

        #region InsertUsers
        [WebMethod(EnableSession = true)]
        public static string InsertUsers(Users usersObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    usersObj.createdBy = UA.userName;
                    usersObj.InsertUsers();
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
                usersObj.status = ex.Message;
            }
           
            return jsSerializer.Serialize(usersObj);
        }
        #endregion InsertUsers

        #region UpdateUser
        [WebMethod(EnableSession = true)]
        public static string UpdateUser(Users usersObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    usersObj.LoginName = "";
                    usersObj.updatedBy = UA.userName;
                    usersObj.UpdateUser();
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
                usersObj.status = ex.Message;
            }
           
            return jsSerializer.Serialize(usersObj);
        }
        #endregion UpdateUser

        #region DeleteUser
        [WebMethod(EnableSession = true)]
        public static string DeleteUser(Users usersObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    usersObj.updatedBy = UA.userName;
                    usersObj.DeleteUser();
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
                usersObj.status = ex.Message;
            }
           
            return jsSerializer.Serialize(usersObj);
        }

#endregion DeleteUser

        #region GetUserDetailsByUserID
        [WebMethod(EnableSession = true)]
        public static string GetUserDetailsByUserID(Users usersObj)
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
                    ds = usersObj.GetUserDetailsByUserID();
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
        #endregion GetUserDetailsByUserID

        #region GetAllUsersByChurch
        [WebMethod(EnableSession = true)]
        public static string GetAllUsersByChurch(Users usersObj)
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
                    ds = usersObj.GetAllUsersByChurch();
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
        #endregion GetAllUsersByChurch


        //------------------------------------------------ * OrgDesignation Master Methods *---------------------------------------------------//

        #region SelectAllDesignation

        [WebMethod(EnableSession = true)]
        public static string SelectAllDesignation(OrgDesignationMaster designationObj)
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
                    ds = designationObj.SelectOrgDesignationMaster();
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
        #endregion SelectAllDesignation

        #region GetAllDesignationByOrganization
        [WebMethod(EnableSession = true)]
        public static string GetAllDesignationByOrganization(OrgDesignationMaster designationObj)
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
                    ds = designationObj.GetDesignationByOrganization();
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
        #endregion GetAllDesignationByOrganization

        #region InsertDesignation
        [WebMethod(EnableSession = true)]
        public static string InsertDesignation(OrgDesignationMaster designationObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    designationObj.createdBy = UA.userName;
                    designationObj.InsertOrgDesignationMaster();
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
                designationObj.status = ex.Message;
            }
          
           
            return jsSerializer.Serialize(designationObj);
        }

        #endregion InsertDesignation

        #region GetAllOrgType
        [WebMethod(EnableSession = true)]
        public static string GetAllOrgType(OrgDesignationMaster designationObj)
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

                    ds = designationObj.GetAllOrgType();
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
        #endregion GetAllOrgType

        #region GetDesignationDetailByID
        [WebMethod(EnableSession = true)]
        public static string GetDesignationDetailByID(OrgDesignationMaster designationObj)
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

                    ds = designationObj.GetDesignationDetailByID();
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
        #endregion GetDesignationDetailByID


        #region UpdateDesignation
        [WebMethod(EnableSession = true)]
        public static string UpdateDesignation(OrgDesignationMaster designationObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    designationObj.createdBy = UA.userName;
                    designationObj.UpdateOrgDesignationMaster();
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
                designationObj.status = ex.Message;
            }
          
            return jsSerializer.Serialize(designationObj);
        }

        #endregion UpdateDesignation

        #region DeleteDesignation
        [WebMethod(EnableSession = true)]
        public static string DeleteDesignation(OrgDesignationMaster designationObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    designationObj.createdBy = UA.userName;
                    designationObj.DeleteOrgDesignationMaster();
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
                designationObj.status = ex.Message;
            }
            
            return jsSerializer.Serialize(designationObj);
        }
        #endregion DeleteDesignation

        #region SelectAllTown

        [WebMethod(EnableSession = true)]
        public static string SelectAllTown(TownMaster townMasterObj)
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
                    ds = townMasterObj.SelectTownMasters();
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
        #endregion SelectAllTown

        #region SelectTown

        [WebMethod(EnableSession = true)]
        public static string SelectTown(TownMaster townObj)
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
                    ds = townObj.SelectTown();
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
        #endregion SelectTown

        #region InsertTown
        [WebMethod(EnableSession = true)]
        public static string InsertTown(TownMaster townObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    townObj.createdBy = UA.userName;
                    townObj.InsertTownMaster();
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
                townObj.status = ex.Message;
            }


            return jsSerializer.Serialize(townObj);
        }

        #endregion InsertTown

        #region DeleteTown
        [WebMethod(EnableSession = true)]
        public static string DeleteTown(TownMaster townObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    //Check town has image and delete it
                    if ((townObj.imageId!=null)&&(townObj.imageId!=""))
                    {
                        //overwrite appImagesObj.appImageId to townObj.imageId
                        townObj.appImagesObj.appImageId = townObj.imageId;
                        townObj.appImagesObj.SelectAppImageByID();
                    }
                    
                    townObj.updatedBy = UA.userName;
                    townObj.DeleteTownMaster();
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
                townObj.status = ex.Message;
            }


            return jsSerializer.Serialize(townObj);
        }

        #endregion DeleteTown

        #region UpdateTown
        [WebMethod(EnableSession = true)]
        public static string UpdateTown(TownMaster townObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    townObj.updatedBy = UA.userName;
                    townObj.UpdateTownMaster();
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
                townObj.status = ex.Message;
            }


            return jsSerializer.Serialize(townObj);
        }

        #endregion UpdateTown

        #region GetAllChurch
        [WebMethod(EnableSession = true)]
        public static string GetAllChurch(DAL.Church churchObj)
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
                    churchObj.churchId = UA.ChurchID;
                    DataSet ds = null;
                    if(churchObj.SearchTerm==null)
                    {
                        ds = churchObj.SelectTopChurches();
                    }
                    else
                    {
                        ds = churchObj.SelectChurches1();
                    }
                    

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
        #endregion GetAllChurch

        #region GetChurchReqDetailsByChurchID
        [WebMethod(EnableSession = true)]
        public static string GetChurchReqDetailsByChurchID(DAL.Church churchObj)
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
                    if (churchObj.churchId == null && churchObj.churchId=="")
                    {
                        churchObj.churchId = UA.ChurchID;
                    }

                    dt = churchObj.GetRequestChurchDetailsByChurchID();
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
        #endregion GetChurchReqDetailsByChurchID
        #region GetRequestChurchDetails

        [System.Web.Services.WebMethod]
        public static string GetRequestChurchDetails(DAL.Church churchObj)
        {
           JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            Security.UserAuthendication UA = null;
            DataSet ds = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    ds = churchObj.SelectAllChurchesRequest();

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

        #endregion GetRequestChurchDetails
        #region UpdateRequest Church status
        [WebMethod(EnableSession = true)]
        public static string UpdateRequest(DAL.Church churchObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    churchObj.updatedBy = UA.userName;
                    churchObj.UpdateRequestChurch();
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
                churchObj.status = ex.Message;
            }

            return jsSerializer.Serialize(churchObj);
        }
        #endregion UpdateRequest Church status
        //#region GetReviewCountforBubble

        //[System.Web.Services.WebMethod]
        //public static string GetReviewCountforBubble()
        //{
           
        //    JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
        //    DataSet ds = null;
        //    ds = ProductObj.GetAllProductsReviews();

        //    List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
        //    Dictionary<string, object> childRow;

        //    if (ds.Tables[1].Rows.Count > 0)
        //    {
        //        foreach (DataRow row in ds.Tables[1].Rows)
        //        {
        //            childRow = new Dictionary<string, object>();
        //            foreach (DataColumn col in ds.Tables[1].Columns)
        //            {
        //                childRow.Add(col.ColumnName, row[col]);
        //            }
        //            parentRow.Add(childRow);
        //        }
        //    }
        //    return jsSerializer.Serialize(parentRow);

        //}

        //#endregion GetReviewCountforBubble
    }
}