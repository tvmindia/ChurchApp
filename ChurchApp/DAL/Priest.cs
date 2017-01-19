using Church.DAL;
using System;
using System.Data;
using System.Data.SqlClient;

namespace ChurchApp.DAL
{
    public class Priest
    {
        Common commonObj = new Common();
        #region Public Properties
        public string priestID
        {
            get;
            set;
        }
        public string priestName
        {
            get;
            set;
        }
        public string BaptisumName
        {
            get;
            set;
        }
        public string Parish
        {
            get;
            set;
        }
        public string Diocese
        {
            get;
            set;
        }
        public string Status
        {
            get;
            set;
        }
        public string dob
        {
            get;
            set;
        }
        public string about
        {
            get;
            set;
        }
        public string dateOrdination
        {
            get;
            set;
        }
        public string designation
        {
            get;
            set;
        }
        public string address
        {
            get;
            set;
        }
        public string emailId
        {
            get;
            set;
        }
        public string mobile
        {
            get;
            set;
        }
        public string imageId
        {
            get;
            set;
        }
        public string imagePath
        {
            get;
            set;
        }
        public string churchID
        {
            get;
            set;
        }
        public string createdBy
        {
            get;
            set;
        }
        public DateTime createdDate
        {
            get;
            set;
        }
        public string updatedBy
        {
            get;
            set;
        }
        public DateTime updatedDate
        {
            get;
            set;
        }
        public string result
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region SelectPriests
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public DataSet SelectPriests()
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
                cmd.CommandText = "[GetAllPriests]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
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
        #endregion SelectPriests

        #region GetAllPriestsIDAndText
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public DataSet GetAllPriestsIDAndText()
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
                cmd.CommandText = "[GetAllPriestsIDAndText]";
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
        #endregion GetAllPriestsIDAndText

