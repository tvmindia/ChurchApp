
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
using System.Web.Script.Serialization;
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
                //new variables
                string appImgLoc = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                HttpPostedFile postFile = null;
                TownMaster townMasterObj = null;
                //

                string AppImagePath = "";
                string fileExtension = "";
                string status = "";
                string ChurchImageID="";
                string fileName = "";
                
                string ChurchImgLoc = "";
                AppImages AppImgObj = null;
                HttpPostedFile churchFile = null;
                ChurchApp.DAL.Church churchObj = null;
                JavaScriptSerializer jsSerializer = null;
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
                                        fileName = guid + fileExtension;
                                        SaveLocation = SaveLocation.Replace("~", "");
                                        postedFile.SaveAs(SaveLocation + @"\" + fileName);
                                        AppImagePath = "~/img/AppImages/" + fileName;
                                        AppImagePath = AppImagePath.Replace("~", "");
                                        //Insert to table
                                        AppImgObj = new AppImages();
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
                                try
                                {
                                    ChurchImageID = context.Request.Form.GetValues("ChurchImageID")[0];

                                    ChurchImgLoc = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                                    churchFile = context.Request.Files["ChurchImage"];
                                    fileExtension = Path.GetExtension(churchFile.FileName);
                                    fileName = ChurchImageID + fileExtension;
                                    churchFile.SaveAs(ChurchImgLoc + @"\" + ChurchImageID + fileExtension);
                                    //Insert to table
                                    AppImgObj = new AppImages();
                                    AppImgObj.appImageId = ChurchImageID;
                                    AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                    AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                    AppImgObj.InsertAppImage().ToString();
                                    //insert into church
                                    churchObj = new ChurchApp.DAL.Church();
                                    churchObj.churchName = context.Request.Form.GetValues("churchName")[0];
                                    churchObj.townCode = context.Request.Form.GetValues("townCode")[0];
                                    churchObj.description = context.Request.Form.GetValues("description")[0];
                                    churchObj.about = context.Request.Form.GetValues("about")[0];
                                    churchObj.mainImageId = ChurchImageID;
                                    churchObj.address = context.Request.Form.GetValues("address")[0];
                                    churchObj.latitude = context.Request.Form.GetValues("latitude")[0];
                                    churchObj.longitude = context.Request.Form.GetValues("longitude")[0];
                                    churchObj.phone1 = context.Request.Form.GetValues("phone1")[0];
                                    churchObj.phone2 = context.Request.Form.GetValues("phone2")[0];
                                    churchObj.createdBy = AppImgObj.createdBy;
                                    churchObj.InsertChurch();
                                    jsSerializer = new JavaScriptSerializer();
                                    context.Response.Write(jsSerializer.Serialize(churchObj));
                                }
                                catch(Exception ex)
                                {
                                    churchObj.status = ex.Message;
                                    context.Response.Write(jsSerializer.Serialize(churchObj));
                                }
                                       
                                    
                                      

                            break;
                            case "ChurchUpdate":
                                try
                                {
                                    ChurchImageID = context.Request.Form.GetValues("ChurchImageID")[0];
                                    ChurchImgLoc = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                                    churchFile = context.Request.Files["ChurchImage"];
                                    fileExtension = Path.GetExtension(churchFile.FileName);
                                    string fileName1 = ChurchImageID + fileExtension;
                                    churchFile.SaveAs(ChurchImgLoc + @"\" + ChurchImageID + fileExtension);

                                    //Insert to table AppImages
                                    AppImgObj = new AppImages();
                                    AppImgObj.appImageId = ChurchImageID;
                                    AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                    AppImgObj.createdBy = context.Request.Form.GetValues("updatedBy")[0];
                                    AppImgObj.InsertAppImage().ToString();

                                    //UPDATE church
                                    churchObj = new ChurchApp.DAL.Church();
                                    churchObj.churchId = context.Request.Form.GetValues("churchid")[0];
                                    churchObj.churchName = context.Request.Form.GetValues("churchName")[0];
                                    churchObj.townCode = context.Request.Form.GetValues("townCode")[0];
                                    churchObj.description = context.Request.Form.GetValues("description")[0];
                                    churchObj.about = context.Request.Form.GetValues("about")[0];
                                    churchObj.mainImageId = ChurchImageID;
                                    churchObj.address = context.Request.Form.GetValues("address")[0];
                                    churchObj.latitude = context.Request.Form.GetValues("latitude")[0];
                                    churchObj.longitude = context.Request.Form.GetValues("longitude")[0];
                                    churchObj.phone1 = context.Request.Form.GetValues("phone1")[0];
                                    churchObj.phone2 = context.Request.Form.GetValues("phone2")[0];
                                    churchObj.updatedBy = AppImgObj.createdBy;
                                    churchObj.UpdateChurch();
                                    jsSerializer = new JavaScriptSerializer();
                                    context.Response.Write(jsSerializer.Serialize(churchObj));
                                }
                                catch(Exception ex)
                                {
                                    churchObj.status = ex.Message;
                                    context.Response.Write(jsSerializer.Serialize(churchObj));
                                }
                                       

                            break;
                            case "TownImageInsert":
                            try
                            {
                                townMasterObj = new TownMaster();
                                //Insert to table
                                AppImgObj = new AppImages();
                                postFile = context.Request.Files["upImageFile"];
                                fileExtension = Path.GetExtension(postFile.FileName);
                                // AppImgObj.appImageId = ChurchImageID;
                                AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                AppImgObj.type = "image";
                                AppImgObj.InsertAppImage1().ToString();


                                townMasterObj.name = context.Request.Form.GetValues("townName")[0];
                                townMasterObj.createdBy = AppImgObj.createdBy;
                                townMasterObj.imageId = AppImgObj.appImageId;
                                townMasterObj.InsertTownMaster();

                                fileName = AppImgObj.appImageId + fileExtension;
                                postFile.SaveAs(appImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                jsSerializer = new JavaScriptSerializer();
                                context.Response.Write(jsSerializer.Serialize(townMasterObj));
                            }
                            catch(Exception ex)
                            {
                                townMasterObj.status = ex.Message;
                                context.Response.Write(jsSerializer.Serialize(townMasterObj));
                            }
                            
                                break;

                            case "TownImageUpdate":
                                try
                                {
                                    townMasterObj = new TownMaster();
                                    AppImgObj = new AppImages();
                                    postFile = context.Request.Files["upImageFile"];
                                    fileExtension = Path.GetExtension(postFile.FileName);
                                    if ((context.Request.Form.GetValues("townImageID")[0] != "") && (context.Request.Form.GetValues("townImageID")[0] != null))
                                    {
                                        //update currrent town image with new one
                                        AppImgObj.appImageId = context.Request.Form.GetValues("townImageID")[0];
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.Extension = fileExtension;
                                        AppImgObj.postedFile = postFile;
                                        //Delete Previous image from folder and save new folder 
                                        AppImgObj.UpdateCurrentAppImageInFolder();
                                    }
                                    else
                                    {
                                        //insert new image for imageless town
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("updatedby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.Extension = fileExtension;
                                        AppImgObj.postedFile = postFile;
                                        AppImgObj.InsertAppImage1().ToString();
                                        postFile.SaveAs(appImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                    }
                                    //Update TownMaster
                                    townMasterObj.code = context.Request.Form.GetValues("code")[0];
                                    townMasterObj.name = context.Request.Form.GetValues("townName")[0];
                                    townMasterObj.updatedBy = AppImgObj.updatedBy;
                                    townMasterObj.imageId = AppImgObj.appImageId;
                                    townMasterObj.UpdateTownMaster();

                                    jsSerializer = new JavaScriptSerializer();
                                    context.Response.Write(jsSerializer.Serialize(townMasterObj));
                                }
                                catch(Exception ex)
                                {
                                    townMasterObj.status = ex.Message;
                                    context.Response.Write(jsSerializer.Serialize(townMasterObj));
                                }
                          
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