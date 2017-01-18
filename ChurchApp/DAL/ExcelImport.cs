using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
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

        public DataTable dtError
        {
            get;
            set;
        }
        public int insertedRows
        {
            get;
            set;
        }
        public int updatedRows
        {
            get;
            set;
        }
        public string totalExcelRows
        {
            get;
            set;
        }
        public DataTable dtImportError
        {
            get;
            set;
        }
        public string tableName
        {
            get;
            set;
        }

        public string fileName
        {
            get;
            set;
        }
        public string ExcelConnectionString
        {
            get;
            set;
        }
        public string fileLocation
        {
            get;
            set;
        }
        public string SheetDescription
        {
            get;
            set;
        }
        public string SheetName
        {
            get;
            set;
        }

        public string temporaryFolder { get; set; }
        public HttpRequestBase request
        {
            get;
            set;
        }
        public string ExcelFileName
        {
            get;
            set;
        }
        public List<string> excelNotExitingFields
        {
            get;
            set;
        }
        public int errorCount
        {
            get;
            set;
        }
        public List<Dictionary<string, object>> parentRow
        {
            get;
            set;
        }
        public Dictionary<string, object> childRow
        {
            get;
            set;
        }
        public string status
        {
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
                        DataSet ChurchDS = churchObj.GetAllChurches();                  //To Get ChurchId for Insert Masstimings

                        DataSet dtCloned = DsExisting.Clone();                          //clone datatable                         
                        dtCloned.Tables[0].Columns["Time"].DataType = typeof(string);   //change data type of column
                        foreach (DataRow row in DsExisting.Tables[0].Rows)              //import row to cloned datatable
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
                                    conditions += string.Format("{0} ='{1}' AND ", drw[0].ToString(), dsExcel.Tables[0].Rows[j][drw[0].ToString()].ToString().Replace("'", "''"));
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
                                    String Condition = "Name='" + drExcelrow[0].ToString().Replace("'", "''") + "'and Place='" + drExcelrow[2].ToString() + "'and TownCode='" + drExcelrow[1].ToString() + "'";
                                    DataRow[] drchurch = ChurchDS.Tables[0].Select(Condition); //To find ChurchID from Dataset
                                    masstymObj.massChurchId = drchurch[0][0].ToString();
                                    masstymObj.day = drExcelrow[3].ToString();
                                    masstymObj.massTime = drExcelrow[4].ToString();
                                    masstymObj.InsertMassTiming();
                                    if (masstymObj.status == "1")
                                    {
                                        insertedRows = insertedRows + 1;
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
                            conditions = "";
                            DataRow drExcelrow = dsExcel.Tables[0].Rows[j]; //Checking By Selecting Row by Row
                            foreach (DataRow drw in drkeyfields)          //where condition to find insertion of updation
                            {
                                // conditions += drw[0].ToString() + "='" + dsExcel.Tables[0].Rows[j][drw[0].ToString()] + "' AND ";
                                conditions += string.Format("{0} ='{1}' AND ", drw[0].ToString(), dsExcel.Tables[0].Rows[j][drw[0].ToString()].ToString().Replace("'", "''"));
                            }
                            if (conditions != "")
                            {
                                conditions = conditions.Remove(conditions.Length - 4);             //removing last 4 characters from conditions string       
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
                                            churchObj.churchId = drExisting[0][0].ToString();   //Taking churchId from already taken dataset. 
                                            churchObj.churchName = drExcelrow[0].ToString();
                                            churchObj.townCode = drExcelrow[1].ToString();
                                            churchObj.description = drExcelrow[2].ToString();
                                            churchObj.about = drExcelrow[3].ToString();
                                            churchObj.mainImageId = drExcelrow[4].ToString();
                                            churchObj.address = drExcelrow[5].ToString();
                                            churchObj.phone1 = drExcelrow[6].ToString();
                                            churchObj.phone2 = drExcelrow[7].ToString();
                                            churchObj.MainPriestID = drExcelrow[8].ToString();
                                            churchObj.longitude = drExcelrow[9].ToString();
                                            churchObj.latitude = drExcelrow[10].ToString();
                                            churchObj.ChurchDenomination = drExcelrow[11].ToString(); //-----ChurchDenomination 
                                            churchObj.PriorityOrder = drExcelrow[12].ToString(); //-----ChurchPirority
                                            churchObj.Place = drExcelrow[13].ToString();
                                            churchObj.UpdateChurch();
                                            if (churchObj.status == "1")
                                            {
                                                updatedRows = updatedRows + 1;
                                            }
                                        }
                                        else
                                        {
                                            churchObj.churchName = drExcelrow[0].ToString();
                                            churchObj.townCode = drExcelrow[1].ToString();
                                            churchObj.description = drExcelrow[2].ToString();
                                            churchObj.about = drExcelrow[3].ToString();
                                            churchObj.mainImageId = drExcelrow[4].ToString();
                                            churchObj.address = drExcelrow[5].ToString();
                                            churchObj.phone1 = drExcelrow[6].ToString();
                                            churchObj.phone2 = drExcelrow[7].ToString();
                                            churchObj.MainPriestID = drExcelrow[8].ToString();
                                            churchObj.longitude = drExcelrow[9].ToString();
                                            churchObj.latitude = drExcelrow[10].ToString();
                                            churchObj.ChurchDenomination = drExcelrow[11].ToString(); //-----ChurchDenomination 
                                            churchObj.PriorityOrder = drExcelrow[12].ToString(); //-----ChurchPirority
                                            churchObj.Place = drExcelrow[13].ToString();
                                            churchObj.InsertChurch();
                                            if (churchObj.status == "1")
                                            {
                                                insertedRows = insertedRows + 1;
                                            }
                                        }
                                        break;

                                    case "Priest":
                                        if (IsUpdate)
                                        {
                                            priestObj.priestName = drExcelrow[0].ToString();
                                            priestObj.dob = drExcelrow[1].ToString();
                                            priestObj.dateOrdination = drExcelrow[2].ToString();
                                            priestObj.about = drExcelrow[3].ToString();
                                            priestObj.BaptisumName = drExcelrow[4].ToString();
                                            priestObj.address = drExcelrow[5].ToString();
                                            priestObj.mobile = drExcelrow[6].ToString();
                                            priestObj.Parish = drExcelrow[7].ToString();
                                            priestObj.Diocese = drExcelrow[8].ToString();
                                            priestObj.emailId = drExcelrow[9].ToString();
                                            priestObj.designation = drExcelrow[10].ToString();
                                            priestObj.Status = drExcelrow[11].ToString();
                                            //priestObj.isactive = drExcelrow[12].ToString(); //-----isactive
                                            priestObj.UpdatePriest();
                                            if (priestObj.result == "1")
                                            {
                                                updatedRows = updatedRows + 1;
                                            }
                                        }
                                        else
                                        {
                                            priestObj.priestName = drExcelrow[0].ToString();
                                            priestObj.dob = drExcelrow[1].ToString();
                                            priestObj.dateOrdination = drExcelrow[2].ToString();
                                            priestObj.about = drExcelrow[3].ToString();
                                            priestObj.BaptisumName = drExcelrow[4].ToString();
                                            priestObj.address = drExcelrow[5].ToString();
                                            priestObj.mobile = drExcelrow[6].ToString();
                                            priestObj.Parish = drExcelrow[7].ToString();
                                            priestObj.Diocese = drExcelrow[8].ToString();
                                            priestObj.emailId = drExcelrow[9].ToString();
                                            priestObj.designation = drExcelrow[10].ToString();
                                            priestObj.Status = drExcelrow[11].ToString();
                                            //priestObj.isactive = drExcelrow[12].ToString(); //-----isactive
                                            priestObj.InsertPriest();
                                            if (priestObj.result == "1")
                                            {
                                                insertedRows = insertedRows + 1;
                                            }
                                        }
                                        break;
                                    case "TownMaster":
                                        if (IsUpdate)
                                        {
                                            townObj.code = drExisting[0][0].ToString();
                                            townObj.name = drExcelrow[0].ToString();
                                            townObj.UpdateTownMaster();
                                            if (townObj.status == "1")//update status return 2 while dupilcation,   
                                            {
                                                updatedRows = updatedRows + 1;
                                            }
                                        }
                                        else
                                        {
                                            townObj.name = drExcelrow[0].ToString();
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


        #endregion Methods

        #region ValidationMethods
        public static DataTable resort(DataTable dt)
        {
            dt.DefaultView.Sort = "RowNo asc";
            dt = dt.DefaultView.ToTable();
            return dt;
        }
        #region Validation
        /// <summary>
        /// Excel sheet validation 
        /// </summary>
        /// <param name="ExcelDS"></param>
        /// <param name="TableDefinitionDS"></param>
        /// <returns>True/False</returns>
        public void Validation(DataSet ExcelDS, DataSet TableDefinitionDS)
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
                    for (int i = ExcelDS.Tables[0].Rows.Count - 1; i >= 0; i--)
                    {
                        res = ValidateData(ExcelDS.Tables[0].Rows[i], TableDefinitionDS, i, dtError);
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
        #region ValidateData
        public int ValidateData(DataRow drExcel, DataSet dsTableDef, int rowno, DataTable dtError)
        {
            List<string> errorList = new List<string>();
            List<string> keyFields = new List<string>();
            try
            {

                bool flag = false;

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
                            // if (mandatoryField == "true")
                            //  {
                            flag = true;
                            //  }

                            errorList.Add(tableDefColumnName + "-" + "Invalid Date format");
                        }
                        else if (tableDefFieldType == "A" && !isAlphaNumeric(drExcel[tableDefColumnName].ToString()))
                        {
                            // if (mandatoryField == "true")
                            // {
                            flag = true;
                            //  }
                            errorList.Add(tableDefColumnName + "-" + "Invalid AlphaNumeric character");
                        }
                        else if (tableDefFieldType == "N" && !isNumber(drExcel[tableDefColumnName].ToString()))
                        {
                            //  if (mandatoryField == "true")
                            //  {
                            flag = true;
                            //  }
                            errorList.Add(tableDefColumnName + "-" + "Invalid Number");
                        }
                        else if (tableDefFieldType == "S" && !isString(drExcel[tableDefColumnName].ToString()))
                        {
                            // if (mandatoryField == "true")
                            // {
                            flag = true;
                            // }
                            errorList.Add(tableDefColumnName + "-" + "Invalid String");
                        }
                        else if (tableDefFieldType == "E" && !isEmail(drExcel[tableDefColumnName].ToString()))
                        {
                            // if (mandatoryField == "true")
                            // {
                            flag = true;
                            // }
                            errorList.Add(tableDefColumnName + "-" + "Invalid Email");
                        }
                        else if (tableDefFieldType == "M" && !isMobile(drExcel[tableDefColumnName].ToString()))
                        {
                            // if (mandatoryField == "true")
                            // {
                            flag = true;
                            // }
                            errorList.Add(tableDefColumnName + "-" + "Invalid Phone Number");
                        }
                        else if (tableDefFieldType == "T" && !isValidDateAndTime(drExcel[tableDefColumnName].ToString()))
                        {
                            // if (mandatoryField == "true")
                            // {
                            flag = true;
                            // }
                            errorList.Add(tableDefColumnName + "-" + "Invalid Time");
                        }
                        else if (tableDefFieldType == "W" && !IsWeekDays(drExcel[tableDefColumnName].ToString()))
                        {
                            // if (mandatoryField == "true")
                            // {
                            flag = true;
                            // }
                            errorList.Add(tableDefColumnName + "-" + "Invalid Day");
                        }
                        //------------------------------Field size checking-----------------------//


                        if (tableDefFieldSize != null && tableDefFieldSize != "")
                        {

                            int tableDefLength = Convert.ToInt32(tableDefFieldSize);
                            int excelColLength = drExcel[tableDefColumnName].ToString().Length;
                            if (tableDefLength < excelColLength)
                            {
                                // if (mandatoryField == "true")
                                // {
                                flag = true;
                                //}

                                errorList.Add(tableDefColumnName + "-" + "Invalid Field Size");
                            }
                        }
                    }

                }


                if (flag == true)
                {
                    DataRow dr = dtError.NewRow();
                    dr["RowNo"] = rowno;
                    dr["FieldName"] = keyFields;
                    dr["ErrorDesc"] = errorList;
                    dtError.Rows.Add(dr);
                    rowno = rowno + 2;
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