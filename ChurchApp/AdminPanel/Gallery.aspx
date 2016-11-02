<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Gallery.aspx.cs" Inherits="ChurchApp.AdminPanel.Gallery" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Gallery.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Gallery.js"></script>
    <div id="content" class="span10">
        <ul class="breadcrumb" id="breadcrumbGallery">
				 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Gallery</li>
			</ul>




              <div class="row-fluid">
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
						<div class="Album-Gallery">

  <div class="responsive-fixed">
  <div class="img-fixed">
    <a href="#" id="newalbum">
   
      <img src="../img/defaultalbumadd.jpg" class="addnewAlbum" alt="Trolltunga Norway"/>
    </a>
   
   <div id="choose" ><span>Choose Image</span></div> 
  

 

   
  </div>
</div>
  <div class="responsive">
  <div class="img">
    <a target="_blank" href="img_fjords.jpg">
      <img src="../img/gallery/4.jpg" alt="Trolltunga Norway"/>
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>
                               <div class="responsive">
  <div class="img">
    <a target="_blank" href="img_forest.jpg">
      <img src="../img/gallery/3.jpg" alt="Forest" />
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>
                               <div class="responsive">
  <div class="img">
    <a target="_blank" href="img_lights.jpg">
      <img src="../img/gallery/2.jpg" alt="Northern Lights"/>
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>
                               <div class="responsive">
  <div class="img">
    <a target="_blank" href="img_mountains.jpg">
      <img src="../img/gallery/1.jpg" alt="Mountains" />
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>
								

                               <div class="responsive">
  <div class="img">
    <a target="_blank" href="img_fjords.jpg">
      <img src="../img/gallery/4.jpg" alt="Trolltunga Norway" />
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>
                               <div class="responsive">
  <div class="img">
    <a target="_blank" href="img_forest.jpg">
      <img src="../img/gallery/3.jpg" alt="Forest" />
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>
                               <div class="responsive">
  <div class="img">
    <a target="_blank" href="img_lights.jpg">
      <img src="../img/gallery/2.jpg" alt="Northern Lights"/>
    </a>
    <div class="desc">Add a description of the image here</div>
  </div>
</div>
                               <div class="responsive">
                               <div class="img">
                               <a target="_blank" href="img_mountains.jpg">
                               <img src="../img/gallery/1.jpg" alt="Mountains"/>
                                </a>
                               <div class="desc">Add a description of the image h</div>
                              </div>
                              </div>
                	  </div>
					</div>
				</div><!--/span-->
              </div>
              <div class="row-fluid">
                	<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Images</h2>
						<div class="box-icon">
							<a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="masonry-gallery">
								
                            	<div id="image-7" class="masonry-thumb">
								<a style="background:url(img/gallery/photo6.jpg)" title="Sample Image 6" href="img/gallery/photo6.jpg"><img class="img-polaroid" src="..."  alt="Sample Image 6"/></a>
							</div>
							
														
						  </div>
					</div>
				</div><!--/span-->

               </div>
              <div class="row-fluid"
             <div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Videos</h2>
						<div class="box-icon">
							<a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							<a href="#" class="btn-close"><i class="halflings-icon remove"></i></a>
						</div>
					</div>
					<div class="box-content">
						<div class="masonry-gallery">
								<div id="image-1" class="masonry-thumb">
								<a style="background:url(img/gallery/photo1.jpg)" title="Sample Image 1" href="img/gallery/photo1.jpg"><img class="grayscale" src="../img/gallery/1.jpg" alt="Sample Image 1"></a>
							</div>
								<div id="image-2" class="masonry-thumb">
								<a style="background:url(img/gallery/photo2.jpg)" title="Sample Image 2" href="img/gallery/photo2.jpg"><img class="grayscale" src="../img/gallery/2.jpg" alt="Sample Image 2"></a>
							</div>
								<div id="image-3" class="masonry-thumb">
								<a style="background:url(img/gallery/photo3.jpg)" title="Sample Image 3" href="img/gallery/photo3.jpg"><img class="grayscale" src="../img/gallery/3.jpg" alt="Sample Image 3"></a>
							</div>
								<div id="image-4" class="masonry-thumb">
								<a style="background:url(img/gallery/photo4.jpg)" title="Sample Image 4" href="img/gallery/photo4.jpg"><img class="grayscale" src="../img/gallery/4.jpg" alt="Sample Image 4"></a>
							</div>
								<div id="image-5" class="masonry-thumb">
								<a style="background:url(img/gallery/photo5.jpg)" title="Sample Image 5" href="img/gallery/photo5.jpg"><img class="grayscale" src="../img/gallery/5.jpg" alt="Sample Image 5"></a>
							</div>
								<div id="image-6" class="masonry-thumb">
								<a style="background:url(img/gallery/photo6.jpg)" title="Sample Image 6" href="img/gallery/photo6.jpg"><img class="grayscale" src="../img/gallery/6.jpg" alt="Sample Image 6"></a>
							</div>
								
														
													</div>
					</div>
				</div><!--/span-->
			</div>
	  
   

	
         <div class="modal hide fade" id="NewAlbumModel">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>Create New Album</h3>
		</div>
		<div class="modal-body">


              <div class="form-horizontal">
				    <fieldset>
                      
					
                     
							  
                                <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtAlbumName" type="text"/>
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





    </div>


</asp:Content>
