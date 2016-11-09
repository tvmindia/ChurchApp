<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Events.aspx.cs" Inherits="ChurchApp.AdminPanel.Events" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Events.css" rel="stylesheet" />

    <script src="../Scripts/CustomJS/Events.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
     <div id="content" class="span10">
        <ul class="breadcrumb">
             <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Events</li>
				
			</ul>

                <%--Alert boxes --%>
            <div id="rowfluidDiv" style="display: none;">

                 <div class="alert alert-block" id="ErrorBox" style="display: none; background-color: #fdeaea !important; color: #ca6f74 !important; border: 1px solid #f27b81 !important;">
                    <div id="Displaydiv">
                    </div>
                 </div>

                <div class="alert alert-error" style="display: none;">
                    <%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
                    <strong>Operation Not Successfull.</strong>
                </div>
                <div class="alert alert-success" style="display: none;">
                    <%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
                    <strong>Successfull.</strong>
                </div>
                <div class="alert alert-info" style="display: none;">
                    <%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
                    <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                </div>
                <div class="alert alert-block" style="display: none;">
                    <%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
                    <h4 class="alert-heading">Warning!</h4>
                    <p>Best check yourself, you're not looking too good.</p>
                </div>

            </div>

            <%--END : Alert boxes --%>

         	<div class="row-fluid">
               
                 <div class="box span5">
                  
                    <div class="box-header">
                        <h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Latest Events</h2>
                         
                        <div class="box-icon">
                             <a class="btnNew" title="" onclick="SetControlsInNewEventFormat();"><i title="Add New Event">+</i></a>
                            <%--<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%> 

                        </div>
                    </div>
                    <div class="box-content" id="DivNoticeType1">

                        <div class="accordion">
                            <div class="accordion-group">
                                <div class="accordion-heading">

                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">Unit #1</a>
                                    
                                </div>
                                <div class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                       
                                        <img class="eventImage" src="../img/AppImages/747515f2-501a-3f59-96ba-6fd122f83f61.jpg" alt="St.Thomas Church" />

                                         <span class="spnDates" id="spnStartDate">Start : </span>  <span class="spnDateValues" >nov 1 2016</span>&nbsp;
                                         <span class="spnDates" id="spnEndDate">End : </span>   <span class="spnDateValues" >nov 1 2016</span>&nbsp;
                                         <span class="spnDates" id="spnExpiredate">Expire : </span>  <span class="spnDateValues" >nov 1 2016</span>&nbsp;

                                        <br />


                                        <p>In your heart, do you wish your friends knew about God’s love–and how He cared about us so much that He sent His son to earth to give His life for us? The good news is, as a student you have neat way to share your Christian faith: Bring Your Bible to School Day! On this day, thousands of students just like you will bring their Bible to school and talk about it with friends during free time.  To learn more about this event, ask your parents to go to the website with you: BringYourBible.org</p>
                                        <span class="eventViewDetails"><a href="#">View Details</a></span>
                                        
                                         
                                    </div>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>


				<div id="EventEditDivBox" class="span7 noMarginLeft">
					
                      <div class="box-header" >
                        <h2 id="h1Event"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Add Event</h2>
                        <div class="box-icon">

                            <%--<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>

                        </div>
                    </div>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        <a id="NoticeEdit"  class="btnEdit" onclick="FixedEditClick()" style=" right: 1px; position: fixed;" ><i class="halflings-icon white pencil" aria-hidden="true" title="Edit Event" ></i></a>
                       <%--<a style="right:30px;position: fixed;" onclick="FixedEditClick()"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i> Edit</a>--%>
					<div id="EditContent">
                       
							  
                         <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Event Name</label>
								<div class="controls">
								  <%--<input class="input-large focused" name="Name" id="txtEventName" type="text"/>--%>
                                    <input class="input-large focused" name="Caption" id="txtEventName" type="text" style="width:70%" />
                                    
                                     <label class="control-label" for="focusedInput" id="lblEventName"></label>
                                   
								</div>
								</div>
                        
                         <%--Image--%>
                                <div class="control-group " id="DivImg">
                                    <%--<label class="control-label" for="fileInput">Notice Image</label>--%>

                                    <div class="controls">
                                        <img class="imgNotices" id="NoticePreview" src="../img/No-Img_Chosen.png" />
                                        <%--onchange="showpreview(this);"--%>
                                        <div id="DivFile" >
                                            <input type="file" id="UpEvent" value="Choose Image" onchange="showpreview(this);" /></div>
                                    </div>
                                </div>

                       
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
                                     <textarea tabindex="10" class="input-xlarge span10" id="txtDescription" name="Description" rows="25" placeholder="" style="width:70%"></textarea>
								<label class="control-label" id="lblDescription" for="focusedInput"></label>
								
                                </div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Start Date</label>
							  <div class="controls">
                                   <input type="text" class="input-xlarge datepicker" id="dateStartDate" />
								<label  class="control-label" for="date01" id="lblStartDate"></label>
                                    
							  </div>
							</div>
                       
                          <div class="control-group">
							  <label class="control-label" for="date01">End Date</label>
							  <div class="controls">
                                  <%--onblur="SetExpiryDate()"--%>

                                    <input type="text" class="input-xlarge datepicker" id="dateEndDate" onblur="SetExpiryDate()"  />
								<label class="control-label" for="date01" id="lblEndDate"></label>
                                
							  </div>
							</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Expiry Date</label>
							  <div class="controls">
                                    <input type="text" class="input-xlarge datepicker" id="dateExpiryDate" onfocus="SetExpiryDate()" />
								<label class="control-label" for="date01" id="lblExpiryDate"></label>
                                
							  </div>
							</div>

					     <div class="control-group">
								<label class="control-label">Auto Hide</label>
								<div class="controls">
								  <label class="radio">
									<input type="radio" name="rdoHide" id="optHideYes" value="Yes" checked=""/>
									Yes
								  </label>
								
								  <label class="radio">
									<input type="radio" name="rdoHide" id="optHideNo" value="No"/>
									No
								  </label>
								</div>
							  </div>

                         <%--Notification(Radio) --%>
                                <div class="control-group" id="divNotification">
                                    <label class="control-label">Want to Add Mobile Notification?</label>
                                    <div class="controls">
                                        <label class="radio">
                                            <input type="radio" name="IsnotificationNeeded" id="rdoNotificationYes" value="Yes" />
                                            Yes
                                        </label>

                                        <label class="radio">
                                            <input type="radio" name="IsnotificationNeeded" id="rdoNotificationNo" value="No" checked="" />
                                            No
                                        </label>
                                    </div>
                                </div>


                        </div>

                        <div id="divView">

                                     <div class="accordion">
                            <div class="accordion-group">
                                
                                 <div class="accordion-body collapse in">
                                    <div class="accordion-inner">

                                    <img class="eventImage" id="eventPreviewOnView" src="../img/No-Img_Chosen.png" />
                                        
                                         <label  for="focusedInput" id="lblEventDescriptionOnView" ></label>
                                         
                                    </div>

                                </div>


                            </div>

                        </div>

                                </div>

					    <%-- <div class="control-group">
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
							  </div>--%>
                        
						
							<div class="form-actions">
                                  <a class="btn btn-primary" id="btnSave"><span></span>Save</a>
                                  <a class="btn btn-primary" id="btnCancel"><span></span>Cancel</a> 
                                  <a class="btn btn-primary" id="btnDelete"><span></span>Delete</a>
							 
							</div>
						  </fieldset>
					</div>   
					</div>
				
				
				
				</div>	
						
			</div>


    </div>

     <input id="hdfImageID" type="hidden" value="" />
                <input id="hdfEventID" type="hidden" value="" />

     <input id="hdfIsAutoHide" type="hidden" value="" />



</asp:Content>
