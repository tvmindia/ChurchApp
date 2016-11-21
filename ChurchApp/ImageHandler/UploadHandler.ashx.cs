
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
                                        string ChurchImageID = context.Request.Form.GetValues("ChurchImageID")[0];
                                        string ChurchImgLoc = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                                        HttpPostedFile postedFile1 = context.Request.Files["ChurchImage"];
                                        fileExtension = Path.GetExtension(postedFile1.FileName);
                                        string fileName1 = ChurchImageID + fileExtension;
                                        postedFile1.SaveAs(ChurchImgLoc + @"\" + ChurchImageID + fileExtension);

                                        //Insert to table
                                        AppImages AppImgObj1 = new AppImages();
                                        AppImgObj1.appImageId = ChurchImageID;
                                        AppImgObj1.url = "/img/AppImages/" + AppImgObj1.appImageId + fileExtension;
                                        AppImgObj1.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj1.InsertAppImage().ToString();
                                        
                                //insert into church
                                        ChurchApp.DAL.Church churchObj = new ChurchApp.DAL.Church();
                                        churchObj.churchName = context.Request.Form.GetValues("churchName")[0];
                                        churchObj.townCode = context.Request.Form.GetValues("townCode")[0];
                                        churchObj.description = context.Request.Form.GetValues("description")[0];
                                        churchObj.about = context.Request.Form.GetValues("about")[0];
                                        churchObj.mainImageId = ChurchImageID;
                                        churchObj.address=context.Request.Form.GetValues("address")[0];
                                        churchObj.latitude = context.Request.Form.GetValues("latitude")[0];
                                        churchObj.longitude = context.Request.Form.GetValues("longitude")[0];
                                        churchObj.phone1 = context.Request.Form.GetValues("phone1")[0];
                                        churchObj.phone2 = context.Request.Form.GetValues("phone2")[0];
                                        churchObj.MainPriestID = context.Request.Form.GetValues("MainPriestID")[0];
                                        churchObj.createdBy = AppImgObj1.createdBy;
                                        context.Response.Write(churchObj.InsertChurch());

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