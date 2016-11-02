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
    public partial class Priests : System.Web.UI.Page
    {
        
        protected void Page_Load(object sender, EventArgs e)
        {
          
        }
        #region GetAllProductMainImages
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
               // productObj.BoutiqueID = UA.BoutiqueID;
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
        #endregion GetAllProductMainImages

        #region GetPriestUsingPriestID
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
    }
}