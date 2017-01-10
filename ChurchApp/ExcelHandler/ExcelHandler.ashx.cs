using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Configuration;
using ChurchApp.DAL; 

namespace ChurchApp.ExcelHandler
{
    /// <summary>
    /// Summary description for ExcelHandler
    /// </summary>
    public class ExcelHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";            
            ImportExcel ImportXL = new ImportExcel();
            string currentSheet = null;  
            DataSet dsExcel = null;
            DataSet dsTableDefenition = null;
            HttpPostedFile postFile = null;

            try
            {

                if (context.Request.Files.Count > 0)//chechhasfile DataImportFileUpload
                {
                    if (context.Request.Form.GetValues("ActionTyp") != null)
                    {
                        String[] excelSheets = null;
                        string path = HttpContext.Current.Server.MapPath(ConfigurationManager.ConnectionStrings["TempFilePath"].ConnectionString).ToString();

                        postFile = context.Request.Files["upImageFile"];
                        string fileName = DateTime.Now.ToString("yyyyMMddhhmmssff") + "_" + postFile.FileName.ToString();

                        string fileLocation = path + fileName;
                        string fileExtension = System.IO.Path.GetExtension(fileName);

                        ImportXL.fileName = fileName;
                        ImportXL.fileLocation = fileLocation;
                        ImportXL.tableName = context.Request.Form.GetValues("ActionTyp")[0];

                        DeleteDuplicateFile(fileLocation);//deletes the file if the same file name exists in the folder
                        postFile.SaveAs(fileLocation);
                        excelSheets = ImportXL.OpenExcelFile();

                        if (excelSheets != null)
                        {
                            dsExcel = new DataSet();
                            dsTableDefenition = ImportXL.GetTableDefinition();
                            dsExcel = ImportXL.ScanExcelFileToDS(excelSheets, dsTableDefenition);
                            bool result = ImportXL.Validation(dsExcel, dsTableDefenition);
                          
                            if (result == true)
                            {
                                ImportXL.ExcelImport(dsExcel, dsTableDefenition);  
                             
                            }
                            if (result == false)
                            {
                                DeleteDuplicateFile(fileLocation);//deletes the file if the same file name exists in the folder
                            }
                        }
                        else
                        {

                        }
                    }
                }
               // ScriptManager.RegisterStartupScript(this, this.GetType(), "Upload", "GenerateTemplateNextClick();", true);

            }//end try
            catch (Exception ex)
            {


              
            }
            finally
            {

            }       

            context.Response.Write("Hello World");
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        public bool DeleteDuplicateFile(string location)
        {
            if (System.IO.File.Exists(location))
            {
                try
                {
                    System.IO.File.Delete(location);
                    return true;
                }

                catch (Exception ex)
                {                  
                
                    throw ex;
                }
            }
            else
            {
                return false;
            }
        }
    }
}