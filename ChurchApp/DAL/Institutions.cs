using Church.DAL;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace ChurchApp.DAL
{
    public class Institutions
    {
        Common commonObj = new Common();

        #region Public Properties
        public string institutionID
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string name
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string address
        {
            get;
            set;
        }
        public string phone1
        {
            get;
            set;
        }
        public string phone2
        {
            get;
            set;
        }
        public string Mobile
        {
            get;
            set;
        }
        public string Email
        {
            get;
            set;
        }
        public string Website
        {
            get;
            set;
        }
        public string Founded
        {
            get;
            set;
        }
        public string Founder
        {
            get;
            set;
        }
        public string imageId
        {
            get;
            set;
        }
        public string albumId
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
        public string results
        {
            get;
            set;
        }
        public string imagepath
        {
            get;
            set;
        }
        #endregion Public Properties

        #region Methods

        #region SelectInstitutions
        /// <summary>
        /// Get All Institutions
        /// </summary>
        /// <returns>Success/Failure</returns>
        public DataSet SelectInstitutions()
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
                cmd.CommandText = "[GetAllInstitutions]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
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
        #endregion SelectInstitutions

        #region SelectInstitutionusing InstituteID
        /// <summary>
        /// Select All Priests
        /// </summary>
        /// <returns>All Priests</returns>
        public void SelectInstituteUsingID()
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
                cmd.CommandText = "[GetInstitute]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(institutionID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    institutionID = dr["ID"].ToString();
                    name = dr["Name"].ToString();
                    description=dr["Desc"].ToString();
                    address = dr["Address"].ToString();
                    Founder = dr["Founder"].ToString();
                    Email = dr["Email"].ToString();
                    phone1=dr["Phone1"].ToString();
                    phone2=dr["Phone2"].ToString();
                    Website = dr["Website"].ToString();
                    if (dr["Founded"].ToString()!="")
                    {
                        Founded = DateTime.Parse(dr["Founded"].ToString().ToString()).ToString("dd-MMM-yyyy");
                    }
                    Mobile = dr["Mobile"].ToString();
                    churchId = dr["ChurchID"].ToString();
                    imagepath = dr["URL"].ToString();
                    albumId = dr["AlbumID"].ToString();
                }

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

        }
        #endregion SelectInstitutionusing InstituteID

        #region InsertInstitution
        /// <summary>
        /// Add New Institution
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertInstitution()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            SqlParameter outParam1 = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertInstitution]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar,-1).Value = name;
                cmd.Parameters.Add("@desc", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar,-1).Value = address;
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = Mobile;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 50).Value = Email;
                cmd.Parameters.Add("@Website", SqlDbType.NVarChar, 100).Value = Website;
                if(Founded!=null&&Founded!="")
                {
                    cmd.Parameters.Add("@Founded", SqlDbType.Date).Value = commonObj.Changeformat(Founded);
                }
                cmd.Parameters.Add("@Founder", SqlDbType.NVarChar, 150).Value = Founder;
                if (albumId != null && albumId != "")
                {
                   cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value= Guid.Parse(albumId);
                }
                if (imageId != null && imageId != "")
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }               
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                outParam1 = cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier);
                outParam1.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
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
            if (outParam1.Value != null)
            {
                institutionID = outParam1.Value.ToString();
            }
            results = outParam.Value.ToString();
            return outParam.Value.ToString();
        }
        #endregion InsertInstitution

        #region UpdateInstitution
        /// <summary>
        /// Update Institution Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateInstitution()
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
                cmd.CommandText = "[UpdateInstitution]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(institutionID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, -1).Value = name;
                cmd.Parameters.Add("@desc", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2;
                cmd.Parameters.Add("@Mobile", SqlDbType.NVarChar, 20).Value = Mobile;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 50).Value = Email;
                cmd.Parameters.Add("@Website", SqlDbType.NVarChar, 100).Value = Website;
                cmd.Parameters.Add("@Founder", SqlDbType.NVarChar, 150).Value = Founder;
                if (Founded != null && Founded != "")
                {
                    cmd.Parameters.Add("@Founded", SqlDbType.DateTime).Value = commonObj.Changeformat(Founded);
                }
                if (albumId != null && albumId != "")
                {
                    cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
                }

                if (imageId != null && imageId != "")
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = commonObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
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
            results = outParam.Value.ToString();
            return outParam.Value.ToString();
        }
        #endregion UpdateInstitution

        #region DeleteInstitution
        /// <summary>
        /// Delete Institution
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteInstitution()
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
                cmd.CommandText = "[DeleteInstitutions]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(institutionID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                if (outParam.Value.ToString() == "1")
                {
                    try
                    {
                        if(imagepath!="")
                        {
                            System.IO.File.Delete(HttpContext.Current.Server.MapPath(imagepath));
                        }
                        

                    }
                    catch (System.IO.IOException e)
                    {
                        throw e;

                    }
                }
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
            return outParam.Value.ToString();
        }
        #endregion DeleteInstitution

        #endregion Methods
    }
}