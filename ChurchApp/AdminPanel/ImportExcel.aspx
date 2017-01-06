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
        <div class="row-fluid">		
				<div class="box span12">                 
                        <div class="box span6">
                           <%-- <asp:FileUpload ID="DataImportFileUpload" runat="server" class="FlatbuttonUpload" width="250px"  />--%>
                            <input type="file"  onchange="validateExcel();" id="excelfileuploader" />
                            <a class="btn btn-primary uploadexcel" href="#">Upload</></a>
                             <%--<input type="file" accept="image/*" id="excelfile  uploader" onchange="OnUpload(this);ChurchImagePreview(this);"/>--%>
                        </div>     
				</div>
        </div>
        <!--Import Excel field-->
    </div>
</asp:Content>
