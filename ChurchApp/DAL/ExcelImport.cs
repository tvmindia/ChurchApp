using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace ChurchApp.DAL
{
    public class ExcelImport
    {
        #region Public Properties

        public Church churchObj = null;
        public TownMaster townObj = null;
        public Priest priestObj = null;
        public MassTimings masstymObj = null;
        public Const constObj = new Const();
        public AppImages appimgObj = null;
        string churchid;
        public string ImageFileLocation
        {
            get; set;
        }
        public DataTable dtError    {
            get;
            set;
        }
        public int insertedRows        {
            get;
            set;
        }
        public int updatedRows        {
            get;
            set;
        }
        public string totalExcelRows        {
            get;
            set;
        }
        public DataTable dtImportError        {
            get;
            set;
        }
        public string tableName        {
            get;
            set;
        }

        public string fileName        {
            get;
            set;
        }
        public string ExcelConnectionString        {
            get;
            set;
        }
        public string fileLocation        {
            get;
            set;
        }
        public string SheetDescription        {
            get;
            set;
        }
        public string SheetName        {
            get;
            set;
        }
        public string temporaryFolder {
            get;
            set;
        }
        public HttpRequestBase request        {
            get;
            set;
        }
        public string ExcelFileName        {
            get;
            set;
        }
        public List<string> excelNotExitingFields        {
            get;
            set;
        }
        public int errorCount        {
            get;
            set;
        }
        public List<Dictionary<string, object>> parentRow        {
            get;
            set;
        }
        public Dictionary<string, object> childRow        {
            get;
            set;
        }
        public string status        {
            get;
            set;
        }
        public string MasterField        {
            get;
            set;
        }
        public string Mastertable        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region ExcelSheetNames

        public static string FileDescriptionSheetName
        {
            get { return "Field Description"; }
        }
        public static string Church
        {
            get { return "Church"; }
        }

        #endregion ExcelSheetNames
        
        #region GetExcelData
        public DataSet GetExcelData(DataSet dsTable)
        {
            var Request = request;
            string tempFolder = temporaryFolder;
            DataSet dsFile = new DataSet();
            String[] excelSheets;
            try
            {
                if (ExcelFileName.Length > 0)
                {

                    excelSheets = OpenExcelFile();
                    dsFile = ScanExcelFileToDS(excelSheets, dsTable);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }

            return dsFile;
        }
        #endregion GetExcelData

        #region ScanExcelFileToDS
        public DataSet ScanExcelFileToDS(string[] excelSheets, DataSet dsTable)
        {
            DataSet dsFile = new DataSet();
            OleDbConnection excelConnection1 = new OleDbConnection(ExcelConnectionString);
            try
            {
                excelConnection1.Open();
                var command = excelConnection1.CreateCommand();
                command.CommandText = string.Format("Select * from [{0}]", SheetName + "$");
                var conditions = "";
                foreach (DataRow dr in dsTable.Tables[0].Rows)
                {
                    conditions += "[" + dr["Field_Name"].ToString() + "]" + " IS NOT NULL OR ";
                }
                if (conditions != "")
                {
                    command.CommandText += " WHERE " + conditions.Remove(conditions.Length - 4);
                }
                try
                {
                    using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(command.CommandText, excelConnection1))
                    {
                        dataAdapter.Fill(dsFile);
                    }
                }
                catch (Exception ex)
                {
                    dsFile = null;
                    throw;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                excelConnection1.Close();
            }
            return dsFile;
        }

        #endregion ScanExcelFileToDS

        #region OpenExcelFile
        public string[] OpenExcelFile()
        {
            string fileExtension = Path.GetExtension(fileName);
            ExcelConnectionString = string.Empty;
            if (fileExtension == ".xls")
            {
                ExcelConnectionString = System.Configuration.ConfigurationManager.AppSettings["XLS_ConnectionString"];
                ExcelConnectionString = ExcelConnectionString.Replace("$fileLocation$", fileLocation);
            }
            //connection String for xlsx file format.
            else if (fileExtension == ".xlsx")
            {
                ExcelConnectionString = System.Configuration.ConfigurationManager.AppSettings["XLSX_ConnectionString"];
                ExcelConnectionString = ExcelConnectionString.Replace("$fileLocation$", fileLocation);
            }
            //Create Connection to Excel work book and add oledb namespace
            OleDbConnection excelConnection = new OleDbConnection(ExcelConnectionString);
            String[] excelSheets = null;
            try
            {
                if (excelConnection.State != ConnectionState.Open)
                {
                    excelConnection.Open();
                }
                DataTable dt = new DataTable();

                dt = excelConnection.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
                if ((dt.Rows.Count > 0) && (dt != null))
                {
                    excelSheets = new String[dt.Rows.Count];
                    //int t = 0;
                    foreach (DataRow row in dt.Rows)
                    {
                        //    if ("'" + FileDescriptionSheetName + "$" + "'" == row["TABLE_NAME"].ToString())
                        //    {
                        //        SheetDescription = row["TABLE_NAME"].ToString();
                        //        SheetDescription = SheetDescription.TrimEnd('$');
                        //    }
                        //    else
                        //    {
                        SheetName = row["TABLE_NAME"].ToString();
                        SheetName = SheetName.TrimEnd('$');
                        //    }
                        //    excelSheets[t] = row["TABLE_NAME"].ToString();
                        //    t++;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                excelConnection.Close();
            }
            return excelSheets;
        }
        #endregion OpenExcelFile
        
        #region SelectTableNames
        /// <summary>
        /// Select table names
        /// </summary>
        /// <returns>distinct table names</returns>
        public DataSet SelectTableNames()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetTableNames]";
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion SelectTableNames

        #region GetMasterFieldsFromMasterTable

        public DataSet GetMasterFieldsFromMasterTable()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetMasterFieldsFromMasterTable]";
                cmd.Parameters.Add("@MasterTable", SqlDbType.NVarChar, 100).Value = Mastertable;
                cmd.Parameters.Add("@MasterField", SqlDbType.NVarChar, 100).Value = MasterField;
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetMasterFieldsFromMasterTable

        #region GetTableDefinition
        /// <summary>
        /// Get Table Definition
        /// </summary>
        /// <returns>All Table Definition Data</returns>
        public DataSet GetTableDefinition()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetTableDefinition]";
                cmd.Parameters.Add("@TableName", SqlDbType.NVarChar, 100).Value = tableName;
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetTableDefinition

        #region ImportData
        public string ExcelImports(DataSet dsExcel, DataSet dsTableDefinition)
        {
            int dsExcelCount = dsExcel.Tables[0].Rows.Count;
            DataSet DsExisting = null;
            int j;
            string conditions = "";
            bool IsUpdate;
            DataRow[] drkeyfields;
            insertedRows = 0;
            updatedRows = 0;
            try
            {
                switch (tableName)
                {
                    case "MassTiming":
                        //In the case of  Masstiming we want to find churchID and add as a column in dsExcel.                        
                        DsExisting = GetMassTimingTableData();
                        //--------To Get ChurchId for Insert Masstimings--------------------------------//
                        DataSet ChurchDS = churchObj.GetAllChurches();                  
                        //--------Cloning the  dataSet  DsExisting for codition checking(Time)----------//
                        DataSet dtCloned = DsExisting.Clone();                                                  
                        dtCloned.Tables[0].Columns["Time"].DataType = typeof(string);   //change datatype of column Time 
                        foreach (DataRow row in DsExisting.Tables[0].Rows)              //Importing rows to cloned datatable
                        {
                            dtCloned.Tables[0].ImportRow(row);
                        }

                        //------------------Keyfields Checking-----------------------------//
                        drkeyfields = dsTableDefinition.Tables[0].Select("Key_Field='Y'");
                        DataRow[] drfieldtypes = dsTableDefinition.Tables[0].Select("Field_Type='T'");
                        for (j = 0; j < dsExcelCount; j++)   //--------------dsExcelLooping(Uploaded file)
                        {
                            conditions = "";
                            DataRow drExcelrow = dsExcel.Tables[0].Rows[j]; //Checking By Selecting Row by Row                                                        
                            foreach (DataRow drw in drkeyfields)          //where condition to find insertion of updation
                            {
                                if (drfieldtypes.Length > 0 && drw[0].ToString() == "Time")
                                {
                                    string time = dsExcel.Tables[0].Rows[j][drw[0].ToString()].ToString().Replace("'", "''");
                                    conditions += string.Format("{0} ='{1}' AND ", drw[0].ToString(), time);
                                }
                                else
                                {
                                    conditions += string.Format("{0} ='{1}' AND ", drw[0].ToString(), dsExcel.Tables[0].Rows[j][drw[0].ToString()].ToString().Replace("'", "''").Trim());
                                }
                            }
                            if (conditions != "")
                            {
                                conditions = conditions.Remove(conditions.Length - 4);              //removing last 4 characters from conditions string       
                                DataRow[] drExisting = dtCloned.Tables[0].Select(conditions);       //Selecting From Cloned Dataset
                                if (drExisting.Length > 0)
                                {
                                    updatedRows = updatedRows + 1;                                  //No Changes Required So No Update                           
                                }
                                else
                                {
                                    String Condition = "Name='" + drExcelrow["ChurchName"].ToString().Replace("'", "''").Trim() + "'and Place='" + drExcelrow["Place"].ToString().Trim() + "'and TownCode='" + drExcelrow["TownCode"].ToString().Trim() + "'";
                                    DataRow[] drchurch = ChurchDS.Tables[0].Select(Condition); //To find ChurchID from Dataset
                                    if (drchurch.Length>0)
                                    { 
                                        masstymObj.massChurchId = drchurch[0]["ID"].ToString();
                                        masstymObj.day = drExcelrow["day"].ToString();
                                        masstymObj.massTime = drExcelrow["Time"].ToString();
                                        masstymObj.InsertMassTiming();
                                        if (masstymObj.status == "1")
                                        {
                                            insertedRows = insertedRows + 1;
                                        }
                                    }                                   
                                }
                            }
                        }
                        if (j == dsExcelCount)
                        {
                            status = "1";
                        }
                        break;
                    default:
                        DsExisting = GetExistingTableData();//function call with table name as parameter
                        //------------------Keyfields Checking-----------------------------//
                        drkeyfields = dsTableDefinition.Tables[0].Select("Key_Field='Y'");
                        for (j = 0; j < dsExcelCount; j++)   //--------------dsExcelLooping(Uploaded file)
                        {                           
                            DataRow drExcelrow = dsExcel.Tables[0].Rows[j]; //Checking By Selecting Row by Row
                            //---------Generate Conditions with keyfields from table definition.(Passing Row)---------------// 
                            conditions = GetExcelImportWhereCondtionforTables(drExcelrow);                         
                            if (conditions != "")
                            {                                    
                                DataRow[] drExisting = DsExisting.Tables[0].Select(conditions);
                                if (drExisting.Length > 0)
                                {
                                    IsUpdate = true;
                                }
                                else
                                {
                                    IsUpdate = false;
                                }
                                switch (tableName)
                                {
                                    case "Church":
                                        if (IsUpdate)
                                        {
                                            churchObj.churchId = drExisting[0]["ID"].ToString();   //Taking churchId from already taken dataset. 
                                            churchObj.churchName = drExcelrow["Name"].ToString().Trim();
                                            churchObj.townCode = drExcelrow["TownCode"].ToString().Trim();
                                            churchObj.description = drExcelrow["Description"].ToString();
                                            churchObj.about = drExcelrow["About"].ToString();
                                            churchObj.address = drExcelrow["Address"].ToString();
                                            churchObj.phone1 = drExcelrow["Phone1"].ToString();
                                            churchObj.phone2 = drExcelrow["Phone2"].ToString();
                                            churchObj.longitude = drExcelrow["Longitude"].ToString();
                                            churchObj.latitude = drExcelrow["Latitude"].ToString();
                                            churchObj.mainImageId = drExcelrow["ImageId"].ToString();
                                            churchObj.ChurchDenomination = drExcelrow["ChurchDenomination"].ToString(); //-----ChurchDenomination 
                                            churchObj.PriorityOrder = drExcelrow["PriorityOrder"].ToString(); //-----ChurchPirority
                                            churchObj.Place = drExcelrow["Place"].ToString().Trim();
                                            churchObj.UpdateChurch();
                                            if (churchObj.status == "1")
                                            {
                                                updatedRows = updatedRows + 1;
                                            }
                                        }
                                        else
                                        {
                                            churchObj.churchName = drExcelrow["Name"].ToString().Trim();
                                            churchObj.townCode = drExcelrow["TownCode"].ToString().Trim();
                                            churchObj.description = drExcelrow["Description"].ToString();
                                            churchObj.about = drExcelrow["About"].ToString();                                           
                                            churchObj.address = drExcelrow["Address"].ToString();
                                            churchObj.phone1 = drExcelrow["Phone1"].ToString();
                                            churchObj.phone2 = drExcelrow["Phone2"].ToString();                                          
                                            churchObj.longitude = drExcelrow["Longitude"].ToString();
                                            churchObj.latitude = drExcelrow["Latitude"].ToString();
                                            churchObj.mainImageId = drExcelrow["ImageId"].ToString();
                                            churchObj.ChurchDenomination = drExcelrow["ChurchDenomination"].ToString(); //-----ChurchDenomination 
                                            churchObj.PriorityOrder = drExcelrow["PriorityOrder"].ToString(); //-----ChurchPirority
                                            churchObj.Place = drExcelrow["Place"].ToString().Trim();
                                            churchObj.InsertChurch();
                                            if (churchObj.status == "1")
                                            {
                                                insertedRows = insertedRows + 1;
                                            }
                                        }
                                        break;

                                    case "Priest":
                                        bool flag=false;
                                        if (IsUpdate)
                                        {
                                            priestObj.priestID = drExisting[0]["ID"].ToString();
                                            priestObj.priestName = drExcelrow["Name"].ToString().Trim();
                                            priestObj.dob = drExcelrow["DOB"].ToString();
                                            priestObj.dateOrdination = drExcelrow["DateOrdination"].ToString();
                                            priestObj.about = drExcelrow["About"].ToString();
                                            priestObj.BaptisumName = drExcelrow["BaptismalName"].ToString();
                                            priestObj.address = drExcelrow["Address"].ToString();
                                            priestObj.mobile = drExcelrow["Mobile"].ToString();
                                            priestObj.Parish = drExcelrow["Parish"].ToString();
                                            priestObj.imageId= drExcelrow["ImageId"].ToString();
                                            priestObj.Diocese = drExcelrow["Diocese"].ToString();
                                            priestObj.emailId = drExcelrow["Email"].ToString();
                                            priestObj.designation = drExcelrow["Designation"].ToString();                                            
                                            priestObj.Status = new CultureInfo("en-US").TextInfo.ToTitleCase(drExcelrow["Status"].ToString().Trim());
                                            priestObj.churchID = drExcelrow["churchId"].ToString(); //churchId
                                            priestObj.isImport = true;
                                            priestObj.UpdatePriest();
                                            if (priestObj.result == "1")
                                            {
                                                updatedRows = updatedRows + 1;
                                            }
                                            else
                                            {
                                                flag = true;
                                            }
                                        }
                                        else
                                        {
                                            priestObj.priestName = drExcelrow["Name"].ToString().Trim();
                                            priestObj.dob = drExcelrow["DOB"].ToString();
                                            priestObj.dateOrdination = drExcelrow["DateOrdination"].ToString();
                                            priestObj.about = drExcelrow["About"].ToString();
                                            priestObj.BaptisumName = drExcelrow["BaptismalName"].ToString();
                                            priestObj.address = drExcelrow["Address"].ToString();
                                            priestObj.mobile = drExcelrow["Mobile"].ToString();
                                            priestObj.Parish = drExcelrow["Parish"].ToString();
                                            priestObj.Diocese = drExcelrow["Diocese"].ToString();
                                            priestObj.emailId = drExcelrow["Email"].ToString();
                                            priestObj.imageId = drExcelrow["ImageId"].ToString();
                                            priestObj.designation = drExcelrow["Designation"].ToString();
                                            priestObj.Status = new CultureInfo("en-US").TextInfo.ToTitleCase(drExcelrow["Status"].ToString().Trim());
                                            priestObj.churchID = drExcelrow["churchId"].ToString(); //churchId 
                                            priestObj.InsertPriest();
                                            if (priestObj.result == "1")
                                            {
                                                insertedRows = insertedRows + 1;
                                            }
                                            else
                                            {
                                                flag = true;
                                            }
                                           
                                        }
                                        if (flag)
                                        { //---------on vicar is already existing case updation
                                            errorCount = errorCount + 1;
                                            List<string> errorList = new List<string>();
                                            List<string> keyFields = new List<string>();                                           
                                            keyFields.Add(drExcelrow["Name"].ToString());
                                            keyFields.Add(drExcelrow["ChurchName"].ToString());
                                            keyFields.Add(drExcelrow["Place"].ToString());                                           
                                            errorList.Add(constObj.VicarExists);  // message string from Common.cs 
                                            DataRow dr = dtError.NewRow();
                                            dr["FieldName"] = keyFields;
                                            dr["ErrorDesc"] = errorList;
                                            dtError.Rows.Add(dr);

                                            appimgObj.appImageId = drExcelrow["ImageId"].ToString();
                                            appimgObj.url = ""; //for avoiding deletion of latest url
                                            appimgObj.DeleteAppImage();                                          

                                        }
                                        break;
                                    case "TownMaster":
                                        if (IsUpdate)
                                        {
                                            townObj.code = drExisting[0]["Code"].ToString().Trim();
                                            townObj.name = drExcelrow["Name"].ToString().Trim();
                                            townObj.UpdateTownMaster();
                                            if (townObj.status == "1")//update status return 2 while dupilcation,   
                                            {
                                                updatedRows = updatedRows + 1;
                                            }
                                        }
                                        else
                                        {
                                            townObj.name = drExcelrow["Name"].ToString().Trim();
                                            townObj.code = drExcelrow["Code"].ToString().Trim();
                                            townObj.InsertTownMaster();
                                            if (townObj.status == "1")
                                            {
                                                insertedRows = insertedRows + 1;
                                            }
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                        if (j == dsExcelCount)
                        {
                            status = "1";
                        }
                        break;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
            }
            return "";
        }
        #endregion ImportData

        #region GetTableDefinition
        /// <summary>
        /// Get Table Definition
        /// </summary>
        /// <returns>All Table Definition Data</returns>
        public DataSet GetExistingTableData()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetTableData]";
                cmd.Parameters.Add("@TableName", SqlDbType.NVarChar, 100).Value = tableName;
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetTableDefinition

        #region GetMasstimingTableDefinition
        /// <summary>
        /// Get Mass Timing Table Definition
        /// </summary>
        /// <returns>Mass timing Definition Data after inner join with church </returns>
        public DataSet GetMassTimingTableData()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetMasstimingTableDefinition]";
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                DataTable dt = new DataTable();
                sda.Fill(ds);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            return ds;
        }
        #endregion GetMasstimingTableDefinition


        #region GetExcelImportWhereCondtionforTables
        public string GetExcelImportWhereCondtionforTables(DataRow drExcelrow)
        {
             string conditions = "";
            DataSet TableDefenition = GetTableDefinition();
            DataRow[] datarowkeyfields = TableDefenition.Tables[0].Select("Key_Field='Y'");                  
                conditions = "";
            
                foreach (DataRow drw in datarowkeyfields)
                {
                    conditions += string.Format("{0} ='{1}' AND ", drw[0].ToString(),drExcelrow[ drw[0].ToString()].ToString().Replace("'", "''").Trim());
                }
                if (conditions != "")
                {
                    conditions = conditions.Remove(conditions.Length - 4);
                }            
                return conditions;
            }
        #endregion GetExcelImportWhereCondtionforTables

        #endregion Methods

        #region ValidationMethods

        #region Sort
        public static DataTable resort(DataTable dt)
        {
            dt.DefaultView.Sort = "RowNo asc";
            dt = dt.DefaultView.ToTable();
            return dt;
        }
        #endregion Sort

        #region Validation
        /// <summary>
        /// Excel sheet validation 
        /// </summary>
        /// <param name="ExcelDS"></param>
        /// <param name="TableDefinitionDS"></param>
        /// <param name="dsMastertable"
        /// <returns>True/False</returns>
        public void Validation(DataSet ExcelDS, DataSet TableDefinitionDS,DataSet dsMastertable)
        {
            dtError = CreateErrorTable();         
            bool status = true;
            int res;
            try
            {
                excelNotExitingFields = new List<string>();
                List<string> keyField = null;
                status = ValidateType(ExcelDS, TableDefinitionDS, excelNotExitingFields, keyField);
                if (status == true)
                {
                    DataSet dsExisting = null;                   
                    if (tableName == "MassTiming")
                    {
                        dsExisting = churchObj.GetAllChurches();  
                    }   
                    else if(tableName=="TownMaster")
                    {
                        dsExisting = townObj.SelectTownMasters();
                    }
                    else if(tableName == "Priest")
                    { 
                        ExcelDS.Tables[0].Columns.Add("ChurchId", typeof(String)); //adding churchid column to priest dataset    
                    }
                      
                    for (int i = ExcelDS.Tables[0].Rows.Count - 1; i >= 0; i--)
                    {
                        res = ValidateData(ExcelDS.Tables[0].Rows[i], TableDefinitionDS, i, dtError, dsMastertable);
                        if (res == 1)     //-----------------vaildate logic inside------------//
                        {
                            res = LogicValidation(ExcelDS, i, dtError, dsExisting);   
                        }
                        if (res == -1)
                        {
                            ExcelDS.Tables[0].Rows.RemoveAt(i);
                            errorCount = errorCount + 1;
                            status = false;
                        }
                    }
                }
                else
                {
                    DataRow dr = dtError.NewRow();
                    dr["RowNo"] = "";
                    dr["FieldName"] = keyField;
                    dr["ErrorDesc"] = excelNotExitingFields + " column(s) doesnot exists in excel template";
                    dtError.Rows.Add(dr);
                }
                dtError = resort(dtError);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Validation

        #region ChurchExists
        public bool ChurchExists(DataSet dsExisting,DataRow drExcel)
        {
            String condition = "Name='" + drExcel["ChurchName"].ToString().Replace("'", "''") + "'and Place='" + drExcel["Place"].ToString() + "'and TownCode='" + drExcel["TownCode"].ToString() + "'";
            DataRow[] drcheck = dsExisting.Tables[0].Select(condition);
            if (drcheck.Length == 0)     {
                return false;
            }
            else    {
                churchid = drcheck[0]["ID"].ToString();
                return true;
            }
        }
        #endregion ChurchExists

        #region TownExists
        public bool TownExists(DataSet dsExisting, DataRow drExcel)
        {
            String condition = "Name='" + drExcel["Name"].ToString() + "'OR Code='" + drExcel["Code"].ToString() + "'";
            DataRow[] drcheck = dsExisting.Tables[0].Select(condition);
            if (drcheck.Length == 0)
            {
                return false;
            }
            return true;
        }
        #endregion TownExists

        #region LogicValidation
        public int LogicValidation(DataSet ExcelDS, int rowno, DataTable dtError, DataSet dsExisting)
        {
            DataRow drExcel = ExcelDS.Tables[0].Rows[rowno];
            List<string> errorList = new List<string>();
            List<string> keyFields = new List<string>();
            try
            {
                bool flag = false;
                switch (tableName)
                {
                    case "MassTiming":                     
                        if (ChurchExists(dsExisting,drExcel)!=true)
                        {
                            flag = true;                                 
                            keyFields.Add(drExcel["ChurchName"].ToString());
                            keyFields.Add(drExcel["Place"].ToString());
                            keyFields.Add(drExcel["Towncode"].ToString());
                            errorList.Add(constObj.Nochurch);  // message string from Common.cs 
                        }
                        break;
                    case "TownMaster":
                        if (TownExists(dsExisting, drExcel) == true)
                        {
                            flag = true;
                            keyFields.Add(drExcel["Name"].ToString());                    
                            keyFields.Add(drExcel["Code"].ToString());
                            errorList.Add(constObj.TownExists); // message string from Common.cs 
                        }
                        break;
                    case "Priest":
                        string vicarStatus = drExcel["Status"].ToString();
                        vicarStatus = new CultureInfo("en-US").TextInfo.ToTitleCase(drExcel["Status"].ToString().Trim());
                        if (vicarStatus != "Vicar" && vicarStatus != "Asst Vicar" && vicarStatus != "")
                        {
                            flag = true;
                            keyFields.Add(drExcel["Name"].ToString());                         
                            errorList.Add(constObj.Prieststatus); // message string from Common.cs 
                        }

                        //--------------------- Filling  churchid Column with Values-------------------------------------------//                      
                        if (drExcel["ChurchName"].ToString() != "" && drExcel["Place"].ToString() != "" && drExcel["TownCode"].ToString() != "")
                        {
                            bool churchexists = ChurchExists(churchObj.GetAllChurches(), drExcel);
                            if (churchexists) //true
                            {
                                if (vicarStatus == "Vicar")
                                {
                                    DataRow[] checkvicarstatus = ExcelDS.Tables[0].Select("ChurchId='" + churchid + "' and Status='" + drExcel["Status"].ToString() + "'");                                  
                                    if (checkvicarstatus.Length > 0)
                                    {
                                        flag = true;
                                        keyFields.Add(drExcel["Name"].ToString());
                                        keyFields.Add(drExcel["ChurchName"].ToString());
                                        keyFields.Add(drExcel["Place"].ToString());
                                        keyFields.Add(drExcel["Towncode"].ToString());
                                        errorList.Add(constObj.VicarExistsExcel);
                                    }
                                    else
                                    {
                                        ExcelDS.Tables[0].Rows[rowno]["ChurchId"] = churchid;      //inserting churchid into dataset
                                    
                                    }
                                }
                                else
                                {
                                    ExcelDS.Tables[0].Rows[rowno]["ChurchId"] = churchid;      //inserting churchid into dataset
                                }
                            }
                            else //false
                            {
                                flag = true;
                                keyFields.Add(drExcel["Name"].ToString());
                                keyFields.Add(drExcel["ChurchName"].ToString());
                                keyFields.Add(drExcel["Place"].ToString());
                                keyFields.Add(drExcel["Towncode"].ToString());
                                errorList.Add(constObj.Nochurch);     // message string from Common.cs      
                            }
                        }
                         break;                  
                    default:
                        break;
                }
                if (flag == true)
                {
                    DataRow dr = dtError.NewRow();
                    rowno = rowno + 2;
                    dr["RowNo"] = rowno;
                    dr["FieldName"] = keyFields;
                    dr["ErrorDesc"] = errorList;
                    dtError.Rows.Add(dr);                   
                    return -1;
                }
                else
                {
                    return 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }           
        }

        #endregion LogicValidation

        #region ValidateData
        public int ValidateData(DataRow drExcel, DataSet dsTableDef, int rowno, DataTable dtError,DataSet dsMastertable)
        {            
            List<string> errorList = new List<string>();
            List<string> keyFields = new List<string>();
            try
            {
                bool flag = false;                
                if (dsMastertable != null && dsMastertable.Tables[0].Rows.Count>0)
                { 
                    switch(tableName)
                    {

                        case "Church":
                            string wherecondition = "FieldValue='" + drExcel["ChurchDenomination"].ToString() + "'";
                            DataRow[] checkisexits = dsMastertable.Tables[0].Select(wherecondition);
                            if (checkisexits.Length > 0)
                            {
                                flag = false;
                            }
                            else
                            {
                                flag = true;
                                errorList.Add(drExcel["ChurchDenomination"].ToString() + " doesn't Exists in ChurchDenominationMaster");
                            }
                            break;
                        default:
                            break;
                    }
                }

                //----------------------Manadatory Fields Checking-------------------//
                DataRow[] mandatoryFields = dsTableDef.Tables[0].Select("IsMandatory='true'");

                foreach (var item in mandatoryFields)
                {
                    string FieldName = item["Field_Name"].ToString();
                    string FieldDataType = item["Field_Type"].ToString();
                    string isKeyField = item["Key_Field"].ToString();
                    if (drExcel[FieldName].ToString().Trim() == "" || string.IsNullOrEmpty(drExcel[FieldName].ToString()))
                    {
                        flag = true;
                        errorList.Add(FieldName + "-" + "Field Is Empty");
                    }
                    if (isKeyField == "Y" && drExcel[FieldName].ToString() != string.Empty && drExcel[FieldName].ToString() != "NULL")
                    {
                        keyFields.Add(drExcel[FieldName].ToString());
                    }
                }

                //-------------------- Field type checking-------------------------//

                foreach (DataRow tableDefRow in dsTableDef.Tables[0].Rows)
                {
                    string tableDefFieldType = tableDefRow["Field_Type"].ToString();
                    string tableDefColumnName = tableDefRow["Field_Name"].ToString();
                    var tableDefFieldSize = tableDefRow["Field_Size"].ToString();
                    string mandatoryField = tableDefRow["Key_Field"].ToString();

                    if (drExcel[tableDefColumnName].ToString().Trim() != "" && !string.IsNullOrEmpty(drExcel[tableDefColumnName].ToString()))
                    {
                        if (tableDefFieldType == "D" && !ValidateDate(drExcel[tableDefColumnName].ToString()))
                        {
                            flag = true;
                            errorList.Add(tableDefColumnName + "-" + "Invalid Date format");
                        }
                        else if (tableDefFieldType == "A" && !isAlphaNumeric(drExcel[tableDefColumnName].ToString()))
                        {
                            flag = true;
                            errorList.Add(tableDefColumnName + "-" + "Invalid AlphaNumeric character");
                        }
                        else if (tableDefFieldType == "N" && !isNumber(drExcel[tableDefColumnName].ToString()))
                        {
                            flag = true;
                            errorList.Add(tableDefColumnName + "-" + "Invalid Number");
                        }
                        else if (tableDefFieldType == "S" && !isString(drExcel[tableDefColumnName].ToString()))
                        {
                            flag = true;
                            errorList.Add(tableDefColumnName + "-" + "Invalid String");
                        }
                        else if (tableDefFieldType == "E" && !isEmail(drExcel[tableDefColumnName].ToString()))
                        {
                            flag = true;
                            errorList.Add(tableDefColumnName + "-" + "Invalid Email");
                        }
                        else if (tableDefFieldType == "M" && !isMobile(drExcel[tableDefColumnName].ToString()))
                        {                            
                            flag = true;                            
                            errorList.Add(tableDefColumnName + "-" + "Invalid Phone Number");
                        }
                        else if (tableDefFieldType == "T" && !isValidDateAndTime(drExcel[tableDefColumnName].ToString()))
                        {                          
                            flag = true;
                            errorList.Add(tableDefColumnName + "-" + "Invalid Time");
                        }
                        else if (tableDefFieldType == "W" && !IsWeekDays(drExcel[tableDefColumnName].ToString()))
                        {                           
                            flag = true;                          
                            errorList.Add(tableDefColumnName + "-" + "Invalid Day");
                        }
                        else if (tableDefFieldType == "P" && !ImageFileExtension(drExcel[tableDefColumnName].ToString()))
                        {                       
                            flag = true;                         
                            errorList.Add(tableDefColumnName + "-" + "Invalid Image Extension");
                        }

                        //------------------------------Field size checking-----------------------//
                        if (tableDefFieldSize != null && tableDefFieldSize != "")
                        {
                            int tableDefLength = Convert.ToInt32(tableDefFieldSize);
                            int excelColLength = drExcel[tableDefColumnName].ToString().Length;
                            if (tableDefLength < excelColLength)
                            {
                                flag = true;
                                errorList.Add(tableDefColumnName + "-" + "Invalid Field Size");
                            }
                        }
                    }
                }
                if (flag == true)
                {
                    DataRow dr = dtError.NewRow();
                    rowno = rowno + 2;
                    dr["RowNo"] = rowno;
                    dr["FieldName"] = keyFields;
                    dr["ErrorDesc"] = errorList;
                    dtError.Rows.Add(dr);                   
                    return -1;
                }
                else
                {
                    return 1;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #endregion ValidateData

        #region CreateErrorTable
        /// <summary>
        /// Create datatable for Error Descriptions
        /// </summary>
        /// <returns></returns>
        public DataTable CreateErrorTable()
        {
            DataTable dtTemp = new DataTable();
            dtTemp.Columns.Add(new DataColumn("RowNo", typeof(int)));
            dtTemp.Columns.Add(new DataColumn("FieldName", typeof(List<string>)));
            dtTemp.Columns.Add(new DataColumn("ErrorDesc", typeof(List<string>)));
            return dtTemp;
        }
        #endregion CreateErrorTable

        #region Date validation
        /// <summary>
        /// Date validation
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        private bool ValidateDate(string date)
        {
            try
            {
                DateTime tempDate;
                tempDate = Convert.ToDateTime(date);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        #endregion Date validation

        #region Alphanumeric Validation
        /// <summary>
        /// Alphanumeric Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private static bool isAlphaNumeric(string strToCheck)
        {
            Regex rg = new Regex(@"^[a-zA-Z\s.,0-9-]+$");
            if (rg.IsMatch(strToCheck))
                return true;
            else
                return false;
        }

        #endregion Alphanumeric Validation

        #region String Validation
        /// <summary>
        /// Alphanumeric Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private static bool isString(string strToCheck)
        {
            Regex rg = new Regex(@"^[a-zA-Z\s\.():'&,0-9-]+$", RegexOptions.Multiline);
            if (rg.IsMatch(strToCheck))
                return true;
            else
                return false;
        }

        #endregion String Validation

        #region Email Validation
        /// <summary>
        /// Alphanumeric Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private static bool isEmail(string strToCheck)
        {
            Regex rg = new Regex(@"^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$");
            if (rg.IsMatch(strToCheck))
                return true;
            else
                return false;
        }

        #endregion Email Validation

        #region Mobile Validation
        /// <summary>
        /// Alphanumeric Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private static bool isMobile(string strToCheck)
        {
            Regex rg = new Regex(@"^\+?(\d[\d-. ]+)?(\([\d-. ]+\))?[\d-. ]+\d$");
            if (rg.IsMatch(strToCheck))
                return true;
            else
                return false;
        }

        #endregion Mobile Validation

        #region Time Validation
        /// <summary>
        /// Alphanumeric Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private static bool isValidDateAndTime(string strToCheck)
        {
            if (strToCheck.Length > 10)
            {
                strToCheck = strToCheck.Substring(10);
            }

            Regex rg = new Regex(@"^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)?([ ]?[a|p]m)?$", RegexOptions.IgnoreCase);
            if (rg.IsMatch(strToCheck.TrimStart()))
                return true;
            else
                return false;
        }

        #endregion String Time

        #region Numeric Validation
        /// <summary>
        /// Numeric Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private bool isNumber(string strToCheck)
        {
            Regex rg = new Regex(@"^[0-9\s,-]+$");
            if (rg.IsMatch(strToCheck))
                return true;
            else
                return false;
        }

        #endregion Numeric Validation

        #region Alphabetic validation
        /// <summary>
        /// Alphabetic validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private bool isAlpha(string strToCheck)
        {
            Regex rg = new Regex(@"^[a-zA-Z\s,]+$");
            if (rg.IsMatch(strToCheck))
                return true;
            else
                return false;
        }

        #endregion Alphabetic validation

        #region WeekDays Validation
        /// <summary>
        /// WeekDays Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private static bool IsWeekDays(string strToCheck)
        {
            string[] weekDays = new string[14] { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat" };
            if (weekDays.Contains(strToCheck))
                return true;
            else
                return false;
        }

        #endregion WeekDays Validation

        #region Picture Validation
        /// <summary>
        /// Image File Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private static bool ImageFileExtension(string strToCheck)
        {
            String[] filename = strToCheck.Split('.');
            int len=filename.Length;
            if (filename[len-1] =="jpg" || filename[len-1] == "jpeg")
                return true;
            else
                return false;
        }

        #endregion  Picture Validation

        #region ValidateType
        /// <summary>
        /// Check whether all columns of table def exists in excel ds
        /// </summary>
        /// <param name="ExcelDS"></param>
        /// <param name="TableDefinitionDS"></param>
        /// <returns>True/False</returns>
        public bool ValidateType(DataSet ExcelDS, DataSet TableDefinitionDS, List<string> excelNotExitingFields,List<string> keyFields)
        {
            bool status = true;
            keyFields = new List<string>();
            try
            {
                DataColumnCollection excelColumns = ExcelDS.Tables[0].Columns;
                foreach (DataRow tableDefRow in TableDefinitionDS.Tables[0].Rows)
                {
                    string tableDefColumnName = tableDefRow["Field_Name"].ToString();
                    keyFields.Add(ExcelDS.Tables[0].Rows[0][tableDefColumnName].ToString());
                    if (excelColumns.Contains(tableDefColumnName))
                    {
                        //status = true;
                    }
                    else
                    {
                        status = false;
                        excelNotExitingFields.Add(tableDefColumnName);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion #region ValidateType

        #endregion ValidationMethods
    }
}