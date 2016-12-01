
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
using System.Web.UI;
using System.Web.UI.WebControls;
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
        [System.Web.Services.WebMethod]
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

        [System.Web.Services.WebMethod]
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

        [System.Web.Services.WebMethod]
        public static string GetAllPatronIdAndName(PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataSet ds = null;
            try
            {
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
            catch (Exception ex)
            {
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);


        }


        #endregion Get patron ID And Name

        #region Get All Patrons

        [System.Web.Services.WebMethod]
        public static string GetAllPatrons(PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataSet ds = null;
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                
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
            catch (Exception ex)
            {
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);


        }

        #endregion Get All Patrons


        #region SelectAllPatronMasterByChurchID
        [System.Web.Services.WebMethod]
        public static string SelectAllPatronMasterByChurchID(PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataSet ds = null;
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

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
            catch (Exception ex)
            {
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);


        }

        #endregion SelectAllPatronMasterByChurchID

        #region Add New Patron

        [System.Web.Services.WebMethod]
        public static string InsertPatron(ChurchApp.DAL.PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

          
            try
            {
                PatrnObj.createdBy = UA.userName;
                PatrnObj.InsertPatronMaster();
               
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(PatrnObj);

        }

        #endregion Add New Patron

        #region Delete Patron

        [System.Web.Services.WebMethod]
        public static string DeletePatron(ChurchApp.DAL.PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

           
            try
            {
             PatrnObj.DeletePatronMaster(UA.ChurchID);
                
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(PatrnObj);

        }


        #endregion Delete Patron

        #region Update Patron

        [System.Web.Services.WebMethod]
        public static string UpdatePatron(ChurchApp.DAL.PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string status = null;
            try
            {
                PatrnObj.updatedBy = UA.userName;
                status = PatrnObj.UpdatePatronMaster();
               
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(PatrnObj);

        }


        #endregion Update Patron

        //-------------- Novena

        #region GetNovenaDetailsByPatronID

        [System.Web.Services.WebMethod]
        public static string GetNovenasByPatronID(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataTable dt = null;

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            try
            {
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
            catch (Exception ex)
            {
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);
        }

        #endregion GetNovenaDetailsByPatronID



        #region GetNovenaDetailsByNovenaID

        [System.Web.Services.WebMethod]
        public static string GetNovenaDetailsByNovenaID(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataTable dt = null;

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];


            try
            {
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
            catch (Exception ex)
            {
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);
        }

        #endregion GetNovenaDetailsByNovenaID

        #region Add New Novena

        [System.Web.Services.WebMethod]
        public static string InsertNovena(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string status = null;
            try
            {
                NovenaObj.createdBy = UA.userName;
                NovenaObj.churchId = UA.ChurchID;
                status = NovenaObj.InsertNovena();
                NovenaObj.Status = status;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(NovenaObj);

        }

        #endregion Add New Novena

        #region Delete Novena 

        [System.Web.Services.WebMethod]
        public static string DeleteNovena(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string status = null;
            try
            {
                NovenaObj.churchId = UA.ChurchID;
                status = NovenaObj.DeleteNovena();
                NovenaObj.Status = status;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(NovenaObj);

        }


        #endregion Delete Novena 

        #region Update Novena

        [System.Web.Services.WebMethod]
        public static string UpdateNovena(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string status = null;
            try
            {
                NovenaObj.createdBy = UA.userName;
                NovenaObj.churchId = UA.ChurchID;
                status = NovenaObj.UpdateNovena();
                NovenaObj.Status = status;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(NovenaObj);
        }

        #endregion Update Novena

        //UpdateNovena

        //-------------- Novena Timing

        #region Add Novena Timing

        [System.Web.Services.WebMethod]
        public static string InsertNovenaTiming(ChurchApp.DAL.NovenaTiming NovenaTimingObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string status = null;
            try
            {
                NovenaTimingObj.createdBy = UA.userName;
                status = NovenaTimingObj.InsertNovenaTiming();
                //NovenaTimingObj.Status = status;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(NovenaTimingObj);

        }

        #endregion Add Novena Timing

        #region Delete Novena Timing (by NovenaID,Day And Time)

        [System.Web.Services.WebMethod]
        public static string DeleteNovenaTiming(ChurchApp.DAL.NovenaTiming NovenaTimingObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            string status = null;
            try
            {
                status = NovenaTimingObj.DeleteNovenaTimingByTimingDetails();
                NovenaTimingObj.Status = status;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(NovenaTimingObj);

        }


        #endregion Delete Novena Timing

        #region Delete Novena Timing By NovenaID

        [System.Web.Services.WebMethod]
        public static string DeleteNovenaTimingByNovenaID(ChurchApp.DAL.NovenaTiming NovenaTimingObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            string status = null;
            try
            {
                status = NovenaTimingObj.DeleteNovenaTimingsByNovenaID();
                NovenaTimingObj.Status = status;
            }
            catch (Exception)
            {
                throw;
            }
            finally
            {
            }
            return jsSerializer.Serialize(NovenaTimingObj);

        }

        #endregion Delete Novena Timing By NovenaID

        #region GetPatronDetailByID
        [System.Web.Services.WebMethod]
        public static string GetPatronDetailByID(PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataTable dt = null;

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            try
            {

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
            catch (Exception ex)
            {
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetPatronDetailByID

        #region GetAllNovenasByChurchID

        [System.Web.Services.WebMethod]
        public static string GetAllNovenasByChurchID(DAL.Novenas novenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataTable dt = null;

           
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                novenaObj.churchObj.churchId = UA.ChurchID;
                dt= novenaObj.GetAllNovenasByChurchID();
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
                throw ex;
            }
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetAllNovenasByChurchID

        #endregion Methods


    }
}