<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notifications.aspx.cs" Inherits="ChurchApp.AdminPanel.Notifications" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
   <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-bootpag/1.0.4/jquery.bootpag.js" ></script>--%>
    <link href="../CSS/CustomCSS/Notifications.css" rel="stylesheet" />
     <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Notifications.js"></script>
    <div id="content" class="span10">
        <ul class="breadcrumb" style="margin-bottom:0px;">
				 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Notifications</li>
			</ul>
         
        

        		<div class="row-fluid">				
				<div class="span6">
					<%--<h1>Notifications</h1>--%>
					<div>
					<%--<div class="priority high">--%>
                        <div class="" id="highNoty" style="border-bottom:1.5px solid #F44336;line-height:0px;">
                            <h2>Latest Notifications</h2>
                            <a class="btnNew AddNew" id="btnAddNew" runat="server" title="ADD NEW" onclick="AddNotification();"><i>+</i></a></div>
                        
					<%--</div>--%>
					<%--<div class="task high" style="padding-left: 5px;" >--%>
                     
	                <div id="NewNotificationGrid">

					</div>
                    
				<div id="viewAllLatest">
                       <ul class="pager">
                               <li class="previous">
                                   <a class="aBack" style="display: none;">&larr; Back</a>
                                 </li>
                                <li class="next">
                                    <a class="aViewMore" id="aViewMore">View All →</a>
                                    </li>
                                 </ul>
<%--                     <a class="aBack" style="display:none;">Back To Notifications</a>
                      <a class="aViewMore" >View All Latest>></a>--%>
				</div>
                      
                        <%--<div id="pagination-here"></div>--%>
                        </div>
					<%--</div>--%>
					<%--<div class="priority low">--%>
                        <div class="" id="oldNoty" style="border-bottom:1.5px solid #87c16f"><h2>Old Notifications</h2></div>
				<%--	</div>--%>

                  <div id="OldNotificationGrid">

                  </div>
                    <div id="viewAllOld">
                           <ul class="pager">
                               <li class="previous">
                                   <a class="aOldBack" style="display: none;">&larr; Back</a>
                                 </li>
                                <li class="next">
                                    <a class="aOldViewMore" id="aViewMore">View All →</a>
                                    </li>
                                 </ul>
        <%--                <a class="aOldBack" style="display:none;">Back To Notifications</a>
				 <a class="aOldViewMore" >View All Old>></a>--%>
                    </div>
				 
                   
					<div class="clearfix"></div>		
					
				</div>
				<%--<br />--%>
                      <div id="NotificationDetails" class="span6 noMarginLeft"  style="display:none;margin-top:1%">
                        <div class="dark">
                            <h2><span class="fa fa-comments-o" aria-hidden="true"></span> <span id="captionHeading"></span></h2>
                            <a id="NoticeEdit" class="btnEdit NotificationEdit"><i class="halflings-icon white pencil NotificationEdit" title="Edit" aria-hidden="true"></i></a>
                            <div class="box-content">
                                <div class="form-horizontal">
                        <%--<h1 id="captionHeading" style="background-color:#f1f1f1;"></h1>--%>
                                      
                     
                         
                           <br /><div class="spanDiv">
                                <span class="spnDates">Start : </span>  <span class="spnDateValues" id="sDate">nov 1 2016</span>&nbsp;
                                     <span class="spnDates">Expire : </span>  <span class="spnDateValues" id="eDate">nov 1 2016</span>&nbsp;
                                 </div>
                                   
                                     <%--<label id="sDate"></label>--%>
                            <%--<label id="eDate"></label>--%>
                                    <br />
                                     <label id="desc"></label>
                           
                                    <div class="form-actions" id="btnContainer" style="display:none;margin-top:1%"">
							  <a class="btn btn-primary Save">Save</a>
                                <a class="btn btn-primary Delete">Delete</a>
							  <a class="btn btn-primary Cancel" id="cancelDetail">Cancel</a>
							</div>
                                    </div>
                                </div>
                       </div>
                    </div>

				<div id="NotificationEditDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
                        <h2 ><span class="fa fa-comments-o" aria-hidden="true"></span> <span id="detailsHeading"></span></h2>
					     
					<%--<h1 id="detailsHeading"></h1>--%>
						<div class="box-content">
                                   <div class="alert alert-error" id="ErrorBox" style="display: none;">
                             <div id="Displaydiv">
                             </div>
                            </div>
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
                                     <textarea class="input-large" id="txtDescription" name="Description" rows="5" placeholder="Enter your description here..."></textarea>
								  <%--<input class="input-large focused" name="Description" id="txtDescription" type="text" />--%>
								</div>
								</div>

                          <div class="control-group"  id="lblStartH">
							  <label class="control-label" for="date01">Start Date</label>
							  <div class="controls">
								 <label class="control-label" for="date01" id="lblStartDate"></label>
								  <input  class="input-large datepicker" name="StartDate" id="txtStartDate" type="text" readonly="true" placeholder="dd/mm/yyyy"/>
							  </div>
							</div>

                          <div class="control-group" id="lblExpiryH">
							  <label class="control-label" for="date01" >Expiry Date</label>
							  <div class="controls">
								 <label class="control-label" for="date01" id="lblExpiryDate">Caption</label>
								  <input  class="input-large datepicker" readonly="true" name="ExpiryDate" id="txtExpiryDate" type="text" placeholder="dd/mm/yyyy"/>
							  </div>
							</div>

							<div class="form-actions">
							  <a class="saveAll btn btn-primary Save">Save</a>
                                <a class="btn btn-primary Delete">Delete</a>
							  <a class="cancelAll btn btn-primary Cancel">Cancel</a>
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
    <input type="hidden" id="hdfEditID" />
</asp:Content>
