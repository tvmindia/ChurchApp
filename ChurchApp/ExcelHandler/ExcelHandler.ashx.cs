using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Web.SessionState;
using ChurchApp.AdminPanel;
using ChurchApp.DAL;

namespace ChurchApp.ExcelHandler
{
    /// <summary>
    /// Summary description for ExcelHandler
    /// </summary>
    public class ExcelHandler : IHttpHandler, IRequiresSessionState 
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";            
            ExcelImport ImportXL = null;
            string currentSheet = null;
            DataSet dsExcel = null;
            DataSet dsTableDefenition = null;
            HttpPostedFile postFile = null;
            JavaScriptSerializer jsSerializer = null;
            Security.UserAuthendication UA = null;

            try
            {
                DashBoard dashBoardObj = new DashBoard();              
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null)
                {            
                    if (context.Request.Files.Count > 0)//chechhasfile DataImportFileUpload
                    {
                        if (context.Request.Form.GetValues("ActionTyp") != null)
                        {
                            ImportXL = new DAL.ExcelImport();
                            ImportXL.churchObj = new DAL.Church();
                            ImportXL.churchObj.createdBy = UA.userName;
                            ImportXL.churchObj.updatedBy = UA.userName;
                            ImportXL.townObj = new DAL.TownMaster();
                            ImportXL.townObj.createdBy = UA.userName;
                            ImportXL.townObj.updatedBy = UA.userName;
                            jsSerializer = new JavaScriptSerializer();
                            ImportXL.parentRow = new List<Dictionary<string, object>>();
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
                                ImportXL.totalExcelRows = dsExcel.Tables[0].Rows.Count.ToString();
                                bool result = ImportXL.Validation(dsExcel, dsTableDefenition);

                                if (dsExcel.Tables[0].Rows.Count > 0)
                                {
                                    ImportXL.ExcelImports(dsExcel, dsTableDefenition);
                                }

                                if (ImportXL.dtError.Rows.Count > 0)
                                {
                                    if (ImportXL.dtError.Rows.Count > 0)
                                    {
                                        foreach (DataRow row in ImportXL.dtError.Rows)
                                        {
                                            ImportXL.childRow = new Dictionary<string, object>();
                                            foreach (DataColumn col in ImportXL.dtError.Columns)
                                            {
                                                ImportXL.childRow.Add(col.ColumnName, row[col]);
                                            }
                                            ImportXL.parentRow.Add(ImportXL.childRow);
                                        }

                                    }
                                    jsSerializer.Serialize(ImportXL.parentRow);
                                    ImportXL.dtError = null;
                                    // context.Response.Write(jsSerializer.Serialize(ImportXL.parentRow));
                                    context.Response.Write(jsSerializer.Serialize(ImportXL));
                                }
                                else
                                {
                                    ImportXL.dtError = null;
                                    context.Response.Write(jsSerializer.Serialize(ImportXL));
                                }
                            }
                        }
                    }
                }
            }//end try
            catch (Exception ex)
            {


              
            }
            finally
            {

            }       
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