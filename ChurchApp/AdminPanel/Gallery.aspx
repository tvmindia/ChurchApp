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
    </style>
    <div id="content" class="span10">
              <ul class="breadcrumb" id="breadcrumbGallery">
				 <li class="home">
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li class="Gallery">
                    <i class="icon-home"></i> Gallery</li>
			</ul><a class="btnNew" id="btnAddNew" style="display:none;" runat="server" title=""><i title="Add New Notice">+</i></a>
              <%--Alert boxes --%>
               <div id="rowfluidDivImages" style="display:none;">	
				       <div class="alert alert-error" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Successfull.</strong> 
						</div>
						<div class="alert alert-info" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
						</div>
						<div class="alert alert-block" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<h4 class="alert-heading">Warning!</h4>
							<p>Best check yourself, you're not looking too good.</p>
						</div>
					

              
            </div>
			  <%--Alert boxes --%>
              <div class="row-fluid" id="divImageAlbum">
                  
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Albums</h2>
						<div class="box-icon">
							<a id="toggle-fullscreen" class="hidden-phone hidden-tablet btnEdit"><i class="halflings-icon white fullscreen"></i></a>
					        <a class="btnEdit pencilEdit" style="position: relative; top: -1px;  right: 0px;display:none;" title="Edit" id="EditAlbum"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>
                            <a class="btnEdit" style="display:none;position: relative; top: -1px;  right: 0px;" title="Edit" id="RefreshAlbum"><i class="halflings-icon white refresh" aria-hidden="true"></i></a>
                            <a class="btn-minimize btnEdit"><i class="halflings-icon white chevron-up"></i></a>
							
						</div>
					</div>
					<div class="box-content">
			       <div class="ImageAlbum-Gallery">
                   <div id="divCreateAlbum"style="height: 238px!important;border: 2px dotted black;background-color: #fff;width: 23%;display:none;float: left;padding-left: 5px;padding-bottom:8px;">
                   <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 125px;left: 125px;" src="../img/Plussymbol.png"/>
                    <a data-rel="tooltip" data-original-title="Create New Album" style="top: 67%;left: 29%;position: relative;cursor:pointer;" id="newalbum">Create Album</></a>


                   </div>
                   
                       </div>      
                   
					
				    </div><!--/span-->
              </div>
              </div> 
              <div class="row-fluid" id="divImages" style="display:none;">
                	<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span><span id="ImageDivTitle">Album Images</span></h2>
						<div class="box-icon">
							<a class="btnEdit pencilEdit" style="position: relative; top: -1px;  right: -4px;" title="Edit" id="EditImageAlbum"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>
                            <a class="btnEdit" style="display:none;position: relative; top: -1px;  right: -4px;" title="Refresh" id="RefreshImageAlbum"><i class="halflings-icon white refresh" aria-hidden="true"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="Image-Gallery">
                             <div id="divAddMore" style="height: 238px!important;border: 2px dotted black;background-color: #fff;width: 229px;float: left;padding-left: 5px;padding-bottom:8px;">
                         <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 129px;left: 112px;" src="../img/Plussymbol.png"/>
                            <a data-rel="tooltip" data-original-title="Add More Images"  style="top: 67%;left: 34%;position: relative;cursor:pointer;" id="newimage">Add More</></a>
                           </div>
                      
                        </div>




					</div>
                        </div>
                        
			     	</div><!--/span-->

         
         <%--Alert boxes --%>
               <div id="rowfluidDivVideos" style="display:none;">	
				       <div class="alert alert-error" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Successfull.</strong> 
						</div>
						<div class="alert alert-info" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
						</div>
						<div class="alert alert-block" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<h4 class="alert-heading">Warning!</h4>
							<p>Best check yourself, you're not looking too good.</p>
						</div>
					

              
            </div>
			  <%--Alert boxes --%>

              <div class="row-fluid" id="divVideoAlbum">
             <div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon facetime-video"></i><span class="break"></span> Video Album</h2>
						<div class="box-icon">
						<a id="toggle-fullscreenvid" class="hidden-phone hidden-tablet btnEdit"><i class="halflings-icon white fullscreen"></i></a>
					        <a class="btnEdit pencilEdit" style="position: relative; top: -1px;display:none;  right: 0px;" title="Edit" id="EditVideoAlbum"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>
                            <a class="btnEdit" style="display:none;position: relative; top: -1px;display:none;  right: 0px;" title="Edit" id="RefreshVideoAlbum"><i class="halflings-icon white refresh" aria-hidden="true"></i></a>
                            <a class="btn-minimize btnEdit"><i class="halflings-icon white chevron-up"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="VideoAlbum-gallery">

                         <div id="divCreateVideoAlbum"style="height: 238px!important;display:none;border: 2px dotted black;background-color: #fff;width: 23%;display: none;float: left;padding-left: 5px;padding-bottom:8px;">
                   <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 125px;left: 125px;" src="../img/Plussymbol.png"/>
                    <a data-rel="tooltip" data-original-title="Create New Album" style="top: 67%;left: 29%;position: relative;cursor:pointer;" id="newVideoalbum">Create Album</></a>

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
						<h2><i class="halflings-icon facetime-video"></i><span class="break"></span><span id="VideoDivTitle">AlbumName Videos</span></h2>
                       <div class="box-icon">
							<a class="btnEdit pencilEdit" style="position: relative; top: -1px;  right: -4px;" title="Edit" id="EditVideo"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>
                            <a class="btnEdit" style="position: relative; top: -1px;  right: -4px;" title="Refresh" id="RefreshVideo"><i class="halflings-icon white refresh" aria-hidden="true"></i></a>
						
						</div>
					</div>
					<div class="box-content">
						<div class="Video-gallery">
		                 <div id="divAddMoreVideos" style="height: 249px!important;display:none;border: 2px dotted black;background-color:#fff;width: 380px;display: block;float: left;margin-left:15px;">
                         <img style="text-align: center;display: block;position: relative;height: 47px;width: 43px;top: 93px;left: 40%;" src="../img/Plussymbol.png"/>
                            <a data-rel="tooltip" data-original-title="Add more videos" style="top: 44%;left: 38%;position: relative;cursor:pointer;" id="newvideo">Add More</></a>
                           </div>
			        

														
		                </div>
					</div>
				</div><!--/span-->
			</div>




               <!--Models used in this page-->
	           <div class="modal hide fade" id="NewAlbumModel">
		       <div class="modal-header">
			   <button type="button" class="close" data-dismiss="modal">×</button>
			   <h3>Create New Album</h3>
		        </div>
		       <div class="modal-body">
                        <div class="span12">
               							
								<div class="span12">
								  <input class="input-large focused span12" name="Name" id="txtAlbumName" placeholder="Enter album name" type="text"/>
                                    <input class="input-file" multiple="multiple" id="AlbumUploader" style="display:none" name="AlbumUploader[]" accept="image/*" type="file"/>
                         		</div>
	                    </div>
                        <div class="span10" id="previewdiv">
                            
                               
                            <output id="imageListAlbum" class=""> 
                       <span style="height: 176px!important;border: 2px dotted black;background-color: #fff;width: 180px;display: block;float: left;margin:4px;">
                       <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 116px;left: 109px;" src="../img/Plussymbol.png"/>
                        <a onclick="BtnImageUpload();" class="" style="top:59%;left:28%;position:relative;cursor:pointer;"  id="btnupload">Choose Image</a>
                       </span>
                                

                            </output>
                                  
                        </div>

               </div>  
               <div class="modal-footer">
			
			<a href="#" class="btn btn-primary" id="btnSaveImageAlbum">Save</a>
                <a href="#" class="btn" data-dismiss="modal">Close</a>
		    </div>
		       </div>
               <div class="modal hide fade" id="NewImageModel">
		        <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
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
            <a href="#" class="btn" data-dismiss="modal">Close</a>
		</div>
     	       </div>
               <div class="modal hide fade" id="NewVideoAlbumModel">
		          <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>New Video Album</h3>
		</div>
		          <div class="modal-body">
             
                         <div class="span12">
                                <div class="span12">
								  <input class="input-large focused span12" name="Name" id="txtVidAlbumName" placeholder="Enter album name" type="text"/>
                                    <input class="input-file" id="AlbumVidUploader" style="display:none" name="AlbumVidUploader[]" accept="video/*" type="file"/>
                         		</div>
		            	  </div>
                         <div class="span10" id="previewVideodiv">
                            
                               
                            <output id="imageListVideoAlbum" class=""> 
                       <span style="height: 176px!important;border: 2px dotted black;background-color: #fff;width: 180px;display: block;float: left;margin:4px;">
                       <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 116px;left: 109px;" src="../img/Plussymbol.png"/>
                        <a onclick="BtnVideoUpload();" class="" style="top:57%;left:28%;position:relative;cursor:pointer;"  id="btnuploadVideoAlb">Choose Videos</a>
                       </span>
                                

                            </output>
                                  
                        </div>
         
              <div style="display:none; margin: 20px;width: 200px;height: 200px;position: absolute;left:342px;top:34px;" id="progressbarUploadinVidAlbum"></div>  

			
		</div>
		     <div class="modal-footer">
			
			<a href="#" id="BtnVideoAlbumSave" class="btn btn-primary">Save</a>
            <a href="#" class="btn" data-dismiss="modal">Close</a>
		</div>
	          </div>
               <div class="modal hide fade" id="NewVideoModel">
		        <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>New Video

			</h3>
		</div>
		        <div class="modal-body">

                <div class="span10">
                         <div class="form-horizontal">
				             
                                <div class="control-group" style="margin-top:20px">
							    <div class="controls">
								 
                                    <input class="input-file" id="VideoUploader" style="display:none" name="VidepUploader[]" accept="video/*" type="file"/>
                         		</div>
								</div>
                          
                              
                                </div>
                        </div>
                        <div class="span10" id="previewupVideodiv">
                            
                               
                            <output id="imageListVideo" class=""> 
                       <span style="height: 176px!important;border: 2px dotted black;background-color: #fff;width: 180px;display: block;float: left;margin:4px;">
                       <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 133px;left: 109px;" src="../img/Plussymbol.png"/>
                        <a onclick="BtnMoreVideoUploads();" class="" style="top:62%;left:28%;position:relative;cursor:pointer;"  id="btnuploadVideo">Choose Videos</a>
                       </span>
                                

                            </output>


                            <div style="display:none; margin: 20px;width: 200px;height: 200px;position: absolute;left:342px;top:29px;" id="progressbarUpload"></div>                                  
                        </div>
           


			
		</div>
		        <div class="modal-footer">
			
			<a href="#" id="btnMoreVideoSave" class="btn btn-primary">Save</a>
            <a href="#" class="btn" data-dismiss="modal">Close</a>
		</div>
	          </div>
              <!--End Models used in this page-->




  

 </div>  
    <input type="hidden" id="hdfAlbumID" />
     
</asp:Content>
