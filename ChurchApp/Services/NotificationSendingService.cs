using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Web;

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
                var minutes = 2;
                System.Threading.Thread.Sleep(minutes * 60 * 1000);
                try
                {

                    //------------------Deleting temporary files created by excel files----------------
                    string[] filePaths2 = Directory.GetFiles(HttpContext.Current.Server.MapPath("~/TempFiles/"));
                    foreach (string filePath in filePaths2)
                        if (DateTime.UtcNow - File.GetCreationTimeUtc(filePath) > TimeSpan.FromHours(10))
                        {
                            File.Delete(filePath);
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