using ChurchApp.AdminPanel;
using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
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
            //lblChurchName.Text = UA.Church;
            lblChurch.Text = UA.Church;
            hdfchid.Value = UA.ChurchID;
            AccessCheck();

            if (UA.Role == Const.SuperAdministrator)
            {
                //Li_DashBoard.Visible = true;
                //ChurchApp.DAL.Church churchObj = new ChurchApp.DAL.Church();
                LIChurches.Visible = true;
                
                //DataSet ds = new DataSet();
                //ds = churchObj.SelectChurches();
                //foreach (DataRow dr in ds.Tables[0].Rows)
                //{
                //    HtmlGenericControl liElement = new HtmlGenericControl("li");
                //    ChurchList.Controls.Add(liElement);
                //    HtmlGenericControl anchor = new HtmlGenericControl("a");
                //    anchor.Attributes.Add("href", "../AdminPanel/DashBoard.aspx?Session=" + dr["ID"].ToString());
                //    anchor.InnerHtml = "" + dr["Name"].ToString();
                //    liElement.Controls.Add(anchor);

                //}

                
            }
            else
            {
                LIChurches.Visible = false;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            LoginName.Text = UA.userName;
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
                Li_BugTracker.Visible = false;
                if (currPage.ToUpper() == Const.DashBoardPage.ToUpper())
                {

                    Response.Redirect(Const.LoginPage);

                }

            }
                if(currRole==Const.User)
                {
                    System.Web.UI.HtmlControls.HtmlAnchor anchorNew = (System.Web.UI.HtmlControls.HtmlAnchor)ContentPlaceHolder2.FindControl("btnAddNew");
                    System.Web.UI.HtmlControls.HtmlAnchor anchorNewVicar = (System.Web.UI.HtmlControls.HtmlAnchor)ContentPlaceHolder2.FindControl("btnNewVicar");
                    //System.Web.UI.HtmlControls.HtmlAnchor anchorEdit = (System.Web.UI.HtmlControls.HtmlAnchor)ContentPlaceHolder2.FindControl("NoticeEdit");
                    
                    if(anchorNew!=null)
                    {
                        anchorNew.Visible = false;
                    }
                    if (anchorNewVicar != null)
                    {
                        anchorNewVicar.Visible = false;
                    }
                   // if (anchorEdit != null)
                   // {
                   //     anchorEdit.Visible = false;
                   // }
                }
            }
            catch(Exception ex)
            {

            }
    }

      


    }
}