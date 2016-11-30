<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="MassSchedules.aspx.cs" Inherits="ChurchApp.AdminPanel.MassSchedules" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/MassSchedules.js"></script>
    <link href="../CSS/CustomCSS/MassSchedules.css" rel="stylesheet" />
    <script src="../Scripts/timepicki.js"></script>
    <link href="../CSS/timepicki.css" rel="stylesheet" />
     <div id="content" class="span10">
        <ul class="breadcrumb">
			 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Mass Schedules</li>
			</ul>
         
         <%--Alert boxes --%>
               <div id="rowfluidDiv" style="display:none;">	
				

                 
						<div class="alert alert-error" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Successfull.</strong> 
						</div>
						<div class="alert alert-info" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
						</div>
						<div class="alert alert-block" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<h4 class="alert-heading">Warning!</h4>
							<p>Best check yourself, you're not looking too good.</p>
						</div>
					

              
            </div>
				
	    <%--Alert boxes --%>

           <!--MassTable-->
        <div class="row-fluid sortable">		
				<div class="box span6">
					<div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Mass Timing</h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content" id="massTimingTableBox">
						<table id="massTimingTable" class="table table-striped table-bordered bootstrap-datatable">
						  <thead>
							  <tr>
								  <th>Day</th>
								  <th>Time</th>
								  <th id="thActions" style="display:none;">Actions</th>
							  </tr>
						  </thead>   
						  <tbody id="massTimingTableBody">
							
						</tbody>
					  </table>            
					</div>
				</div>
            <div class="box span6" id="MassTimeAdd">
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
                                <select id="ddlDay" name="DaySelect">
                                    <option value="Sun">Sunday</option>
                                    <option value="Mon">Monday</option>
                                    <option value="Tue">Tuesday</option>
                                    <option value="Wed">Wednesday</option>
                                    <option value="Thu">Thursday</option>
                                    <option value="Fri">Friday</option>
                                    <option value="Sat">Saturday</option>
                                </select>
                            </div>
                        </div>

                       <%-- Time--%>

                            <div class="control-group">
							
								  <label class="control-label" for="focusedInput">Time</label>
								<div class="controls">
                                     <input type="text" class="timePikerClass" id="TxtTime" name="time" />
								 <%-- <input class="input-large focused" id="txtTime" type="text"/>--%>
								</div>
								</div>
                         <div class="box-content" id="massTimingsUpdate" style="display:none;">
                             <table id="massTimingUpdateTable" class="table table-striped table-bordered bootstrap-datatable">
						  <thead>
							  <tr>
								  <th>Day</th>
								  <th>Time</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody id="massTimingUpdateTableBody">
							
						</tbody>
					  </table>         
                             </div>
                        </div>
                      <div class="form-actions">
								<a class="btn btn-primary AddMass">Save</a>
								<a class="btn cancel">Cancel</a>
							  </div>
                </div>
                </div>
            </div>
            <!--/span12-->
		
			</div><!--/row-fluid sortable-->
         <!--MassTable-->




   <input type="hidden" id="hdfChurchID" />
    <input type="hidden" id="hdfMassID" />
    <input type="hidden" id="hdfMassIDs" />
    <input type="hidden" id="hdfChurchIDs" />
    <input type="hidden" id="hdfDay" />
    <input type="hidden" id="hdfTime"/>










</asp:Content>
