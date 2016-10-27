<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Priests.aspx.cs" Inherits="ChurchApp.AdminPanel.Priests" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Priests.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Priests.js"></script>
      <div id="content" class="span10">

           <ul class="breadcrumb">
             <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Priests</li>
				
			</ul>



        
              
				<div class="row-fluid">
                    <div class="box span6">
					<div class="box-header">
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Priests.</h2>
						<div class="box-icon">
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							
						</div>
					</div>
					<div class="box-content">
						<div class="todo">
							<ul class="todo-list">
								<li>
                                    <span><img class="grayscale" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/></span>
									Priest1 
														<span class="todo-actions">
															<a href="#"><i class="halflings-icon ok"></i></a>
															<a href="#"><i class="halflings-icon remove"></i></a>
														</span>

                                    <ul><li>9961442805</li></ul>
								</li>
								<li>Priest2 
													<span class="todo-actions">
														<a href="#"><i class="halflings-icon ok"></i></a>
														<a href="#"><i class="halflings-icon remove"></i></a>
													</span>
								</li>
								<li>priest3 
													<span class="todo-actions">
														<a href="#"><i class="halflings-icon ok"></i></a>
														<a href="#"><i class="halflings-icon remove"></i></a>
													</span>
								</li>
								<li>priest4 
													<span class="todo-actions">
														<a href="#"><i class="halflings-icon ok"></i></a>
														<a href="#"><i class="halflings-icon remove"></i></a>
													</span>
								</li>
								
								
							</ul>
						</div>	
					</div>
				</div>
				</div>
				
			
		
				
			
			
                
             


</div>
</asp:Content>
