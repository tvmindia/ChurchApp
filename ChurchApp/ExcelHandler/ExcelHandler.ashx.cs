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
using System.IO;

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
           // string currentSheet = null;
            DataSet dsExcel = null;
            DataSet dsTableDefenition = null;
            HttpPostedFile postFile = null;
            HttpPostedFile postFileImage = null;
            JavaScriptSerializer jsSerializer = null;
            Security.UserAuthendication UA = null;
            List<string> OldImageIds = null;  

            try
            {
                DashBoard dashBoardObj = new DashBoard();              
                UA = dashBoardObj.GetCurrentUserSession();
                if (UA != null && context.Request.Files.Count > 0 && context.Request.Form.GetValues("TableImport") != null)
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
                    postFile = context.Request.Files["upExcelFile"];
                    string fileName = DateTime.Now.ToString("yyyyMMddhhmmssff") + "_" + postFile.FileName.ToString();
                    string fileLocation = path + fileName;
                    string fileExtension = System.IO.Path.GetExtension(fileName);
                       
                    ImportXL.fileName = fileName;
                    ImportXL.fileLocation = fileLocation;
                    ImportXL.tableName = context.Request.Form.GetValues("TableImport")[0];

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
                            //----------------------Total rows in excel file---------------//
                            ImportXL.totalExcelRows = dsExcel.Tables[0].Rows.Count.ToString(); 
                            //-----------------------validation by passing excelfile,table defenition & MasterTable fields-------------//
                            ImportXL.Validation(dsExcel, dsTableDefenition,dsMastertable);     

                            //------------------------------Image Validation and Adding ImageID to DataSet----------------------------// 
                            #region ImportImage 
                                                         
                            DataRow[] PicFields = dsTableDefenition.Tables[0].Select("Field_Type='P'");
                            dsExcel.Tables[0].Columns.Add("ImageId", typeof(String));  //Add column ImageId to Excel DataSet
                            if (PicFields.Length > 0 && context.Request.Files.Count>1)// condition check  if image folder upoaded contains file
                            {
                                try
                                {
                                    OldImageIds = new List<string>();
                                    DataSet DsExisting = ImportXL.GetExistingTableData();  //Existing Table to get Old ImageID
                                    for (int i = dsExcel.Tables[0].Rows.Count - 1; i >= 0; i--) // Looping excel file
                                    {
                                        //---------Generate Conditions with keyfields from table definition.(Passing Row)---------------//
                                        string conditions = ImportXL.GetExcelImportWhereCondtionforTables(dsExcel.Tables[0].Rows[i]);
                                        DataRow[] drExisting = DsExisting.Tables[0].Select(conditions);

                                        foreach (string content in context.Request.Files) //Images upload loop
                                        {
                                            if (content != "upExcelFile")
                                            {
                                                postFileImage = context.Request.Files[content];
                                                string ExcelImgfilename = postFileImage.FileName.ToString();
                                                //----------------  Check the Imagefile Name With uploaded ImageName and excel ImageFileName -------------//
                                                if (dsExcel.Tables[0].Rows[i]["ImageFileName"].ToString() == ExcelImgfilename)
                                                {
                                                    string ExistingImageID;
                                                    if (ImportXL.tableName == "Church")
                                                    {
                                                        ExistingImageID = drExisting[0]["MainImageID"].ToString();
                                                    }
                                                    else
                                                    {
                                                        ExistingImageID = drExisting[0]["ImageID"].ToString();
                                                    }
                                                    if (ExistingImageID != "")
                                                    {
                                                        OldImageIds.Add(ExistingImageID);  //---keeping AppImages ID to delete after Updating----//
                                                        //-----------------getting imagename from url in AppImages passing ID--------------------------------//
                                                        ImportXL.appimgObj = new DAL.AppImages();
                                                        ImportXL.appimgObj.appImageId = ExistingImageID;
                                                        ImportXL.appimgObj.SelectAppImageByID();
                                                        string imgpath = HttpContext.Current.Server.MapPath(ConfigurationManager.ConnectionStrings["ImpImgFilePath"].ConnectionString).ToString();                                                                
                                                        String[] filename = ImportXL.appimgObj.url.Split('/');
                                                        int len = filename.Length;
                                                        string imgloc = imgpath + filename[len - 1];
                                                        //------------check file Exists,If Exists deleting from Folder---------------//
                                                        if (File.Exists(imgloc))
                                                        {
                                                            DeleteDuplicateFile(imgloc);
                                                        }
                                                    }
                                                    ImportXL.appimgObj = new DAL.AppImages();
                                                    ImportXL.appimgObj.createdBy = UA.userName;
                                                    ImportXL.appimgObj.updatedBy = UA.userName;                                                                
                                                    //-----------insert into Apptable with Imageid----------------//
                                                    fileExtension = Path.GetExtension(postFileImage.FileName);
                                                    ImportXL.appimgObj.url = "/img/ImportImages/" + ImportXL.appimgObj.appImageId + fileExtension;                                                              
                                                    ImportXL.appimgObj.type = "image";
                                                    ImportXL.appimgObj.InsertAppImage1().ToString();
                                                    //---------Imageid inserting into Dataset Column--------------//
                                                    dsExcel.Tables[0].Rows[i]["ImageId"] = ImportXL.appimgObj.appImageId; 
                                                    string SaveLocation = (HttpContext.Current.Server.MapPath("~/img/ImportImages"));                                                                                                                                                                                                                                                                                                                                                               
                                                    postFileImage.SaveAs(SaveLocation + @"\" + ImportXL.appimgObj.appImageId + fileExtension);                                                                                                             
                                                }
                                            }
                                        }//foreach
                                    }//for
                                }//try
                                catch (Exception ex)
                                {
                                    ImportXL.status = ex.Message;
                                }                                    
                            }//if                                           
                            #endregion ImportImage

                            if (dsExcel.Tables[0].Rows.Count > 0)
                            {
                                //----------------After all validations importing dsExcel data into databse----------------//
                                ImportXL.ExcelImports(dsExcel, dsTableDefenition);
                                // ----------------Deleting OldAppImages after updating NewAppImages----------------------//
                                if (OldImageIds.Count>0 )
                                {
                                    foreach (string var in OldImageIds)
                                    {
                                        ImportXL.appimgObj.appImageId = var;
                                        ImportXL.appimgObj.url = ""; //for avoiding deletion of latest url
                                        ImportXL.appimgObj.DeleteAppImage();
                                    }
                                }
                            }
                            else
                            {
                                ImportXL.status = "0"; 
                            }                                    
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
                                jsSerializer.Serialize(ImportXL.parentRow);
                                ImportXL.dtError = null;                              
                                //context.Response.Write(jsSerializer.Serialize(ImportXL));
                            }
                            else
                            {
                                ImportXL.dtError = null;
                                //context.Response.Write(jsSerializer.Serialize(ImportXL));
                            }                                   
                        }
                        //else 
                        //{
                        //    context.Response.Write(jsSerializer.Serialize(ImportXL)); 
                        //}
                    }                   
                }
            }//end try
            catch (Exception ex)
            {
                //ImportXL.status = ex.Message;               
            }
            finally
            {
                context.Response.Write(jsSerializer.Serialize(ImportXL));
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