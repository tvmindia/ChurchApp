<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="MassSchedules.aspx.cs" Inherits="ChurchApp.AdminPanel.MassSchedules" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
 
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/MassSchedules.js"></script>
    <link href="../CSS/CustomCSS/AdminLayout.css" rel="stylesheet" />
    <link href="../CSS/CustomCSS/MassSchedules.css" rel="stylesheet" />
  <%--  <script src="../Scripts/timepicki.js"></script>--%>
  <%--  <link href="../CSS/timepicki.css" rel="stylesheet" />--%>
     <div id="content" class="span10">
        <ul class="breadcrumb">
			 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Mass Schedules</li>
			</ul>
          <div class="buttonpatch" style="position:fixed;width:243px;right:0;top:8%;z-index:198">		
			<a class="facebook" title="Add New" id="btnAddNew" onclick="AddNewclick();"><img  src="/img/add.PNG"/></a>
            <a class="twitter" id="btnMain"><img src="/img/save.png"/></a>
            <a class="dribble" id="btnReset"><img src="/img/reset.png"/></a>
			<a class="rss" id="btnDelete"><img src="/img/delete.png"/></a>
            <a class="rss" id="btnSendNotification"><img src="/img/sentmail.png"/></a>
        </div>
           <!--MassTable-->
             <a class="btnNew" id="btnAddNew" runat="server" style="display:none" ></a>	
        <div class="row-fluid sortable" style="margin-top:3%">	
				<div class="box span6">
					<div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Mass Timing</h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content" id="massTimingTableBox">
						<table id="massTimingTable" class="table table-bordered" style="width:100% !important;">
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
                <div class="box-content massAddDiv">
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
                                     <input type="text" class="timepicker" placeholder="Select Time" id="TxtTime" onkeypress="return BlockSpecialCharacters(event);" name="time" />
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
                              <table id="massTimingTempTable" class="table table-striped table-bordered bootstrap-datatable" style="display:none;">
						  <thead>
							  <tr>
								  <th>Day</th>
								  <th>Time</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody id="massTimingTempTableBody">
							
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
    <input type="hidden" id="hdfEditMassDay" />










</asp:Content>
