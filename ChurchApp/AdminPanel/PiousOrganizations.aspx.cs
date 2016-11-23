using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ChurchApp.AdminPanel
{
    public partial class PiousOrganizations : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }
        #region GetPatron DetailsAutocomplete
        /// <summary>
        /// Autocomplete textbox method which create string of priests
        /// </summary>
        /// <param name="PatrnObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetAllPatrons(PatronMaster PatrnObj)
        {
            DataSet dt = PatrnObj.SelectPatronMaster(); //Function call to get  Search BoxData
            StringBuilder output = new StringBuilder();
            output.Append("[");
            for (int i = 0; i < dt.Tables[0].Rows.Count; ++i)
            {
                output.Append("\"" + dt.Tables[0].Rows[i]["Name"].ToString() + "🏠" + dt.Tables[0].Rows[i]["ID"].ToString() + "\"");
                if (i != (dt.Tables[0].Rows.Count - 1))
                {
                    output.Append(",");
                }
            }
            output.Append("]");
            return output.ToString();
        }
        #endregion GetPatron DetailsAutocomplete

        #region Getmembers DetailsAutocomplete
        /// <summary>
        /// Autocomplete textbox method which create string of priests
        /// </summary>
        /// <param name="PatrnObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetAllmembers(Members memObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            memObj.churchId = UA.ChurchID;
            DataSet dt = memObj.SelectAllMembers(); //Function call to get  Search BoxData
            StringBuilder output = new StringBuilder();
            output.Append("[");
            for (int i = 0; i < dt.Tables[0].Rows.Count; ++i)
            {
                output.Append("\"" + dt.Tables[0].Rows[i]["FirstName"].ToString() + "🏠" + dt.Tables[0].Rows[i]["ID"].ToString() + "🏠" + dt.Tables[0].Rows[i]["Contact"].ToString() + "🏠" + dt.Tables[0].Rows[i]["URL"].ToString() + "\"");
                if (i != (dt.Tables[0].Rows.Count - 1))
                {
                    output.Append(",");
                }
            }
            output.Append("]");
            return output.ToString();
        }
        #endregion GetPatron DetailsAutocomplete

        #region GetPatronDetailsUsing ID
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="PatrnObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetPatronByID(PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            //PatrnObj.churchId = UA.ChurchID;

            if (PatrnObj.patronMasterId != "")
            {
                PatrnObj.SelectPatronByID();

            }
            return jsSerializer.Serialize(PatrnObj);
        }
        #endregion GetPatronDetailsUsing ID

        #region  Insert PiousOrg
        /// <summary>
        /// Insert Institution Details
        /// </summary>
        /// <param name="PiousObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string InsertPiousOrg(PiousOrg PiousObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            PiousObj.churchID = UA.ChurchID;
            string status = null;
            try
            {
                PiousObj.createdBy = UA.userName;
                status = PiousObj.InsertPiousOrg().ToString();
                PiousObj.results = status;

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(PiousObj);

        }

        #endregion Insert PiousOrg

        #region  Update Institution
        /// <summary>
        /// Update Institution Details
        /// </summary>
        /// <param name="PiousObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string UpdatePiousOrg(PiousOrg PiousObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            PiousObj.churchID = UA.ChurchID;
            string status = null;
            try
            {
                PiousObj.updatedBy = UA.userName;
                status = PiousObj.UpdatePiousOrg().ToString();
                PiousObj.results = status;

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(PiousObj);

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

        #region GetPuOrgList Details
        [System.Web.Services.WebMethod]
        public static string GetPuOrgList(PiousOrg PiousObj)
        {

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            PiousObj.churchID = UA.ChurchID;
            DataSet ds = null;
            ds = PiousObj.SelectPiousOrg();
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
        #endregion GetPuOrgList Details

        #region GetPatronDetailsUsing ID
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="PatrnObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetPiousOrgDetailsUsingID(PiousOrg PiousObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            //PatrnObj.churchId = UA.ChurchID;

            if (PiousObj.piousOrgID != "")
            {
                PiousObj.SelectOrganizationUsingID();

            }
            return jsSerializer.Serialize(PiousObj);
        }
        #endregion GetPatronDetailsUsing ID
    }
}