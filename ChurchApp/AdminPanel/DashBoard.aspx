<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="DashBoard.aspx.cs" Inherits="ChurchApp.AdminPanel.DashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

    <div id="content" class="span10">
        <ul class="breadcrumb">
 		<li>Dashboard</li>
		</ul>


         <!--churchtable-->
        <div class="row-fluid sortable">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Churches</h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content">
					         	<div class="box-content">
						<table class="table table-bordered table-striped table-condensed">
							   <thead>
							  <tr>
								  <th>Username</th>
								  <th>Date registered</th>
								  <th>Role</th>
								  <th>Status</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody>
							<tr>
								<td>church1</td>
								<td class="center">2012/01/01</td>
								<td class="center">Member</td>
								<td class="center">
									<span class="label label-success">Active</span>
								</td>
								<td class="center">
									<a class="circlebtn circlebtn-success" href="#">
										<i class="halflings-icon white zoom-in"></i>  
									</a>
									<a class="circlebtn circlebtn-info" href="#">
										<i class="halflings-icon white edit"></i>  
									</a>
									<a class="circlebtn circlebtn-danger" href="#">
										<i class="halflings-icon white trash"></i> 
									</a>
								</td>
							</tr>
						</tbody>
						 </table>  
						
					</div>
					</div>
				</div><!--/span12-->
		
			</div><!--/row-fluid sortable-->
         <!--churchtable-->
     

        <!--/forms-->
        	<div class="row-fluid">
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="fa fa-pencil-square-o" aria-hidden="true"></i><span class="break"></span>Edit Church</h2>
						<div class="box-icon">
							
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content">
					
							<fieldset>
						        <div class="control-group">
								<label class="control-label">File Upload</label>
								<div class="controls">
								  <input type="file"/>
								</div>
							  </div>
						
							  <div class="form-actions">
								<button type="submit" class="btn btn-primary">Save changes</button>
								<button class="btn">Cancel</button>
							  </div>
							</fieldset>
					
					</div>
				</div><!--/span-->

			</div><!--/row-->
        <!--/forms-->







    </div><!--span10 end-->
</asp:Content>
