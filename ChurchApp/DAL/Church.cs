﻿using Church.DAL;
using System;
using System.Data;
using System.Data.SqlClient;

using System.Net;
using System.Text;
using System.IO;
using System.Configuration;

using System.Web.Script.Serialization;

namespace ChurchApp.DAL
{
    public class Church
    {      
        public Common comnObj = new Common();
        public AppImages appImagesObj;

        #region Public Properties

        public string churchId
        {
            get;
            set;
        }
        public string churchName
        {
            get;
            set;
        }
        public string ChurchStatusName
        {
            get;
            set;
        }
        public string ChurchRite
        {
            get;
            set;
        }
        public string townCode
        {
            get;
            set;
        }
        public string description
        {
            get;
            set;
        }
        public string about
        {
            get;
            set;
        }
        public string mainImageId
        {
            get;
            set;
        }
        public string DioceseID
        {
            get;
            set;
        }
        public string ForaneID
        {
            get;
            set;
        }
        public string StatusID
        {
            get;
            set;
        }
        public string ImagePath
        {
            get;
            set;
        }
        
        public string NickName
        {
            get;
            set;
        }
        public string ImageID
        {
            get;
            set;
        }
        public string address
        {
            get;
            set;
        }
        public string latitude
        {
            get;
            set;
        }
        public string longitude
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
        public string isDelete
        {
            get;
            set;
        }
        public string MainPriestID
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
        public string status
        {
            get;
            set;
        }
        public string townName
        {
            get;
            set;
        }
        public string SearchTerm
        {
            get;
            set;
        }
        public Boolean IsHome
        {
            get;
            set;
        }
        public string Email
        {
            get;
            set;
        }
        public string Remarks
        {
            get;
            set;
        }
        public string Place
        {
            get;
            set;
        }
        public string UserName
        {
            get;
            set;
        }
        public string UserContact
        {
            get;
            set;
        }
        public int RequestStatus
        {
            get;
            set;
        }
        public string ChurchDenomination { get; set; }
        public string PriorityOrder { get; set; }

        #endregion Public Properties

        #region Church Methods     

        #region SelectChurches
        /// <summary>
        /// Selects all Churches
        /// </summary>
        /// <returns>All Churches</returns>
        public DataSet SelectChurches()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {

                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllChurch]";
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
        #endregion SelectChurches

        #region SelectAllChurches
        /// <summary>
        /// Selects all Churches
        /// </summary>
        /// <returns>All Churches</returns>
        public DataSet SelectChurches1()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {

                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectAllChurches]";
                cmd.Parameters.Add("@TownName", SqlDbType.NVarChar, 150).Value = SearchTerm;
                cmd.Parameters.Add("@Church", SqlDbType.NVarChar, 150).Value = SearchTerm;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = SearchTerm;
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
        #endregion SelectAllChurches

        #region SelectTopChurches
        /// <summary>
        /// Selects all Churches
        /// </summary>
        /// <returns>All Churches</returns>
        public DataSet SelectTopChurches()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {

                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectTopChurches]";
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
        #endregion SelectTopChurches

        #region SelectChurchRequests
        public DataSet SelectAllChurchesRequest()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {

                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectAllChurchesRequest]";
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
        #endregion SelectChurchRequests

        #region Get RequestChurch Details By churchID

        public DataTable GetRequestChurchDetailsByChurchID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetRequestChurchDetailsByChurchID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
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

        #endregion Get RequestChurch Details By churchID

