using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace ChurchApp.DAL
{
    public class GalleryAlbum
    {
        #region Public Properties
        public string albumId
        {
            get;
            set;
        }
        public string churchId
        {
            get;
            set;
        }
        public string albumName
        {
            get;
            set;
        }
        public string albumType
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
        public string status
        {
            get;
            set;
        }
        public string message
        {
            get;
            set;
        }
        #endregion Public Properties

        #region GalleryAlbum Methods

        #region SelectGalleryAlbums
        /// <summary>
        /// Get All Gallery Album
        /// </summary>
        /// <returns>Gallery Album</returns>
        public DataSet SelectGalleryAlbums()
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
                cmd.CommandText = "[GetAllGalleryImageAlbumByChurchID]";
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
        #endregion SelectGalleryAlbums

        #region GetAllGalleryImageAlbumByChurchID
        /// <summary>
        /// Get All Gallery Image Album by church ID
        /// </summary>
        /// <returns>Gallery Album</returns>
        public DataSet GetAllGalleryImageAlbumByChurchID()
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
                cmd.CommandText = "[GetAllGalleryImageAlbumByChurchID]";
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
        #endregion GetAllGalleryImageAlbumByChurchID
     



        #region InsertGalleryAlbum
        /// <summary>
        /// Insert new gallery album
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertGalleryAlbum()
        {
            dbConnection dcon = null;
            SqlParameter outParam = null,outIDparam=null;
            SqlCommand cmd = null;
            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertIntoGalleryAlbum]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@AlbumName", SqlDbType.NVarChar, 100).Value = albumName;
                cmd.Parameters.Add("@AlbumType", SqlDbType.NVarChar, 20).Value = albumType;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParam = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
                outIDparam = cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier);
                outIDparam.Direction = ParameterDirection.Output;
                outParam.Direction = ParameterDirection.Output;
                
                cmd.ExecuteNonQuery();
                albumId = outIDparam.Value.ToString();
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
        #endregion InsertGalleryAlbum

        #region UpdateGalleryAlbum
        /// <summary>
        /// Update Gallery Album
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string UpdateGalleryAlbum()
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
                cmd.CommandText = "[UpdateGalleryAlbum]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@AlbumName", SqlDbType.NVarChar, 100).Value = albumName;
                cmd.Parameters.Add("@AlbumType", SqlDbType.NVarChar, 20).Value = albumType;
                cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(isDelete);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
            return outParam.Value.ToString();
        }
        #endregion UpdateGalleryAlbum

        #region DeleteGalleryAlbum
        /// <summary>
        /// Delete Gallery Album
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteGalleryAlbum()
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
                cmd.CommandText = "[DeleteGalleryAlbum]";
                cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
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
            status = outParam.Value.ToString();
            return status;
        }
        #endregion DeleteGalleryAlbum

        #region GetAllGalleryVideoAlbumByChurchID
        public DataSet GetAllGalleryVideoAlbumByChurchID()
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
                cmd.CommandText = "[GetAllGalleryVideoAlbumByChurchID]";
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
        #endregion GetAllGalleryVideoAlbumByChurchID

        #endregion GalleryAlbum Methods
    }
    public class GalleryItems : GalleryAlbum

    {
        public GalleryAlbum GalleryAlbObj;
      
        public GalleryItems()
        {
            galleryItemID = Guid.NewGuid().ToString();
        }
        #region Public Properties
        public string galleryItemID
        {
            get;
            set;
        }
        public string url
        {
            get;
            set;
        }
        public string itemType
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

        #region GalleryItem Methods

        #region SelectGalleryItems
        /// <summary>
        /// Get all gallery items
        /// </summary>
        /// <returns>gallery items</returns>
        public DataSet SelectGalleryItems()
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
                cmd.CommandText = "[GetAllGalleryItems]";
                cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(GalleryAlbObj.albumId);
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
        #endregion SelectGalleryItems

        #region InsertGalleryItem
        /// <summary>
        /// Add new gallery item
        /// </summary>
        /// <returns>success/failure</returns>
        public string InsertGalleryItem()
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
                cmd.CommandText = "[InsertGalleryItems]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(galleryItemID);
                cmd.Parameters.Add("@AlbumId", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
                cmd.Parameters.Add("@Url", SqlDbType.NVarChar, -1).Value = url;
                cmd.Parameters.Add("@Type", SqlDbType.NVarChar, 20).Value = itemType;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
        #endregion InsertGalleryItem

        #region DeleteGalleryItem
        /// <summary>
        /// Delete GalleryItem From Gallery Album
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string DeleteGalleryItem()
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
                cmd.CommandText = "[DeleteGalleryItems]";
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(galleryItemID);
               // cmd.Parameters.Add("@AlbumID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
                outParam = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
                outParam.Direction = ParameterDirection.Output;
                cmd.ExecuteNonQuery();
                if(outParam.Value.ToString()=="1")
                {
                    try
                        {
                            System.IO.File.Delete(HttpContext.Current.Server.MapPath(url));
                            if(itemType=="video")//delete thumbnail
                            {
                             System.IO.File.Delete(HttpContext.Current.Server.MapPath("/vid/Poster/"+galleryItemID+".jpg"));
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
            status = outParam.Value.ToString();
            return status;
        }
        #endregion DeleteGalleryItem

    

        #endregion GalleryItem Methods
    }
}