        #region SelectPriestsAutocomplete
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public DataTable SelectPriestsAutocomplete()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetPriestsAutocomplete]";
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
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
            return dt;
        }
        #endregion SelectPriestsAutocomplete

        #region SelectPriestsUsingPriestID
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public void SelectPriestsUsingPriestID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetPriests]";
                cmd.Parameters.Add("@priestID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    priestID = dr["ID"].ToString();
                    priestName = dr["Name"].ToString();
                    BaptisumName = dr["BaptismalName"].ToString();
                    Parish = dr["Parish"].ToString();
                    Diocese = dr["Diocese"].ToString();
                    Status = dr["Status"].ToString();
                    churchID = dr["ChurchID"].ToString();
                    if (dr["DOB"].ToString()!="")
                    {
                        dob = (DateTime.Parse(dr["DOB"].ToString().ToString()).ToString("dd-MMM-yyyy"));
                    }
                    else
                    {
                        dob = "";
                    }
                    address=dr["Address"].ToString();
                    mobile = dr["Mobile"].ToString();
                    emailId = dr["Email"].ToString();
                    imageId = dr["ImageID"].ToString();
                    imagePath = dr["URL"].ToString();
                    about = dr["About"].ToString();
                    if (dr["DateOrdination"].ToString()!="")
                    {
                        dateOrdination = (DateTime.Parse(dr["DateOrdination"].ToString()).ToString("dd-MMM-yyyy"));
                    }
                    else
                    {
                        dateOrdination = "";
                    }
                    designation = dr["Designation"].ToString();
                }

            }
            catch (Exception ex)
            {
                result = ex.Message;
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
           
        }
        #endregion SelectPriestsUsingPriestID

        //#region InsertPriest
        ///// <summary>
        ///// Add new Priest
        ///// </summary>
        ///// <returns>Success/Failure</returns>
        //public void InsertPriest()
        //{
        //    dbConnection dcon = null;
        //    SqlCommand cmd = null;
        //    SqlParameter outParam = null;
        //    try
        //    {
        //        dcon = new dbConnection();
        //        dcon.GetDBConnection();
        //        cmd = new SqlCommand();
        //        cmd.Connection = dcon.SQLCon;
        //        cmd.CommandType = CommandType.StoredProcedure;
        //        cmd.CommandText = "[InsertPriest]";
        //      //  cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
        //        cmd.Parameters.Add("@Name", SqlDbType.NVarChar,150).Value = priestName;
        //        cmd.Parameters.Add("@BaptismName", SqlDbType.NVarChar, 150).Value = BaptisumName;
        //        cmd.Parameters.Add("@Parish", SqlDbType.NVarChar, 150).Value = Parish;
        //        cmd.Parameters.Add("@Diocese", SqlDbType.NVarChar, 150).Value = Diocese;
        //        cmd.Parameters.Add("@Status", SqlDbType.NVarChar, 150).Value = Status;
        //        if(dob!="")
        //        {
        //            cmd.Parameters.Add("@DOB", SqlDbType.Date).Value = commonObj.Changeformat(dob);
        //        }
                
        //        cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about;
        //        if(dateOrdination!="")
        //        {
        //            cmd.Parameters.Add("@DateOrdination", SqlDbType.Date).Value = commonObj.Changeformat(dateOrdination);
        //        }
        //        cmd.Parameters.Add("@Designation", SqlDbType.NVarChar, 150).Value = designation;
        //        cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
        //        cmd.Parameters.Add("@Email", SqlDbType.NVarChar,255).Value = emailId;
        //        cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = mobile;
        //        cmd.Parameters.Add("@IsActive", SqlDbType.Bit).Value = true;
        //        cmd.Parameters.Add("@IsDeleted", SqlDbType.Bit).Value = false;
        //        cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
        //        if (imageId != null)
        //        {
        //            cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
        //        }
        //        cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
        //        cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value =commonObj.ConvertDatenow(DateTime.Now);
        //        outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
        //        outParam.Direction = ParameterDirection.Output;
        //        cmd.ExecuteNonQuery();
        //    }
        //    catch (Exception ex)
        //    {
        //        result = ex.Message;
        //        throw ex;
        //    }
        //    finally
        //    {
        //        if (dcon.SQLCon != null)
        //        {
        //            dcon.DisconectDB();
        //        }
        //    }
        //    result= outParam.Value.ToString();
        //}
        //#endregion InsertPriest

        #region VicarExist
        public void VicarExistornot()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[PriestExistornot]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
                outParam = cmd.Parameters.Add("@ExistStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                result = ex.Message;
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            result = outParam.Value.ToString();
        }
        #endregion VicarExist

        #region InsertPriest
        public void InsertPriest()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null, outparamID = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertPriest]";
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = priestName!=null&&priestName!=""?priestName:null;           
                if (dob != "") {
                    cmd.Parameters.Add("@DOB", SqlDbType.Date).Value = commonObj.Changeformat(dob);
                }
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about != null && about != "" ? about : null;
                if (dateOrdination != "") {
                    cmd.Parameters.Add("@DateOrdination", SqlDbType.Date).Value = commonObj.Changeformat(dateOrdination);
                }
                cmd.Parameters.Add("@Designation", SqlDbType.NVarChar, 150).Value = designation != null && designation != "" ? designation : null;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address != null && address != "" ? address : null;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = emailId != null && emailId != "" ? emailId : null;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = mobile != null && mobile != "" ? mobile : null;
                if (churchID != null)  {
                    cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
                }
                if (imageId != null)   {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy != null && createdBy != "" ? createdBy : null;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                cmd.Parameters.Add("@BaptismName", SqlDbType.NVarChar, 150).Value = BaptisumName != null && BaptisumName != "" ? BaptisumName : null;
                cmd.Parameters.Add("@Parish", SqlDbType.NVarChar, 150).Value = Parish != null && Parish != "" ? Parish : null;
                cmd.Parameters.Add("@Diocese", SqlDbType.NVarChar, 150).Value = Diocese != null && Diocese != "" ? Diocese : null;
                cmd.Parameters.Add("@Status", SqlDbType.NVarChar, 150).Value = Status != null && Status != "" ? Status : null;

                outparamID = cmd.Parameters.Add("@OutID", SqlDbType.UniqueIdentifier);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                outparamID.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                result = ex.Message;
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            result = outParam.Value.ToString();
            priestID = outparamID.Value.ToString();
        }
        #endregion InsertPriest

        #region UpdatePriest
        /// <summary>
        /// Update Priest
        /// </summary>
        /// <returns>Success/Failure</returns>
        public void UpdatePriest()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdatePriest]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = priestName!=null&&priestName!=""?priestName:null;
                cmd.Parameters.Add("@BaptismName", SqlDbType.NVarChar, 150).Value = BaptisumName!=null&&BaptisumName!=""?BaptisumName:null;
                cmd.Parameters.Add("@Parish", SqlDbType.NVarChar, 150).Value = Parish!=null&&Parish!=""?Parish:null;
                cmd.Parameters.Add("@Diocese", SqlDbType.NVarChar, 150).Value = Diocese!=null&&Diocese!=""?Diocese:null;
                cmd.Parameters.Add("@Status", SqlDbType.NVarChar, 150).Value = Status!=null&&Status!=""?Status:null;
                if(dob!="")
                {
                    cmd.Parameters.Add("@DOB", SqlDbType.Date).Value =commonObj.Changeformat(dob);
                }                
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about!=null&&about!=""?about:null;
                if(dateOrdination!="")
                {
                    cmd.Parameters.Add("@DateOrdination", SqlDbType.Date).Value =commonObj.Changeformat(dateOrdination);
                }                
                cmd.Parameters.Add("@Designation", SqlDbType.NVarChar, 150).Value = designation!=null&&designation!=""?designation:null;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address!=null&&address!=""?address:null;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 255).Value = emailId!=null&&emailId!=""?emailId:null;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = mobile!=null&&mobile!=""?mobile:null;
                if (churchID != null)
                {
                    cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
                }
                if (imageId != null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy!=null&&updatedBy!=""?updatedBy:null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                result = ex.Message;
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            result=outParam.Value.ToString();
        }
        #endregion UpdatePriest

        #region DeletePriest
        /// <summary>
        /// Delete Priest
        /// </summary>
        /// <returns>Success/Failure</returns>
        public void DeletePriest()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeletePriest]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                result = ex.Message;
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            result= outParam.Value.ToString();
        }
        #endregion DeletePriest

        #region UpdateChurchIDPriest
        /// <summary>
        /// Update ChurchID for seleted Priest
        /// </summary>
        /// <returns>Success/Failure</returns>
        public void UpdateChurchIDPriest()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateChurchIDPriest]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(priestID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchID);
                cmd.Parameters.Add("@Status", SqlDbType.NVarChar, 50).Value = Status!=null&&Status!=""?Status:null;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy!=null&&updatedBy!=""?updatedBy:null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                result = ex.Message;
                throw ex;
            }
            finally
            {
                if (dcon.SQLCon != null)
                {
                    dcon.DisconectDB();
                }
            }
            result= outParam.Value.ToString();
        }
        #endregion UpdateChurchIDPriest

        #endregion Methods
    }
}