﻿using System;
using System.ComponentModel;
using System.Web;
using System.Data;
using ChurchApp.DAL;

namespace ChurchApp.Services
{
    public class NotificationSendingService
    {
        public static void SendNotifications()
        {
            var worker = new BackgroundWorker();
            worker.DoWork += new DoWorkEventHandler(SendNotificationThread);
            worker.WorkerReportsProgress = false;
            worker.WorkerSupportsCancellation = true;
            worker.RunWorkerCompleted += new RunWorkerCompletedEventHandler(SendNotificationComplete);
            worker.RunWorkerAsync(HttpContext.Current);
            
            HttpContext.Current.Application["SendNotifications"] = worker;
        }
        private static void SendNotificationThread(object sender, DoWorkEventArgs e)
        {
            //Get current HttpContext from the DoWorkEventArgs object
            HttpContext.Current = (HttpContext)e.Argument;

            while (true)
            {
                var hours = 24;
                System.Threading.Thread.Sleep(hours * 60 * 60 * 1000);
                try
                {

                    //------------------Sending notifications which are scheduled today----------------
                    DataTable dt = new DataTable();
                    NotificationSchedule noti = new NotificationSchedule();
                    dt = noti.SelectNotificationsOnScheduledDate().Tables[0];
                    Notification notiTemp = new Notification();
                    foreach (DataRow dr in dt.Rows)
                    {


                        notiTemp.SendToFCM(dr["Caption"].ToString(), dr["Description"].ToString(), false, dr["ChurchID"].ToString());
                     
                    }                  
                   

                }
                catch (Exception ex)
                {
                }
            }
        }
        private static void SendNotificationComplete(object sender, RunWorkerCompletedEventArgs e)
        {
            //Do nothing
        }
        public static void StopSendNotificationsThread()
        {
            BackgroundWorker worker = new BackgroundWorker();
            worker = (BackgroundWorker)HttpContext.Current.Application["SendNotifications"];
            if (worker != null)
                worker.CancelAsync();
        }
    }
}