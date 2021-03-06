﻿#region CopyRight

// Created By   : SHAMILA T P
// Created Date : Oct 27 2016

#endregion CopyRight

#region Included Namespaces

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Data;
using System.Collections;
using System.Drawing;
using System.IO;
using ChurchApp.DAL;

#endregion Included Namespaces

namespace ChurchApp.WebServices
{
    /// <summary>
    /// Summary description for WebService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
     [System.Web.Script.Services.ScriptService]
    public class WebService : System.Web.Services.WebService
    {
        Const constants = new Const();
        #region General Methods

        #region JSON converter
        /// <summary>
        /// JSON function without returning any images
        /// </summary>
        /// <param name="dt">Datatable to be converted</param>
        /// <returns>dt in JSON format</returns>
        public String getDbDataAsJSON(DataTable dt)
        {
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;

            try
            {
                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    foreach (DataColumn col in dt.Columns)
                    {
                        row.Add(col.ColumnName, dr[col]);
                    }
                    rows.Add(row);
                }
                this.Context.Response.ContentType = "";

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }

            return serializer.Serialize(rows);

        }
        /// <summary>
        /// JSON function with returning any images
        /// </summary>
        /// <param name="ds">Dataset</param>
        /// <param name="imgColName">Coloumn names array that contains images(data)</param>
        /// <param name="imgFileNameCol">Coloumn names array that contain file name</param>
        /// <param name="imgFileTypeCol">Coloumn names array that contain file type</param>
        /// <param name="isThumb">Optional parameter to say whether the thumbnail is enough for calling function</param>
        /// <returns>ds in JSON format with links to images that are temporarly stored in server folder</returns>
        public String getDbDataAsJSON(DataTable dt, ArrayList imgColName, ArrayList imgFileNameCol, ArrayList imgFileTypeCol, Boolean isThumb = false)
        {

            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
            Dictionary<string, object> row;

            try
            {
                // DataTable dt = ds.Tables[0];
                String filePath = Server.MapPath("~/Media/");

                foreach (DataRow dr in dt.Rows)
                {
                    row = new Dictionary<string, object>();
                    //adding data in JSON
                    foreach (DataColumn col in dt.Columns)
                    {
                        if (!imgColName.Contains(col.ColumnName))
                        {
                            row.Add(col.ColumnName, dr[col]);
                        }
                    }
                    //adding image details in JSON
                    for (int i = 0; i < imgColName.Count; i++)
                    {

                        if (dr[imgColName[i] as string] != DBNull.Value)
                        {
                            String fileURL;
                            if (imgFileTypeCol != null)
                                fileURL = filePath + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_") + dr[imgFileTypeCol[i] as string].ToString();
                            else
                                fileURL = filePath + dr[imgFileNameCol[i] as string].ToString().Replace(" ", "_") + ".jpg";

                            if (!System.IO.File.Exists(fileURL))
                            {
                                byte[] buffer;
                                if (isThumb)
                                {
                                    buffer = MakeThumbnail((byte[])dr[imgColName[i] as string], 400);//images are converted to thumbnails
                                    System.IO.File.WriteAllBytes(fileURL, buffer);
                                }
                                else
                                {
                                    buffer = (byte[])dr[imgColName[i] as string];
                                    System.IO.File.WriteAllBytes(fileURL, buffer);
                                }

                            }
                            row.Add(imgColName[i] as string, fileURL);
                        }

                    }
                    rows.Add(row);
                }

                this.Context.Response.ContentType = "";

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }

            return serializer.Serialize(rows);
        }
        #endregion JSON converter

        #region Utility Functions
        //----------------------------Function to make image thumbnail---------------------------------------------------
        public static byte[] MakeThumbnail(byte[] myImage, int thumbWidth)
        {
            Image img = Image.FromStream(new MemoryStream(myImage));
            int originalHeigth = img.Size.Height;
            int originalWidth = img.Size.Width;
            int thumbHeight = originalHeigth * thumbWidth / originalWidth;
            using (MemoryStream ms = new MemoryStream())
            using (Image thumbnail = img.GetThumbnailImage(thumbWidth, thumbHeight, null, new IntPtr()))
            {
                thumbnail.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                return ms.ToArray();
            }
        }
        #endregion Utility Functions

        #endregion General Methods

