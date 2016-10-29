
#region CopyRight
/// Created By   : SHAMILA T P
/// Created date : Oct- 29- 2016
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
    public partial class Notices : System.Web.UI.Page
    {
        #region Global Variables

        #endregion Global Variables

        #region Events

        #region Page Load 
        
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        #endregion Page Load

        #endregion Events

        #region Methods

        #region Get Notice Types

        [System.Web.Services.WebMethod]
        public static string GetNoticeTypes(ChurchApp.DAL.NoticeType NoticeTypeObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            ds = NoticeTypeObj.SelectNoticeType();

            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            //       if (ds.Tables[0] != null)
            //{

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
            //}
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }


        #endregion Get Notice Types

        #region Get Notices

        [System.Web.Services.WebMethod]
        public static string GetNotices(ChurchApp.DAL.Notices  NoticeObj)
        {
            string jsonResult = null;
            DataSet ds = null;
            NoticeObj.churchId = "99311E06-65DD-471E-904E-04702F2C4FB0";
            ds = NoticeObj.SelectNotices();

            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            //       if (ds.Tables[0] != null)
            //{

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
            //}
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion Get Notices

        #region Get Notice By NoticeID

        [System.Web.Services.WebMethod]
        public static string GetNoticeDetailsByNoticeID(ChurchApp.DAL.Notices NoticeObj)
        {
            string jsonResult = null;
            DataSet ds = null;

            NoticeObj.noticeId = "1817569f-5375-4e96-b734-7f3e82801b31";
            ds = NoticeObj.GetNoticesByNoticeID();

            

            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            //       if (ds.Tables[0] != null)
            //{

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
            //}
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }


        #endregion  Get Notice By NoticeID

        #region  Insert Notice

        [System.Web.Services.WebMethod]
        public static string InsertNotice(ChurchApp.DAL.Notices NoticeObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            NoticeObj.churchId = "99311E06-65DD-471E-904E-04702F2C4FB0";
            NoticeObj.createdBy = "Shamila";
            string status = null;
            try
            {
                if (NoticeObj.churchId != string.Empty || NoticeObj.churchId != null)
                {
                    status = NoticeObj.InsertNotice().ToString();
                 }
             }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(NoticeObj);
            
        }

        #endregion Insert Notice

        #endregion Methods

    }
}