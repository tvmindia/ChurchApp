<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Novenas.aspx.cs" Inherits="ChurchApp.AdminPanel.Novenas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/CustomJS/Novenas.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
    <link href="../CSS/CustomCSS/Novenas.css" rel="stylesheet" />

    <style>

        #DivSaints ul{
    display:ruby!important;
}
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

     <div id="content" class="span10">
        <ul class="breadcrumb">
			 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
            	<li>Novenas</li>
			</ul>
         

         <div class="row-fluid" id="divImageAlbum">
				<div class="box span12">
					<div class="box-header" >
						<h2><i class="halflings-icon picture"></i><span class="break"></span> Saints</h2>
						<div class="box-icon">
							<a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
							
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							
						</div>
					</div>
					<div class="box-content">
			       <div class="span12" id="DivSaints" >

                       
                        <div id="divAddSaint">
                   <img class="PlusImg" src="../img/Plussymbol.png"/>
                    <a data-rel="tooltip" data-original-title="Add New Saint"  id="aNewSaint">Add New Saint</></a>

                   </div>

<%--                            <ul class="thumbnails">
                            <li class="span2">
                            <div class="thumbnail">
                            <img src="../img/gallery/priest.png" class="img-polaroid" alt=""/>
                            <address>
                            <strong>
                            Dr. Thomson Kattingal
                            </strong>
                            <p>Manger<br />9996532452</p>
                            </address>
                            </div>
                            </li>
                            <li class="span2">
                            <div class="thumbnail">
                            <img src="../img/gallery/priest.png" alt="">
                            <address>
                            <strong>
                            Dr. Thomson Kattingal
                            </strong>
                            <p>Manger<br />9996532452</p>
                            </address>
                            </div>
                            </li>
                            <li class="span2">
                            <div class="thumbnail">
                            <img src="../img/gallery/priest.png" alt="">
                            <address>
                            <strong>
                            Dr. Thomson Kattingal
                            </strong>
                           <p>Manger<br />9996532452</p>
                           </address>
                           </div>
                          <li class="span2">
                          <div class="thumbnail">
                          <img src="../img/gallery/priest.png" alt="">
                          <address>
                          <strong>
                          Dr. Thomson Kattingal
                          </strong>
                         <p>Manger<br />9996532452</p>

                          </address>
                          </div>
                          </li>
                          <li class="span2">
                          <div class="thumbnail">
                         <img src="../img/gallery/priest.png" alt="">
                         <address>
                         <strong>
                         Dr. Thomson Kattingal
                         </strong>
                         <p>Manger<br />9996532452</p>

                         </address>
                         </div>
                         </li>
                        <li class="span2">
                        <div class="thumbnail">
                        <img src="../img/gallery/priest.png" alt="">
                        <address>
                        <strong>
                        Dr. Thomson Kattingal
                        </strong>
                        <p>Manger<br />9996532452</p>

                       </address>
                       </div>
                            </li>
 
                       </ul>--%>

                   
                   </div>      
                   
					
				    </div><!--/span-->

                      <!--Models used in this page-->
	           <div class="modal hide fade" id="NewSaintModel">
		       <div class="modal-header">
			   <button type="button" class="close" data-dismiss="modal">×</button>
			   <h3>Add New Saint</h3>
		        </div>
		       <div class="modal-body">

                    <div class="form-horizontal">

                         <div class="span12">
                              <div class="span5">
                                  <img class="imgNotices" id="NoticePreview" src="../img/No-Img_Chosen.png" />
                                   <input type="file" id="UpNotice" value="Choose Image" onchange="showpreview(this);" />
                              </div>
                             <div class="span6">

                                <label for="name">Saint Name</label><input  name="Caption" id="txtSaintName" type="text" style="width:100%" />
                                 
                                <label for="name">Description</label><textarea   id="txtSaintDescription" name="Description" rows="3" placeholder="" style="width:100%" ></textarea>
                         </div>



                        <%--<div class="span10">

                              <div class="span4">
                                        <label for="name">Saint Name</label><input class="input-large focused" name="Caption" id="txtSaintName" type="text" />
                                    </div>

                            <div class="span2"></div>
                                    <div class="span4">
                                        <label for="name">Description</label>
                                         <textarea tabindex="10" class="input-xlarge span10" id="txtSaintDescription" name="Description" rows="2" placeholder=""></textarea>
                                        
                                    </div>

                        </div>--%>
                      <%--  <div class="span10">

                            <div class="span4">
                                        <label for="name">Image</label> <input type="file" id="UpNotice" value="Choose Image" onchange="showpreview(this);" />
                                    </div>

                            <div class="span2"></div>
                                    <div class="span4">
                                        <label for="name">.</label><img class="imgNotices" id="NoticePreview" src="../img/No-Img_Chosen.png" />
                                    </div>


                        </div>--%>
                        
                        </div>


                      <%--  <div class="span10">
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
                                  
                        </div>--%>

           	</div>  

            <div class="modal-footer">
			<a href="#" class="btn" data-dismiss="modal">Close</a>
			<a href="#" class="btn btn-primary" id="btnSaveImageAlbum">Save changes</a>
		    </div>
		    </div>
		











              </div>
              </div>

             </div>

    </div>

</asp:Content>
