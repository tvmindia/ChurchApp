﻿
#region Included Namespaces
using ChurchApp.DAL;
using NReco.VideoConverter;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
#endregion Included Namespaces

namespace ChurchApp.ImageHandler
{
    /// <summary>
    /// Summary description for UploadHandler
    /// </summary>
    public class UploadHandler : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
           
           context.Response.ContentType = "text/plain";
            try
            {

                string AppImagePath = "";
                string fileExtension = "";
                string status = "";
              

                 if (context.Request.Files.Count > 0)
                {
                    #region Album
                    //This is for multi image upload purpose
                    if (context.Request.Form.GetValues("Album")!=null)
                    {
                        switch (context.Request.Form.GetValues("Album")[0])
                        {
                            case "GalleryImageAlbum":
                                GalleryAlbum GalAlbumObj = new GalleryAlbum();
                                GalAlbumObj.churchId = context.Request.Form.GetValues("churchId")[0];
                                GalAlbumObj.albumName = context.Request.Form.GetValues("AlbumName")[0];
                                GalAlbumObj.albumType = "image";
                                GalAlbumObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                status=GalAlbumObj.InsertGalleryAlbum();
                                foreach (string content in context.Request.Files)
                                {
                                    HttpPostedFile file = context.Request.Files[content];
                                    fileExtension = Path.GetExtension(file.FileName);
                                    GalleryItems GalItemsObj = new GalleryItems();
                                    GalItemsObj.albumId = GalAlbumObj.albumId;
                                    GalItemsObj.url = "/img/AppImages/" + GalItemsObj.galleryItemID + fileExtension;
                                    GalItemsObj.itemType = "image";
                                    GalItemsObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                    status= GalItemsObj.InsertGalleryItem();
                                    string SaveLocation = (HttpContext.Current.Server.MapPath("~/img/AppImages/"));
                                    file.SaveAs(SaveLocation + @"\" + GalItemsObj.galleryItemID + fileExtension);
                                }//end of foreach
                                context.Response.Write(status);
                                break;

                            case "AddMoreImages":
                                foreach (string content in context.Request.Files)
                                {
                                    HttpPostedFile file = context.Request.Files[content];
                                    fileExtension = Path.GetExtension(file.FileName);
                                    GalleryItems GalItemsObj = new GalleryItems();
                                    GalItemsObj.albumId = context.Request.Form.GetValues("AlbumID")[0];
                                    GalItemsObj.url = "/img/AppImages/" + GalItemsObj.galleryItemID + fileExtension;
                                    GalItemsObj.itemType = "image";
                                    GalItemsObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                    status=GalItemsObj.InsertGalleryItem();
                                    string SaveLocation = (HttpContext.Current.Server.MapPath("~/img/AppImages/"));
                                    file.SaveAs(SaveLocation + @"\" + GalItemsObj.galleryItemID + fileExtension);
                                }//end of foreach
                                context.Response.Write(status);
                                break;


                            case "GalleryVideoAlbum":
                              
                                GalleryAlbum GalAlbumObjForVideo = new GalleryAlbum();
                                GalAlbumObjForVideo.churchId = context.Request.Form.GetValues("churchId")[0];
                                GalAlbumObjForVideo.albumName = context.Request.Form.GetValues("AlbumName")[0];
                                GalAlbumObjForVideo.albumType = "video";
                                GalAlbumObjForVideo.createdBy = context.Request.Form.GetValues("createdby")[0];
                                status=GalAlbumObjForVideo.InsertGalleryAlbum();

                                  foreach (string content in context.Request.Files)
                                  {
                                    HttpPostedFile file = context.Request.Files[content];
                                    fileExtension = Path.GetExtension(file.FileName);
                                    GalleryItems GalItemsObj = new GalleryItems();
                                    GalItemsObj.albumId = GalAlbumObjForVideo.albumId;
                                    GalItemsObj.url = "/vid/" + GalItemsObj.galleryItemID + fileExtension;
                                    GalItemsObj.itemType = "video";
                                    GalItemsObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                    status=GalItemsObj.InsertGalleryItem();
                                    string SaveLocation = (HttpContext.Current.Server.MapPath("~/vid/"));
                                    file.SaveAs(SaveLocation + @"\" + GalItemsObj.galleryItemID + fileExtension);

                                    CreateThumbnailForVideo(GalItemsObj.galleryItemID,fileExtension);
                                   
                                }//end of foreach
                                  context.Response.Write(status);
                            break;
                            case "AddMoreVideos":
                            foreach (string content in context.Request.Files)
                            {
                             
                                HttpPostedFile file = context.Request.Files[content];
                                fileExtension = Path.GetExtension(file.FileName);
                                GalleryItems GalItemsObj = new GalleryItems();
                                GalItemsObj.albumId = context.Request.Form.GetValues("AlbumID")[0];
                                GalItemsObj.url = "/vid/" + GalItemsObj.galleryItemID + fileExtension;
                                GalItemsObj.itemType = "video";
                                GalItemsObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                status=GalItemsObj.InsertGalleryItem();
                                string SaveLocation = (HttpContext.Current.Server.MapPath("~/vid/"));
                                file.SaveAs(SaveLocation + @"\" + GalItemsObj.galleryItemID + fileExtension);

                                CreateThumbnailForVideo(GalItemsObj.galleryItemID, fileExtension);
                               
                            }//end of foreach
                            context.Response.Write(status);
                            break;
                        }
                    }
                    #endregion Album
                    #region ActionTyp
                    //This is for single image upload purpose
                    if (context.Request.Form.GetValues("ActionTyp")!= null)
                    {
                        switch (context.Request.Form.GetValues("ActionTyp")[0])
                        {
                            case "NoticeAppImageInsert":

                                    string guid = context.Request.Form.GetValues("GUID")[0];
                                    string SaveLocation = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                                    try
                                    {
                                        HttpPostedFile postedFile = context.Request.Files["NoticeAppImage"];
                                        fileExtension = Path.GetExtension(postedFile.FileName);
                                        string fileName = guid + fileExtension;
                                        SaveLocation = SaveLocation.Replace("~", "");
                                        postedFile.SaveAs(SaveLocation + @"\" + fileName);
                                        AppImagePath = "~/img/AppImages/" + fileName;
                                        AppImagePath = AppImagePath.Replace("~", "");
                                        //Insert to table
                                        AppImages AppImgObj = new AppImages();
                                        AppImgObj.appImageId = context.Request.Form.GetValues("GUID")[0];
                                        AppImgObj.url = AppImagePath;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.InsertAppImage().ToString();

                                        
                                        context.Response.Write(AppImagePath);

                                    }
                                    catch (Exception ex)
                                    {
                                        throw ex;
                                    }
                            break;
                             //Add another action type here as next case
                            case "ChurchInsert":
                                        //string guid = context.Request.Form.GetValues("GUID")[0];
                                        //string SaveLocation = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                                        //HttpPostedFile postedFile1 = context.Request.Files["churchImage"];
                                        //fileExtension = Path.GetExtension(postedFile1.FileName);
                                        //string fileName1 = guid + fileExtension;
                                        //SaveLocation = SaveLocation.Replace("~", "");
                                        //postedFile1.SaveAs(SaveLocation + @"\" + fileName1);
                                        //AppImagePath = "~/img/AppImages/" + fileName1;
                                        //AppImagePath = AppImagePath.Replace("~", "");
                                        ////Insert to table
                                        //AppImages AppImgObj1 = new AppImages();
                                        //AppImgObj1.appImageId = context.Request.Form.GetValues("GUID")[0];
                                        //AppImgObj1.url = AppImagePath;
                                        //AppImgObj1.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        //AppImgObj1.InsertAppImage().ToString();
                                        //ChurchApp.DAL.Church churchObj = new ChurchApp.DAL.Church();

                                        //churchObj.InsertChurch();

                                        //context.Response.Write(status);

                            break;

                        }
                  


                    }
                    #endregion ActionTyp

                   

                } //end of if count

            }//try
            catch (Exception e)
            {
                throw e;
            }
            finally
            {

            }


        }
        
        public bool CreateThumbnailForVideo(string vidid,string ext)
        {
            string frametime;
            var ffProbe = new NReco.VideoInfo.FFProbe();
            var videoInfo = ffProbe.GetMediaInfo(HttpContext.Current.Server.MapPath("~/vid/")+vidid+ext);
            frametime = (videoInfo.Duration.TotalSeconds / 2).ToString();
            var ffMpeg = new FFMpegConverter();
            ffMpeg.GetVideoThumbnail(HttpContext.Current.Server.MapPath("~/vid/") + vidid + ext, HttpContext.Current.Server.MapPath("~/vid/Poster/") + vidid + ".jpg", float.Parse(frametime));
            return true;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}