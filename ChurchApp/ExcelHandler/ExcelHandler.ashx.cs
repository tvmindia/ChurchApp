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
                            ImportXL.priestObj = new DAL.Priest();
                            ImportXL.priestObj.createdBy = UA.userName;
                            ImportXL.priestObj.updatedBy = UA.userName;
                            ImportXL.masstymObj = new DAL.MassTimings();
                            ImportXL.masstymObj.createdBy = UA.userName;
                            ImportXL.masstymObj.updatedBy = UA.userName;

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
                                try
                                { 
                                    dsExcel = ImportXL.ScanExcelFileToDS(excelSheets, dsTableDefenition);
                                    //---------------- to add churchid to Priest Table 
                                    dsExcel = ImportXL.FillColumnValues(dsExcel);
                                }
                                catch (Exception ex)
                                {
                                    ImportXL.status = ex.Message;
                                }
                                if (dsExcel != null && dsExcel.Tables.Count>0)
                                {
                                    //Checking Master Table Fields 
                                    DataSet dsMastertable = null;
                                    DataRow[] MasterTableFields = dsTableDefenition.Tables[0].Select("Master_Table IS NOT NULL  and Master_Field IS NOT NULL ");
                                    if (MasterTableFields.Length > 0)
                                    {  
                                        foreach (var item in MasterTableFields)
                                        {
                                            string MasterTable = item["Master_Table"].ToString();
                                            string MasterField = item["Master_Field"].ToString();
                                            ImportXL.Mastertable = MasterTable;
                                            ImportXL.MasterField = MasterField;
                                            dsMastertable = ImportXL.GetMasterFieldsFromMasterTable();
                                        }
                                    }                                    
                                    ImportXL.totalExcelRows = dsExcel.Tables[0].Rows.Count.ToString(); //Total rows in excel file
                                    ImportXL.Validation(dsExcel, dsTableDefenition,dsMastertable);     //validation by passing excelfile,table defenition & MasterTable fields                           
                                    if (dsExcel.Tables[0].Rows.Count > 0)
                                    {
                                        //use try catch to show error  
                                        ImportXL.ExcelImports(dsExcel, dsTableDefenition);                                      
                                    }
                                   else
                                    {
                                        ImportXL.status = "0";
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
                                else 
                                {
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