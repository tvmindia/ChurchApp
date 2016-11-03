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
         
        		<div class="row-fluid">				
				<div class="span7">
					<h1>Notifications</h1>
					
					<div class="priority high"><span>Latest Notifications</span><a href="#" class="btn btn-lg btn-round btn-primary" title="" onclick="AddNotification();">NEW <i class="glyph-icon icon-plus"></i></a></div>
					
					<div id="NewNotificationGrid">

					</div>
               
					
					<div class="priority low"><span>Old Notifications</span></div>

                  <div id="OldNotificationGrid">

                  </div>
					
				
					<div class="clearfix"></div>		
					
				</div>
				
				<div id="NotificationEditDivBox" class="span5 noMarginLeft">
					
					<div class="dark">
					
					<h1 id="detailsHeading"></h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                      
					
                        <a class="NotificationEdit" style="right:30px;position: fixed;"><i class="fa fa-pencil NotificationEdit" aria-hidden="true"></i> Edit</a>
							  
                         <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Caption</label>
								<div class="controls">
								  <%--<input class="input-large focused" name="Name" id="txtEventName" type="text"/>--%>
                                    <label class="control-label" for="focusedInput" id="lblCaption"></label>
								  <input class="input-large focused" name="Caption" id="txtCaption" type="text" />
								</div>
								</div>
                        

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Notification Type</label>
								
                            <div class="controls">
                                
                                <select id="ddlType" name="NotificationType">
                                    <option></option>
                                </select>
                            </div>
                        </div>
								

                        <div class="control-group">
								<label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
								 <label class="control-label" for="focusedInput" id="lblDescription">Caption</label>
                                     <textarea tabindex="3" class="input-xlarge span10" id="txtDescription" name="Description" rows="4" placeholder=""></textarea>
								  <%--<input class="input-large focused" name="Description" id="txtDescription" type="text" />--%>
								</div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Start Date</label>
							  <div class="controls">
								 <label class="control-label" for="date01" id="lblStartDate">Caption</label>
								  <input class="input-large focused" name="StartDate" id="txtStartDate" type="text" />
							  </div>
							</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Expiry Date</label>
							  <div class="controls">
								 <label class="control-label" for="date01" id="lblExpiryDate">Caption</label>
								  <input class="input-large focused" name="ExpiryDate" id="txtExpiryDate" type="text" />
							  </div>
							</div>

                       
					     <div class="control-group">
								<label class="control-label">Auto Hide</label>
								<div class="controls">
								  <label class="radio">
									<input type="radio" name="Hide" id="optHideYes" value="Yes" checked=""/>
									Yes
								  </label>
								
								  <label class="radio">
									<input type="radio" name="Hide" id="optHideNo" value="No"/>
									No
								  </label>
								</div>
							  </div>


                        
					     <div class="control-group" id="isDeleteDiv">
								<label class="control-label">IsDelete</label>
								<div class="controls">
								  <label class="radio">
									<input type="radio" name="Delete" id="optDeleteYes" value="Yes" checked=""/>
									Yes
								  </label>
							
								  <label class="radio">
									<input type="radio" name="Delete" id="optDeleteNo" value="No"/>
									No
								  </label>
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
</asp:Content>
