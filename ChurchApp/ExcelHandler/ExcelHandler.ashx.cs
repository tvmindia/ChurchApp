using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Configuration; 

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
            DAL.Security.UserAuthendication UA = new DAL.Security.UserAuthendication();
            DAL.ImportExcel ImportXL = new DAL.ImportExcel();
            string currentSheet = null;  
            DataSet dsFile = null;
            DataSet dsTable = null;
            HttpPostedFile postFile = null;

            try
            {

                if (context.Request.Files.Count > 0)//chechhasfile DataImportFileUpload
                {
                    if (context.Request.Form.GetValues("ActionTyp") != null)
                    {
                        switch (context.Request.Form.GetValues("ActionTyp")[0])
                        {
                            case "Church":

                                String[] excelSheets = null;
                                string path = HttpContext.Current.Server.MapPath(ConfigurationManager.ConnectionStrings["TempFilePath"].ConnectionString).ToString();

                                postFile = context.Request.Files["upImageFile"];
                                string fileName = UA.ChurchID + "_" + postFile.FileName.ToString();


                                string fileLocation = path + fileName;
                                string fileExtension = System.IO.Path.GetExtension(fileName);

                                ImportXL.fileName = fileName;
                                ImportXL.fileLocation = fileLocation;
                                ImportXL.tableName = "Church";

                                DeleteDuplicateFile(fileLocation);//deletes the file if the same file name exists in the folder
                                postFile.SaveAs(fileLocation);
                                excelSheets = ImportXL.OpenExcelFile();
                                if (excelSheets != null)
                                {                                   
                                        dsFile = new DataSet();
                                        dsTable = ImportXL.GetTableDefinition();
                                        dsFile = ImportXL.ScanExcelFileToDS(excelSheets, dsTable);
                                        bool result = ImportXL.Validation(dsFile, dsTable);
                                        //if (columnExistCheck == true)
                                        //{

                                        //}
                                        //if (columnExistCheck == false)
                                        //{

                                        //}
                                  
                                }
                                else
                                {

                                }
                                break;
                            default:
                                break;



                        }//end of hasfile if
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