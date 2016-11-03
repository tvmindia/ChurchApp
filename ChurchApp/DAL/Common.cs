using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class Common
    {

        public DateTime ConvertDatenow(DateTime DateNow)
        {
            string tz = System.Web.Configuration.WebConfigurationManager.AppSettings["TimeZone"]; 
            DateNow = DateTime.SpecifyKind(DateNow, DateTimeKind.Local);
            return (TimeZoneInfo.ConvertTimeBySystemTimeZoneId(DateNow,tz));
        } 

    }
}