using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace ChurchApp.Master
{
    public partial class AdminLayout : System.Web.UI.MasterPage
    {
        DAL.Security.UserAuthendication UA;
        DAL.Const Const = new DAL.Const();

        protected void Page_Init(object sender, EventArgs e)
        {

            UA = (DAL.Security.UserAuthendication)Session[Const.LoginSession];

            if (UA == null)
            {
                Response.Redirect(Const.LoginPageURL);

            }
            lblChurchName.Text = UA.Church;
            lblChurch.Text = UA.Church;
            AccessCheck();

            if (UA.Role == Const.SuperAdministrator)
            {
                Li_DashBoard.Visible = true;
                ChurchApp.DAL.Church churchObj = new ChurchApp.DAL.Church();
                LIChurches.Visible = true;
                DataSet ds = new DataSet();
                ds = churchObj.SelectChurches();
                foreach (DataRow dr in ds.Tables[0].Rows)
                {
                    HtmlGenericControl liElement = new HtmlGenericControl("li");
                    ChurchList.Controls.Add(liElement);
                    HtmlGenericControl anchor = new HtmlGenericControl("a");
                    anchor.Attributes.Add("href", "../AdminPanel/DashBoard.aspx?Session=" + dr["ID"].ToString());
                    anchor.InnerHtml = "" + dr["Name"].ToString();
                    liElement.Controls.Add(anchor);

                }


            }

        }

        protected void Page_Load(object sender, EventArgs e)
        {

        }
        public void AccessCheck()
        {

            try
            {
            string currRole = UA.Role;
            string currPage = Const.GetCurrentPageName(Request);


            if (currRole != Const.SuperAdministrator)
            {
                Li_DashBoard.Visible = false;
                if (currPage.ToUpper() == Const.DashBoardPage.ToUpper())
                {

                    Response.Redirect(Const.LoginPage);

                }

            }
            }
            catch(Exception ex)
            {

            }
    }
    }
}