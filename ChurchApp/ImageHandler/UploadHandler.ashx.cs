﻿
#region Included Namespaces
using ChurchApp.AdminPanel;
using ChurchApp.DAL;
using System;
using System.IO;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.SessionState;
#endregion Included Namespaces

namespace ChurchApp.ImageHandler
{
    /// <summary>
    /// Summary description for UploadHandler
    /// </summary>
    public class UploadHandler : IHttpHandler, IRequiresSessionState 

    {

        public void ProcessRequest(HttpContext context)
        {
           context.Response.ContentType = "text/plain";
           Security.UserAuthendication UA = null;
            try
            {
                DashBoard dashBoardObj = new DashBoard();
                UA = dashBoardObj.GetCurrentUserSession();
              
                JavaScriptSerializer jsSerializer = null;
                if (UA != null)
                {
                    //new variables
                    string ImgLoc = HttpContext.Current.Server.MapPath("~/img/AppImages/");

                    AppImages AppImgObj = null;
                    HttpPostedFile postFile = null;
                    TownMaster townMasterObj = null;
                    PatronMaster patronMasterObj = null;
                    Priest priestObj = null;
                    DAL.Events EventObj = null;
                    Administrators AdminObj = null;
                    DAL.Notices NoticeObj = null;
                    DAL.Institutions InstObj = null;
                    GalleryAlbum GalAlbumObj = null;
                    GalleryItems GalItemsObj = null;
                    Members memberObj = null;
                    Family familyObj = null;
                    FamilyUnits unitsObj = null;
                    //

                    string AppImagePath = "";
                    string fileExtension = "";
                    string status = "";
                    string fileName = "";
                    ChurchApp.DAL.Church churchObj = null;
                    
                    if (context.Request.Files.Count > 0)
                    {
                        #region Album
                        //This is for multi image upload purpose
                        if (context.Request.Form.GetValues("Album") != null)
                        {
                            switch (context.Request.Form.GetValues("Album")[0])
                            {
                                case "GalleryImageAlbum":
                                    try
                                    {
                                        GalAlbumObj = new GalleryAlbum();
                                        GalAlbumObj.churchId = context.Request.Form.GetValues("churchId")[0];
                                        GalAlbumObj.albumName = context.Request.Form.GetValues("AlbumName")[0];
                                        GalAlbumObj.albumType = "image";
                                        GalAlbumObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        GalAlbumObj.InsertGalleryAlbum();
                                        foreach (string content in context.Request.Files)
                                        {
                                            postFile = context.Request.Files[content];
                                            fileExtension = Path.GetExtension(postFile.FileName);
                                            GalItemsObj = new GalleryItems();
                                            GalItemsObj.albumId = GalAlbumObj.albumId;
                                            GalItemsObj.url = "/img/AppImages/" + GalItemsObj.galleryItemID + fileExtension;
                                            GalItemsObj.itemType = "image";
                                            GalItemsObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                            GalItemsObj.status = GalItemsObj.InsertGalleryItem();
                                            string SaveLocation = (HttpContext.Current.Server.MapPath("~/img/AppImages/"));
                                            postFile.SaveAs(SaveLocation + @"\" + GalItemsObj.galleryItemID + fileExtension);
                                        }//end of foreach
                                        //context.Response.Write(status);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(GalAlbumObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        GalAlbumObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(GalAlbumObj));
                                    }

                                    break;

                                case "AddMoreImages":
                                    try
                                    {
                                        foreach (string content in context.Request.Files)
                                        {
                                            postFile = context.Request.Files[content];
                                            fileExtension = Path.GetExtension(postFile.FileName);
                                            GalItemsObj = new GalleryItems();
                                            GalItemsObj.albumId = context.Request.Form.GetValues("AlbumID")[0];
                                            GalItemsObj.url = "/img/AppImages/" + GalItemsObj.galleryItemID + fileExtension;
                                            GalItemsObj.itemType = "image";
                                            GalItemsObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                            GalItemsObj.InsertGalleryItem();
                                            string SaveLocation = (HttpContext.Current.Server.MapPath("~/img/AppImages/"));
                                            postFile.SaveAs(SaveLocation + @"\" + GalItemsObj.galleryItemID + fileExtension);
                                        }//end of foreach
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(GalItemsObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        GalItemsObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(GalItemsObj));
                                    }

                                    break;


                                case "GalleryVideoAlbum":
                                    try
                                    {
                                        GalAlbumObj = new GalleryAlbum();
                                        GalAlbumObj.churchId = context.Request.Form.GetValues("churchId")[0];
                                        GalAlbumObj.albumName = context.Request.Form.GetValues("AlbumName")[0];
                                        GalAlbumObj.albumType = "video";
                                        GalAlbumObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        GalAlbumObj.InsertGalleryAlbum();

                                        foreach (string content in context.Request.Files)
                                        {
                                            postFile = context.Request.Files[content];
                                            fileExtension = Path.GetExtension(postFile.FileName);
                                            GalItemsObj = new GalleryItems();
                                            GalItemsObj.albumId = GalAlbumObj.albumId;
                                            GalItemsObj.url = "/vid/" + GalItemsObj.galleryItemID + fileExtension;
                                            GalItemsObj.itemType = "video";
                                            GalItemsObj.Source = "INTL";
                                            GalItemsObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                            status = GalItemsObj.InsertGalleryItem();
                                            string SaveLocation = (HttpContext.Current.Server.MapPath("~/vid/"));
                                            postFile.SaveAs(SaveLocation + @"\" + GalItemsObj.galleryItemID + fileExtension);
                                            CreateThumbnailForVideo(context.Request.Form.GetValues("Thubnailimage")[0], GalItemsObj.galleryItemID);
                                            


                                        }//end of foreach
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(GalAlbumObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        GalAlbumObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(GalAlbumObj));
                                    }

                                    break;
                                case "AddMoreVideos":
                                    try
                                    {
                                        foreach (string content in context.Request.Files)
                                        {
                                            postFile = context.Request.Files[content];
                                            fileExtension = Path.GetExtension(postFile.FileName);
                                            GalItemsObj = new GalleryItems();
                                            GalItemsObj.albumId = context.Request.Form.GetValues("AlbumID")[0];
                                            GalItemsObj.url = "/vid/" + GalItemsObj.galleryItemID + fileExtension;
                                            GalItemsObj.itemType = "video";
                                            GalItemsObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                            status = GalItemsObj.InsertGalleryItem();
                                            string SaveLocation = (HttpContext.Current.Server.MapPath("~/vid/"));
                                            postFile.SaveAs(SaveLocation + @"\" + GalItemsObj.galleryItemID + fileExtension);
                                            CreateThumbnailForVideo(context.Request.Form.GetValues("Thubnailimage")[0], GalItemsObj.galleryItemID);


                                        }//end of foreach
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(GalItemsObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        GalItemsObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(GalItemsObj));
                                    }

                                    break;
                            }
                        }
                        #endregion Album
                        #region ActionTyp
                        //This is for single image upload purpose
                        if (context.Request.Form.GetValues("ActionTyp") != null)
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
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(AppImgObj));
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
                                        churchObj = new ChurchApp.DAL.Church();
                                        //Insert to table
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();


                                        //church insert
                                        churchObj.churchName = context.Request.Form.GetValues("churchName")[0];
                                        churchObj.townCode = context.Request.Form.GetValues("townCode")[0];
                                        churchObj.description = context.Request.Form.GetValues("description")[0];
                                        churchObj.about = context.Request.Form.GetValues("about")[0];
                                        churchObj.mainImageId = AppImgObj.appImageId;
                                        churchObj.address = context.Request.Form.GetValues("address")[0];
                                        churchObj.latitude = context.Request.Form.GetValues("latitude")[0];
                                        churchObj.longitude = context.Request.Form.GetValues("longitude")[0];
                                        churchObj.phone1 = context.Request.Form.GetValues("phone1")[0];
                                        churchObj.phone2 = context.Request.Form.GetValues("phone2")[0];
                                        churchObj.createdBy = AppImgObj.createdBy;
                                        churchObj.InsertChurch();

                                        fileName = AppImgObj.appImageId + fileExtension;
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(churchObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        churchObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(churchObj));
                                    }




                                    break;
                                case "ChurchUpdate":
                                    try
                                    {

                                        churchObj = new ChurchApp.DAL.Church();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        if ((context.Request.Form.GetValues("ChurchImageID")[0] != "") && (context.Request.Form.GetValues("ChurchImageID")[0] != null))
                                        {
                                            //update currrent church image with new one
                                            AppImgObj.appImageId = context.Request.Form.GetValues("ChurchImageID")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }

                                        }
                                        else
                                        {
                                            //insert new image for imageless church
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.createdBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.InsertAppImage1().ToString();
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                        }
                                        //Update Church

                                        //Ishome flag true determines update from home page
                                        //if (context.Request.Form.GetValues("IsHome") != null)
                                        //{
                                        //    if (context.Request.Form.GetValues("IsHome")[0] != "")
                                        //    {
                                        //        churchObj.IsHome = Boolean.Parse(context.Request.Form.GetValues("IsHome")[0].ToString());
                                        //    }
                                        //}

                                        //churchObj.churchId = context.Request.Form.GetValues("churchid")[0];
                                        //churchObj.churchName = context.Request.Form.GetValues("churchName")[0];
                                        //churchObj.townCode = context.Request.Form.GetValues("townCode")[0];
                                        //churchObj.description = context.Request.Form.GetValues("description")[0];
                                        //churchObj.about = context.Request.Form.GetValues("about")[0];
                                        //churchObj.mainImageId = AppImgObj.appImageId;
                                        //churchObj.address = context.Request.Form.GetValues("address")[0];
                                        //churchObj.latitude = context.Request.Form.GetValues("latitude")[0];
                                        //churchObj.longitude = context.Request.Form.GetValues("longitude")[0];
                                        //churchObj.phone1 = context.Request.Form.GetValues("phone1")[0];
                                        //churchObj.phone2 = context.Request.Form.GetValues("phone2")[0];
                                        //churchObj.updatedBy = AppImgObj.updatedBy;
                                        //churchObj.UpdateChurch();
                                        //jsSerializer = new JavaScriptSerializer();
                                        //context.Response.Write(jsSerializer.Serialize(churchObj));

                                        if (context.Request.Form.GetValues("IsHome") != null)
                                        {
                                            churchObj.IsHome = Boolean.Parse(context.Request.Form.GetValues("IsHome")[0].ToString());
                                            churchObj.churchId = context.Request.Form.GetValues("churchid")[0];
                                            churchObj.churchName = context.Request.Form.GetValues("churchName")[0];
                                            churchObj.description = context.Request.Form.GetValues("description")[0];
                                            churchObj.mainImageId = AppImgObj.appImageId;
                                            churchObj.updatedBy = AppImgObj.createdBy;
                                            churchObj.UpdateChurch();
                                            jsSerializer = new JavaScriptSerializer();
                                            context.Response.Write(jsSerializer.Serialize(churchObj));

                                        }
                                        else
                                        {
                                            churchObj.churchId = context.Request.Form.GetValues("churchid")[0];
                                            churchObj.churchName = context.Request.Form.GetValues("churchName")[0];
                                            churchObj.description = context.Request.Form.GetValues("description")[0];
                                            churchObj.about = context.Request.Form.GetValues("about")[0];
                                            churchObj.mainImageId = AppImgObj.appImageId;
                                            churchObj.townCode = context.Request.Form.GetValues("townCode")[0];
                                            churchObj.address = context.Request.Form.GetValues("address")[0];
                                            churchObj.latitude = context.Request.Form.GetValues("latitude")[0];
                                            churchObj.longitude = context.Request.Form.GetValues("longitude")[0];
                                            churchObj.phone1 = context.Request.Form.GetValues("phone1")[0];
                                            churchObj.phone2 = context.Request.Form.GetValues("phone2")[0];
                                            churchObj.updatedBy = AppImgObj.updatedBy;
                                            churchObj.UpdateChurch();
                                            jsSerializer = new JavaScriptSerializer();
                                            context.Response.Write(jsSerializer.Serialize(churchObj));
                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        churchObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(churchObj));
                                    }


                                    break;
                                case "TownImageInsert":
                                    try
                                    {
                                        townMasterObj = new TownMaster();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();


                                        townMasterObj.name = context.Request.Form.GetValues("townName")[0];
                                        townMasterObj.createdBy = AppImgObj.createdBy;
                                        townMasterObj.imageId = AppImgObj.appImageId;
                                        townMasterObj.InsertTownMaster();

                                        fileName = AppImgObj.appImageId + fileExtension;
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(townMasterObj));
                                    }
                                    catch (Exception ex)
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
                                            //AppImgObj.appImageId = context.Request.Form.GetValues("townImageID")[0];
                                            //AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            //AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            //AppImgObj.type = "image";
                                            //AppImgObj.Extension = fileExtension;
                                            //AppImgObj.postedFile = postFile;
                                            ////Delete Previous image from folder and save new folder 
                                            //AppImgObj.UpdateCurrentAppImageInFolder();

                                            AppImgObj.appImageId = context.Request.Form.GetValues("townImageID")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }
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
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

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
                                    catch (Exception ex)
                                    {
                                        townMasterObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(townMasterObj));
                                    }

                                    break;
                                case "PatronImageInsert":
                                    try
                                    {
                                        patronMasterObj = new PatronMaster();
                                        //Insert to table
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();
                                        patronMasterObj.patronMasterName = context.Request.Form.GetValues("patronName")[0];
                                        patronMasterObj.description = context.Request.Form.GetValues("description")[0];
                                        patronMasterObj.createdBy = AppImgObj.createdBy;
                                        patronMasterObj.imageID = AppImgObj.appImageId;
                                        patronMasterObj.InsertPatronMaster();
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(patronMasterObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        patronMasterObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(patronMasterObj));
                                    }
                                    break;
                                case "PatronImageUpdate":
                                    try
                                    {
                                        patronMasterObj = new PatronMaster();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        if ((context.Request.Form.GetValues("patronImageID")[0] != "") && (context.Request.Form.GetValues("patronImageID")[0] != null))
                                        {
                                            //update currrent patron image with new one
                                            //AppImgObj.appImageId = context.Request.Form.GetValues("patronImageID")[0];
                                            //AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            //AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            //AppImgObj.type = "image";
                                            //AppImgObj.Extension = fileExtension;
                                            //AppImgObj.postedFile = postFile;
                                            ////Delete Previous image from folder and save new folder 
                                            //AppImgObj.UpdateCurrentAppImageInFolder();


                                            AppImgObj.appImageId = context.Request.Form.GetValues("patronImageID")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }
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
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                        }
                                        //Update PatronMaster
                                        patronMasterObj.patronMasterId = context.Request.Form.GetValues("patronID")[0];
                                        patronMasterObj.patronMasterName = context.Request.Form.GetValues("patronName")[0];
                                        patronMasterObj.description = context.Request.Form.GetValues("description")[0];

                                        patronMasterObj.updatedBy = AppImgObj.updatedBy;
                                        patronMasterObj.imageID = AppImgObj.appImageId;
                                        patronMasterObj.UpdatePatronMaster();

                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(patronMasterObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        patronMasterObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(patronMasterObj));
                                    }

                                    break;

                                case "PriestImageInsert":
                                    try
                                    {
                                        priestObj = new Priest();
                                        //Insert to table
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();
                                        priestObj.churchID = context.Request.Form.GetValues("churchID")[0];
                                        priestObj.priestName = context.Request.Form.GetValues("priestName")[0];
                                        priestObj.BaptisumName = context.Request.Form.GetValues("BaptisumName")[0];
                                        priestObj.Parish = context.Request.Form.GetValues("Parish")[0];
                                        priestObj.Diocese = context.Request.Form.GetValues("Diocese")[0];
                                        priestObj.Status = context.Request.Form.GetValues("Status")[0];
                                        priestObj.dob = context.Request.Form.GetValues("dob")[0];
                                        priestObj.about = context.Request.Form.GetValues("about")[0];
                                        priestObj.dateOrdination = context.Request.Form.GetValues("dateOrdination")[0];
                                        priestObj.designation = context.Request.Form.GetValues("designation")[0];
                                        priestObj.address = context.Request.Form.GetValues("address")[0];
                                        priestObj.emailId = context.Request.Form.GetValues("emailId")[0];
                                        priestObj.mobile = context.Request.Form.GetValues("mobile")[0];
                                        priestObj.createdBy = AppImgObj.createdBy;
                                        priestObj.imageId = AppImgObj.appImageId;
                                        priestObj.InsertPriest();
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(priestObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        priestObj.result = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(priestObj));
                                    }
                                    break;
                                case "PriestImageUpdate":
                                    try
                                    {
                                        priestObj = new Priest();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        if ((context.Request.Form.GetValues("priestImageID")[0] != "") && (context.Request.Form.GetValues("priestImageID")[0] != null))
                                        {
                                            AppImgObj.appImageId = context.Request.Form.GetValues("priestImageID")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }
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
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                        }
                                        //Update Priest
                                        priestObj.churchID = context.Request.Form.GetValues("churchID")[0];
                                        priestObj.priestID = context.Request.Form.GetValues("priestID")[0];
                                        priestObj.priestName = context.Request.Form.GetValues("priestName")[0];
                                        priestObj.BaptisumName = context.Request.Form.GetValues("BaptisumName")[0];
                                        priestObj.Parish = context.Request.Form.GetValues("Parish")[0];
                                        priestObj.Diocese = context.Request.Form.GetValues("Diocese")[0];
                                        priestObj.Status = context.Request.Form.GetValues("Status")[0];
                                        priestObj.dob = context.Request.Form.GetValues("dob")[0];
                                        priestObj.about = context.Request.Form.GetValues("about")[0];
                                        priestObj.dateOrdination = context.Request.Form.GetValues("dateOrdination")[0];
                                        priestObj.designation = context.Request.Form.GetValues("designation")[0];
                                        priestObj.address = context.Request.Form.GetValues("address")[0];
                                        priestObj.emailId = context.Request.Form.GetValues("emailId")[0];
                                        priestObj.mobile = context.Request.Form.GetValues("mobile")[0];
                                        priestObj.updatedBy = AppImgObj.updatedBy;
                                        priestObj.imageId = AppImgObj.appImageId;
                                        priestObj.UpdatePriest();

                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(priestObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        priestObj.result = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(priestObj));
                                    }
                                    break;
                                case "EventImageInsert":
                                    try
                                    {
                                        EventObj = new DAL.Events();
                                        //Insert to table
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();
                                        EventObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        EventObj.description = context.Request.Form.GetValues("description")[0];
                                        EventObj.eventName = context.Request.Form.GetValues("eventName")[0];
                                        EventObj.startDate = context.Request.Form.GetValues("startDate")[0];
                                        EventObj.endDate = context.Request.Form.GetValues("endDate")[0];
                                        EventObj.eventExpiryDate = context.Request.Form.GetValues("eventExpiryDate")[0];
                                        EventObj.isAutoHide = context.Request.Form.GetValues("isAutoHide")[0];
                                        EventObj.createdBy = AppImgObj.createdBy;
                                        EventObj.imageId = AppImgObj.appImageId;
                                        EventObj.InsertEvent();
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(EventObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        EventObj.Status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(EventObj));
                                    }
                                    break;
                                case "EventImageUpdate":
                                    try
                                    {
                                        EventObj = new DAL.Events();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        if ((context.Request.Form.GetValues("EventimageId")[0] != "") && (context.Request.Form.GetValues("EventimageId")[0] != null))
                                        {
                                            //update currrent image with new one
                                            AppImgObj.appImageId = context.Request.Form.GetValues("EventimageId")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }
                                        }
                                        else
                                        {
                                            //insert new image for imageless Event
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.createdBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.InsertAppImage1().ToString();
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                        }
                                        //Update Events
                                        EventObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        EventObj.eventId = context.Request.Form.GetValues("eventId")[0];
                                        EventObj.description = context.Request.Form.GetValues("description")[0];
                                        EventObj.eventName = context.Request.Form.GetValues("eventName")[0];
                                        EventObj.startDate = context.Request.Form.GetValues("startDate")[0];
                                        EventObj.endDate = context.Request.Form.GetValues("endDate")[0];
                                        EventObj.eventExpiryDate = context.Request.Form.GetValues("eventExpiryDate")[0];
                                        EventObj.isAutoHide = context.Request.Form.GetValues("isAutoHide")[0];
                                        EventObj.updatedBy = AppImgObj.updatedBy;
                                        EventObj.imageId = AppImgObj.appImageId;
                                        EventObj.UpdateEvent();

                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(EventObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        EventObj.Status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(EventObj));
                                    }
                                    break;
                                case "NoticeImageInsert":
                                    try
                                    {
                                        NoticeObj = new DAL.Notices();
                                        //Insert to table
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();
                                        NoticeObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        NoticeObj.description = context.Request.Form.GetValues("description")[0];
                                        NoticeObj.noticeName = context.Request.Form.GetValues("noticeName")[0];
                                        NoticeObj.noticeType = context.Request.Form.GetValues("noticeType")[0];
                                        NoticeObj.createdBy = AppImgObj.createdBy;
                                        NoticeObj.imageId = AppImgObj.appImageId;
                                        NoticeObj.InsertNotice();
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(NoticeObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        NoticeObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(NoticeObj));
                                    }
                                    break;
                                case "NoticeImageUpdate":
                                    try
                                    {
                                        NoticeObj = new DAL.Notices();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        if ((context.Request.Form.GetValues("NoticeimageId")[0] != "") && (context.Request.Form.GetValues("NoticeimageId")[0] != null))
                                        {
                                            //update currrent image with new one
                                            AppImgObj.appImageId = context.Request.Form.GetValues("NoticeimageId")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }
                                        }
                                        else
                                        {
                                            //insert new image for imageless
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.createdBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.InsertAppImage1().ToString();
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                        }
                                        //Update Notice
                                        NoticeObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        NoticeObj.noticeId = context.Request.Form.GetValues("noticeId")[0];
                                        NoticeObj.description = context.Request.Form.GetValues("description")[0];
                                        NoticeObj.noticeName = context.Request.Form.GetValues("noticeName")[0];
                                        NoticeObj.noticeType = context.Request.Form.GetValues("noticeType")[0];
                                        NoticeObj.updatedBy = AppImgObj.updatedBy;
                                        NoticeObj.imageId = AppImgObj.appImageId;
                                        NoticeObj.UpdateNotice();

                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(NoticeObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        NoticeObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(NoticeObj));
                                    }
                                    break;
                                case "InstitutionImageInsert":
                                    try
                                    {
                                        InstObj = new DAL.Institutions();
                                        //EventObj = new Events();
                                        //Insert to table
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();
                                        InstObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        InstObj.description = context.Request.Form.GetValues("description")[0];
                                        InstObj.name = context.Request.Form.GetValues("name")[0];
                                        InstObj.address = context.Request.Form.GetValues("address")[0];
                                        InstObj.Founder = context.Request.Form.GetValues("Founder")[0];
                                        InstObj.Founded = context.Request.Form.GetValues("Founded")[0];
                                        InstObj.Email = context.Request.Form.GetValues("Email")[0];
                                        InstObj.Website = context.Request.Form.GetValues("Website")[0];
                                        InstObj.phone1 = context.Request.Form.GetValues("phone1")[0];
                                        InstObj.phone2 = context.Request.Form.GetValues("phone2")[0];
                                        InstObj.Mobile = context.Request.Form.GetValues("Mobile")[0];
                                        InstObj.createdBy = AppImgObj.createdBy;
                                        InstObj.imageId = AppImgObj.appImageId;
                                        InstObj.InsertInstitution();
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(InstObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        InstObj.results = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(InstObj));
                                    }
                                    break;
                                case "InstitutionImageUpdate":
                                    try
                                    {
                                        InstObj = new DAL.Institutions();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        if ((context.Request.Form.GetValues("InstitutionimageId")[0] != "") && (context.Request.Form.GetValues("InstitutionimageId")[0] != null))
                                        {
                                            //update currrent image with new one
                                            AppImgObj.appImageId = context.Request.Form.GetValues("InstitutionimageId")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }
                                        }
                                        else
                                        {
                                            //insert new image for imageless Event
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.createdBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.InsertAppImage1().ToString();
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                        }
                                        //Update Events
                                        InstObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        InstObj.institutionID = context.Request.Form.GetValues("institutionID")[0];
                                        InstObj.description = context.Request.Form.GetValues("description")[0];
                                        InstObj.name = context.Request.Form.GetValues("name")[0];
                                        InstObj.address = context.Request.Form.GetValues("address")[0];
                                        InstObj.Founder = context.Request.Form.GetValues("Founder")[0];
                                        InstObj.Founded = context.Request.Form.GetValues("Founded")[0];
                                        InstObj.Email = context.Request.Form.GetValues("Email")[0];
                                        InstObj.Website = context.Request.Form.GetValues("Website")[0];
                                        InstObj.phone1 = context.Request.Form.GetValues("phone1")[0];
                                        InstObj.phone2 = context.Request.Form.GetValues("phone2")[0];
                                        InstObj.Mobile = context.Request.Form.GetValues("Mobile")[0];
                                        InstObj.updatedBy = AppImgObj.updatedBy;
                                        InstObj.imageId = AppImgObj.appImageId;
                                        InstObj.UpdateInstitution();

                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(InstObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        InstObj.results = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(InstObj));
                                    }
                                    break;
                                case "MemberImageInsert":
                                    try
                                    {
                                        memberObj = new Members();
                                        familyObj = new Family();
                                        unitsObj = new FamilyUnits();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();
                                        memberObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        memberObj.firstName = context.Request.Form.GetValues("firstName")[0];
                                        memberObj.lastName = context.Request.Form.GetValues("lastName")[0];
                                        memberObj.familyName = context.Request.Form.GetValues("familyName")[0];
                                        familyObj.familyName = context.Request.Form.GetValues("familyName")[0];
                                        memberObj.contact = context.Request.Form.GetValues("contact")[0];
                                        memberObj.address = context.Request.Form.GetValues("address")[0];
                                        unitsObj.unitId = context.Request.Form.GetValues("unitId")[0];
                                        memberObj.memberId = context.Request.Form.GetValues("memberId")[0];
                                        memberObj.familyID = context.Request.Form.GetValues("familyId")[0];
                                        memberObj.isHead = context.Request.Form.GetValues("isHead")[0];
                                        memberObj.createdBy = AppImgObj.createdBy;
                                        memberObj.imageId = AppImgObj.appImageId;
                                        memberObj.InsertMember();
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(memberObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        memberObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(memberObj));
                                    }
                                    break;
                                case "MemberImageUpdate":
                                    try
                                    {
                                        memberObj = new Members();
                                        AppImgObj = new AppImages();
                                        familyObj = new Family();
                                        unitsObj = new FamilyUnits();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);

                                        if ((context.Request.Form.GetValues("memberImageID")[0] != "") && (context.Request.Form.GetValues("memberImageID")[0] != null))
                                        {
                                            //update currrent image with new one
                                            AppImgObj.appImageId = context.Request.Form.GetValues("memberImageID")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }
                                        }
                                        else
                                        {
                                            //insert new image for imageless Event
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.createdBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.InsertAppImage1().ToString();
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                        }
                                        //Update Events
                                        memberObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        memberObj.firstName = context.Request.Form.GetValues("firstName")[0];
                                        memberObj.lastName = context.Request.Form.GetValues("lastName")[0];
                                        memberObj.familyName = context.Request.Form.GetValues("familyName")[0];
                                        familyObj.familyName = context.Request.Form.GetValues("familyName")[0];
                                        memberObj.contact = context.Request.Form.GetValues("contact")[0];
                                        memberObj.address = context.Request.Form.GetValues("address")[0];
                                        unitsObj.unitId = context.Request.Form.GetValues("unitId")[0];
                                        memberObj.memberId = context.Request.Form.GetValues("memberId")[0];
                                        memberObj.familyID = context.Request.Form.GetValues("familyId")[0];
                                        memberObj.isHead = context.Request.Form.GetValues("isHead")[0];
                                        memberObj.updatedBy = AppImgObj.updatedBy;
                                        memberObj.imageId = AppImgObj.appImageId;
                                        memberObj.UpdateMember();

                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(memberObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        memberObj.status = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(memberObj));
                                    }
                                    break;
                                case "AdministratorImageInsert":
                                    try
                                    {
                                        AdminObj = new Administrators();
                                        //Insert to table
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                        AppImgObj.createdBy = context.Request.Form.GetValues("createdby")[0];
                                        AppImgObj.type = "image";
                                        AppImgObj.InsertAppImage1().ToString();
                                        AdminObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        AdminObj.desigId = context.Request.Form.GetValues("desigId")[0];
                                        AdminObj.Name = context.Request.Form.GetValues("Name")[0];
                                        AdminObj.Phone = context.Request.Form.GetValues("Phone")[0];
                                        AdminObj.orgType = context.Request.Form.GetValues("orgType")[0];
                                        AdminObj.orgId = context.Request.Form.GetValues("orgId")[0];
                                        if (context.Request.Form.GetValues("memberId")[0] != null && context.Request.Form.GetValues("memberId")[0] != "")
                                        {
                                            AdminObj.memberId = context.Request.Form.GetValues("memberId")[0];
                                        }
                                        AdminObj.createdBy = AppImgObj.createdBy;
                                        AdminObj.imageID = AppImgObj.appImageId;
                                        AdminObj.InsertAdministrator();
                                        postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + fileExtension);
                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(AdminObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        AdminObj.results = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(AdminObj));
                                    }
                                    break;
                                case "AdministratorImageUpdate":
                                    try
                                    {
                                        AdminObj = new Administrators();
                                        AppImgObj = new AppImages();
                                        postFile = context.Request.Files["upImageFile"];
                                        fileExtension = Path.GetExtension(postFile.FileName);
                                        if ((context.Request.Form.GetValues("AdminimageId")[0] != "") && (context.Request.Form.GetValues("AdminimageId")[0] != null))
                                        {
                                            //update currrent image with new one
                                            AppImgObj.appImageId = context.Request.Form.GetValues("AdminimageId")[0];
                                            AppImgObj.DeleteFromFolder();
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.updatedBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.UpdateAppImage();
                                            if (AppImgObj.status == "1")
                                            {
                                                //Delete Previous image from folder and save new folder 
                                                AppImgObj.UpdateCurrentAppImageInFolder();
                                            }
                                        }
                                        else
                                        {
                                            //insert new image for imageless Event
                                            AppImgObj.url = "/img/AppImages/" + AppImgObj.appImageId + fileExtension;
                                            AppImgObj.createdBy = context.Request.Form.GetValues("updatedby")[0];
                                            AppImgObj.type = "image";
                                            AppImgObj.Extension = fileExtension;
                                            AppImgObj.postedFile = postFile;
                                            AppImgObj.InsertAppImage1().ToString();
                                            postFile.SaveAs(ImgLoc + @"\" + AppImgObj.appImageId + AppImgObj.Extension);

                                        }
                                        //Update Events
                                        AdminObj.churchId = context.Request.Form.GetValues("churchID")[0];
                                        AdminObj.desigId = context.Request.Form.GetValues("desigId")[0];
                                        AdminObj.adminId = context.Request.Form.GetValues("adminId")[0];
                                        AdminObj.Name = context.Request.Form.GetValues("Name")[0];
                                        AdminObj.Phone = context.Request.Form.GetValues("Phone")[0];
                                        AdminObj.orgType = context.Request.Form.GetValues("orgType")[0];
                                        AdminObj.orgId = context.Request.Form.GetValues("orgId")[0];
                                        if (context.Request.Form.GetValues("memberId")[0] != null && context.Request.Form.GetValues("memberId")[0] != "")
                                        {
                                            AdminObj.memberId = context.Request.Form.GetValues("memberId")[0];
                                        }
                                        AdminObj.updatedBy = AppImgObj.updatedBy;
                                        AdminObj.imageID = AppImgObj.appImageId;
                                        AdminObj.UpdateAdministrator();

                                        jsSerializer = new JavaScriptSerializer();
                                        context.Response.Write(jsSerializer.Serialize(AdminObj));
                                    }
                                    catch (Exception ex)
                                    {
                                        AdminObj.results = ex.Message;
                                        context.Response.Write(jsSerializer.Serialize(AdminObj));
                                    }
                                    break;
                            }
                        }
                        #endregion ActionTyp
                        


                    } //end of if count
                }
                else
                {
                    jsSerializer = new JavaScriptSerializer();
                    Common comonObj = new Common();
                    context.Response.Write(jsSerializer.Serialize(comonObj.RedirctCurrentRequest()));
                }

            }//try
            catch (Exception e)
            {
                throw e;
            }
            finally
            {

            }


        }
        
        public bool CreateThumbnailForVideo(string base64,string ThumbID)
        {
            try
            {
                var outputFile = HttpContext.Current.Server.MapPath("~/vid/Poster/") + ThumbID + ".jpg";
                using (FileStream fs = new FileStream(outputFile, FileMode.Create))
                {
                    using (BinaryWriter bw = new BinaryWriter(fs))
                    {
                        byte[] data = Convert.FromBase64String(base64);
                        bw.Write(data);
                        bw.Close();
                    }
                }
                
                

            }
           catch(Exception ex)
            {
                throw ex;
            }
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