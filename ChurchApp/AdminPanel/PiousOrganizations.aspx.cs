using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Web.Script.Serialization;
using System.Web.Services;

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
        [WebMethod(EnableSession = true)]
        public static string GetAllPatrons(PatronMaster PatrnObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            StringBuilder output = new StringBuilder();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    DataSet dt = PatrnObj.SelectPatronMaster(); //Function call to get  Search BoxData
                    
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
            
            return output.ToString();
        }
        #endregion GetPatron DetailsAutocomplete

        #region Getmembers DetailsAutocomplete
        /// <summary>
        /// Autocomplete textbox method which create string of priests
        /// </summary>
        /// <param name="PatrnObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string GetAllmembers(Members memObj)
        {
            
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            StringBuilder output = new StringBuilder();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    memObj.churchId = UA.ChurchID;
                    DataSet dt = memObj.SelectAllMembers(); //Function call to get  Search BoxData

                    output.Append("[");
                    for (int i = 0; i < dt.Tables[0].Rows.Count; ++i)
                    {
                        output.Append("\"" + dt.Tables[0].Rows[i]["FirstName"].ToString() + "🏠" + dt.Tables[0].Rows[i]["ID"].ToString() + "🏠" + dt.Tables[0].Rows[i]["Contact"].ToString() + "🏠" + dt.Tables[0].Rows[i]["URL"].ToString() + "🏠" + dt.Tables[0].Rows[i]["ImageID"].ToString() + "\"");
                        if (i != (dt.Tables[0].Rows.Count - 1))
                        {
                            output.Append(",");
                        }
                    }
                    output.Append("]");
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
                  
            return output.ToString();
        }
        #endregion GetPatron DetailsAutocomplete

        #region GetPatronDetailsUsing ID
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="PatrnObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string GetPatronByID(PatronMaster PatrnObj)
        {
            
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    if (PatrnObj.patronMasterId != "")
                    {
                        PatrnObj.SelectPatronByID();
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
                    
            return jsSerializer.Serialize(PatrnObj);
        }
        #endregion GetPatronDetailsUsing ID

        #region  Insert PiousOrg
        /// <summary>
        /// Insert Institution Details
        /// </summary>
        /// <param name="PiousObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string InsertPiousOrg(PiousOrg PiousObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();           
            string status = null;
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    PiousObj.churchID = UA.ChurchID;
                    PiousObj.createdBy = UA.userName;
                    status = PiousObj.InsertPiousOrg().ToString();
                    PiousObj.results = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception ex)
            {
                PiousObj.results = ex.Message;
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
        [WebMethod(EnableSession = true)]
        public static string UpdatePiousOrg(PiousOrg PiousObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();           
            string status = null;
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    if (PiousObj.PatronID == "")
                    {
                        PiousObj.PatronID = null;
                    }
                    PiousObj.churchID = UA.ChurchID;
                    PiousObj.updatedBy = UA.userName;
                    status = PiousObj.UpdatePiousOrg().ToString();
                    PiousObj.results = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception ex)
            {
                PiousObj.results = ex.Message;
            }
            finally
            {
            }
            return jsSerializer.Serialize(PiousObj);

        }

        #endregion Update Institution

        #region DeleteInstitution
        [WebMethod(EnableSession = true)]
        public static string DeleteInstitution(PiousOrg PiousObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();           
            string status = null;
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    PiousObj.churchID = UA.ChurchID;
                    status = PiousObj.DeletePiousOrg();
                    PiousObj.results = status;
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
            }
            catch(Exception ex)
            {
                PiousObj.results = ex.Message;
            }
            
            return jsSerializer.Serialize(PiousObj);
        }

        #endregion DeleteInstitution

        #region GetPuOrgList Details
        [WebMethod(EnableSession = true)]
        public static string GetPuOrgList(PiousOrg PiousObj)
        {
            List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
            Dictionary<string, object> childRow;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    PiousObj.churchID = UA.ChurchID;
                    DataSet ds = null;
                    ds = PiousObj.SelectPiousOrg();
                    

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
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetPuOrgList Details

        #region GetPiousOrgDetailsUsingID ID
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="PatrnObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string GetPiousOrgDetailsUsingID(PiousOrg PiousObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
             Security.UserAuthendication UA = null;
             try
             {
                 DashBoard dashBoardObj = new DashBoard();
                 UA = dashBoardObj.GetCurrentUserSession();
                 if (UA != null)
                 {
                     if (PiousObj.piousOrgID != "")
                     {
                         PiousObj.SelectOrganizationUsingID();

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
                 PiousObj.results = ex.Message;
             }
            //PatrnObj.churchId = UA.ChurchID;

            
            return jsSerializer.Serialize(PiousObj);
        }
        #endregion GetPiousOrgDetailsUsingID ID
    }
}