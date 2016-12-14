<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="MassSchedules.aspx.cs" Inherits="ChurchApp.AdminPanel.MassSchedules" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/bootstrap-multiselect.css" rel="stylesheet" />
    <script src="../Scripts/bootstrap-multiselect.js"></script>
    <link href="../CSS/jquery.timepicker.min.css" rel="stylesheet" />
    <script src="../Scripts/jquery.timepicker.min.js"></script>
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
         
           <!--MassTable-->
             <a class="btnNew" id="btnAddNew" runat="server" style="display:none" ></a>	
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
								  <th id="thActions" style="display:none;">Update</th>
							  </tr>
						  </thead>   
						  <tbody id="massTimingTableBody">
							
						</tbody>
					  </table>            
					</div>
				</div>
            <div class="box span6" id="MassTimeAdd" style="display:none;">
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
                                <select id="ddlDay" class="btnmulti" multiple="multiple" name="DaySelect">
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
                                     <input type="text" class="timepicker" id="TxtTime" name="time" />
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
								<a class="btn btn-primary AddMass saveAll">Save</a>
								<a class="btn btn-primary cancel">Cancel</a>
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
