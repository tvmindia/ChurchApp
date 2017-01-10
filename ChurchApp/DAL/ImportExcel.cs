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
    public class ImportExcel
    {

        #region Public Properties

        public string insertedRows
        {
            get;
            set;
        }
        public string updatedRows
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

            
                using (OleDbDataAdapter dataAdapter = new OleDbDataAdapter(command.CommandText, excelConnection1))
                {
                    dataAdapter.Fill(dsFile);
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
                if ((dt.Rows.Count >0) && (dt != null))
                {
                    excelSheets = new String[dt.Rows.Count];
                    int t = 0;
                    foreach (DataRow row in dt.Rows)
                    {
                        if ("'" + FileDescriptionSheetName + "$" + "'" == row["TABLE_NAME"].ToString())
                        {
                            SheetDescription = row["TABLE_NAME"].ToString();
                            SheetDescription = SheetDescription.TrimEnd('$');
                        }
                        else
                        {
                            SheetName = row["TABLE_NAME"].ToString();
                            SheetName = SheetName.TrimEnd('$');
                        }
                        excelSheets[t] = row["TABLE_NAME"].ToString();
                        t++;
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
                cmd.Parameters.Add("@TableName", SqlDbType.NVarChar,100).Value = tableName;
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
        public string ExcelImport()
        {
            return "";
        }
        #endregion ImportData
        #endregion Methods

        #region ValidationMethods
        #region Validation
        /// <summary>
        /// Excel sheet validation 
        /// </summary>
        /// <param name="ExcelDS"></param>
        /// <param name="TableDefinitionDS"></param>
        /// <returns>True/False</returns>
        public DataTable Validation(DataSet ExcelDS,DataSet TableDefinitionDS)
        {
            DataTable dtError = CreateErrorTable();
            bool status = true;
            int res;
            try
            {
             
                excelNotExitingFields = new List<string>();
                status = ValidateType(ExcelDS, TableDefinitionDS, excelNotExitingFields);
                if(status==true)
                {
                    for (int i = ExcelDS.Tables[0].Rows.Count-1; i >= 0; i--)
                    {
                        res = ValidateData(ExcelDS.Tables[0].Rows[i], TableDefinitionDS, i, dtError);
                        if(res==-1)
                        {
                            errorCount = errorCount + 1;
                        }
                    }
                   
                }     
                else
                {
                    DataRow dr = dtError.NewRow();
                    dr["RowNo"] = "";
                    dr["FieldName"] = excelNotExitingFields.ToString();
                    dr["ErrorDesc"] = "column(s) doesnot exists in excel template";
                    dtError.Rows.Add(dr);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return dtError;
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
                        //DataRow dr = dtError.NewRow();
                        //dr["RowNo"] = rowno;
                        //dr["FieldName"] = FieldName;
                        //dr["ErrorDesc"] = "Field Is Empty";
                        //dtError.Rows.Add(dr);
                        errorList.Add(FieldName + "-" + "Field Is Empty");
                    }
                    if (isKeyField == "Y" && drExcel[FieldName].ToString()!=string.Empty)
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
                    

                    if (drExcel[tableDefColumnName].ToString().Trim() != "" && !string.IsNullOrEmpty(drExcel[tableDefColumnName].ToString()))
                    {
                    if (tableDefFieldType == "D" && !ValidateDate(drExcel[tableDefColumnName].ToString()))
                    {
                        flag = true;
                        errorList.Add(tableDefColumnName + "-" + "Invalid Date format");
                        //DataRow dr = dtError.NewRow();
                        //dr["RowNo"] = rowno;
                        //dr["FieldName"] = tableDefColumnName;
                        //dr["ErrorDesc"] = "Invalid Date format";
                        //dtError.Rows.Add(dr);
                    }
                    else if (tableDefFieldType == "A" && !isAlphaNumeric(drExcel[tableDefColumnName].ToString()))
                    {
                        flag = true;
                        errorList.Add(tableDefColumnName + "-" + "Invalid AlphaNumeric character");
                        //DataRow dr = dtError.NewRow();
                        //dr["RowNo"] = rowno;
                        //dr["FieldName"] = tableDefColumnName;
                        //dr["ErrorDesc"] = "Invalid AlphaNumeric character";
                        //dtError.Rows.Add(dr);
                    }
                    else if (tableDefFieldType == "N" && !isNumber(drExcel[tableDefColumnName].ToString()))
                    {
                        flag = true;
                        errorList.Add(tableDefColumnName + "-" + "Invalid Number");
                        //DataRow dr = dtError.NewRow();
                        //dr["RowNo"] = rowno;
                        //dr["FieldName"] = tableDefColumnName;
                        //dr["ErrorDesc"] = "Invalid Number";
                        //dtError.Rows.Add(dr);
                    }
                    else if (tableDefFieldType == "S" && !isString(drExcel[tableDefColumnName].ToString()))
                    {
                        flag = true;
                        errorList.Add(tableDefColumnName + "-" + "Invalid String");
                        //DataRow dr = dtError.NewRow();
                        //dr["RowNo"] = rowno;
                        //dr["FieldName"] = tableDefColumnName;
                        //dr["ErrorDesc"] = "Invalid String";
                        //dtError.Rows.Add(dr);
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
                            //DataRow dr = dtError.NewRow();
                            //dr["RowNo"] = rowno;
                            //dr["FieldName"] = tableDefColumnName;
                            //dr["ErrorDesc"] = "Invalid Field Size";
                            //dtError.Rows.Add(dr);
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
            catch(Exception ex)
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
            Regex rg = new Regex(@"^[a-zA-Z\s.,0-9@#$%*():;""'/?!+=_-]{1,30}$");
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
            Regex rg = new Regex(@"^[a-zA-Z\s\.]+$");
            if (rg.IsMatch(strToCheck))
                return true;
            else
                return false;
        }

        #endregion String Validation

        #region Numeric Validation
        /// <summary>
        /// Numeric Validation
        /// </summary>
        /// <param name="strToCheck"></param>
        /// <returns></returns>
        private bool isNumber(string strToCheck)
        {
            Regex rg = new Regex(@"^[0-9\s,]+$");
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

        #region ValidateType
        /// <summary>
        /// Check whether all columns of table def exists in excel ds
        /// </summary>
        /// <param name="ExcelDS"></param>
        /// <param name="TableDefinitionDS"></param>
        /// <returns>True/False</returns>
        public bool ValidateType(DataSet ExcelDS, DataSet TableDefinitionDS, List<string> excelNotExitingFields)
        {
            bool status = true;
            try
            {
                DataColumnCollection excelColumns = ExcelDS.Tables[0].Columns;
                foreach (DataRow tableDefRow in TableDefinitionDS.Tables[0].Rows)
               {
                   string tableDefColumnName = tableDefRow["Field_Name"].ToString();
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
            catch(Exception ex)
            {
                throw ex;
            }
            return status;
        }

        #endregion #region ValidateType
        #endregion ValidationMethods
    }
}