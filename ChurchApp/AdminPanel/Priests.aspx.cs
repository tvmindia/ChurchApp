#region Author
//CreatedBy: Thomson Varkey
//CreatedOn: 04-11-2016
#endregion Author
#region Namespace
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Web.Script.Serialization;
using System.Web.Services;

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
        [WebMethod(EnableSession = true)]
        public static string GetPriestsDetails(Priest priestObj)
        {
            
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                Security.UserAuthendication UA = null;
               
                List<Dictionary<string, object>> parentRow = new List<Dictionary<string, object>>();
                Dictionary<string, object> childRow;
                try
                {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if(UA!=null)
                {
                    priestObj.churchID = UA.ChurchID;


                    if (priestObj.churchID != "")
                    {
                        // productObj.ChurchID = UA.ChurchID;
                        DataSet ds = null;
                        ds = priestObj.SelectPriests();

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
                    
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
                
            }
            catch(Exception)
            {
                return "";
            }
            return jsSerializer.Serialize(parentRow);
        }
        #endregion GetAllpriest Details

        #region Getpriest DetailsAutocomplete
        /// <summary>
        /// Autocomplete textbox method which create string of priests
        /// </summary>
        /// <param name="priestObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string GetPriest(Priest priestObj)
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
                    DataTable dt = priestObj.SelectPriestsAutocomplete(); //Function call to get  Search BoxData

                    output.Append("[");
                    for (int i = 0; i < dt.Rows.Count; ++i)
                    {
                        output.Append("\"" + dt.Rows[i]["Name"].ToString() + "🏠" + dt.Rows[i]["ID"].ToString() + "\"");
                        if (i != (dt.Rows.Count - 1))
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
                return output.ToString();
            }
            catch(Exception)
            {
                return "";
            }
            
        }
        #endregion GetAllpriest DetailsAutocomplete

        #region GetPriestUsingPriestID
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="priestObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string GetPriestsDetailsUsingPriestID(Priest priestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    ChurchApp.DAL.Church churchObj = new DAL.Church();


                    if (priestObj.priestID != "")
                    {
                        priestObj.SelectPriestsUsingPriestID();

                    }
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
                return jsSerializer.Serialize(priestObj);
            }
            catch(Exception)
            {
                return "";
            }
            
        }
        #endregion GetPriestUsingPriestID

        #region VicarExistornot
        /// <summary>
        /// Get Priest Details Using priestID
        /// </summary>
        /// <param name="priestObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string VicarExistornot(Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    PriestObj.churchID = UA.ChurchID;
                    PriestObj.VicarExistornot();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
                return jsSerializer.Serialize(PriestObj);
            }
            catch (Exception)
            {
                return "";
            }

        }
        #endregion VicarExistornot

        #region  Insert Priest
        /// <summary>
        /// Insert Priest Details
        /// </summary>
        /// <param name="PriestObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string InsertPriest(ChurchApp.DAL.Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
                      
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    PriestObj.churchID = UA.ChurchID;
                    PriestObj.createdBy = UA.userName;
                    PriestObj.InsertPriest();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }
                return jsSerializer.Serialize(PriestObj);
            }
            catch (Exception ex)
            {
                PriestObj.result = ex.Message;//Exception
                return jsSerializer.Serialize(PriestObj);
            }
            finally
            {
            }
            

        }

        #endregion Insert Priest

        #region  Update Priest
        /// <summary>
        /// Update Priest Details
        /// </summary>
        /// <param name="PriestObj"></param>
        /// <returns></returns>
        [WebMethod(EnableSession = true)]
        public static string UpdatePriest(ChurchApp.DAL.Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            //string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    PriestObj.churchID = UA.ChurchID;
                    PriestObj.createdBy = UA.userName;
                    PriestObj.UpdatePriest();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception ex)
            {
                PriestObj.result = ex.Message;//Exception
                return jsSerializer.Serialize(PriestObj);
            }
            finally
            {
            }
            return jsSerializer.Serialize(PriestObj);

        }

        #endregion Update Priest

        #region DeletePriest
        [WebMethod(EnableSession = true)]
        public static string DeletePriest(ChurchApp.DAL.Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            //string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    PriestObj.createdBy = UA.userName;
                    PriestObj.DeletePriest();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception ex)
            {
                PriestObj.result = ex.Message;//Exception
                return jsSerializer.Serialize(PriestObj);
            }
            finally
            {
            }
            return jsSerializer.Serialize(PriestObj);

        }
        #endregion DeletePriest

        #region DeletePriest
        [WebMethod(EnableSession = true)]
        public static string UpdateChurchIDPriest(ChurchApp.DAL.Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            Security.UserAuthendication UA = null;
            //string status = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {
                    //PriestObj.Status
                    if (PriestObj.Status == "Asst")
                    {
                        PriestObj.Status = "Asst Vicar";
                    }
                    if (PriestObj.Status == "Vicar")
                    {
                        PriestObj.Status = "Vicar";
                    }
                    PriestObj.churchID = UA.ChurchID;
                    PriestObj.createdBy = UA.userName;
                    PriestObj.UpdateChurchIDPriest();
                }
                else
                {
                    Common comonObj = new Common();
                    return jsSerializer.Serialize(comonObj.RedirctCurrentRequest());
                }

            }
            catch (Exception ex)
            {
                PriestObj.result = ex.Message;//Exception
                return jsSerializer.Serialize(PriestObj);
            }
            finally
            {
            }
            return jsSerializer.Serialize(PriestObj);

        }
        #endregion DeletePriest
        #endregion WebMethod
    }
}
#endregion MainClass