        #region InsertRequestChurch for App
        /// <summary>
        /// Insert Request New Church
        /// </summary>
        /// <returns>success or failure</returns>
        public string InsertRequestChurch()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null, outchurchid = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertRequestChurch]";
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = churchName != null && churchName != "" ? churchName : null;
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address != null && address != "" ? address : null;
                cmd.Parameters.Add("@Place", SqlDbType.NVarChar, 50).Value = Place!=null&&Place!=""?Place:null;
                cmd.Parameters.Add("@User", SqlDbType.NVarChar, 50).Value = UserName!=null&&UserName!=""?UserName:null;
                cmd.Parameters.Add("@UserContact", SqlDbType.NVarChar, 50).Value = UserContact!=null&&UserContact!=""?UserContact:null;
                cmd.Parameters.Add("@Remarks", SqlDbType.NVarChar, 50).Value = Remarks!=null&&Remarks!=""?Remarks:null;
                cmd.Parameters.Add("@Email", SqlDbType.NVarChar, 50).Value = Email!=null&&Email!=""?Email:null;
                cmd.Parameters.Add("@ImagePath", SqlDbType.NVarChar, 150).Value = ImagePath!=null&&ImagePath!=""?ImagePath:null;
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = ImageID!=null&&ImageID!=""?Guid.Parse(ImageID):Guid.NewGuid();
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now); 
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outchurchid = cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier);
                outchurchid.Direction = ParameterDirection.Output;
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            churchId = outchurchid.Value.ToString();
            status = outParameter.Value.ToString();
            return status;

        }
        #endregion InsertRequestChurch for App

        #region UpdateRequestChurch
        /// <summary>
        /// Edit Church
        /// </summary>
        /// <returns>success or failure</returns>
        public string UpdateRequestChurch()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;

            try
            {

                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateRequestChurch]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Status", SqlDbType.Int).Value = RequestStatus;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy!=null&&updatedBy!=""?updatedBy:null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
                outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            status = outParameter.Value.ToString();
            return outParameter.Value.ToString();

        }
        #endregion UpdateRequestChurch

        #region InsertChurch
        /// <summary>
        /// Insert New Church
        /// </summary>
        /// <returns>success or failure</returns>
        public void InsertChurch()
        {           
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null,outchurchid=null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertChurch]";
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = churchName!=null&&churchName!=""?churchName:null;
                cmd.Parameters.Add("@NickName", SqlDbType.NVarChar, 150).Value = NickName != null && NickName != "" ? NickName : null;
                cmd.Parameters.Add("@TownCode", SqlDbType.NVarChar, 10).Value = townCode!=null&&townCode!=""?townCode:null;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description!=null&&description!=""?description:null;
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about!=null&&about!=""?about:null;
                if (mainImageId!=null && mainImageId!="")
                {
                    cmd.Parameters.Add("@MainImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(mainImageId);
                }
             
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address!=null&&address!=""?address:null;
                if(latitude!=null&&latitude!="")
                {
                     cmd.Parameters.Add("@Latitude", SqlDbType.Decimal).Value = Math.Truncate(Decimal.Parse(latitude) * 1000000m) / 1000000m;
                }
                if (longitude != null && longitude != "")
                {
                    cmd.Parameters.Add("@Longitude", SqlDbType.Decimal).Value = Math.Truncate(Decimal.Parse(longitude) * 1000000m) / 1000000m;
                }
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1!=null&&phone1!=""?phone1:null;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2!=null&&phone2!=""?phone2:null;
              
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
                cmd.Parameters.Add("@Place", SqlDbType.NVarChar, 100).Value = Place != null && Place != "" ? Place : null;
                cmd.Parameters.Add("@ChurchDenomination", SqlDbType.NVarChar, 10).Value = ChurchDenomination != null && ChurchDenomination != "" ? ChurchDenomination : null;
                cmd.Parameters.Add("@PriorityOrder", SqlDbType.Decimal).Value = PriorityOrder != null && PriorityOrder != "" ? PriorityOrder : null;
                if(DioceseID!=null&& DioceseID!="")
                {
                    cmd.Parameters.Add("@DioceseID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(DioceseID);
                }                
                if (ForaneID != null && ForaneID != "")
                {
                    cmd.Parameters.Add("@ForaneID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ForaneID);
                }                   
                if (StatusID != null && StatusID != "")
                {
                    cmd.Parameters.Add("@ChurchStatus", SqlDbType.UniqueIdentifier).Value = Guid.Parse(StatusID);
                }                  
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outchurchid = cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier);
                outchurchid.Direction = ParameterDirection.Output;
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            churchId = outchurchid.Value.ToString();
            status = outParameter.Value.ToString(); 
        }
        #endregion InsertChurch

        #region UpdateChurch
        /// <summary>
        /// Edit Church
        /// </summary>
        /// <returns>success or failure</returns>
        public void UpdateChurch()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateChurch]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = churchName != null && churchName != "" ? churchName : null;
                cmd.Parameters.Add("@NickName", SqlDbType.NVarChar, 150).Value = NickName != null && NickName != "" ? NickName : null;
                cmd.Parameters.Add("@TownCode", SqlDbType.NVarChar, 10).Value = townCode != null && townCode != "" ? townCode : null;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description != null && description != "" ? description : null;
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about != null && about != "" ? about : null;
                //IsHome indicates call from home page
                cmd.Parameters.Add("@IsHome", SqlDbType.Bit).Value = IsHome;
                if (mainImageId != null && mainImageId != "")
                {
                    cmd.Parameters.Add("@MainImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(mainImageId);
                }
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address != null && address != "" ? address : null;
                if (latitude != null && latitude != "")
                {
                    cmd.Parameters.Add("@Latitude", SqlDbType.Decimal).Value = Math.Truncate(Decimal.Parse(latitude) * 1000000m) / 1000000m;
                }
                if (longitude != null && longitude != "")
                {
                    cmd.Parameters.Add("@Longitude", SqlDbType.Decimal).Value = Math.Truncate(Decimal.Parse(longitude) * 1000000m) / 1000000m;
                }
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1 != null && phone1 != "" ? phone1 : null;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2 != null && phone2 != "" ? phone2 : null;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
                cmd.Parameters.Add("@ChurchDenomination", SqlDbType.NVarChar, 10).Value = ChurchDenomination != null && ChurchDenomination != "" ? ChurchDenomination : null;
                cmd.Parameters.Add("@PriorityOrder", SqlDbType.Decimal).Value = PriorityOrder != null && PriorityOrder != "" ? PriorityOrder : null;
                if (DioceseID != null && DioceseID != "")
                {
                    cmd.Parameters.Add("@DioceseID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(DioceseID);
                }
                if (ForaneID != null && ForaneID != "")
                {
                    cmd.Parameters.Add("@ForaneID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(ForaneID);
                }
                if (StatusID != null && StatusID != "")
                {
                    cmd.Parameters.Add("@ChurchStatus", SqlDbType.UniqueIdentifier).Value = Guid.Parse(StatusID);
                }
                cmd.Parameters.Add("@Place", SqlDbType.NVarChar, 100).Value = Place != null && Place != "" ? Place : null;
                outParameter = cmd.Parameters.Add("@UpdateStatus", SqlDbType.SmallInt);
                outParameter.Direction = ParameterDirection.Output;
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
            //insert success or failure
            status = outParameter.Value.ToString();
            ///return Int16.Parse(outParameter.Value.ToString());
        }
        #endregion UpdateChurch

        #region DeleteChurch
        /// <summary>
        /// Delete Church
        /// </summary>
        /// <param name="ChurchID"></param>
        /// <returns>success or failure</returns>
        public string DeleteChurch()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParameter = null;

            try
            {

                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteChurch]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
                outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParameter.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                //Church image is not deleteing from folder as well as from database
                //if (outParameter.Value.ToString()=="1")
                //{

                //    if ((mainImageId != null) && (mainImageId != ""))
                //    {
                //        appImagesObj.DeleteAppImage();
                //    }
                //}
               
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
            //insert success or failure
            status = outParameter.Value.ToString();

            return status;
        }
        #endregion DeleteChurch

        #region Search Churches By Church Or TownName
        /// <summary>
        /// Search Churches By Church Or TownName
        /// </summary>
        /// <returns>Dattable Containing Search results</returns>
        public DataTable SearchChurchesByChurchOrTownName(string SearchTerm)
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SearchChurchesByChurchOrTownName]";
                cmd.Parameters.Add("@SearchName", SqlDbType.NVarChar, 150).Value = SearchTerm;
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
        #endregion Search Churches By Church Or TownName

        #region Get Church Details By churchID

        public DataTable GetChurchDetailsByChurchID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetChurchDetailsByChurchID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
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

        #endregion Get Church Details By churchID

        #region GetAllStatusFor Dropdown
        /// <summary>
        /// Select All TownMaster
        /// </summary>
        /// <returns>All TownMaster</returns>
        public DataSet GetAllStatus()
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
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 250).Value = ChurchStatusName;
                cmd.CommandText = "[GetAllStatus]";
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
        #endregion GetAllStatusFor Dropdown

        #region GetAllRiteFor Dropdown
        /// <summary>
        /// Select All TownMaster
        /// </summary>
        /// <returns>All TownMaster</returns>
        public DataSet GetAllRite()
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
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 250).Value = ChurchRite;
                cmd.CommandText = "[GetAllRite]";
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
        #endregion GetAllRiteFor Dropdown

        #region Get My Church Details

        public DataTable GetMyChurchDetails()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetMyChurchDetails]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
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

        #endregion Get My Church Details

        #region Get Near By  Church Details

        public DataTable GetNearByChurchDetails(int maxdistance)
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetNearByChurches]";
                cmd.Parameters.Add("@Latitude", SqlDbType.Float).Value = latitude;
                cmd.Parameters.Add("@Longitude", SqlDbType.Float).Value = longitude;
                cmd.Parameters.Add("@maxdistance", SqlDbType.Int).Value = maxdistance;
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

        #endregion Get My Church Details

        #region GetAllChurches
        public DataSet GetAllChurches()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllChurches]";
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
        #endregion GetAllChurches

        #region GetAllChurchIDandText
        public DataSet GetAllChurchIDandText()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            DataSet ds = null;
            SqlDataAdapter sda = null;

            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllChurchIDandText]";
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

        #endregion GetAllChurchIDandText
        #endregion Church Methods

        #region Mapdistance
        public string DistanceMatrixRequest(string source, string Destination)
        {
            try
            {
                int alongroaddis = Convert.ToInt32(ConfigurationManager.AppSettings["alongroad"].ToString());
                string keyString = ConfigurationManager.AppSettings["keyString"].ToString(); // passing API key
                string clientID = ConfigurationManager.AppSettings["clientID"].ToString(); // passing client id

                string urlRequest = "";
                string travelMode = "Walking"; //Driving, Walking, Bicycling, Transit.
                urlRequest = @"https://maps.googleapis.com/maps/api/distancematrix/json?origins=" + source + "&destinations=" + Destination + "&mode='" + travelMode + "'&sensor=false" + "&key=" + keyString;


                WebRequest request = WebRequest.Create(urlRequest);
                request.Method = "POST";
                string postData = "This is a test that posts this string to a Web server.";
                byte[] byteArray = Encoding.UTF8.GetBytes(postData);

                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = byteArray.Length;

                Stream dataStream = request.GetRequestStream();
                dataStream.Write(byteArray, 0, byteArray.Length);
                dataStream.Close();

                WebResponse response = request.GetResponse();
                dataStream = response.GetResponseStream();

                StreamReader reader = new StreamReader(dataStream);
                string resp = reader.ReadToEnd();

                JavaScriptSerializer js = new JavaScriptSerializer();


                var result = js.Deserialize<dynamic>(resp);
                var str = result["rows"];
                var str1 = str[0];
                var str2 = str1["elements"];
                var str3 = str2[0];
                string dist;
                string value;
                if (str3["status"] == "OK")
                {
                    var final = str3["distance"];
                    dist = final["text"].ToString();
                    value = final["value"].ToString();
                }
                else
                {
                    dist = "-";
                    value = Int32.MaxValue.ToString();
                }


                reader.Close();
                dataStream.Close();
                response.Close();
                return dist + '|' + value;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }       

        #endregion Mapdistance
    }

    public class ChurchDetails : Church
    {
        #region Public Properties
        public Church ChurchObj;

        public string churchDetailID
        {
            get;
            set;
        }
        public string caption
        {
            get;
            set;
        }
        public string imageId
        {
            get;
            set;
        }
        public string DetailDescription
        {
            get;
            set;
        }
        public string URL
        {
            get;
            set;
        }








        #endregion Public Properties

        #region ChurchDetail Methods
        #region Get Details By ID
        /// <summary>
        /// GetEventsByEventID
        /// </summary>
        /// <returns>All Events</returns>
        public void GetChurchDretailsByChurchDetailsID()
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
                cmd.CommandText = "[GetChurchDetailByDetailID]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    DataRow dr = dt.Rows[0];
                    churchDetailID = dr["ID"].ToString();
                    caption = dr["Caption"].ToString();
                    DetailDescription = dr["Description"].ToString();
                    URL = dr["URL"].ToString();
                    imageId = dr["ImageID"].ToString();
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
            //return dt;
        }
        #endregion Get Details By ID

        #region SelectChurchDetails
        /// <summary>
        /// Get All Church Details
        /// </summary>
        /// <returns>All Church Details</returns>
        public DataTable SelectChurchDetails()
        {
            dbConnection dcon = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllChurchDetails]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
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
        #endregion SelectChurchDetails

        #region InsertChurchDetails

        /// <summary>
        /// Add New Church Detail
        /// </summary>
        /// <returns>Success or Failure</returns>
        public void InsertChurchDetails()
        {
            dbConnection dcon = null;
            SqlParameter param1 = null;
            SqlParameter param2 = null;
            SqlCommand cmd = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertChurchDetails]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, -1).Value = caption!=null&&caption!=""?caption:null;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = DetailDescription != null&& DetailDescription != ""? DetailDescription : null;
                if(imageId!=""&& imageId!=null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy!=null&&createdBy!=""?createdBy:null;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value =comnObj.ConvertDatenow(DateTime.Now);
                param2 = cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier);
                param2.Direction = ParameterDirection.Output;
                param1 = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                param1.Direction = ParameterDirection.Output;
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
            status=param1.Value.ToString();
            churchDetailID = param2.Value.ToString();
        }
        #endregion InsertChurchDetails

        #region UpdateChurchDetails
        /// <summary>
        /// Edit Church Details
        /// </summary>
        /// <returns>Success/failure</returns>
        public void UpdateChurchDetails()
        {
            SqlParameter param1 = null;
            dbConnection dcon = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateChurchDetails]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, -1).Value = caption!=null&&caption!=""?caption:null;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = DetailDescription != null&& DetailDescription != ""? DetailDescription : null;
                if(imageId!=""&&imageId!=null)
                {
                    cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                }
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy!=null&&updatedBy!=""?updatedBy:null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
                param1 = cmd.Parameters.Add("@UpdateStatus", SqlDbType.TinyInt);
                param1.Direction = ParameterDirection.Output;
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
            status=param1.Value.ToString();
        }
        #endregion UpdateChurchDetails

        #region DeleteChurchDetails
        /// <summary>
        /// Delete Church Details
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteChurchDetails()
        {
            SqlParameter outParam = null;
            SqlCommand cmd = null;
            dbConnection dcon = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteChurchDetails]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
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
            return outParam.Value.ToString();
        }
        #endregion DeleteChurchDetail

        #region GetExtraChurchDetailsForApp
        public DataTable GetExtraChurchDetailsForApp()
        {
            dbConnection dcon = null;
            DataTable dt = null;
            SqlDataAdapter sda = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetExtraChurchDetailsForApp]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
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
        #endregion

        #endregion ChurchDetail Methods

    }
    public class MassTimings : Church
    {
        #region Public Properties
        public Church churchObj;
        public ChurchDetails churchDetailsObj;
        public string massChurchId
        {
            get;
            set;
        }
        public string massTimingID
        {
            get;
            set;
        }
        public string day
        {
            get;
            set;
        }
        public string[] mDay
        {
            get;
            set;
        }
        public string[] mTime
        {
            get;
            set;
        }
        public string massTime
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

        #region MassTiming Methods

        #region SelectMassTimings
        /// <summary>
        /// Get All MassTimings
        /// </summary>
        /// <returns>All MassTimings</returns>
        public DataSet SelectMassTimings()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            DataSet ds = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetAllMassTiming]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massChurchId);
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
        #endregion SelectMassTimings

        #region InsertMassTiming
        /// <summary>
        /// Add New MassTiming
        /// </summary>
        /// <returns>Success/Failure</returns>
        public void InsertMassTiming()
        {
            dbConnection dcon = null;
            SqlParameter outParam = null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertMassTiming]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massChurchId);
                cmd.Parameters.Add("@Day", SqlDbType.VarChar, -1).Value = day != null && day != "" ? day : null;
                cmd.Parameters.Add("@Time", SqlDbType.Time, 7).Value = TimeSpan.Parse(massTime);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy != null && createdBy != "" ? createdBy : null;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
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
            status = outParam.Value.ToString();
        }

        #endregion InsertMassTiming

        #region UpdateMassTiming
        /// <summary>
        /// Update MassTiming
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateMassTiming()
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
                cmd.CommandText = "[UpdateMassTiming]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massTimingID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massChurchId);
                cmd.Parameters.Add("@Day", SqlDbType.NVarChar, 3).Value = day!=null&&day!=""?day:null;
                massTime = massTime.Replace(" ", "");
                cmd.Parameters.Add("@Time", SqlDbType.Time, 7).Value = TimeSpan.Parse(massTime);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy!=null&&updatedBy!=""?updatedBy:null;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
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
            status=outParam.Value.ToString();
            return status;
        }
        #endregion UpdateMassTiming

        #region DeleteMassTiming
        /// <summary>
        /// Delete MassTiming
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteMassTiming()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam1 = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[DeleteMassTiming]";
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massTimingID);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massChurchId);
                outParam1 = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
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
            status=outParam1.Value.ToString();
            return status;
        }
        #endregion DeleteMassTiming

        #region selectMassDetailsByMassID
        /// <summary>
        /// Select Mass Details By MassID
        /// </summary>
        /// <returns>Mass Details</returns>
        public DataSet SelectMassTimingByMassID()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            DataSet ds = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[selectMassTimeByMassID]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massChurchId);
                cmd.Parameters.Add("@ID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massTimingID);
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
        #endregion selectMassDetailsByMassID

        #region selectMassDetailsByDay
        /// <summary>
        /// Select Mass Details By Day to bind grid
        /// </summary>
        /// <returns>Mass Details</returns>
        public DataSet SelectMassTimingByDay()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            DataSet ds = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[SelectMassTimingByChurchIdAndDay]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massChurchId);
                cmd.Parameters.Add("@list", SqlDbType.NVarChar, -1).Value = day;
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
        #endregion selectMassDetailsByMassID

        #region Get Mass timings for app
        public DataTable GetMassTimingsForApp()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlDataAdapter sda = null;
            DataTable dt = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[GetMassTimingsForApp]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(massChurchId);
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
        #endregion

        #endregion MassTiming Methods
    }
}