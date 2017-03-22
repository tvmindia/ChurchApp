using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ChurchApp.AdminPanel
{
    public partial class EducationForum : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        #region Methods

        #region LATEST Events
        #region Get Members

        [WebMethod(EnableSession = true)]
        public static string GetForumMembers(ChurchApp.DAL.EduForumMember forumMemberObj)
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
                    forumMemberObj.ChurchID = UA.ChurchID;
                    ds = forumMemberObj.SelectAllForumMembers();
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
            catch (Exception ex)
            {

            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion Get Members

        #region Get Response

        [WebMethod(EnableSession = true)]
        public static string GetEduResponse(ChurchApp.DAL.EduEventResponse forumResponseObj)
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
                    forumResponseObj.ChurchID = UA.ChurchID;
                    ds = forumResponseObj.SelectEduResponse();
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
            catch (Exception ex)
            {

            }
            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion Get Members

        #region Get Response Using EventID

        [WebMethod(EnableSession = true)]
        public static string GetResponseCountWithID(ChurchApp.DAL.EduEventResponse forumResponseObj)
        {
            DAL.Security.UserAuthendication UA;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    forumResponseObj.SelectCountsResponse();
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
            return jsSerializer.Serialize(forumResponseObj);
        }

        #endregion Get Response Using EventID

        //All LATEST
        #region Get All Latest Events

        [WebMethod(EnableSession = true)]
        public static string GetAllEduForumLatestEvents(ChurchApp.DAL.EducationForum eduForumEventsObj)
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
                    eduForumEventsObj.ChurchID = UA.ChurchID;
                    ds = eduForumEventsObj.GetAllLatestEduForumEvents();



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
            catch (Exception ex)
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

        [WebMethod(EnableSession = true)]
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
            catch (Exception ex)
            {

            }


            jsonResult = jsSerializer.Serialize(parentRow);

            return jsonResult;
        }

        #endregion Get Old Events   // TOP 5

        //All OLD
        #region Get All Old Events

        [WebMethod(EnableSession = true)]
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

            return jsSerializer.Serialize(parentRow); ;
        }

        #endregion Get All Old Events   // TOP 5

        #endregion OLD Events

        #region Get Events By EventID

        [WebMethod(EnableSession = true)]
        public static string GetEventsByEventID(ChurchApp.DAL.EducationForum eduForumEventsObj)
        {
            DAL.Security.UserAuthendication UA;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    eduForumEventsObj.GetEduForumEventsByEventID();
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
            return jsSerializer.Serialize(eduForumEventsObj);
        }

        #endregion Get Events By EventID

        #region Insert Event

        [WebMethod(EnableSession = true)]
        public static string InsertEduEvent(ChurchApp.DAL.EducationForum eduForumEventsObj)
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
                    eduForumEventsObj.ChurchID = UA.ChurchID;
                    eduForumEventsObj.CreatedBY = UA.userName;
                    status = eduForumEventsObj.InsertEduEventEvent();
                    eduForumEventsObj.Status = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception ex)
            {
                eduForumEventsObj.Status = ex.Message;
            }
            finally
            {
            }
            return jsSerializer.Serialize(eduForumEventsObj);

        }


        #endregion Insert Event

        #region Update Event

        [WebMethod(EnableSession = true)]
        public static string UpdateEduEvent(ChurchApp.DAL.EducationForum eduForumEventsObj)
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
                    eduForumEventsObj.ChurchID= UA.ChurchID;
                    eduForumEventsObj.UpdatedBy = UA.userName;
                    status = eduForumEventsObj.UpdateEduForumEvent();
                    eduForumEventsObj.Status = status;
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
                eduForumEventsObj.Status = ex.Message;
            }
            finally
            {
            }
            return jsSerializer.Serialize(eduForumEventsObj);

        }


        #endregion Update Event

        #region Delete Event

        [WebMethod(EnableSession = true)]
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
                    EventsObj.Status = status;
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
                EventsObj.Status = ex.Message;
            }
            finally
            {
            }
            return jsSerializer.Serialize(EventsObj);

        }


        #endregion Delete Event

        //-------------* AppImage  Methods *--------------//

        #region Delete App Image

        [WebMethod(EnableSession = true)]
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

        [WebMethod(EnableSession = true)]
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
                    NotificationObj.InsertNotification().ToString();
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
            return jsSerializer.Serialize(NotificationObj);

            //return status;
        }


        #endregion  Insert Notification


        #endregion Methods
    }
}