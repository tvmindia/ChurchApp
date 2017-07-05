using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Web;

namespace ChurchApp.Services
{
    public class FileFlush
    {
        public static void FileFlushing()
        {
            var worker = new BackgroundWorker();
            worker.DoWork += new DoWorkEventHandler(FileDeleteThread);
            worker.WorkerReportsProgress = false;
            worker.WorkerSupportsCancellation = true;
            worker.RunWorkerCompleted += new RunWorkerCompletedEventHandler(FileDeleteComplete);
            worker.RunWorkerAsync(HttpContext.Current);

          //  HttpContext.Current.Application.GetVariables().FileFlushing = worker;
            HttpContext.Current.Application["FileFlushing"] = worker;
        }
        private static void FileDeleteThread(object sender, DoWorkEventArgs e)
        {
            //Get current HttpContext from the DoWorkEventArgs object
            HttpContext.Current = (HttpContext)e.Argument;

            while (true)
            {
                var minutes = 30;
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
                    throw ex;
                }
            }
        }
        private static void FileDeleteComplete(object sender, RunWorkerCompletedEventArgs e)
        {
            //Do nothing
        }
        public static void StopFileDeleteThread()
        {
            BackgroundWorker worker = new BackgroundWorker();
            worker = (BackgroundWorker)HttpContext.Current.Application["FileFlushing"];
            if (worker != null)
                worker.CancelAsync();
        }
    }
}