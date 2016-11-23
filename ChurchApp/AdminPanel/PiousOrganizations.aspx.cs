using ChurchApp.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

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
        [System.Web.Services.WebMethod]
        public static string GetAllPatrons(PatronMaster PatrnObj)
        {
            DataSet dt = PatrnObj.SelectPatronMaster(); //Function call to get  Search BoxData
            StringBuilder output = new StringBuilder();
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
            return output.ToString();
        }
        #endregion GetAllpriest DetailsAutocomplete
    }
}