        #region Churches

        #region Search Church

        [WebMethod]
        // To search churches by church name or town name
        public string SearchChurch(string SearchTerm )
        {
            DataTable dt = new DataTable();
            try
            {
                ChurchApp.DAL.Church chrchobj = new DAL.Church();
                dt = chrchobj.SearchChurchesByChurchOrTownName(SearchTerm);
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        #endregion Search Church

        #region Get Church Data by ID (STATIC)
        [WebMethod]
        public string ChurchDetailsByID(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Church chrchobj = new DAL.Church();
                chrchobj.churchId = ChurchID;
                dt = chrchobj.GetChurchDetailsByChurchID();
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion Get Data Details by ID

        #region Request new church
        [WebMethod]
        public string RequestChurch()
        {            
            try
            {

                //Getting other details on object
                ChurchApp.DAL.Church churchObj = new DAL.Church();

                HttpFileCollection MyFileCollection = HttpContext.Current.Request.Files;
                //Getting file dettails from http request
                if (MyFileCollection.Count > 0) {

                    string ImageID = Guid.NewGuid().ToString();
                    string imagePath = ImageID + "." + MyFileCollection[0].FileName.Split('.').Last();
                    string FilePath = Server.MapPath("~/img/AppImages/") + imagePath;
                    MyFileCollection[0].SaveAs(FilePath); //to save coming image to server folder
                    churchObj.ImagePath = "/img/AppImages/" + imagePath;
                    churchObj.ImageID = ImageID;
                }
                    

                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form["ChurchName"]))
                    {
                        churchObj.churchName = HttpContext.Current.Request.Form["ChurchName"];
                    }
                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form["Address"]))
                    {
                        churchObj.address = HttpContext.Current.Request.Form["Address"];
                    }
                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form["Place"]))
                    {
                        churchObj.Place = HttpContext.Current.Request.Form["Place"];
                    }
                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form["UserName"]))
                    {
                        churchObj.UserName = HttpContext.Current.Request.Form["UserName"];
                    }
                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form["UserContact"]))
                    {
                        churchObj.UserContact = HttpContext.Current.Request.Form["UserContact"];
                    }
                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form["Remarks"]))
                    {
                        churchObj.Remarks = HttpContext.Current.Request.Form["Remarks"];
                    }
                    if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form["Email"]))
                    {
                        churchObj.Email = HttpContext.Current.Request.Form["Email"];
                    }         
                    
                    if (churchObj.InsertRequestChurch() == "0") throw new Exception(constants.FailToUpload);
                    return "Message:" +constants.SuccessUpload;
    
            }
            catch (Exception ex)
            {
                //Return error message
                return "Message:" + constants.FailToUpload + "\n" + ex.Message;
            }
            finally
            {
            }
        }
        #endregion

        #endregion Churches
       
        #region Church Details
        // --More details (dynamic)
        #region Mass Timings
        [WebMethod]
        public string GetMassTimings(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.MassTimings chrchDetailobj = new DAL.MassTimings();
                chrchDetailobj.massChurchId = ChurchID;
                dt = chrchDetailobj.GetMassTimingsForApp();
                if(dt.Rows.Count==0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region More Details of Church (Dynamic)

        [WebMethod]
        public string GetChurchExtraDetails(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.ChurchDetails chrchDetailobj = new DAL.ChurchDetails();
                chrchDetailobj.churchId = ChurchID;
                dt = chrchDetailobj.GetExtraChurchDetailsForApp();
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);                
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion More Details of Church (Dynamic)

        #endregion Church Details

        #region Town

        #region All Town
        [WebMethod]
        public string AllTown()
        {
            DataTable dt = new DataTable();
            try
            {
                ChurchApp.DAL.TownMaster twnObj = new DAL.TownMaster();
                dt = twnObj.SelectTownMasters().Tables[0];
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion All Town

        #endregion Town

        #region Novena

        #region All Patrons

        [WebMethod]
        public string GetAllPatrons()
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.PatronMaster patronObj = new DAL.PatronMaster();
                dt = patronObj.SelectPatronMaster().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion All Patrons

        #region Novenas By Patron ID

        [WebMethod]
        public string NovenasByPatronID(string PatronID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Novenas novenaObj = new DAL.Novenas();
                novenaObj.patronId = PatronID;
                dt = novenaObj.GetAllChurchNovenaByPatronID();
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }

            finally
            {

            }
            return getDbDataAsJSON(dt);
        }
        #endregion Novenas By Patron ID

        #region Novenas by church ID

        [WebMethod]
        public string NovenasByChurchID(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Novenas novenaObj = new DAL.Novenas();
                novenaObj.churchObj = new DAL.Church();
                novenaObj.churchObj.churchId = ChurchID;
                dt = novenaObj.GetAllNovenasByChurchID();
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }

            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion

        #endregion Novena

        #region My Church

        #region Get My ChurchDetails
        [WebMethod]
        public string GetMyChurchDetails(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Church chrchobj = new DAL.Church();
                chrchobj.churchId = ChurchID;
                dt = chrchobj.GetMyChurchDetails();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion Get My ChurchDetails

        #region Notices

        [WebMethod]
        public string GetMyChurchNotices(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Notices noticeObj = new DAL.Notices();
                noticeObj.churchId = ChurchID;
                dt = noticeObj.SelectNotices().Tables[0];

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion Notices

        #region Events

        [WebMethod]
        public string GetMyChurchEvents(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Events eventObj = new DAL.Events();
                eventObj.churchId = ChurchID;
                dt = eventObj.SelectEvents().Tables[0];

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion Events

        #region Family Units

        [WebMethod]
        public string GetMyChurchFamilyUnits(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.FamilyUnits familyUnitObj  = new DAL.FamilyUnits();
                familyUnitObj.churchId = ChurchID;
                dt = familyUnitObj.SelectFamilyUnits().Tables[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }


        #endregion Family Units

        #region Family

        [WebMethod]
        public string FamilyByFamilyUnitID(string ChurchID, string UnitID)
        {
            DataTable dt = new DataTable();
            try
            {
                ChurchApp.DAL.Family fmlyObj  = new DAL.Family();
                fmlyObj.familyUnitsObj.churchId = ChurchID;
                fmlyObj.familyUnitsObj.unitId = UnitID;
                dt=  fmlyObj.SelectFamilies().Tables[0];
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion Family

        #region Gallery Album

        [WebMethod]        
        public string GetGalleryAlbums(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.GalleryAlbum galleryObj = new DAL.GalleryAlbum();
                galleryObj.churchId = ChurchID;
                dt = galleryObj.GetGalleryAlbums();
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    if (dt.Rows[i]["AlbumType"].ToString() == "video")  //Have to make thumbnail
                    {
                        try
                        {
                            if (dt.Rows[i]["URL"].ToString().Contains("youtube"))//Get youtube thumbnail
                            {
                                var youtube_video_id = dt.Rows[i]["URL"].ToString().Substring(dt.Rows[i]["URL"].ToString().LastIndexOf("embed/") + 6);
                                dt.Rows[i]["URL"] = "http://img.youtube.com/vi/" + youtube_video_id + "/0.jpg";
                            }
                            else if (dt.Rows[i]["URL"].ToString().Contains("vimeo"))//Get vimeo thumbnail
                            {
                                var vimeo_video_id = dt.Rows[i]["URL"].ToString().Substring(dt.Rows[i]["URL"].ToString().LastIndexOf("video/") + 6);
                                dt.Rows[i]["URL"] = "/vid/Poster/vimeo.png";
                            }
                            else    //video is from own server
                            {
                                string id = dt.Rows[i]["URL"].ToString().Substring(dt.Rows[i]["URL"].ToString().LastIndexOf("vid/") + 4);
                                id = id.Substring(0, id.LastIndexOf("."));
                                dt.Rows[i]["URL"] = "/vid/Poster/" + id + ".jpg";
                            }
                        }
                        catch(Exception){
                            dt.Rows[i]["URL"] = "null";
                        }
                      
                    }
                    

                }
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion Gallery Album

        #region Gallery Items

        [WebMethod]
        public string GetGalleryItems(string albumID)
        {
            DataTable dt = new DataTable();
            try
            {
                ChurchApp.DAL.GalleryItems galleryItemObj = new DAL.GalleryItems();
                galleryItemObj.GalleryAlbObj=new DAL.GalleryAlbum();
                galleryItemObj.GalleryAlbObj.albumId = albumID;
                dt=galleryItemObj.SelectGalleryItems().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
                dt.Columns.Add("Thumbnail", typeof(String));
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    if (dt.Rows[i]["Type"].ToString() == "video")  //Have to make thumbnail
                    {
                        try
                        {
                            if (dt.Rows[i]["URL"].ToString().Contains("youtube"))//Get youtube thumbnail
                            {
                                var youtube_video_id = dt.Rows[i]["URL"].ToString().Substring(dt.Rows[i]["URL"].ToString().LastIndexOf("embed/") + 6);
                                dt.Rows[i]["Thumbnail"] = "http://img.youtube.com/vi/" + youtube_video_id + "/0.jpg";
                            }
                            else if (dt.Rows[i]["URL"].ToString().Contains("vimeo"))//Get vimeo thumbnail
                            {
                                var vimeo_video_id = dt.Rows[i]["URL"].ToString().Substring(dt.Rows[i]["URL"].ToString().LastIndexOf("video/") + 6);
                                dt.Rows[i]["Thumbnail"] = "/vid/Poster/vimeo.png";
                            }
                            else    //video is from own server
                            {
                                string id = dt.Rows[i]["URL"].ToString().Substring(dt.Rows[i]["URL"].ToString().LastIndexOf("vid/") + 4);
                                id = id.Substring(0, id.LastIndexOf("."));
                                dt.Rows[i]["Thumbnail"] = "/vid/Poster/" + id + ".jpg";
                            }
                        }
                        catch (Exception)
                        {
                            dt.Rows[i]["URL"] = "null";
                        }

                    }


                }
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }


        #endregion Gallery Items

        #region Timings

        [WebMethod]
        public string GetMyChurchTiming(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.MassTimings massTimObj = new DAL.MassTimings();
                massTimObj.churchId = ChurchID;
                dt = massTimObj.SelectMassTimings().Tables[0];

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion Timings

        #endregion My Church

        #region Nearbychurch



        [WebMethod]
        public string GetNearByChurches(string Latitude, string Longitude, int churchcount, int maxdistance)
        {
            DataTable dt, dt1 = new DataTable();
            String ChurchLat, ChurchLong, Source, Destination, result;

            try
            {
                ChurchApp.DAL.Church ChurchObj = new DAL.Church();
                ChurchObj.latitude = Latitude;
                ChurchObj.longitude = Longitude;
                dt = ChurchObj.GetNearByChurchDetails(maxdistance);
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
                DataColumn km = dt.Columns.Add("Distance", typeof(String));
                DataColumn kmvval = dt.Columns.Add("Value", typeof(int));
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    ChurchLat = dt.Rows[i]["Latitude"].ToString();
                    ChurchLong = dt.Rows[i]["Longitude"].ToString();
                    Destination = ChurchLat + ',' + ChurchLong;
                    Source = Latitude + ',' + Longitude;
                    if (i < 10)
                    {
                        result = ChurchObj.DistanceMatrixRequest(Source, Destination); //Finding distance using Google API
                        string[] km_value = result.Split('|');
                        dt.Rows[i]["Distance"] = km_value[0];
                        dt.Rows[i]["Value"] = km_value[1];
                    }
                    else {  //inserting displacement for distance
                        dt.Rows[i]["Distance"] = Convert.ToInt32(dt.Rows[i]["displacement"])+"+ km";
                        dt.Rows[i]["Value"] = dt.Rows[i]["displacement"];
                        dt.Rows[i]["Value"] = Convert.ToInt32(dt.Rows[i]["Value"]) * 1000+100000;   //for distinctly sorting distance and displacement
                    }
                        
                }

                //sorting the datatable with respect to distance 
                dt.DefaultView.Sort = "Value";
                dt = dt.DefaultView.ToTable();
                DataRow[] result1 = dt.Select("Value <= '" + maxdistance * 1000 + "'");
                dt = result1.CopyToDataTable();

                //filter  datatable with respect to churchcount
                dt1 = dt.Clone();
                for (int i = 0; i < churchcount && i < dt.Rows.Count; i++)
                {
                    dt1.ImportRow(dt.Rows[i]);
                }
                if (dt1.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt1 = new DataTable();
                dt1.Columns.Add("Flag", typeof(Boolean));
                dt1.Columns.Add("Message", typeof(String));
                DataRow dr = dt1.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt1.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt1);
        }


        #endregion Nearbychurch

        #region PiousOrganisations

        #region Get Pious Organisations Details
        [WebMethod]
        public string GetPiousOrgsByChurchID(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.PiousOrg piousobj = new DAL.PiousOrg();
                piousobj.churchID = ChurchID;
                dt = piousobj.SelectPiousOrg().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion Get Pious Organisations Details



        #endregion PiousOrganisations

        #region Institutions

        #region Get Institutions by ChurchID
        [WebMethod]
        public string GetInstitutionsByChurchID(string ChurchID)
        {
            DataTable dt = new DataTable();
            try
            {
                ChurchApp.DAL.Institutions Insobj = new DAL.Institutions();
                Insobj.churchId = ChurchID;
                dt = Insobj.SelectInstitutions().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }

        #endregion

        #endregion Institutions

        #region Events

        #region GetAllLatestEventsbyChurchId
        [WebMethod]
        public string GetAllLatestEventsbyChurchID(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Events Evtobj = new DAL.Events();
                Evtobj.churchId = ChurchID;
                dt = Evtobj.GetAllLatestEvents().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }


        #endregion GetAllLatestEventsbyChurchId

        #region GetAllOldEventsbyChurchId
        [WebMethod]
        public string GetAllOldEventsbyChurchID(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Events Evtobj = new DAL.Events();
                Evtobj.churchId = ChurchID;
                dt = Evtobj.SelectOldEvents().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }


        #endregion GetAllLatestEventsbyChurchId

        #region GetEventbyEventID
        [WebMethod]
        public string GetEventbyEventID(string EventID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Events Evtobj = new DAL.Events();
                Evtobj.eventId = EventID;
                dt = Evtobj.GetEventsByEventID().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }
        
        #endregion 

        #endregion Events

        #region Priests

        #region GetAllPriestsbyChurchID
        [WebMethod]
        public string GetAllPriestsbyChurchID(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Priest Pobj = new DAL.Priest();
                Pobj.churchID= ChurchID;
                dt = Pobj.SelectPriests().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }
        #endregion GetAllPriestsbyChurchID


        #endregion Priests

        #region Notices

        #region GetNoticesByChurchID
        [WebMethod]
        public string GetNoticesByChurchID(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Notices Nobj = new DAL.Notices();
                Nobj.churchId = ChurchID;
                dt = Nobj.SelectNotices().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }
        #endregion GetNoticesByChurchID

        #region GetNoticesByNoticeID
        [WebMethod]
        public string GetNoticesByNoticeID(string NoticeID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.Notices Nobj = new DAL.Notices();
                Nobj.noticeId = NoticeID;
                dt = Nobj.GetNoticesByNoticeID().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }
        #endregion GetNoticesByChurchID


        #endregion Notices

        #region Families

        #region GetFamilyUnitsByChurchID

        [WebMethod]
        public string GetFamilyUnitsByChurchID(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                ChurchApp.DAL.FamilyUnits FUobj = new DAL.FamilyUnits();
                FUobj.churchId = ChurchID;
                dt = FUobj.SelectFamilyUnits().Tables[0];
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);

            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }


        #endregion GetFamilyUnitsByChurchID


        #region GetFamilyByFamilyUnitsID
        //
        [WebMethod]
        public string GetFamilyDetails(string ChurchID, string UnitID)
        {
            DataTable dt = new DataTable();
            try
            {
                ChurchApp.DAL.Family fmlyObj = new DAL.Family();
                fmlyObj.familyUnitsObj = new FamilyUnits();
                fmlyObj.familyUnitsObj.churchId = ChurchID;
                fmlyObj.familyUnitsObj.unitId = UnitID;
                dt = fmlyObj.SelectFamilies().Tables[0];
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion GetFamilyByFamilyUnitsID

        #region GetFamilyExexutiveByUnintID
        //
        [WebMethod]
        public string GetFamilyExecutives(string ChurchID, string UnitID)
        {
            DataTable dt = new DataTable();
            try
            {
                ChurchApp.DAL.FamilyUnits fmlyObj = new DAL.FamilyUnits();
            
                fmlyObj.churchId = ChurchID;
                fmlyObj.unitId = UnitID;
               dt = fmlyObj.GetAdminListUsingUnitID().Tables[0];
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        #endregion GetFamilyExexutiveByUnintID

        #endregion Families

        #region Error Detection
        [WebMethod]
        public string ErrorDetection(string REPORT_ID, string PACKAGE_NAME, Object BUILD, string LOGCAT, string ANDROID_VERSION, string APP_VERSION_CODE, string AVAILABLE_MEM_SIZE, Object CRASH_CONFIGURATION)
        {
            DataTable dt = new DataTable();
            Common cmn = new Common();
            System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
            try
            {   //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.UserID = Guid.Empty.ToString();
                ETObj.ErrorID = REPORT_ID;
                ETObj.Description = "CRASH_CONFIGURATION\n\n" + serializer.Serialize(CRASH_CONFIGURATION)
                                    + "\n\nAVAILABLE_MEM_SIZE\n\n" + AVAILABLE_MEM_SIZE
                                    +"\n\nREPORT_ID\n\n" + REPORT_ID;
                ETObj.AppBuild = serializer.Serialize(BUILD);
                ETObj.AppLogCat = LOGCAT;
                ETObj.Date =cmn.ConvertDatenow(DateTime.Now).ToString();
                ETObj.Module = PACKAGE_NAME;
                ETObj.ErrorSource = "App";
                ETObj.IsMobile = true;
                ETObj.Version = ANDROID_VERSION + "/" + APP_VERSION_CODE;
                ETObj.CreatedBy = "App";
                ETObj.InsertErrorDetailsFromApp();
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
                //Code For Exception Track insert
                ExceptionTrack ETObj = new ExceptionTrack();
                ETObj.Description = ex.Message;
                ETObj.Date =cmn.ConvertDatenow(DateTime.Now).ToString();
                ETObj.Module = "Error Detection";
                ETObj.Method = "ErrorDetection";
                ETObj.InsertErrorDetailsFromWebService();
            }
            finally
            {
            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        #region Education Forum

        [WebMethod]
        public string GetEduForumAbout(string ChurchID)
        {
            DataTable dt = new DataTable();

            try
            {
                EduEventAbout eduForumAbout = new EduEventAbout();
                eduForumAbout.ChurchID = ChurchID;
                dt = eduForumAbout.SelectEduForumAbout().Tables[0];
                if (dt.Rows.Count == 0 || dt.Rows[0]["EduForumAbout"]==DBNull.Value) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        [WebMethod]
        public string EduForumOTP(string mobile,string ChurchID)
        {
            DataTable dt = new DataTable();
            try
            {
                dt.Columns.Add("IsMember");
                dt.Columns.Add("OTP");
                dt.Columns.Add("RegistrationID");
                dt.Columns.Add("MemberIDs");

                EduForumMember member = new EduForumMember();
                member.ChurchID = ChurchID;
                member.Mobile = mobile;
                DataTable memberDetails = new DataTable();
                memberDetails = member.FindMemberByMobileNumber();
                DataRow row = dt.NewRow();
                if (memberDetails.Rows.Count == 0)
                {
                    row["IsMember"] = false;
                }
                else
                {
                    row["IsMember"] = true;
                    row["RegistrationID"] = memberDetails.Rows[0]["RegistrationID"];
                    List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                    foreach (DataRow memberRow in memberDetails.Rows)
                    {
                        Dictionary<string, object> memberDetailsRow = new Dictionary<string, object>();
                        memberDetailsRow["MemberID"] = memberRow["ID"];
                        memberDetailsRow["Name"] = memberRow["Name"];
                        memberDetailsRow["Class"] = memberRow["Class"];
                        memberDetailsRow["School"] = memberRow["School"];
                        memberDetailsRow["DOB"] = memberRow["DOB"];
                        rows.Add(memberDetailsRow);
                    }
                    System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                    row["MemberIDs"]= serializer.Serialize(rows);
                }
                Random rnd = new Random();                  // Random number creation for OTP
                row["OTP"] = rnd.Next(2000, 9000);
                dt.Rows.Add(row);
             /*   SMSHandler smsHandler = new SMSHandler();
                smsHandler.SendOTP(row["OTP"].ToString(), mobile);*/
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            return getDbDataAsJSON(dt);
        }

        [WebMethod]
        public string RegisterEduForumMember(string churchID,string parentName, string familyUnit,string contactNo, string email, object childJson)
        {
            if (churchID == "" || parentName == "" || contactNo == "" ) { throw new Exception(constants.UnSuccessfull); }
            DataTable dt = new DataTable();
            string registraionID = Guid.NewGuid().ToString();
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                rows= serializer.Deserialize<List<Dictionary<string, object>>>(serializer.Serialize(childJson));
                foreach (Dictionary<string, object> row in rows)
                {
                    EduForumMember member = new EduForumMember();
                    member.ChurchID = churchID;
                    member.Name = row["Name"].ToString();
                    member.ParentName = parentName;
                    member.DOB = row["DOB"].ToString();
                    member.Class = row["Class"].ToString();
                    member.School = row["School"].ToString();
                    member.Mobile = contactNo;
                    member.Email = email;
                    member.isMobileVerified = true;
                    member.registrationID = registraionID;
                    member.familyUnit = familyUnit;
                    member.CreatedBY = "App User";
                    member.InsertForumMember();
                    row["MemberID"] = member.ID;    //Newly created member's ID passing back to app
                }
                //Success return values
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                dt.Columns.Add("RegistrationID", typeof(String));
                dt.Columns.Add("MemberIDs", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = true;
                dr["Message"] = constants.Successfull;
                dr["RegistrationID"] = registraionID;
                dr["MemberIDs"] = serializer.Serialize(rows);
                dt.Rows.Add(dr);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            return getDbDataAsJSON(dt);
        }

    
        [WebMethod]
        public string GetAllEduForumEventsbyChurchID(string churchID,Boolean isOld,string registrationID)
        {
            DataTable dt = new DataTable();
            try
            {
                EducationForum Evtobj = new EducationForum();
                Evtobj.ChurchID = churchID;
                dt = Evtobj.GetEduForumLatestAndOldEventsForApp(isOld, registrationID);
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }

        [WebMethod]
        public string InsertEduForumEventResponse(string churchID, string registrationID, string eventID, object memberResponseJson)
        {
            if (churchID == "" || registrationID == "" || eventID == "") { throw new Exception(constants.UnSuccessfull); }
            DataTable dt = new DataTable();
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
                List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
                rows = serializer.Deserialize<List<Dictionary<string, object>>>(serializer.Serialize(memberResponseJson));
                foreach (Dictionary<string, object> row in rows)
                {
                    EduEventResponse response = new EduEventResponse();
                    response.ChurchID = churchID;
                    response.EduEventID = eventID;
                    response.MemberID = row["MemberID"].ToString();
                    response.RegistrationID = registrationID;
                    response.ResponseCode= row["ResponseCode"].ToString();
                    response.CreatedBY = "App User";
                    response.InsertForumResponse();
                }
                //Success return values
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = true;
                dr["Message"] = constants.Successfull;
                dt.Rows.Add(dr);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            return getDbDataAsJSON(dt);
        }

        [WebMethod]
        public string GetEduForumEventbyEventID(string EventID, string registrationID)
        {
            DataTable dt = new DataTable();
            try
            {
                EducationForum Evtobj = new EducationForum();
                Evtobj.ID = EventID;
                dt = Evtobj.GetEduForumEventsByEventIDForApp(registrationID);
                if (dt.Rows.Count == 0) throw new Exception(constants.NoItems);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            finally
            {

            }
            return getDbDataAsJSON(dt);
        }
        #endregion

        [WebMethod]
        public string NotificationTestWebservice(string titleString, string descriptionString, Boolean isCommon, string churchID)
        {
            DataTable dt = new DataTable();

            try
            {
                Notification noti = new Notification();
                noti.SendToFCM(titleString, descriptionString, isCommon,"","", churchID);
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = true;
                dr["Message"] = "Success";
                dt.Rows.Add(dr);
            }
            catch (Exception ex)
            {
                //Return error message
                dt = new DataTable();
                dt.Columns.Add("Flag", typeof(Boolean));
                dt.Columns.Add("Message", typeof(String));
                DataRow dr = dt.NewRow();
                dr["Flag"] = false;
                dr["Message"] = ex.Message;
                dt.Rows.Add(dr);
            }
            return getDbDataAsJSON(dt);
        }
}
}
