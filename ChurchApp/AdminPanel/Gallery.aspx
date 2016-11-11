<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Gallery.aspx.cs" Inherits="ChurchApp.AdminPanel.Gallery" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Gallery.css" rel="stylesheet" />
  <%--  <link href="../CSS/lightbox.min.css" rel="stylesheet" />--%>
    <%-- <script src="../Scripts/lightbox-plus-jquery.min.js"></script>--%>
    <link href="../CSS/lightbox.css" rel="stylesheet" />
    <script src="../Scripts/lightbox.js"></script>
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
			</ul>
              <div class="row-fluid" id="divImageAlbum">
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Albums</h2>
						<div class="box-icon">
							<a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							
						</div>
					</div>
					<div class="box-content">
			       <div class="ImageAlbum-Gallery">
                   <div style="height: 238px!important;border: 2px dotted black;background-color: #fefefe;width: 23%;display: block;float: left;padding-left: 5px;padding-bottom:8px;">
                   <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 125px;left: 125px;" src="../img/Plussymbol.png"/>
                    <a data-rel="tooltip" data-original-title="Create New Album" style="top: 67%;left: 29%;position: relative;" id="newalbum">Create Album</></a>

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
							<a class="btnEdit" style="position: relative; top: -1px;  right: -4px;" title="Edit" id="EditImageAlbum"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>
                            <a class="btnEdit" style="display:none;position: relative; top: -1px;  right: -4px;" title="Refresh" id="RefreshImageAlbum"><i class="halflings-icon white refresh" aria-hidden="true"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="Image-Gallery">
                             <div id="divAddMore" style="height: 238px!important;border: 2px dotted black;background-color: #fefefe;width: 229px;display: block;float: left;padding-left: 5px;padding-bottom:8px;">
                         <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 129px;left: 112px;" src="../img/Plussymbol.png"/>
                            <a data-rel="tooltip" data-original-title="Add More Images" style="top: 67%;left: 34%;position: relative;" id="newimage">Add  More</></a>
                           </div>
                      
                        </div>




					</div>
                        </div>
                        
			     	</div><!--/span-->
              <div class="row-fluid" id="divVideoAlbum">
             <div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Video Album</h2>
						<div class="box-icon">
							<a href="#" id="" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
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
							<a href="#" id="" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
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
                       <span style="height: 176px!important;border: 2px dotted black;background-color: #e8f7ff;width: 180px;display: block;float: left;margin:4px;">
                       <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 167px;left: 109px;" src="../img/Plussymbol.png"/>
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
								 
                                    <input class="input-file" multiple="multiple" id="imageUploader" style="display:none" name="imageUploader[]" type="file"/>
                         		</div>
								</div>
                          
                              
                                </div>
                        </div>
                   
            <div class="span10" id="previewdivinimages">
                            
                               
                            <output id="imageListimages" class=""> 
                       <span style="height: 176px!important;border: 2px dotted black;background-color: #e8f7ff;width: 180px;display: block;float: left;margin:4px;">
                       <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 142px;left: 109px;" src="../img/Plussymbol.png"/>
                        <a onclick="BtnImageAddNew();" class="" style="top:67%;left:28%;position:relative"  id="btnuploadimages">Choose Image</a>
                       </span>
                                

                            </output>
                                  
                        </div>

			
		</div>
		<div class="modal-footer">
			<a href="#" class="btn" data-dismiss="modal">Close</a>
			<a href="#" id="btnMoreImagesAdd" class="btn btn-primary">Save changes</a>
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
    <input type="hidden" id="hdfAlbumID" />
     
</asp:Content>
