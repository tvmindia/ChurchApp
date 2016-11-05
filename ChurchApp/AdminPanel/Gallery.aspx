﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Gallery.aspx.cs" Inherits="ChurchApp.AdminPanel.Gallery" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Gallery.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Gallery.js"></script>
    <div id="content" class="span10">
        <ul class="breadcrumb" id="breadcrumbGallery">
				 <li class="home">
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li class="Gallery">
                    <i class="icon-home"></i> Gallery</li>
			</ul>
              <div class="row-fluid" id="divImageAlbum">
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Albums</h2>
						<div class="box-icon">
							<a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>
						</div>
					</div>
					<div class="box-content">
			       <div class="ImageAlbum-Gallery">
                    <div class="span4">      
                  
                     
                      <a data-rel="tooltip" data-original-title="Create New Album" style="top: 67%;left: 38%;position: relative;" id="newalbum">Create Album</></a>
             
                   </div>      
                             
                    </div>
					
				</div><!--/span-->
              </div>
              </div> 
              <div class="row-fluid" id="divImages">
                	<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span><span id="ImageDivTitle">Album Images</span></h2>
						<div class="box-icon">
							
						</div>
					</div>
					<div class="box-content">
						<div class="Image-Gallery">
                        <div class="span4">
                       <a data-rel="tooltip" data-original-title="Add More Images" style="top: 67%;left: 38%;position: relative;" id="newimage">Add  More</></a>
                        </div>




					</div>
                        </div>
                        
			     	</div><!--/span-->

               </div>
              <div class="row-fluid" id="divVideoAlbum">
             <div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Video Album</h2>
						<div class="box-icon">
							<a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="VideoAlbum-gallery">
								
			           <div class="responsive-fixed">
                        <div class="img-fixed">
                         <a href="#" id="newVideoAlbum">
                        <img src="../img/defaultalbumadd.jpg" class="addnewImage" alt="Trolltunga Norway"/>
                        </a>
                        <div id="chooseVideoAlbum" ><span>Add New Album</span></div> 
                     </div>
                    </div>

														
		                </div>
					</div>
				</div><!--/span-->
			</div>
              <div class="row-fluid" id="divVideos">
             <div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> AlbumName Videos</h2>
						<div class="box-icon">
							<a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="VideoAlbum-gallery">
								
			           <div class="responsive-fixed">
                        <div class="img-fixed">
                         <a href="#" id="newVideo">
                        <img src="../img/defaultalbumadd.jpg" class="addnewImage" alt="Trolltunga Norway"/>
                        </a>
                        <div id="chooseVideo" ><span>Add New Album</span></div> 
                     </div>
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
                        <div class="span10">
                         <div class="form-horizontal">
				             
                                <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtAlbumName" type="text"/>
                                    <input class="input-file" multiple="multiple" id="AlbumUploader" style="display:none" name="AlbumUploader[]" type="file"/>
                         		</div>
								</div>
                          
                              
                                </div>
                        </div>
                        <div class="span10" id="previewdiv">
                            
                               
                            <output id="imageListAlbum" class=""> 
                                <span class="span4">
                                <a onclick="BtnImageUpload();" class="" style="top:67%;left:28%;position:relative"  id="btnupload">Choose Image</a>
                                </span>

                            </output>
                                  
                        </div>

           	</div>  

            <div class="modal-footer">
			<a href="#" class="btn" data-dismiss="modal">Close</a>
			<a href="#" class="btn btn-primary" id="btnSaveImageAlbum">Save changes</a>
		    </div>
		    </div>
		
	</div>
              <div class="modal hide fade" id="NewImageModel">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>New Image</h3>
		</div>
		<div class="modal-body">
                     <div class="form-horizontal">
				    <fieldset>
                      <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtImageName" type="text"/>
                         		</div>
								</div>
                                <div class="control-group">
                                                    <div class="controls">
                                                        <output id="imageList" class="listClass"></output>
                                                    </div>
                                                </div>

                                <div class="control-group">
							  <label class="control-label" for="fileInput">File input</label>
							  <div class="controls">
								<input class="input-file uniform_on" multiple="multiple" id="ImageUploader" type="file"/>
							  </div>
							</div>       
                           
                      
						  </fieldset>
					</div>  


			
		</div>
		<div class="modal-footer">
			<a href="#" class="btn" data-dismiss="modal">Close</a>
			<a href="#" class="btn btn-primary">Save changes</a>
		</div>
	</div>

               <div class="modal hide fade" id="NewVideoAlbumModel">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>New Video Album</h3>
		</div>
		<div class="modal-body">


              <div class="form-horizontal">
				    <fieldset>
                      
					
                     
							  
                                <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtVideoAlbumName" type="text"/>
                         		</div>
								</div>
                                <div class="control-group">
                                                    <div class="controls">
                                                        <output id="imageListVideoAlbum" class="listClass"></output>
                                                    </div>
                                                </div>

                                <div class="control-group">
							  <label class="control-label" for="fileInput">File input</label>
							  <div class="controls">
								<input class="input-file uniform_on" multiple="multiple" id="ImageUploader" type="file"/>
							  </div>
							</div>       
                           
                      
						  </fieldset>
					</div>  


			
		</div>
		<div class="modal-footer">
			<a href="#" class="btn" data-dismiss="modal">Close</a>
			<a href="#" class="btn btn-primary">Save changes</a>
		</div>
	</div>

              <div class="modal hide fade" id="NewVideoModel">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>New Video

			</h3>
		</div>
		<div class="modal-body">


              <div class="form-horizontal">
				    <fieldset>
                      
					
                     
							  
                                <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtVideoName" type="text"/>
                         		</div>
								</div>
                                <div class="control-group">
                                                    <div class="controls">
                                                        <output id="imageListVideo" class="listClass"></output>
                                                    </div>
                                                </div>

                                <div class="control-group">
							  <label class="control-label" for="fileInput">File input</label>
							  <div class="controls">
								<input class="input-file uniform_on" multiple="multiple" id="VideoUploader" type="file"/>
							  </div>
							</div>       
                           
                      
						  </fieldset>
					</div>  


			
		</div>
		<div class="modal-footer">
			<a href="#" class="btn" data-dismiss="modal">Close</a>
			<a href="#" class="btn btn-primary">Save changes</a>
		</div>
	</div>
              <!--End Models used in this page-->




    

    </div>
</asp:Content>
