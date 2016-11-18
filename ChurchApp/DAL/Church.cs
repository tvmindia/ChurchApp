using Church.DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Web;

using System.Net;
using System.Text;
using System.IO;
using System.Security.Cryptography;
using System.Configuration;

using System.Web.Script.Serialization;

namespace ChurchApp.DAL
{
    public class Church
    {
        public Administrators administrators = new Administrators();
        public AppImages appImages = new AppImages();
        public GalleryAlbum galleryAlbum = new GalleryAlbum();
        public Members members = new Members();
        public Events events = new Events();
        public FamilyUnits familyUnits = new FamilyUnits();
        public Institutions institutions = new Institutions();
        public Notices notices = new Notices();
        public Notification notifications = new Notification();
        public Novenas novenas = new Novenas();
        public PiousOrg piousOrg = new PiousOrg();
        public Priest priest = new Priest();

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

        #region InsertChurch
        /// <summary>
        /// Insert New Church
        /// </summary>
        /// <returns>success or failure</returns>
        public string InsertChurch()
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
                cmd.CommandText = "[InsertChurch]";
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = churchName;
                cmd.Parameters.Add("@TownCode", SqlDbType.NVarChar, 10).Value = townCode;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about;
                cmd.Parameters.Add("@MainImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(mainImageId);
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                cmd.Parameters.Add("@Latitude", SqlDbType.NVarChar, 100).Value = latitude;
                cmd.Parameters.Add("@Longitude", SqlDbType.NVarChar, 100).Value = longitude;
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2;
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
                outParameter = cmd.Parameters.Add("@InsertStatus", SqlDbType.TinyInt);
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
            return outParameter.Value.ToString();

        }

        #endregion InsertChurch

        #region UpdateChurch
        /// <summary>
        /// Edit Church
        /// </summary>
        /// <returns>success or failure</returns>
        public Int16 UpdateChurch()
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
                cmd.Parameters.Add("@Name", SqlDbType.NVarChar, 150).Value = churchName;
                cmd.Parameters.Add("@TownCode", SqlDbType.NVarChar, 10).Value = townCode;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@About", SqlDbType.NVarChar, -1).Value = about;
                cmd.Parameters.Add("@MainImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(mainImageId);
                cmd.Parameters.Add("@Address", SqlDbType.NVarChar, -1).Value = address;
                cmd.Parameters.Add("@Latitude", SqlDbType.NVarChar, 100).Value = latitude;
                cmd.Parameters.Add("@Longitude", SqlDbType.NVarChar, 100).Value = longitude;
                cmd.Parameters.Add("@Phone1", SqlDbType.NVarChar, 20).Value = phone1;
                cmd.Parameters.Add("@Phone2", SqlDbType.NVarChar, 20).Value = phone2;
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
            return Int16.Parse(outParameter.Value.ToString());

        }
        #endregion UpdateChurch

        #region DeleteChurch
        /// <summary>
        /// Delete Church
        /// </summary>
        /// <param name="ChurchID"></param>
        /// <returns>success or failure</returns>
        public Int16 DeleteChurch()
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
                outParameter = cmd.Parameters.Add("@DeleteStatus", SqlDbType.TinyInt);
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
            return Int16.Parse(outParameter.Value.ToString());

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
                cmd.Parameters.Add("@Longtitude", SqlDbType.Float).Value = longitude;
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
                urlRequest = @"http://maps.googleapis.com/maps/api/distancematrix/json?origins=" + source + "&destinations=" + Destination + "&mode='" + travelMode + "'&sensor=false";
                           

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
                var final = str3["distance"];
                
                string dist = final["text"].ToString();
                string value = final["value"].ToString();

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

        #endregion Public Properties

        #region ChurchDetail Methods

        #region SelectChurchDetails
        /// <summary>
        /// Get All Church Details
        /// </summary>
        /// <returns>All Church Details</returns>
        public DataSet SelectChurchDetails()
        {
            dbConnection dcon = null;
            DataSet ds = null;
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
        #endregion SelectChurchDetails

        #region InsertChurchDetails

        /// <summary>
        /// Add New Church Detail
        /// </summary>
        /// <returns>Success or Failure</returns>
        public string InsertChurchDetails()
        {
            dbConnection dcon = null;
            SqlParameter param1 = null;
            SqlCommand cmd = null;

            try
            {
                dcon = new dbConnection();
                dcon.GetDBConnection();
                cmd = new SqlCommand();
                cmd.Connection = dcon.SQLCon;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[InsertChurchDetails]";
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, -1).Value = caption;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                cmd.Parameters.Add("@CreatedBy", SqlDbType.NVarChar, 100).Value = createdBy;
                cmd.Parameters.Add("@CreatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
            return param1.Value.ToString();
        }
        #endregion InsertChurchDetails

        #region UpdateChurchDetails
        /// <summary>
        /// Edit Church Details
        /// </summary>
        /// <returns>Success/failure</returns>
        public string UpdateChurchDetails()
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
                cmd.Parameters.Add("@ChurchID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(churchDetailID);
                cmd.Parameters.Add("@Caption", SqlDbType.NVarChar, -1).Value = caption;
                cmd.Parameters.Add("@Description", SqlDbType.NVarChar, -1).Value = description;
                cmd.Parameters.Add("@ImageID", SqlDbType.UniqueIdentifier).Value = Guid.Parse(imageId);
                cmd.Parameters.Add("@UpdatedBy", SqlDbType.NVarChar, 100).Value = updatedBy;
                cmd.Parameters.Add("@UpdatedDate", SqlDbType.DateTime).Value = DateTime.Now;
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
            return param1.Value.ToString();
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

        #endregion ChurchDetail Methods

    }
    public class MassTimings : Church
    {
        #region Public Properties
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
        public string massTime
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
        public string InsertMassTiming()
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
                cmd.Parameters.Add("@Day", SqlDbType.NVarChar, 3).Value = day;
                massTime = massTime.Replace(" ", "");
                cmd.Parameters.Add("@Time", SqlDbType.Time, 7).Value = TimeSpan.Parse(massTime);
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
                cmd.Parameters.Add("@Day", SqlDbType.NVarChar, 3).Value = day;
                massTime = massTime.Replace(" ", "");
                cmd.Parameters.Add("@Time", SqlDbType.Time, 7).Value = TimeSpan.Parse(massTime);
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
            return outParam1.Value.ToString();
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
                cmd.Parameters.Add("@Day", SqlDbType.NVarChar, 3).Value = day;
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