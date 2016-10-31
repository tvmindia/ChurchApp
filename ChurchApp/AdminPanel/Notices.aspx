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
					
					<div class="priority high"><span>Notices : Type1</span></div>

                 <div  id="DivNoticeType1">
					<div class="task high">

                        <div class="span12" id="divulContainer">

                            <ul class="dashboard-list">
                                <li class="liNoticeList">

                                    <div class="span3">
                                        <a href="#">
									<img class="imgNotice" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/>
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


                        

					</div>
                </div>
             </div>

             <div  id="PriestEditDivBox" class="span6 noMarginLeft">

                 <div class="dark">
					<h1>Add Notice</h1>


					<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>

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
							    
                                   <select  id="ddlNoticeType" >
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
                                  <input type="button" id="btnUpload" value="Upload Files"/>
							  </div>
							</div>      
					
                    
							<div class="form-actions">
                               
							  <button type="submit" id="btnSave" class="btn btn-primary"  runat="server">Save</button>
							    <button type="reset" class="btn btn-primary" id="btnCancel">Cancel</button>
                           <%--<asp:Button ID="btnUpload" class="btn btn-primary" runat="server" Text="Upload"  />--%>
                                
							</div>
						  </fieldset>
					</div>   
					</div>

                     </div>
				</div>
		</div>
    </div>
      </form>
</asp:Content>
