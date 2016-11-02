
#region Included Namespaces
using ChurchApp.DAL;
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
                if (context.Request.Files.Count > 0)
                {

                    foreach (string s in context.Request.Files)
                    {
                        HttpPostedFile file = context.Request.Files[s];
                        switch (s)
                        {

                            case "NoticeAppImage":
                                   // string fn = System.IO.Path.GetFileName(file.FileName);
                                    string guid = context.Request.Form.GetValues("GUID")[0];
                                    string SaveLocation = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                                    try
                                    {
                                        HttpPostedFile postedFile = context.Request.Files["NoticeAppImage"];
                                        //if (Directory.Exists(SaveLocation))
                                        //{
                                            fileExtension = Path.GetExtension(file.FileName);
                                            string fileName = guid + fileExtension;
                                            postedFile.SaveAs(SaveLocation + @"\" +fileName);
                                            //string fileName = postedFile.FileName;

                                            //  context.Response.Write(matchesImgSrc.Count);
                                            AppImagePath = "~/AppImages/" + fileName;
                                            AppImagePath=AppImagePath.Replace("~/", "");

                                        //}
                                        context.Response.Write(AppImagePath);

                                    }
                                    catch (Exception ex)
                                    {
                                        throw ex;
                                    }
                                    break;
                            //Gallery
                            case "AlbumImage":
                                    GalleryAlbum GalAlbumObj = new GalleryAlbum();
                                    GalAlbumObj.churchId = "41f453f6-62a4-4f80-8fc5-1124e6074287";
                                    GalAlbumObj.albumName = "myalbum";
                                    GalAlbumObj.albumType = "image";
                                    GalAlbumObj.isDelete = "false";
                                    GalAlbumObj.createdBy = "albert";
                                    GalAlbumObj.InsertGalleryAlbum();
                                    GalleryItems GalItemsObj = new GalleryItems();
                                    GalItemsObj.albumId = GalAlbumObj.albumId;
                                    GalItemsObj.url = "/albert/wonder";
                                    GalItemsObj.itemType = "image";
                                    GalItemsObj.createdBy = "albert";
                                    GalItemsObj.InsertGalleryItem();
                                    string SaveLocation1 = HttpContext.Current.Server.MapPath("~/img/AppImages/");
                                    //HttpPostedFile postedFiles = context.Request.Files["AlbumImage"];
                                    fileExtension = Path.GetExtension(file.FileName);
                                    string fileName1 = GalItemsObj.galleryItemID + fileExtension;
                                    file.SaveAs(SaveLocation1 + @"\" +fileName1);
                                    AppImagePath = "~/AppImages/" + fileName1;
                                    AppImagePath=AppImagePath.Replace("~/", "");
                                    context.Response.Write(AppImagePath);
                                    break;

                        }
                    }//end of loop
                         
                     string result = "";

                    switch (context.Request.Form.GetValues("ActionTyp")[0])
                    {
                        case "NoticeAppImageInsert":
                              AppImages AppImgObj = new AppImages();
                              AppImgObj.appImageId = context.Request.Form.GetValues("GUID")[0];
                              AppImgObj.url = AppImagePath;
                              AppImgObj.createdBy = "Shamila";

                              result = AppImgObj.InsertAppImage().ToString();
                              context.Response.Write(AppImagePath);

                                                     
                            break;

                    }//end of switch


                } //end of if count

            }//try
            catch (Exception e)
            {
                throw e;
            }


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