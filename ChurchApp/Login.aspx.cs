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

namespace ChurchApp
{
    public partial class Login : System.Web.UI.Page
    {
        Const constants = new Const();
        protected void Page_Load(object sender, EventArgs e)
        {
            string log = Request.QueryString["Session"];
            if (log == "Logout")
            {
                Session.Remove(constants.LoginSession);
                Session.Clear();
                Response.Redirect("Login.aspx");
            }
            if (IsPostBack)
            {

                if (username.Value.ToString().Trim() != "")
                {




                    DAL.Security.UserAuthendication UA = new DAL.Security.UserAuthendication(username.Value, password.Value);

                    if (UA.ValidUser)
                    {
                        if (Session[constants.LoginSession] != null)
                        {
                            Session.Remove(constants.LoginSession);
                        }

                        Session.Add(constants.LoginSession, UA);
                        if (UA.Role == constants.SuperAdministrator)
                        {
                            Response.Redirect(constants.SAHomePage);
                        }
                        else
                        {
                            Response.Redirect(constants.HomePage);
                        }
                    }
                    else
                    {
                        //lblmsg.Text = Messages.LoginFailed;
                        lblmsg.Text = "Login Failed";
                    }

                }
                else
                {
                    //lblmsg.Text = Messages.LoginFailed;
                    lblmsg.Text = "Login Failed";
                }


            }
        }

        #region SendVerificationCode

        [System.Web.Services.WebMethod]

        public static string VerificationCodeEmit(Security LoginObj)
        {


            Security.UserAuthendication UA = null;
            string username = string.Empty;
            string BoutiqueName = string.Empty;
            string msg = string.Empty;
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
          
            try
            {

                //----------*Add verification code*------------//

                Random random = new Random();
                int verificationCode = 0;
                if (LoginObj.Email == "")
                {
                    return "false";
                }
                DataTable dtUsr = LoginObj.GetUserDetailsByEmailID();

                foreach (DataRow dr in dtUsr.Rows)
                {
                    Guid churchID = Guid.Parse(dr["ChurchID"].ToString());
                    LoginObj.ChurchID = churchID;
                    LoginObj.LoginName = dr["LoginName"].ToString();
                    verificationCode = random.Next(1000, 10000);
                    LoginObj.VerifyCode = verificationCode.ToString();
                    LoginObj.AddVerificationCode();
                }
                //----------*Get verification code*------------//

                DataTable dtCode = LoginObj.GetUserVerificationCodeByEmailID();

                foreach (DataRow dr in dtCode.Rows)
                {
                    verificationCode = Convert.ToInt32(dr["VerificationCode"]);
                    username = (dr["LoginName"]).ToString();
                    //BoutiqueName = (dr["Name"]).ToString();
                    msg = "<body><p>Your verification code with login name " + username + " is <font color='red'>" + verificationCode + "</font></p><p>" + msg + "</p></body>";
                }

                if (msg != string.Empty)
                {
                    //-- Area of verification code will be displayed and email area will be hidden

                    //Code.Style.Add("display", "block");
                    //email.Style.Add("display", "none");
                    //instruction.Visible = true;
                    //instruction.InnerText = Messages.EmailInstruction + txtEmail.Value;

                    //mailObj.Email = txtEmail.Value;
                    LoginObj.status = "true";
                    LoginObj.msg = msg;
                    LoginObj.SendEmail();
                    
                }

            }


            catch (Exception)
            {
                LoginObj.status = "false";
                return jsSerializer.Serialize(LoginObj);
            }


            return jsSerializer.Serialize(LoginObj);
        }

        #endregion SendVerificationCode

        #region Email Validation From db
        [WebMethod]
        public static string EmailValidation(Users UserObj)
        {
            JavaScriptSerializer jseril = new JavaScriptSerializer();
            int j = 0;
            try
            {

                DataSet ds = new DataSet();
                ds = UserObj.GetALLEmailLoginName();
                if (ds.Tables[0].Rows.Count > 0)
                {
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        if (dr["Email"].ToString() == UserObj.Email.Trim())
                        {
                            j = 1;
                            break;
                        }
                        if (dr["Email"].ToString() != UserObj.Email.Trim())
                        {
                            j = 0;
                        }
                    }
                }
            }
            catch
            {
                return "Error";
            }


            return jseril.Serialize(j);

        }
        #endregion Email Validation From db

        #region Verify Code
        [System.Web.Services.WebMethod]

        public static string VerifyCode(Security LoginObj)
        {
            JavaScriptSerializer jsSerializer = new JavaScriptSerializer();
            int verificationCode = 0;

            DateTime vcCreatedTime;

            bool Verified = false;
            bool TimeExpired = false;
            //string msg = "";

            try
            {
                //userObj.Email = txtEmail.Value;


                DataTable dtCode = LoginObj.GetUserVerificationCodeByEmailID();

                foreach (DataRow dr in dtCode.Rows)
                {

                    verificationCode = Convert.ToInt32(dr["VerificationCode"]);
                    vcCreatedTime = Convert.ToDateTime(dr["VerifyCodeDate"]);
                    LoginObj.UserID = dr["UserID"].ToString();

                    DateTime CurrentTime = DateTime.Now;
                    if ((CurrentTime - vcCreatedTime) < TimeSpan.FromDays(1))
                    {

                        if (verificationCode.ToString() == LoginObj.VerifyCode)
                        {
                            Verified = Verified | true;
                            break;
                        }
                    }

                    else
                    {
                        TimeExpired = TimeExpired | true;
                    }

                }


                if (Verified)
                {
                    if (TimeExpired == false)
                    {
                        //Response.Redirect("../Login/Reset.aspx?UserID=" + UserID, false);
                        LoginObj.msg = "True";
                    }
                    else
                    {
                        //lblError.Text = Messages.TimeExpired;
                    }
                }

                else
                {
                    //lblError.Text = Messages.IncorrectVerificationCode;
                }

            }
            catch (Exception)
            {
                //lblError.Text = ex.Message;
                LoginObj.msg = "False";
                return jsSerializer.Serialize(LoginObj);
            }

            return jsSerializer.Serialize(LoginObj);

        }
        #endregion Verify Code
    }
}