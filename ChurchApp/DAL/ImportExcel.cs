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

        #endregion Methods

        /// <summary>
        /// Excel sheet validation 
        /// </summary>
        /// <param name="ExcelDS"></param>
        /// <param name="TableDefinitionDS"></param>
        /// <returns>True/False</returns>
        public bool Validation(DataSet ExcelDS,DataSet TableDefinitionDS)
        {
            DataTable dtError = CreateErrorTable();
            bool status = true;
            int res;
            try
            {
                DataSet ErrorDs = new DataSet();
                excelNotExitingFields = new List<string>();
                status = ValidateType(ExcelDS, TableDefinitionDS, excelNotExitingFields);
                if(status==true)
                {
                    for (int i = ExcelDS.Tables[0].Rows.Count - 1; i >= 0; i--)
                    {
                        res = ValidateData(ExcelDS.Tables[0].Rows[i], TableDefinitionDS, i, dtError);
                        if(res==-1)
                        {
                            errorCount = errorCount + 1;
                        }
                    }
                   
                }             
            }
            catch(Exception ex)
            {
                throw ex;
            }
                return status;
        }

        public int ValidateData(DataRow drExcel, DataSet dsTableDef, int rowno, DataTable dtError)
        {
           
            DataSet dsError = new DataSet();
            try
            {
                StringBuilder keyFieldLists = new StringBuilder();
                StringBuilder errorDescLists = new StringBuilder();
                bool flag = true;
                string comma = "";

                //----------------------Manadatory Fields Checking-------------------//
                DataRow[] mandatoryFields = dsTableDef.Tables[0].Select("IsMandatory='true'");

                foreach (var item in mandatoryFields)
                {
                    string FieldName = item["Field_Name"].ToString();
                    string FieldDataType = item["Field_Type"].ToString();

                    if (drExcel[FieldName].ToString().Trim() == "" || string.IsNullOrEmpty(drExcel[FieldName].ToString()))
                    {
                        flag = true;
                        DataRow dr = dtError.NewRow();
                        dr["RowNo"] = rowno;
                        dr["FieldName"] = FieldName;
                        dr["ErrorDesc"] = "Field Is Empty";
                        dtError.Rows.Add(dr);

                    }
                }

                //-------------------- Field type checking-------------------------//

                foreach (DataRow tableDefRow in dsTableDef.Tables[0].Rows)
                {
                    string tableDefFieldType = tableDefRow["Field_Type"].ToString();
                    string tableDefColumnName = tableDefRow["Field_Name"].ToString();

                    if (tableDefFieldType == "D" && !ValidateDate(drExcel[tableDefColumnName].ToString()))
                    {
                        flag = true;
                        //errorDescLists.Append(comma);
                        //errorDescLists.Append(tableDefColumnName);
                        //errorDescLists.Append("is Invalid");
                        //comma = ",";
                        DataRow dr = dtError.NewRow();
                        dr["RowNo"] = rowno;
                        dr["FieldName"] = tableDefColumnName;
                        dr["ErrorDesc"] = "Invalid Date format";
                        dtError.Rows.Add(dr);
                    }
                    else if (tableDefFieldType == "A" && !isAlphaNumeric(drExcel[tableDefColumnName].ToString()))
                    {
                        flag = true;
                        //errorDescLists.Append(comma);
                        //errorDescLists.Append(tableDefColumnName);
                        //errorDescLists.Append(" is invalid");
                        //comma = ",";
                        DataRow dr = dtError.NewRow();
                        dr["RowNo"] = rowno;
                        dr["FieldName"] = tableDefColumnName;
                        dr["ErrorDesc"] = "Invalid AlphaNumeric character";
                        dtError.Rows.Add(dr);
                    }
                    else if (tableDefFieldType == "N" && !isNumber(drExcel[tableDefColumnName].ToString()))
                    {
                        flag = true;
                        //errorDescLists.Append(comma);
                        //errorDescLists.Append(tableDefColumnName);
                        //errorDescLists.Append(" is invalid");
                        //comma = ",";
                        DataRow dr = dtError.NewRow();
                        dr["RowNo"] = rowno;
                        dr["FieldName"] = tableDefColumnName;
                        dr["ErrorDesc"] = "Invalid Number";
                        dtError.Rows.Add(dr);
                    }
                    else if (tableDefFieldType == "S" && !isAlphaNumeric(drExcel[tableDefColumnName].ToString()))
                    {
                        flag = true;
                        //errorDescLists.Append(comma);
                        //errorDescLists.Append(tableDefColumnName);
                        //errorDescLists.Append(" is invalid");
                        //comma = ",";
                        DataRow dr = dtError.NewRow();
                        dr["RowNo"] = rowno;
                        dr["FieldName"] = tableDefColumnName;
                        dr["ErrorDesc"] = "Invalid String";
                        dtError.Rows.Add(dr);
                    }


                    //------------------------------Field size checking-----------------------//

                    DataRow[] NotNullSizeFields = dsTableDef.Tables[0].Select("[Field_Size] is not null");

                    //int i = 0;
                    foreach (var item in NotNullSizeFields)
                    {

                        int tableDefLength = Convert.ToInt32(item["Field_Size"]);
                        string colName = item["Field_Name"].ToString();
                        int excelColLength = drExcel[colName].ToString().Length;
                        if (tableDefLength < excelColLength)
                        {
                            flag = true;
                            //errorDescLists.Append(comma);
                            //errorDescLists.Append(tableDefColumnName);
                            //errorDescLists.Append(" is invalid");
                            //comma = ",";
                            DataRow dr = dtError.NewRow();
                            dr["RowNo"] = rowno;
                            dr["FieldName"] = tableDefColumnName;
                            dr["ErrorDesc"] = "Invalid Field Size";
                            dtError.Rows.Add(dr);
                        }
                        //i = i + 1;
                    }
                }

                
               
                if (flag == true)
                {
                    rowno = rowno + 2;
                    //code to insert data to error ds
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

        /// <summary>
        /// Create datatable for Error Descriptions
        /// </summary>
        /// <returns></returns>
        public DataTable CreateErrorTable()
        {
            DataTable dtTemp = new DataTable();
            dtTemp.Columns.Add(new DataColumn("RowNo", typeof(int)));
            dtTemp.Columns.Add(new DataColumn("FieldName", typeof(string)));
            dtTemp.Columns.Add(new DataColumn("ErrorDesc", typeof(string)));
            return dtTemp;
        }
        #region ValidateData
        /// <summary>
        /// Validate excel type,max size and mandatory fields
        /// </summary>
        /// <param name="ExcelDS"></param>
        /// <param name="TableDefinitionDS"></param>
        /// <param name="ErrorDs"></param>
        /// <returns>True/False</returns>
        public bool ValidateDataOld(DataSet ExcelDS, DataSet TableDefinitionDS,DataSet ErrorDs)
        {
            bool typeStatus = true;
            try
            {


                foreach (DataRow excelRow in ExcelDS.Tables[0].Rows)
                {
                    
                    foreach (DataRow tableDefRow in TableDefinitionDS.Tables[0].Rows)
                    {
                         string tableDefFieldType = tableDefRow["Field_Type"].ToString();
                        string tableDefColumnName = tableDefRow["Field_Name"].ToString();

                        //----------------------Manadatory Fields Checking-------------------//

                        DataRow[] mandatoryFields = TableDefinitionDS.Tables[0].Select("IsMandatory='1'");

                        foreach(var item in mandatoryFields)
                        {
                            string excelColName = item["Field_Name"].ToString();

                            if (excelRow[excelColName].ToString().Trim() == "" || string.IsNullOrEmpty(excelRow[excelColName].ToString()))
                            {
                                ErrorDs.Tables[0].ImportRow(excelRow);
                            }
                        }

               

                        //-------------------- Field type checking-------------------------//

                       
                   
                        if (tableDefFieldType == "D" && !ValidateDate(excelRow[tableDefColumnName].ToString()))
                        {
                            ErrorDs.Tables[0].ImportRow(excelRow);
                        }
                        else if (tableDefFieldType == "A" && !isAlphaNumeric(excelRow[tableDefColumnName].ToString()))
                        {
                            ErrorDs.Tables[0].ImportRow(excelRow);
                        }
                        else if (tableDefFieldType == "N" && !isNumber(excelRow[tableDefColumnName].ToString()))
                        {
                            ErrorDs.Tables[0].ImportRow(excelRow);
                        }
                        else if (tableDefFieldType == "S" && !isAlphaNumeric(excelRow[tableDefColumnName].ToString()))
                        {
                            ErrorDs.Tables[0].ImportRow(excelRow);
                        }

                        //------------------------------Field size checking-----------------------//

                        DataRow[] NotNullSizeFields = TableDefinitionDS.Tables[0].Select("[Field_Size] is not null");
                        

                        foreach(var item in NotNullSizeFields)
                        {
                            int i = 0;
                            int tableDefLength =Convert.ToInt32(tableDefRow["Field_Size"]);
                            int excelColLength = item.Table.Columns[i].MaxLength;
                            if(tableDefLength!=excelColLength)
                            {
                                ErrorDs.Tables[0].ImportRow(excelRow);
                            }
                            i = i + 1;
                        }
                    }
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return typeStatus;
        }
        #endregion ValidateData


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
                foreach (DataRow tableDefRow in TableDefinitionDS.Tables[0].Rows)
               {
                   string tableDefColumnName = tableDefRow["Field_Name"].ToString();
                   DataColumnCollection excelColumns = ExcelDS.Tables[0].Columns;
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

    }
}