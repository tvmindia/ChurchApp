using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
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
                    conditions += "[" + dr["Field_Description"].ToString() + "]" + " IS NOT NULL OR ";
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
                if ((dt.Rows.Count == 2) && (dt != null))
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


        public bool Validation(DataSet ExcelDS,DataSet TableDefinitionDS)
        {
            bool status = true;
            try
            {
                ValidateType(ExcelDS, TableDefinitionDS,status);
                if(status==true)
                {
                    ValidateData(ExcelDS, TableDefinitionDS);
                }             
            }
            catch(Exception ex)
            {
                throw ex;
            }
                return status;
        }

        #region ValidateData
        public bool ValidateData(DataSet ExcelDS, DataSet TableDefinitionDS)
        {
            bool status = true;
            try
            {
                ValidateDataType(ExcelDS,TableDefinitionDS,status);
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return status;
        }
        #endregion ValidateData

        #region ValidateDataType
        public bool ValidateDataType(DataSet ExcelDS, DataSet TableDefinitionDS,bool typeStatus)
        {
            try
            {
              
            }
            catch(Exception ex)
            {
                throw ex;
            }

            return typeStatus;
        }
        #endregion ValidateDataType

        #region ValidateType
        public bool ValidateType(DataSet ExcelDS, DataSet TableDefinitionDS, bool status)
        {
           
            excelNotExitingFields = new List<string>();
            try
            {
                foreach (DataColumn tableDefColumn in TableDefinitionDS.Tables[0].Columns)
               {
                   string tableDefColumnName = tableDefColumn.ColumnName;
                   DataColumnCollection excelColumns = ExcelDS.Tables[0].Columns;
                   if (excelColumns.Contains(tableDefColumnName))
                   {
                       status = true;
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