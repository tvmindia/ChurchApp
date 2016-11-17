
#region CopyRight
/// Created By   : SHAMILA T P
/// Created date : Nov- 11- 2016
#endregion CopyRight

#region Included Namespaces
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
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

        //-------------Patron 

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

        #region Add New Patron

        [System.Web.Services.WebMethod]
        public static string InsertPatron(ChurchApp.DAL.PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

           string status = null;
            try
            {
                PatrnObj.createdBy = UA.userName;
                status = PatrnObj.InsertPatronMaster();
                PatrnObj.Status = status;
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


        //----------- Novena

        #region GetNovenaDetailsByPatronID

        [System.Web.Services.WebMethod]
        public static string GetNovenasByPatronID(ChurchApp.DAL.Novenas NovenaObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            DataTable dt = null;
            try
            {
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
            try
            {
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

        #endregion Methods


    }
}