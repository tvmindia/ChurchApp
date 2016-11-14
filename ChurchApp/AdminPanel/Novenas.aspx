<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Novenas.aspx.cs" Inherits="ChurchApp.AdminPanel.Novenas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/CustomJS/Novenas.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
    <%--<link href="../CSS/CustomCSS/Gallery.css" rel="stylesheet" />--%>

    <style>


.span3{
    height: 250px!important;
    margin:4px!important;
   
    
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
			       <div class="ImageAlbum-Gallery">
                 <%--  <div style="height: 238px!important;border: 2px dotted black;background-color: #fefefe;width: 23%;display: block;float: left;padding-left: 5px;padding-bottom:8px;">
                   <img style="text-align: center;display: block;position: absolute;height: 37px;width: 37px;top: 125px;left: 125px;" src="../img/Plussymbol.png"/>
                    <a data-rel="tooltip" data-original-title="Create New Album" style="top: 67%;left: 29%;position: relative;" id="newalbum">Create Album</></a>

                   </div>--%>
                   
                   </div>      
                   
					
				    </div><!--/span-->
              </div>
              </div>



    </div>





</asp:Content>
