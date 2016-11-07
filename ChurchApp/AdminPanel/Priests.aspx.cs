#region Author
//CreatedBy: Thomson Varkey
//CreatedOn: 04-11-2016
#endregion Author
#region Namespace
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
#endregion Namespace
#region MainClass
namespace ChurchApp.AdminPanel
{
    public partial class Priests : System.Web.UI.Page
    {

        #region Pageload
        protected void Page_Load(object sender, EventArgs e)
        {
          
        }
        #endregion Pageload

        #region WebMethod

        #region GetAllpriest Details
        [System.Web.Services.WebMethod]
        public static string GetPriestsDetails(Priest priestObj)
        {
        //    DAL.Security.UserAuthendication UA;
        //    UIClasses.Const Const = new UIClasses.Const();
        //    UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            if (priestObj.churchID != "")
            {
               // productObj.ChurchID = UA.ChurchID;
                DataSet ds = null;
                ds = priestObj.SelectPriests();
               
          


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
            return jsSerializer.Serialize("");
        }
        #endregion GetAllpriest Details

        #region Getpriest DetailsAutocomplete
        /// <summary>
        /// Autocomplete textbox method which create string of priests
        /// </summary>
        /// <param name="priestObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetPriest(Priest priestObj)
        {
            DataTable dt = priestObj.SelectPriestsAutocomplete(); //Function call to get  Search BoxData
            StringBuilder output = new StringBuilder();
            output.Append("[");
            for (int i = 0; i < dt.Rows.Count; ++i)
            {
                output.Append("\"" + dt.Rows[i]["Name"].ToString() + "🏠" + dt.Rows[i]["ID"].ToString() +"\"");
                if (i != (dt.Rows.Count - 1))
                {
                    output.Append(",");
                }
            }
            output.Append("]");
            return output.ToString();
        }
        #endregion GetAllpriest DetailsAutocomplete

        #region GetPriestUsingPriestID
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="priestObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string GetPriestsDetailsUsingPriestID(Priest priestObj)
        {
            //    DAL.Security.UserAuthendication UA;
            //    UIClasses.Const Const = new UIClasses.Const();
            //    UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            ChurchApp.DAL.Church churchObj = new DAL.Church();
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            if (priestObj.priestID != "")
            {
                priestObj.SelectPriestsUsingPriestID();

            }
            return jsSerializer.Serialize(priestObj);
        }
        #endregion GetPriestUsingPriestID

        #region  Insert Priest
        /// <summary>
        /// Insert Priest Details
        /// </summary>
        /// <param name="PriestObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string InsertPriest(ChurchApp.DAL.Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            PriestObj.churchID = UA.ChurchID;
            //  NoticeObj.noticeId = "1817569f-5375-4e96-b734-7f3e82801b31";
            string status = null;
            try
            {
                PriestObj.createdBy = "Thomson";
                status = PriestObj.InsertPriest().ToString();
                PriestObj.result = status;
               
            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(PriestObj);

        }

        #endregion Insert Priest

        #region  Update Priest
        /// <summary>
        /// Update Priest Details
        /// </summary>
        /// <param name="PriestObj"></param>
        /// <returns></returns>
        [System.Web.Services.WebMethod]
        public static string UpdatePriest(ChurchApp.DAL.Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            PriestObj.churchID = "99311E06-65DD-471E-904E-04702F2C4FB0";
            //  NoticeObj.noticeId = "1817569f-5375-4e96-b734-7f3e82801b31";
            string status = null;
            try
            {
                PriestObj.createdBy = "Thomson";
                status = PriestObj.UpdatePriest().ToString();
                PriestObj.result = status;

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(PriestObj);

        }

        #endregion Update Priest
        #endregion WebMethod
    }
}
#endregion MainClass