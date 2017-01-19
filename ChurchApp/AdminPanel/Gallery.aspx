<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Gallery.aspx.cs" Inherits="ChurchApp.AdminPanel.Gallery" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Gallery.css" rel="stylesheet" />
  <%--  <link href="../CSS/lightbox.min.css" rel="stylesheet" />--%>
    <%-- <script src="../Scripts/lightbox-plus-jquery.min.js"></script>--%>
    <link href="../CSS/lightbox.css" rel="stylesheet" />
    <script src="../Scripts/lightbox.js"></script>
   <script src="../Scripts/progressbar.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Gallery.js"></script>
    <style>
        .change{
            position:absolute!important;
            width:100%!important;
        }
       .imagebutton:hover
       {
           opacity:0.4;
       }
       .Orspan{
           position: relative;
           margin-top: 70%;
           font-size: x-large;
           font-weight: 700;
       }
      .butto {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  background:#1c1c1c url('http://static.clipconverter.cc/css/black-tie/images/ui-bg_glass_55_1c1c1c_1x400.png') 50% 50% repeat-x;
  color: white;
  top:6.5px;
  /* Hide the text 'play', which is present in the HTML document for accessibility */
  font-size: 0;
  line-height: normal;
  cursor:pointer;

}

/* Properties for the pseudo-element that almost every button will need.
   You can just merge it into the style below if you are only going to have
   the play button. */
