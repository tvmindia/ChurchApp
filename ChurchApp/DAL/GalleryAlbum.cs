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

        #endregion Public Properties

        #region GalleryAlbum Methods

        #region SelectGalleryAlbum
        /// <summary>
        /// Get All Gallery Album
        /// </summary>
        /// <returns>Gallery Album</returns>
        public DataSet SelectGalleryAlbum()
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
                cmd.CommandText = "[GetAllGalleryAlbum]";
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
        #endregion SelectGalleryAlbum

        #region InsertGalleryAlbum
        /// <summary>
        /// Insert new gallery album
        /// </summary>
        /// <returns>Success/Failure</returns>
        public string InsertGalleryAlbum()
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
                cmd.CommandText = "[InsertIntoGalleryAlbum]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchId);
                cmd.Parameters.Add("@AlbumName", SqlDbType.NVarChar, 100).Value = albumName;
                cmd.Parameters.Add("@AlbumType", SqlDbType.NVarChar, 20).Value = albumType;
                cmd.Parameters.Add("@IsDelete", SqlDbType.Bit).Value = Convert.ToBoolean(isDelete);
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
                cmd.Parameters.Add("@Id", SqlDbType.UniqueIdentifier).Value = Guid.Parse(albumId);
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
        #endregion DeleteGalleryAlbum

        #endregion GalleryAlbum Methods
    }
    public class GalleryItems : GalleryAlbum
    {
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
        #endregion Public Properties

        #region GalleryItem Methods

        #region SelectGalleryItem
        /// <summary>
        /// Get all gallery items
        /// </summary>
        /// <returns>gallery items</returns>
        public DataSet SelectGalleryItem()
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
                cmd.CommandText = "[GetAllGalleryAlbum]";
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
        #endregion SelectGalleryItem

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
        #endregion DeleteGalleryItem

        #endregion GalleryItem Methods
    }
}