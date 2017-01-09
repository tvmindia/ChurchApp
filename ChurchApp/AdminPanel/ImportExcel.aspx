<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="ImportExcel.aspx.cs" Inherits="ChurchApp.AdminPanel.ImportExcel" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
      
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Import.js"></script>
  

    <div id="content" class="span10">
        <ul class="breadcrumb">
 		<li>Import Excel</li>
		</ul>
        <!--Import Excel field-->  
        <div class="row-fluid ">		
				<div class="box span12">
                     <div class="box-header" data-original-title>
                        <h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Import Excel</h2>
                        <div class="box-icon">                      
                        <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
                    </div>
                </div>  

                     <div class="box-content">
                            
                            <div class="control-group">
                                <label class="control-label" >Import Table Name</label>
                                <div class="controls">
                                      <select class="ddlexcel" id="ddlexceldropdown">
                                          <option></option>
                                  </select>
                                </div>
                            </div>
                                 
                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Browse</label>
                                <div class="controls">
                                        <input type="file" onchange="validateExcel();" id="excelfileuploader" />
                                </div>
                            </div>                       
                                                 
                         
                          
                          <div class="form-actions">
							    <a class="btn btn-primary uploadexcel" href="#">Upload</></a>
                    </div> 
                     </div>
                   

                    
				</div>
        </div>
        <!--Import Excel field-->
    </div>

   
 <%--   <asp:HiddenField ID="hdfFileName" />
    <asp:HiddenField ID="hdfFileLocation" />--%>
</asp:Content>