.butto::before {
  content: "";
  display: block;
  position: absolute;
}
@-webkit-keyframes glowing {
  0% { background-color: #B20000; -webkit-box-shadow: 0 0 3px #6be5fb; }
  50% { background-color: #FF0000; -webkit-box-shadow: 0 0 40px #41f5ef; }
  100% { background-color: #B20000; -webkit-box-shadow: 0 0 3px #07d8d8; }
}

@-moz-keyframes glowing {
  0% { background-color: #B20000; -moz-box-shadow: 0 0 3px #6be5fb; }
  50% { background-color: #FF0000; -moz-box-shadow: 0 0 40px #41f5ef; }
  100% { background-color: #B20000; -moz-box-shadow: 0 0 3px #07d8d8; }
}

@-o-keyframes glowing {
  0% { background-color: #B20000; box-shadow: 0 0 3px #6be5fb; }
  50% { background-color: #FF0000; box-shadow: 0 0 40px #41f5ef; }
  100% { background-color: #B20000; box-shadow: 0 0 3px #07d8d8; }
}

@keyframes glowing {
  0% { background-color: #B20000; box-shadow: 0 0 3px #6be5fb; }
  50% { background-color: #FF0000; box-shadow: 0 0 40px #41f5ef; }
  100% { background-color: #B20000; box-shadow: 0 0 3px #07d8d8; }
}

.anim {
  -webkit-animation: glowing 1500ms infinite;
  -moz-animation: glowing 1500ms infinite;
  -o-animation: glowing 1500ms infinite;
  animation: glowing 1500ms infinite;
}
/* Play button properties using font */
.play1.butto::before {
  font-family: 'Webdings';
  font-size: 11px;
  content: '\25B6';
  top: 7px;
  left: 12px;
}
.btn:hover{
    border:2px solid rgba(0,0,0,0.25);
}
    </style>
    <div id="content" class="span10">
              <ul class="breadcrumb" id="breadcrumbGallery">
				 <li class="home">
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li class="Gallery">Gallery</li>
			</ul><a class="btnNew" id="btnAddNew" style="display:none;" runat="server" title=""><i title="Add New Notice">+</i></a>
           
              <div class="row-fluid" id="divImageAlbum">
                  
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Albums</h2>
						<div class="box-icon">
				            <a class="pencilEdit" style="position: relative; top: -1px;  right: 0px;display:none;" title="Edit" id="EditAlbum"><i class="halflings-icon pencil" aria-hidden="true"></i></a>
                            <a class="" style="display:none;position: relative; top: -1px;  right: 0px;" title="Edit" id="RefreshAlbum"><i class="halflings-icon repeat" aria-hidden="true"></i></a>
                            <a class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							
						</div>
					</div>
					<div class="box-content">
			       <div class="ImageAlbum-Gallery">
                   <div id="divCreateAlbum"style="height: 238px!important;border: 2px dotted black;background-color: #fff;width: 23%;display:none;float: left;padding-left: 5px;padding-bottom:8px;">
                   <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 125px;left: 125px;" src="../img/Plussymbol.png"/>
                    <a data-rel="tooltip" data-original-title="Create New Album" style="top: 67%;left: 22%;color:#adb3bb;position: relative;cursor:pointer;font-size: 20px;font-weight: 700;cursor:pointer;" id="newalbum">Create Album</></a>


                   </div>
                   
                       </div>      
                   
					
				    </div><!--/span-->
              </div>
              </div> 
              <div class="row-fluid" id="divImages" style="display:none;">
                	<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span><span class="textneveroverflow" id="ImageDivTitle">Album Images</span></h2>
						<div class="box-icon">
							<a class="pencilEdit" style="position: relative; top: -1px;  right: -4px;" title="Edit" id="EditImageAlbum"><i class="halflings-icon pencil" aria-hidden="true"></i></a>
                            <a class="" style="display:none;position: relative; top: -1px;  right: -4px;" title="Refresh" id="RefreshImageAlbum"><i class="halflings-icon repeat" aria-hidden="true"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="Image-Gallery">
                             <div id="divAddMore" style="height: 238px!important;border: 2px dotted black;background-color: #fff;width: 229px;float: left;padding-left: 5px;padding-bottom:8px;">
                         <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 125px;left: 103px;" src="../img/Plussymbol.png"/>
                            <a data-rel="tooltip" data-original-title="Add More Images"  style="top: 67%;left: 26%;color:#adb3bb;position: relative;cursor:pointer;font-size: 20px;font-weight: 700;cursor:pointer;" id="newimage">Add More</></a>
                           </div>
                      
                        </div>




					</div>
                        </div>
                        
			     	</div><!--/span-->

         
       

              <div class="row-fluid" id="divVideoAlbum">
             <div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon facetime-video"></i><span class="break"></span> Video Album</h2>
						<div class="box-icon">
						
					        <a class="pencilEdit" style="position: relative; top: -1px;display:none;  right: 0px;" title="Edit" id="EditVideoAlbum"><i class="halflings-icon pencil" aria-hidden="true"></i></a>
                            <a class="" style="display:none;position: relative; top: -1px;display:none;  right: 0px;" title="Edit" id="RefreshVideoAlbum"><i class="halflings-icon repeat" aria-hidden="true"></i></a>
                            <a class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="VideoAlbum-gallery">

                         <div id="divCreateVideoAlbum"style="height: 238px!important;display:none;border: 2px dotted black;background-color: #fff;width: 23%;display: none;float: left;padding-left: 5px;padding-bottom:8px;">
                   <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 125px;left: 125px;" src="../img/Plussymbol.png"/>
                    <a data-rel="tooltip" data-original-title="Create New Album" style="top: 67%;left: 22%;color:#adb3bb;position: relative;cursor:pointer;font-size: 20px;font-weight: 700;cursor:pointer;" id="newVideoalbum">Create Album</></a>

                   </div>                       
                            
                       <%--  <video controls="controls"  width="320" height="240" src="../vid/AH-64D%20Apache%20.mp4">HTML5 is required to play</video>		
                           <video controls="controls"  width="320" height="240" src="../vid/mosco.mp4">HTML5 is required to play</video>		
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/lNG0B9Bkj8g" frameborder="0" allowfullscreen></iframe>	--%>
		                </div>
					</div>
				</div><!--/span-->
			</div>
              <div class="row-fluid" id="divVideos" style="display:none;">
             <div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon facetime-video"></i><span class="break"></span><span class="textneveroverflow" id="VideoDivTitle">AlbumName Videos</span></h2>
                       <div class="box-icon">
							<a class="pencilEdit" style="position:relative;top: -1px;right: -4px;" title="Edit" id="EditVideo"><i class="halflings-icon pencil" aria-hidden="true"></i></a>
                            <a style="position:relative;top: -1px;right: -4px;" title="Refresh" id="RefreshVideo"><i class="halflings-icon repeat" aria-hidden="true"></i></a>
						
						</div>
					</div>
					<div class="box-content">
						<div class="Video-gallery">
		                 <div id="divAddMoreVideos" style="height: 249px!important;display:none;border: 2px dotted black;background-color:#fff;width: 380px;display: block;float: left;margin-left:15px;">
                         <img style="text-align: center;display: block;position: relative;height: 47px;width: 43px;top: 93px;left: 40%;" src="../img/Plussymbol.png"/>
                            <a data-rel="tooltip" data-original-title="Add more videos" style="top: 44%;left: 28%;color:#adb3bb;position: relative;cursor:pointer;font-size: 33px;font-weight: 700;font-family: Helvetica, Arial, sans-serif;" id="newvideo">Add More</></a>
                           </div>
			        

														
		                </div>
					</div>
				</div><!--/span-->
			</div>




               <!--Models used in this page-->
	           <div class="modal hide fade" id="NewAlbumModel">
		       <div class="modal-header">
			   <button type="button" class="close modelClear" data-dismiss="modal">×</button>
			   <h3>Create New Album</h3>
		        </div>
		       <div class="modal-body">
                        <div class="span12">
               							
								<div class="span12">
								  <input class="input-large focused span12" name="Name" id="txtAlbumName" placeholder="Enter album name(Maximum 100 characters)" type="text"/>
                                    <input class="input-file" multiple="multiple" id="AlbumUploader" style="display:none" name="AlbumUploader[]" accept="image/*" type="file"/>
                         		</div>
	                    </div>
                        <div class="span10" id="previewdiv">
                            
                               
                            <output id="imageListAlbum" class=""> 
                       <span style="height:176px!important;border:2px dotted black;background-color: #fff;width: 180px;display: block;float: left;margin:4px;">
                       <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 126px;left: 109px;" src="../img/Plussymbol.png"/>
                        <a onclick="BtnImageUpload();" class="" style="top:59%;left:28%;position:relative;cursor:pointer;"  id="btnupload">Choose Image</a>
                       </span>
                                

                            </output>
                                  
                        </div>

               </div>  
               <div class="modal-footer">
			
			<a href="#" class="btn btn-primary" id="btnSaveImageAlbum">Save</a>
                <a href="#" class="btn btn-primary modelClear" data-dismiss="modal">Close</a>
		    </div>
		       </div>
               <div class="modal hide fade" id="NewImageModel">
		        <div class="modal-header">
			<button type="button" class="close modelClear" data-dismiss="modal">×</button>
			<h3>New Image</h3>
		</div>
	        	<div class="modal-body">


                      <div class="span10">
                         <div class="form-horizontal">
				             
                                <div class="control-group" style="margin-top:20px">
							
								<div class="controls">
								 
                                    <input class="input-file" multiple="multiple" id="imageUploader" style="display:none" name="imageUploader[]" accept="image/*" type="file"/>
                         		</div>
								</div>
                          
                              
                                </div>
                        </div>
                      <div class="span10" id="previewdivinimages">
                       <output id="imageListimages" class=""> 
                       <span style="height: 176px!important;border: 2px dotted black;background-color:#fff;width: 180px;display: block;float: left;margin:4px;">
                       <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 142px;left: 109px;" src="../img/Plussymbol.png"/>
                        <a onclick="BtnImageAddNew();" class="" style="top:67%;left:28%;position:relative;cursor:pointer;"  id="btnuploadimages">Choose Image</a>
                       </span>
                                

                            </output>
                      </div>

			
		</div>
	            <div class="modal-footer">
			
			<a href="#" id="btnMoreImagesAdd" class="btn btn-primary">Save</a>
            <a href="#" class="btn btn-primary modelClear" data-dismiss="modal">Close</a>
		</div>
     	       </div>
               <div class="modal hide fade" id="NewVideoAlbumModel">
		          <div class="modal-header">
			<button type="button" class="close modelClear" data-dismiss="modal">×</button>
			<h3>New Video Album</h3>
		</div>
		          <div class="modal-body">
             
                         <div class="span12">
                                <div class="span12">
								  <input class="input-large focused span12" name="Name" id="txtVidAlbumName" placeholder="Enter album name(Maximum 100 characters)" type="text"/>
                                    <input class="input-file" id="AlbumVidUploader" style="display:none" name="AlbumVidUploader[]" onchange="Videosnapshot(this)" accept="video/*" type="file"/>
                         		</div>
		            	  </div>
                         <div class="span10" id="previewVideodiv">
                             <div class="span5" id="Uploaddivitems">
                                 <img style="position:relative;cursor:pointer;" id="Fileuploadimg" class="imagebutton" title="ADD VIDEO" src="../img/VideoAdd.PNG" width="150" height="150" onclick="BtnVideoUpload();"/>
                               
                                 
                                 <div id="UrlAggingdiv" style="display:none">
                                     <div class="" style="">
                                         <span class="add-on" style="background-color:white;border-color:white;font-size:13px;font-weight:600;margin-bottom:2px;"><i class="fa fa-film" style="font-size:18px;color:#034d09;"></i> Video URL to Add:</span>
                                         <input type="text" style="border-radius:5px;height:16px;margin-left:13px;" id="txtAddlink" class="input-large" placeholder="Paste Video url here...."/>
                                     <a class="play1 butto" id="btnPlay" style="" title="Preview Video" onclick="PreviewYoutube()"></a>
                                     </div>
                                     
                                 
                                 </div>
                                 
                             </div>
                             <div class="span2" id="Orspan">
                                 <span class="Orspan">OR</span>

                             </div>
                            <div class="span5" id="UploadContentdiv">
                                <a class="btn" id="AddLink" style="width:auto;margin: 22%;background-color:white;font-family:sans-serif;font-weight:600;color:black;font-size:21px;border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);border-bottom-color: #b3b3b3;width:80%;" onclick="AddYoutubeLink()">Add <img src="../img/iconyou.png" style="vertical-align: text-bottom;"/> video</a>
                                <div id="VideoPreviewdiv" style="display:none;">
                                    <embed id="previewVideoyoutubediv1video" width="250" height="250" src="" frameborder="0" allowfullscreen style="display:none;" />
                                    <video id="previewVideodiv1video" src="" loop="loop" style="object-fit: cover!important;display:none;" width="250" height="250" controls autoplay></video><br/>
                                   <canvas id="previewVideodiv1canvas" width="247" height="247" style="visibility:hidden;position:absolute;"></canvas> <br/><br/>
                                </div>
                            
                            </div>
                             
                                  
                        </div>
         
              <div style="display:none; margin: 20px;width: 200px;height: 200px;position: absolute;left:342px;top:65px;" id="progressbarUploadinVidAlbum"></div>  

			
		</div>
		     <div class="modal-footer">
			
			<a href="#" id="BtnVideoAlbumSave" class="btn btn-primary">Save</a>
            <a href="#" class="btn btn-primary modelClear" data-dismiss="modal">Close</a>
		</div>
	          </div>
               <div class="modal hide fade" id="NewVideoModel">
		        <div class="modal-header">
			<button type="button" class="close modelClear" data-dismiss="modal">×</button>
			<h3>New Video

			</h3>
		</div>
		        <div class="modal-body">
                       <div class="span10">
                         <div class="form-horizontal">
				             
                                <div class="control-group" style="margin-top:20px">
							    <div class="controls">
								 
                                    <input class="input-file" id="VideoUploader" style="display:none" name="VidepUploader[]" onchange="VideosAddnapshot(this)" accept="video/*" type="file"/>
                         		</div>
								</div>
                          
                              
                                </div>
                        </div>
                     <div class="span10" id="previewupVideodiv">
                             <div class="span5" id="Uploaddivitems1">
                                 <img style="position:relative;cursor:pointer;" id="Fileuploadimg1" class="imagebutton" title="ADD VIDEO" src="../img/VideoAdd.PNG" width="150" height="150" onclick="BtnMoreVideoUploads();"/>
                               
                                 
                                 <div id="UrlAggingdiv1" style="display:none">
                                     <div class="" style="">
                                         <span class="add-on" style="background-color:white;border-color:white;font-size:13px;font-weight:600;margin-bottom:2px;"><i class="fa fa-film" style="font-size:18px;color:#034d09;"></i> Video URL to Add:</span>
                                         <input type="text" style="border-radius:5px;height:16px;margin-left:13px;" id="txtAddlink1" class="input-large" placeholder="Paste Video url here...."/>
                                     <a class="play1 butto" id="btnPlay1" style="" title="Preview Video" onclick="PreviewYoutube1()"></a>
                                     </div>
                                     
                                 
                                 </div>
                                 
                             </div>
                             <div class="span2" id="Orspan1">
                                 <span class="Orspan">OR</span>

                             </div>
                            <div class="span5" id="UploadContentdiv1">
                                <a class="btn" id="AddLink1" style="width:auto;margin: 22%;background-color:white;font-family:sans-serif;font-weight:600;color:black;font-size:21px;border-color: rgba(0,0,0,0.1) rgba(0,0,0,0.1) rgba(0,0,0,0.25);border-bottom-color: #b3b3b3;width:80%;" onclick="AddYoutubeLinkMore()">Add <img src="../img/iconyou.png" style="vertical-align: text-bottom;"/> video</a>
                                <div id="VideoPreviewdiv1" style="display:none;">
                                    <embed id="previewVideoyoutubediv1video1" width="250" height="250" src="" frameborder="0" allowfullscreen style="display:none;" />
                                    <video id="previewVideodiv1video1" src="" loop="loop" style="object-fit: cover!important;display:none;" width="250" height="250" controls autoplay></video><br/>
                                   <canvas id="previewVideodiv1canvas1" width="247" height="247" style="visibility:hidden;position:absolute;"></canvas> <br/><br/>
                                </div>
                            
                            </div>
                             
                                  
                        </div>
                      <%-- <div class="span10" id="previewupVideodiv">
                      
                             <div class="span6">
                                 <img style="position:relative;cursor:pointer" class="imagebutton" title="ADD VIDEO" src="../img/VideoAdd.PNG" width="150" height="150" onclick="BtnMoreVideoUploads();"/>
                                 <br /><span class="Orspan">- OR -</span><br />
                                 <a class="btn" style="margin: 2%;background-color:#E62117;font-family:sans-serif;font-weight:600;" >Add youtube url</a>
                             </div>
                            <div class="span6" id="VideoPreviewdiv1" style="display:none;">
                            <video id="previewVideodiv1video1" src="" loop="loop" style="object-fit: cover!important;" width="250" height="250" controls autoplay></video><br/>
                            <canvas id="previewVideodiv1canvas1" width="247" height="247" style="visibility:hidden;position:absolute;"></canvas> <br/><br/>
                            </div>
                             
                                  
                       
                          </div>--%>

                            <div style="display:none; margin: 20px;width: 200px;height: 200px;position: absolute;left:342px;top:29px;" id="progressbarUpload"></div>                                  
                        
  		        </div>
		        <div class="modal-footer">
			
			<a href="#" id="btnMoreVideoSave" class="btn btn-primary">Save</a>
            <a href="#" class="btn btn-primary modelClear" data-dismiss="modal">Close</a>
		</div>
	          </div>

              <!--End Models used in this page-->




  

 </div>  
    <input type="hidden" id="hdfAlbumID" />
     
</asp:Content>
