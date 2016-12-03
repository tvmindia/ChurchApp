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
        public string ChurchIDScript = null;

        #region Pageload
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                ChurchIDScript = null;
                ChurchIDScript = UA.ChurchID; 
            }
           catch(Exception ex)
            {
              
            }
        }
        #endregion Pageload

        #region WebMethod

        #region GetAllpriest Details
        [System.Web.Services.WebMethod]
        public static string GetPriestsDetails(Priest priestObj)
        {
            try
            {
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                priestObj.churchID = UA.ChurchID;


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
            catch(Exception ex)
            {
                return "";
            }
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
            try
            {
                DataTable dt = priestObj.SelectPriestsAutocomplete(); //Function call to get  Search BoxData
                StringBuilder output = new StringBuilder();
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
                return output.ToString();
            }
            catch(Exception ex)
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
        [System.Web.Services.WebMethod]
        public static string GetPriestsDetailsUsingPriestID(Priest priestObj)
        {
            try
            {
                ChurchApp.DAL.Church churchObj = new DAL.Church();
                JavaScriptSerializer jsSerializer = new JavaScriptSerializer();

                if (priestObj.priestID != "")
                {
                    priestObj.SelectPriestsUsingPriestID();

                }
                return jsSerializer.Serialize(priestObj);
            }
            catch(Exception ex)
            {
                return "";
            }
            
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
            try
            {
                PriestObj.createdBy =UA.userName;
                PriestObj.InsertPriest();
               
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
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            PriestObj.churchID = UA.ChurchID;
            //string status = null;
            try
            {
                PriestObj.createdBy = UA.userName;
                PriestObj.UpdatePriest();

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
        [System.Web.Services.WebMethod]
        public static string DeletePriest(ChurchApp.DAL.Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
             DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            try
            {
                PriestObj.createdBy = UA.userName;
                PriestObj.DeletePriest();

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
        [System.Web.Services.WebMethod]
        public static string UpdateChurchIDPriest(ChurchApp.DAL.Priest PriestObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            DAL.Security.UserAuthendication UA;
            DAL.Const Const = new DAL.Const();
            UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
            string status = null;
            try
            {
                //PriestObj.Status
                if (PriestObj.Status=="Asst")
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