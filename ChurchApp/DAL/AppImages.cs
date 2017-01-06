using Church.DAL;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Web;

namespace ChurchApp.DAL
{
    public class AppImages
    {
        
        public AppImages()
        {
            appImageId = Guid.NewGuid().ToString();
        }
        #region Public Properties
        public string appImageId
        {
            get;
            set;
        }
        public string url
        {
            get;
            set;
        }
        public string type
        {
            get;
            set;
        }
        public string isDelete
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

        public HttpPostedFile postedFile
        {
            get;
            set;
        }
        public string Extension
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

        #region SelectAppImages
        /// <summary>
        /// Get All AppImages
        /// </summary>
        /// <returns>All AppImages</returns>
        public void SelectAppImageByID()
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
                cmd.CommandText = "[GetAppImageByID]";
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(appImageId);
                sda = new SqlDataAdapter();
                sda.SelectCommand = cmd;
                ds = new DataSet();
                sda.Fill(ds);
                if ((ds.Tables[0].Rows.Count > 0)&&(ds!=null))
                {
                    appImageId = ds.Tables[0].Rows[0]["ID"].ToString();
                    url = ds.Tables[0].Rows[0]["URL"].ToString();
                    type = ds.Tables[0].Rows[0]["Type"].ToString();
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
        #endregion SelectAppImages

        #region InsertAppImage
        /// <summary>
        /// Add new AppImage
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertAppImage()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            SqlParameter outParam1 = null;
            try
            {
                if(appImageId==null && appImageId!="")
                {
                    throw new Exception("AppImageID is empty");
                }
                Common comnObj = new Common();
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertAppImages]";

                //url = url.Replace(@"\", "/");
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(appImageId);
                cmd.Parameters.Add("@Url", SqlDbType.NVarChar, -1).Value = url!=null&&url!=""?url:null;
                cmd.Parameters.Add("@Type", SqlDbType.NVarChar, 20).Value = type!=null&&type!=""?type:null;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy!=null&&createdBy!=""?createdBy:null;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = comnObj.ConvertDatenow(DateTime.Now);
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;


                outParam1 = cmd.Parameters.Add("@ImgID", SqlDbType.UniqueIdentifier);
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
            appImageId = outParam1.Value.ToString();

            return outParam.Value.ToString();
        }
        #endregion InsertAppImage
        #region InsertAppImage1
        /// <summary>
        /// Add new AppImage
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertAppImage1()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            try
            {
                if(appImageId==null && appImageId=="")
                {
                    throw new Exception("AppImageID is empty");
                }
                Common comnObj = new Common();
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertAppImages1]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(appImageId);
                cmd.Parameters.Add("@Url", SqlDbType.NVarChar, -1).Value = url!=""&& url!=null?url:null;
                cmd.Parameters.Add("@Type", SqlDbType.NVarChar, 20).Value = type!=null&&type!=""?type:null;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy!=null&&createdBy!=""?createdBy:null;
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
           return outParam.Value.ToString();
        }
        #endregion InsertAppImage1

        #region UpdateCurrentAppImageInFolder
        /// <summary>
        /// update AppImage
        /// </summary>
        /// <returns>Success/Failure</returns>
        public void UpdateCurrentAppImageInFolder()
        {
           
            try
            {
                string appImgLoc = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                postedFile.SaveAs(appImgLoc + @"\" + appImageId + Extension);
              
            }
            catch(Exception ex)
            {
                throw ex;
            }
          }
        #endregion UpdateCurrentAppImageInFolder

        #region UpdateAppImage
        public string UpdateAppImage()
        {
            dbConnection dcon = null;
            SqlCommand cmd = null;
            SqlParameter outParam = null;
            Common comnObj = new Common();
            try
            {
               if(appImageId==null && appImageId=="")
               {
                   throw new Exception("AppImageID is empty");
               }
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[UpdateAppImages]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(appImageId);
                cmd.Parameters.Add("@URL", SqlDbType.NVarChar, -1).Value = url;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
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
        #endregion UpdateAppImage

        #region DeleteAppImage
        /// <summary>
        /// Delete AppImage
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteAppImage()
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
                cmd.CommandText = "[DeleteAppImages]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(appImageId);
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                try
                {
                    //delete current appimage from folder
                    System.IO.File.Delete(HttpContext.Current.Server.MapPath(url));
                }
                catch (Exception ex)
                {
                    throw ex;
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
        #endregion DeleteAppImage

        #region DeleteFromFolder
        public void DeleteFromFolder()
        {
            SelectAppImageByID();
            try
            {
                //delete current appimage from folder
                System.IO.File.Delete(HttpContext.Current.Server.MapPath(url));
                // System.IO.File.Delete(HttpContext.Current.Server.MapPath("/vid/Poster/" + galleryItemID + ".jpg"));

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion DeleteFromFolder

        #endregion Methods
    }
}