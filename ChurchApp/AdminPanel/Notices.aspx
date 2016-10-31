<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notices.aspx.cs" Inherits="ChurchApp.AdminPanel.Notices" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">

    
    <%--<script src="../Scripts/select2.min.js"></script>
    <link href="../CSS/select2.min.css" rel="stylesheet" />--%>

    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Notices.js"></script>

    <style>
        
ul.dashboard-list li .priestimage {
    height: 158px;
    width: 133px;
    padding: 1px;
    float: left;
    margin-top: -6px;
    margin-right: 125px;
    border: 1px solid #eee;
}


.vicarlist{
    line-height:50px;
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
				<li>Notices</li>
			</ul>
         
         <div class="row-fluid">
             <div class="span6">
                 <h1>Current Vicars</h1>
					
					<div class="priority high"><span>Notices : Type1</span></div>
					<div class="task high">
                        <ul class="dashboard-list">
                                <li class="vicarlist">
								<a href="#">
									<img class="priestimage" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/>
								</a>
											   
								<strong>Name:</strong> Fr.Jacob Thunkuzhi<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Status:</strong> Vicar<br/> 
                            	</li>
                           
                        </ul>

					</div>

                    <div class="task high">
                        <ul class="dashboard-list">
						<li class="vicarlist">
								<a href="#">
									<img class="priestimage" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/>
								</a>
										   
								<strong>Name:</strong> Fr.Jacob Thunkuzhi<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Status:</strong> Vicar<br/> 
                                                       						
							</li>
                            </ul>
					</div>
             </div>

             <div class="box span6" id="PriestEditDivBox">
					<div class="box-header">
						<h2 id="HeadNotice"><i class="fa fa-file-o" aria-hidden="true"></i><span class="break"></span>Add Notice</h2>
						<div class="box-icon">
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							
						</div>
					</div>
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
								<input class="input-file uniform_on" id="fileInput" type="file"/>
							  </div>
							</div>      
						
							<div class="form-actions">
							  <button type="submit" id="btnSave" class="btn btn-primary">Save</button>
							  <button type="reset" class="btn btn-primary" id="btnCancel">Cancel</button>
							</div>
						  </fieldset>
					</div>   
					</div>
				</div>
		</div>
    </div>

</asp:Content>
