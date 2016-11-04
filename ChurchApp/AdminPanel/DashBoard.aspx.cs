using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ChurchApp.AdminPanel
{
    public partial class DashBoard : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if ((Request.QueryString["Session"] != null) && (Request.QueryString["Session"] != ""))
            {
                DAL.Church churchObj = new DAL.Church();
                DataTable ds;
                DAL.Security.UserAuthendication UA;
                DAL.Const Const = new DAL.Const();
                UA = (DAL.Security.UserAuthendication)HttpContext.Current.Session[Const.LoginSession];
                string churchID = Request.QueryString["Session"].ToString();
                churchObj.churchId = churchID;
                ds = churchObj.GetChurchDetailsByChurchID();
                if (ds.Rows.Count > 0)
                {
                    DataRow dr = ds.Rows[0];
                    string ChurchName = dr["Name"].ToString();

                    DAL.Security.UserAuthendication UA_Changed = new DAL.Security.UserAuthendication(UA.userName, churchID, ChurchName, UA.Role);
                    if (UA_Changed.ValidUser)
                    {
                        Session[Const.LoginSession] = UA_Changed;
                    }
                    Response.Redirect("/AdminPanel/DashBoard.aspx");
                }
            }
        }
    }
}