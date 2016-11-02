<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notices.aspx.cs" Inherits="ChurchApp.AdminPanel.Notices" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    
    <%--<script src="../Scripts/select2.min.js"></script>
    <link href="../CSS/select2.min.css" rel="stylesheet" />--%>

    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Notices.js"></script>
    <link href="../CSS/CustomCSS/Notice.css" rel="stylesheet" />
    
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <form ID="frm1" runat="server">
     <div id="content" class="span10">
        <ul class="breadcrumb">
				 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Notices</li>
			</ul>
         
         

         <div class="row-fluid">

            

             <div class="span6">
                    
                 <h1>Notices</h1>
              
                 	<div class="priority high"><span>Latest Notices</span><a href="#" class="btn btn-lg btn-round btn-primary" title="" onclick="AddNewNotice();">NEW <i class="glyph-icon icon-plus"></i></a></div>
				<%--<div class="priority high"><span>Latest Notices</span></div>--%>

                 


                 <div  id="DivNoticeType1">
					<%--<div class="task high" id="IndividualNotice">

                        <div class="span12" id="divulContainer">

                            <ul class="dashboard-list">
                                <li class="liNoticeList">

                                    <div class="span3">
                                        <a href="#">
									<img class="imgNotice" src="../img/AppImages/747515f2-501a-3f59-96ba-6fd122f83f61.jpg" alt="St.Thomas Church"/>
								    
                                        </a>

                                    </div>

                                   
                                    <div class="span9">
                                   <p class="pContainerNotice">
                                    <span style="font-weight:bold;">Name</span>
                                   <br />
                                   asffffffffffffffffffffffffff   
                                    </p>	

                                    </div>

								
									
								</li>
                         </ul>

                        </div>

					</div>--%>
                </div>

                
             </div>
             
             <div class="span1"></div>

             <div  id="PriestEditDivBox" class="span5 noMarginLeft" style="display:none">
               
                 <div class="dark">
					<h1 id="h1Notice">Add Notice</h1>


					<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                       <div id="NoticeEdit" > <a style="right:30px;position: fixed;"><i class="fa fa-pencil eventEdit"  aria-hidden="true"></i> Edit</a></div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Notice Name</label>
								<div class="controls">
                                  <label class="control-label" for="focusedInput" id="lblNoticeName" style="display:none">Notice Name</label>
								  <input class="input-large focused" name="Caption" id="txtNoticeName" type="text" />
								</div>
								</div>

                        
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Notice Type</label>
								<div class="controls">
							   
                                   <select  id="ddlNoticeType"  >
                                                   <option></option>        
                                                    </select>
								</div>
								</div>

                           <div class="control-group">
								<label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
							     <label class="control-label" for="focusedInput" id="lblNoticeDescription" style="display:none">Notice Description</label>
                                  <textarea tabindex="3" class="input-xlarge span10" id="txtDescription" name="Description" rows="4" placeholder=""></textarea>
								</div>
								</div>

                        


							<div class="control-group">
							  <label class="control-label" for="fileInput">File input</label>
							  <div class="controls">
								<%--<input class="input-file uniform_on" id="UpNotice" type="file" runat="server"/>--%>
                                  <input type="file" id="UpNotice" />
                                  
                                  <%--<asp:FileUpload ID="UpNotice" runat="server" />--%>

                                   <%--<a class="btn btn-primary" id="btnUpload"><span></span>Upload File</a>--%>
                                  <%--<input type="button" id="btnUpload" value="Upload Files"/>--%>
							  </div>
							</div>      
					

                    <%--    <div class="control-group">
                                                        <label class="control-label" for="image" style="visibility: hidden">Image</label>
                                                        <div class="controls">
                                                            <img id="ImgProduct" style="height: 100px; max-width: 100%; border: none" src="../img/No-Img_Chosen.png" />

                                                        </div>
                                                    </div>
--%>

                    
							<div class="form-actions">
                               <a class="btn btn-primary" id="btnSave"  ><span></span>Save</a>
							  <%--<button type="submit" id="btnSave" class="btn btn-primary">Save</button>--%>
							    <button type="reset" class="btn btn-primary" id="btnCancel">Cancel</button>
                           <%--<asp:Button ID="btnUpload" class="btn btn-primary" runat="server" Text="Upload"  />--%>
                                 <a class="btn btn-primary" id="btnDelete"  ><span></span>Delete</a>
							</div>
						  </fieldset>
					</div>   
					</div>

                     </div>
                 <input id="hdfImageID" type="hidden" value="" />
                <input id="hdfNoticeID" type="hidden" value="" />


                 <%--<asp:HiddenField ID="hdfImgID" runat="server" />--%>
				</div>
		</div>
         
    </div>


      </form>
</asp:Content>
