
#region CopyRight
/// Created By   : SHAMILA T P
/// Created date : Nov- 11- 2016
#endregion CopyRight

#region Included Namespaces
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;

#endregion Included Namespaces

namespace ChurchApp.AdminPanel
{
    public partial class Novenas : System.Web.UI.Page
    {
        #region Events

        #region Page Load

        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #endregion Page Load

        #endregion Events

        #region Methods

        //-------------* General  Methods *--------------//

        #region Delete From Server Folder
        [WebMethod(EnableSession = true)]
        public static void DeleteFileFromFolder(string imgPath)
        {
            if (imgPath.Contains('/'))
            {
                string imgName = imgPath.Split('/').Last();

                string ServerPath = HttpContext.Current.Server.MapPath("~/img/AppImages/" + imgName);

                FileInfo file = new FileInfo(ServerPath);
                if (file.Exists)
                {
                    file.Delete();
                }

            }
        }

        #endregion 

        //-------------* AppImage  Methods *--------------//

        #region Delete App Image

        [WebMethod(EnableSession = true)]
        public static string DeleteAppImage(ChurchApp.DAL.AppImages AppImgObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            string status = null;
            try
            {
                status = AppImgObj.DeleteAppImage();
            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(AppImgObj);

        }


        #endregion Delete App Image

        //-------------- Patron 

        #region Get patron ID And Name (To Bind Patron Dropdown)

        [WebMethod(EnableSession = true)]
        public static string GetAllPatronIdAndName(PatronMaster PatrnObj)
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
                    ds = PatrnObj.GetPatronIDAndName();
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
                throw ex;
            }

            return jsSerializer.Serialize(parentRow);
       }


        #endregion Get patron ID And Name

        #region Get All Patrons

