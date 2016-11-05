
#region CopyRight
/// Created By   : SHAMILA T P
/// Created date : Nov- 5- 2016
#endregion CopyRight

#region Included Namespaces
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
    public partial class Events : System.Web.UI.Page
    {
        #region Global Variables

        #endregion  Global Variables

        #region Events

        #region Page Load
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #endregion  Page Load
       
        #endregion  Events

        #region Methods

        //--------------- * General Methods *-------------//

        //--------------- * Church Event Methods *-------------//

        #region Get Events

        [System.Web.Services.WebMethod]
        public static string GetEvents(ChurchApp.DAL.Events EventsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string jsonResult = null;
            DataSet ds = null;
            EventsObj.churchId = UA.ChurchID;
            ds = EventsObj.SelectEvents();

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

            return jsonResult;
        }

        #endregion Get Events

        #region Get Events By EventID

        [System.Web.Services.WebMethod]
        public static string GetEventsByEventID(ChurchApp.DAL.Events EventsObj)
        {
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string jsonResult = null;
            DataSet ds = null;
            //EventsObj.churchId = UA.ChurchID;
            ds = EventsObj.GetEventsByEventID();

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

            return jsonResult;
        }

        #endregion Get Events By EventID

        #endregion Methods


    }
}