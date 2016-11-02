
#region CopyRight
/// Created By   : SHAMILA T P
/// Created date : Oct- 29- 2016
#endregion CopyRight

#region Included Namespaces
using System;
using System.Collections;
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

        #region Image Upload

        protected void UploadFile(object sender, EventArgs e)
        {
           // string fileName = Path.GetFileName(UpNotice.FileName);
            //UpNotice.PostedFile.SaveAs(Server.MapPath("~/img/gallery") + fileName);
           
        }

        #endregion Image Upload

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

          //  NoticeObj.noticeId = "1817569f-5375-4e96-b734-7f3e82801b31";
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
          //  NoticeObj.noticeId = "1817569f-5375-4e96-b734-7f3e82801b31";
            string status = null;
            try
            {
                //if (NoticeObj.noticeId == string.Empty || NoticeObj.noticeId == null )
                //{
                    NoticeObj.createdBy = "Shamila";
                    status = NoticeObj.InsertNotice().ToString();
                 //}

                //else
                //{
                //    NoticeObj.updatedBy = "Shamila";
                //    status = NoticeObj.UpdateNotice().ToString();
                //}
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


        #region  Update Notice

        [System.Web.Services.WebMethod]
        public static string UpdateNotice(ChurchApp.DAL.Notices NoticeObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            NoticeObj.churchId = "99311E06-65DD-471E-904E-04702F2C4FB0";
            //  NoticeObj.noticeId = "1817569f-5375-4e96-b734-7f3e82801b31";
            string status = null;
            try
            {
                NoticeObj.updatedBy = "Shamila";
                status = NoticeObj.UpdateNotice().ToString();
                
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

        #endregion Update Notice

        #region  Get Server Map Path

        [System.Web.Services.WebMethod]
        public static string GetServerMapPath(string Path)
        {
           string ServerPath = HttpContext.Current.Server.MapPath("~/img/" + Path);
            return ServerPath;

        }

        #endregion Get Server Map Path

        #region  Insert App Image

        [System.Web.Services.WebMethod]
        public static string InsertAppImage(ChurchApp.DAL.AppImages AppImgObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            string status = null;
            try
            {
                AppImgObj.createdBy = "Shamila";
                status = AppImgObj.InsertAppImage();
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

        #endregion Insert App Image

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

        #region Delete From Server Folder

        public static void DeleteFileFromFolder(string imgPath)
        {
            FileInfo file = new FileInfo(imgPath);
            if (file.Exists)
            {
                file.Delete();
            }
        }

        #endregion 

        #region Delete Notice 

        [System.Web.Services.WebMethod]
        public static string DeleteNotice(ChurchApp.DAL.Notices NoticeObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            NoticeObj.churchId = "99311E06-65DD-471E-904E-04702F2C4FB0";
            //  NoticeObj.noticeId = "1817569f-5375-4e96-b734-7f3e82801b31";
            string status = null;
            try
            {
                if (NoticeObj.noticeId != string.Empty || NoticeObj.noticeId != null)
                {
                   status = NoticeObj.DeleteNotice().ToString();
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


        #endregion Delete Notice

        #endregion Methods

    }
}