        [WebMethod(EnableSession = true)]
        public static string GetAllPatrons(PatronMaster PatrnObj)
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
                    PatrnObj.churchObj.churchId = UA.ChurchID;
                    ds = PatrnObj.SelectPatronMaster();
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
                throw ex;
            }

            return jsSerializer.Serialize(parentRow);
         }

        #endregion Get All Patrons


        #region SelectAllPatronMasterByChurchID
        [WebMethod(EnableSession = true)]
        public static string SelectAllPatronMasterByChurchID(PatronMaster PatrnObj)
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
                    PatrnObj.churchObj.churchId = UA.ChurchID;
                    ds = PatrnObj.SelectAllPatronMasterByChurchID();  
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
                throw ex;
            }

            return jsSerializer.Serialize(parentRow);
  }

        #endregion SelectAllPatronMasterByChurchID

        #region Add New Patron

        [WebMethod(EnableSession = true)]
        public static string InsertPatron(ChurchApp.DAL.PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {

                    PatrnObj.createdBy = UA.userName;
                    PatrnObj.InsertPatronMaster();
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
                PatrnObj.status = ex.Message;

            }

            return jsSerializer.Serialize(PatrnObj);
          

        }

        #endregion Add New Patron

        #region Delete Patron

        [WebMethod(EnableSession = true)]
        public static string DeletePatron(ChurchApp.DAL.PatronMaster PatrnObj)
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
                    if ((PatrnObj.imageID != null) && (PatrnObj.imageID != ""))
                    {
                        //overwrite appImagesObj.appImageId to townObj.imageId
                        PatrnObj.appImagesObj.appImageId = PatrnObj.imageID;
                        PatrnObj.appImagesObj.SelectAppImageByID();
                    }

                    PatrnObj.DeletePatronMaster();
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
                PatrnObj.status = ex.Message;

            }

            return jsSerializer.Serialize(PatrnObj);
        }


        #endregion Delete Patron

        #region Update Patron

        [WebMethod(EnableSession = true)]
        public static string UpdatePatron(ChurchApp.DAL.PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                string status = null;
                if (UA != null)
                {

                    PatrnObj.updatedBy = UA.userName;
                    status = PatrnObj.UpdatePatronMaster();
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
                PatrnObj.status = ex.Message;

            }

            return jsSerializer.Serialize(PatrnObj);
           
     
        }


        #endregion Update Patron

        //-------------- Novena

        #region GetNovenaDetailsByPatronID

        [WebMethod(EnableSession = true)]
        public static string GetNovenasByPatronID(ChurchApp.DAL.Novenas NovenaObj)
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
                    NovenaObj.churchId = UA.ChurchID;
                    dt = NovenaObj.GetNovenaDetailsByPatronID();
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
                throw ex;
            }


            return jsSerializer.Serialize(parentRow);
     
        }

        #endregion GetNovenaDetailsByPatronID



        #region GetNovenaDetailsByNovenaID

        [WebMethod(EnableSession = true)]
        public static string GetNovenaDetailsByNovenaID(ChurchApp.DAL.Novenas NovenaObj)
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
                    NovenaObj.churchId = UA.ChurchID;

                    dt = NovenaObj.GetNovenaDetailsByNovenaID();
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
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);
           
        }

        #endregion GetNovenaDetailsByNovenaID

        #region Add New Novena

        [WebMethod(EnableSession = true)]
        public static string InsertNovena(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                
                if (UA != null)
                {

                    NovenaObj.createdBy = UA.userName;
                    NovenaObj.churchId = UA.ChurchID;
                    NovenaObj.status = NovenaObj.InsertNovena();
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
                NovenaObj.status = ex.Message;

            }

            return jsSerializer.Serialize(NovenaObj);
            

        }

        #endregion Add New Novena

        #region Delete Novena 

        [WebMethod(EnableSession = true)]
        public static string DeleteNovena(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
               
                if (UA != null)
                {

                    NovenaObj.churchId = UA.ChurchID;
                    NovenaObj.status = NovenaObj.DeleteNovena();
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
                NovenaObj.status = ex.Message;

            }

            return jsSerializer.Serialize(NovenaObj);
            

          

        }


        #endregion Delete Novena 

        #region Update Novena

        [WebMethod(EnableSession = true)]
        public static string UpdateNovena(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
               
                if (UA != null)
                {

                    NovenaObj.createdBy = UA.userName;
                    NovenaObj.churchId = UA.ChurchID;

                    NovenaObj.status = NovenaObj.UpdateNovena();
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
                NovenaObj.status = ex.Message;

            }

            return jsSerializer.Serialize(NovenaObj);
           
        }

        #endregion Update Novena

        //UpdateNovena

        //-------------- Novena Timing

        #region Add Novena Timing

        [WebMethod(EnableSession = true)]
        public static string InsertNovenaTiming(ChurchApp.DAL.NovenaTiming NovenaTimingObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
               
                if (UA != null)
                {
                    NovenaTimingObj.createdBy = UA.userName;
                    NovenaTimingObj.status = NovenaTimingObj.InsertNovenaTiming();
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
                NovenaTimingObj.status = ex.Message;

            }

            return jsSerializer.Serialize(NovenaTimingObj);
         }

        #endregion Add Novena Timing

        #region Delete Novena Timing (by NovenaID,Day And Time)

        [WebMethod(EnableSession = true)]
        public static string DeleteNovenaTiming(ChurchApp.DAL.NovenaTiming NovenaTimingObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
               
                if (UA != null)
                {

                    NovenaTimingObj.status = NovenaTimingObj.DeleteNovenaTimingByTimingDetails();
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
                NovenaTimingObj.status = ex.Message;

            }

            return jsSerializer.Serialize(NovenaTimingObj);
           

        }


        #endregion Delete Novena Timing

        #region Delete Novena Timing By NovenaID

        [WebMethod(EnableSession = true)]
        public static string DeleteNovenaTimingByNovenaID(ChurchApp.DAL.NovenaTiming NovenaTimingObj)
        {

            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
              
                if (UA != null)
                {

                    NovenaTimingObj.status = NovenaTimingObj.DeleteNovenaTimingsByNovenaID();
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
                NovenaTimingObj.status = ex.Message;

            }

            return jsSerializer.Serialize(NovenaTimingObj);
           
          

        }

        #endregion Delete Novena Timing By NovenaID

        #region GetPatronDetailByID
        [WebMethod(EnableSession = true)]
        public static string GetPatronDetailByID(PatronMaster PatrnObj)
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
                    dt = PatrnObj.GetPatronDetailByID();
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
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);

        
        }
        #endregion GetPatronDetailByID

        #region GetAllNovenasByChurchID

        [WebMethod(EnableSession = true)]
        public static string GetAllNovenasByChurchID(DAL.Novenas novenaObj)
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
                    novenaObj.churchObj.churchId = UA.ChurchID;
                    dt = novenaObj.GetAllNovenasByChurchID();
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
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetAllNovenasByChurchID

        #endregion Methods


    }
}