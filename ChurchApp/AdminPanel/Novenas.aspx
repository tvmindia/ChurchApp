<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Novenas.aspx.cs" Inherits="ChurchApp.AdminPanel.Novenas" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/CustomJS/Novenas.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
    <link href="../CSS/CustomCSS/Novenas.css" rel="stylesheet" />
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

                       <div class="span12">


                       <div id="divAdminDetals" class="panel span12">
                            <ul class="thumbnails">
                            <li class="span3">
                            <div class="thumbnail">
                            <img src="../img/gallery/priest.png" alt=""/>
                            <address>
                            <strong>
                            Dr. Thomson Kattingal
                            </strong>
                            <p>Manger<br />9996532452</p>
                            </address>
                            </div>
                            </li>
                               
                           </ul>
                           
                     
                            </div>

                       </div>
                 
                   
                   </div>      
                   
					
				    </div><!--/span-->
              </div>
              </div>



    </div>

</asp:Content>
