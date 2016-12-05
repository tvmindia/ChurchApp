
#region CopyRight
/// Created By   : SHAMILA T P
/// Created date : Nov- 5- 2016
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

        //-------------* General  Methods *--------------//

        #region Delete From Server Folder
        [System.Web.Services.WebMethod]
        public static string DeleteFileFromFolder(string imgPath)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
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
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {

            }
            return "";
        }

        #endregion 

        //--------------- * Church Event Methods *-------------//

        #region LATEST Events

        //Top 5
        #region Get Events

        [System.Web.Services.WebMethod]
        public static string GetEvents(ChurchApp.DAL.Events EventsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            string jsonResult = null;
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    
                    DataSet ds = null;
                    EventsObj.churchId = UA.ChurchID;
                    ds = EventsObj.GetLatestEvents();

                    //Converting to Json
                   

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
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion Get Events   // TOP 5

        //All LATEST
        #region Get All Latest Events

        [System.Web.Services.WebMethod]
        public static string GetAllLatestEvents(ChurchApp.DAL.Events EventsObj)
        {
            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            string jsonResult = null;
            DataSet ds = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                EventsObj.churchId = UA.ChurchID;
                ds = EventsObj.GetAllLatestEvents();



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
           
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion Get All Latest Events //All Latest

        #endregion Latest Events

        #region OLD Events

        //Top 5
        #region Get Old Events

        [System.Web.Services.WebMethod]
        public static string GetOldEvents(ChurchApp.DAL.Events EventsObj)
        {
            DAL.Security.UserAuthendication UA;
            //Converting to Json
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            string jsonResult = null;
            DataSet ds = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    EventsObj.churchId = UA.ChurchID;
                    ds = EventsObj.SelectOldEvents();



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
               

            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion Get Old Events   // TOP 5

        //All OLD
        #region Get All Old Events

        [System.Web.Services.WebMethod]
        public static string GetAllOldEvents(ChurchApp.DAL.Events EventsObj)
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
                    DataSet ds = null;
                    EventsObj.churchId = UA.ChurchID;
                    ds = EventsObj.SelectAllOldEvents();
                    
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

            return jsSerializer.Serialize(parentRow);;
        }

        #endregion Get All Old Events   // TOP 5

        #endregion OLD Events

        #region Get Events By EventID

        [System.Web.Services.WebMethod]
        public static string GetEventsByEventID(ChurchApp.DAL.Events EventsObj)
        {
            DAL.Security.UserAuthendication UA;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            DataSet ds = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    //EventsObj.churchId = UA.ChurchID;
                    ds = EventsObj.GetEventsByEventID();

                    //Converting to Json


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
            catch(Exception ex)
            {

            }
             return jsSerializer.Serialize(parentRow);
        }

        #endregion Get Events By EventID

        #region Insert Event

        [System.Web.Services.WebMethod]
        public static string InsertEvent(ChurchApp.DAL.Events EventsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];

            EventsObj.churchId = UA.ChurchID;
            string status = null;
            try
            {
                EventsObj.createdBy = UA.userName;
                status = EventsObj.InsertEvent().ToString();
                EventsObj.Status = status;
            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(EventsObj);

        }


        #endregion Insert Event

        #region Update Event

        [System.Web.Services.WebMethod]
        public static string UpdateEvent(ChurchApp.DAL.Events EventsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            string status = null;
            DAL.Security.UserAuthendication UA;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    EventsObj.churchId = UA.ChurchID;
                    EventsObj.updatedBy = UA.userName;
                    status = EventsObj.UpdateEvent().ToString();
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
                status = "500";
            }            
            finally
            {
            }
            return jsSerializer.Serialize(status);

        }


        #endregion Update Event

        #region Delete Event

        [System.Web.Services.WebMethod]
        public static string DeleteEvent(ChurchApp.DAL.Events EventsObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;          
            string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    EventsObj.churchId = UA.ChurchID;
                    EventsObj.updatedBy = UA.userName;
                    status = EventsObj.DeleteEvent().ToString();
                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            return jsSerializer.Serialize(status);

        }


        #endregion Delete Event

        //-------------* AppImage  Methods *--------------//

        #region Delete App Image

        [System.Web.Services.WebMethod]
        public static string DeleteAppImage(ChurchApp.DAL.AppImages AppImgObj)
        {
            DAL.Security.UserAuthendication UA;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    status = AppImgObj.DeleteAppImage();
                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
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

        //-------------* Notification  Methods *--------------//
        #region Insert Notification

        [System.Web.Services.WebMethod]
        public static string InsertNotification(ChurchApp.DAL.Notification NotificationObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
               
            string status = null;
            try
            {
                 DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    NotificationObj.churchId = UA.ChurchID;
                    NotificationObj.createdBy = UA.userName;
                    status = NotificationObj.InsertNotification().ToString();
                }
                //Session is out
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception)
            {
                status = "500";//Exception of foreign key
            }
            finally
            {
            }
            // return jsSerializer.Serialize(NotificationObj);

            return status;
        }


        #endregion  Insert Notification


        #endregion Methods


    }
}