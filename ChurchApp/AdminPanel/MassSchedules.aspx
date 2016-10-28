<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="MassSchedules.aspx.cs" Inherits="ChurchApp.AdminPanel.MassSchedules" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/MassSchedules.js"></script>
     <div id="content" class="span10">
        <ul class="breadcrumb">
			 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Mass Schedules</li>
			</ul>
         
           <!--MassTable-->
        <div class="row-fluid sortable">		
				<div class="box span6">
					<div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Mass Timing</h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content">
						<table id="massTimingTable" class="table table-striped table-bordered bootstrap-datatable datatable">
						  <thead>
							  <tr>
								  <th>Day</th>
								  <th>Time</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody id="massTimingTableBody">
							
						</tbody>
					  </table>            
					</div>
				</div>
            <div class="box span6">
                	<div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span><span id="AddorEditSpan">Save</span> Mass Time</h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
                <div class="box-content">
                    <div class="form-horizontal" id="formBou">

                       <%-- Day--%>

                     <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Day</label>
								<div class="controls">
								  <input class="input-large focused" id="txtDay" type="text"/>
								</div>
								</div>

                       <%-- Time--%>

                            <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Time</label>
								<div class="controls">
								  <input class="input-large focused" id="txtTime" type="text"/>
								</div>
								</div>

                        </div>
                      <div class="form-actions">
								<button type="submit" class="btn btn-primary AddMass">Save</button>
								<button class="btn">Cancel</button>
							  </div>
                </div>
                </div>
            </div>
            <!--/span12-->
		
			</div><!--/row-fluid sortable-->
         <!--MassTable-->




   <input type="hidden" id="hdfChurchID" />
    <input type="hidden" id="hdfMassID" />










</asp:Content>
