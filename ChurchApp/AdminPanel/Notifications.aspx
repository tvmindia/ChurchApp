<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notifications.aspx.cs" Inherits="ChurchApp.AdminPanel.Notifications" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Notifications.css" rel="stylesheet" />
     <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Notifications.js"></script>
    <div id="content" class="span10">
        <ul class="breadcrumb">
				 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Notifications</li>
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

        		<div class="row-fluid">				
				<div class="span7">
					<h1>Notifications</h1>
					
					<div class="priority high"><span>Latest Notifications</span><a class="btnNew" title="ADD NEW" onclick="AddNotification();"><i>+</i></a></div>
					<div class="task high" style="padding-left: 5px;" >
                        
					<div id="NewNotificationGrid">

					</div>
             
                      
					</div>
					<div class="priority low"><span>Old Notifications</span></div>

                  <div id="OldNotificationGrid">

                  </div>
					
				
					<div class="clearfix"></div>		
					
				</div>
				<br />
                      <div id="NotificationDetails" class="span5 noMarginLeft" >
                        <div class="dark">
                            <div class="box-content">
                                <div class="form-horizontal">
                        <h1 id="captionHeading" style="background-color:#f1f1f1;"></h1>
                         <a class="NotificationEdit" style="right:30px;position: fixed;display:none;"><i class="fa fa-pencil NotificationEdit" aria-hidden="true"></i> Edit</a>
                            <label id="desc"></label>
                            <label id="sDate"></label>
                            <label id="eDate"></label>
                                    <div class="form-actions" id="btnContainer" style="display:none;">
							  <a class="btn btn-primary Save">Save</a>
                                <a class="btn btn-primary Delete">Delete</a>
							  <a class="btn btn-primary Cancel" id="cancelDetail">Cancel</a>
							</div>
                                    </div>
                                </div>
                       </div>
                    </div>

				<div id="NotificationEditDivBox" class="span5 noMarginLeft">
					
					<div class="dark">
					
					<h1 id="detailsHeading"></h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                      
					
                        <a class="NotificationEdit" style="right:30px;position: fixed;"><i class="fa fa-pencil NotificationEdit" aria-hidden="true"></i> Edit</a>
							  
                         <div class="control-group" style="margin-top:20px" id="lblCaptionH">
								<label class="control-label" for="focusedInput" >Caption</label>
								<div class="controls">
								  <%--<input class="input-large focused" name="Name" id="txtEventName" type="text"/>--%>
                                    <label class="control-label" for="focusedInput" id="lblCaption"></label>
								  <input class="input-large focused" name="Caption" id="txtCaption" type="text" />
								</div>
								</div>
                        

                         <div class="control-group" id="lblTypeH">
								<label class="control-label" for="focusedInput" >Notification Type</label>
								
                            <div class="controls">
                                
                                <select id="ddlType" name="NotificationType">
                                    <option></option>
                                </select>
                            </div>
                        </div>
								

                        <div class="control-group" id="lblDescH">
								<label class="control-label" for="focusedInput" >Description</label>
								<div class="controls">
								 <label class="control-label" for="focusedInput" id="lblDescription"></label>
                                     <textarea tabindex="3" class="input-xlarge span10" id="txtDescription" name="Description" rows="4" placeholder=""></textarea>
								  <%--<input class="input-large focused" name="Description" id="txtDescription" type="text" />--%>
								</div>
								</div>

                          <div class="control-group"  id="lblStartH">
							  <label class="control-label" for="date01">Start Date</label>
							  <div class="controls">
								 <label class="control-label" for="date01" id="lblStartDate"></label>
								  <input  class="input-xlarge datepicker" name="StartDate" id="txtStartDate" type="text" />
							  </div>
							</div>

                          <div class="control-group" id="lblExpiryH">
							  <label class="control-label" for="date01" >Expiry Date</label>
							  <div class="controls">
								 <label class="control-label" for="date01" id="lblExpiryDate">Caption</label>
								  <input  class="input-xlarge datepicker" name="ExpiryDate" id="txtExpiryDate" type="text" />
							  </div>
							</div>

							<div class="form-actions">
							  <a class="btn btn-primary Save">Save</a>
                                <a class="btn btn-primary Delete">Delete</a>
							  <a class="btn btn-primary Cancel">Cancel</a>
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	

                  
						
			</div>


    </div>
    <input type="hidden" id="hdfNotificationID" />
    <input type="hidden" id="hdfChurchID" />
    <input type="hidden" id="hdfType" />
</asp:Content>
