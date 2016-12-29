<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Events.aspx.cs" Inherits="ChurchApp.AdminPanel.Events" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Events.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Events.js"></script>
    
   
      <link href="../CSS/lightbox.css" rel="stylesheet" />
    <script src="../Scripts/lightbox.js"></script>
   <script src="../Scripts/progressbar.js"></script>

    <div id="content" class="span10">
        <ul class="breadcrumb" style="margin-bottom:0px;">
            <li>
                <i class="icon-home"></i>
                <a href="../AdminPanel/Home.aspx">Home</a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>Events</li>

        </ul>

        <%--END : Alert boxes --%>

        <div class="row-fluid">

            <div class="span6">

                <div>
                    <div id="divLatestEvents">
                        <div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;">
                            <h2>Latest Events</h2>
                            <a class="btnNew AddNew" id="btnAddNew" runat="server" title="" onclick="SetControlsInNewEventFormat();"><i title="Add New Event">+</i></a>

                        </div>
                       
                        <div  id="DivNoticeType1">

                        </div>

                        <div id="viewAllLatest">
                            <ul class="pager">
                               <li class="previous">
                                   <a class="aBack" style="display: none;">&larr; Back</a>
                                 </li>
                                <li class="next">
                                    <a class="aViewMore">View All →</a>
                                    </li>
                                 </ul>
                        </div>

                    </div>

                    <%--<div id="pagination-here"></div>--%>
                    <div id="divOldEvents" style="margin-top:40px">
                        <div class="" style="border-bottom:1.5px solid #87c16f"><h2>Old Events</h2></div>
                       
                        <div id="OldEventsGrid">
                        </div>
                        <div id="viewAllOld">
                            <ul class="pager">
                               <li class="previous">
                                   <a class="aOldBack" style="display: none;">&larr; Back</a>
                                 </li>
                                <li class="next">
                                    <a class="aOldViewMore">View All →</a>
                                    </li>
                                 </ul>
                        </div>
                    </div>
                </div>

            </div>
          
            <div id="EventEditDivBox" style="margin-top:1%" class="span6 noMarginLeft">

                <div class="dark">
                    <h2><span class="fa fa-calendar"> </span>  <span id="h1Event">Event</span></h2>
                        <a id="NoticeEdit" class="btnEdit"><i id="iconEdit" class="halflings-icon white pencil" aria-hidden="true" title="Edit Event"></i></a>
                    <div class="box-content">
                    <div class="form-horizontal">
                        <fieldset>
                              <div class="alert alert-block" id="ErrorBox" style="display: none; background-color: #fdeaea !important; color: #ca6f74 !important; border: 1px solid #f27b81 !important;">
                <div id="Displaydiv">
                </div>
            </div>

                            <%--<a style="right:30px;position: fixed;" onclick="FixedEditClick()"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i> Edit</a>--%>
                            <div id="EditContent">

                                 <%--Image--%>
                                
                                    <%--<label class="control-label" for="fileInput">Notice Image</label>--%>

                                    <div class="control-group"id="DivImg" style="margin-top: 20px">
                                        <img class="imgNotices img-rounded" id="NoticePreview" src="../img/No-Img_Chosen.png" />
                                        <%--onchange="showpreview(this);"--%>
                                            <input type="file" id="UpEvent" value="Choose Image" onchange="showpreview(this);" />
                                    </div>
                                <div class="control-group" >
                                    <label class="control-label" for="focusedInput">Event Name</label>
                                    <div class="controls">
                                        <%--<input class="input-large focused" name="Name" id="txtEventName" type="text"/>--%>
                                        <input class="input-xlarge focused" name="Caption" id="txtEventName" type="text" />

                                        <label class="control-label" for="focusedInput" id="lblEventName"></label>

                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" for="focusedInput">Description</label>
                                    <div class="controls">
                                        <textarea class="input-xlarge" id="txtDescription" name="Description" rows="4" placeholder="" ></textarea>
                                        <label class="control-label" id="lblDescription" for="focusedInput"></label>

                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="date01">Start Date</label>
                                    <div class="controls">
                                        <input type="text" class="input-xlarge datepicker" id="dateStartDate" readonly="true" />
                                        <label class="control-label" for="date01" id="lblStartDate"></label>

                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="date01">End Date</label>
                                    <div class="controls">
                                        <%--onblur="SetExpiryDate()"--%>

                                        <input type="text" class="input-xlarge datepicker" id="dateEndDate" onselect="SetExpiryDateNow();" readonly="true" />
                                        <label class="control-label" for="date01" id="lblEndDate"></label>

                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="date01">Expiry Date</label>
                                    <div class="controls">
                                        <input type="text" class="input-xlarge datepicker" id="dateExpiryDate" readonly="true" />
                                        <label class="control-label" for="date01" id="lblExpiryDate"></label>

                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label">Auto Hide</label>
                                    <div class="controls">
                                        <label class="radio">
                                            <input type="radio" name="rdoHide" id="optHideYes" value="Yes" checked="" />
                                            Yes
                                        </label>

                                        <label class="radio">
                                            <input type="radio" name="rdoHide" id="optHideNo" value="No" />
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

                                    <div class="control-group">
                                        <label class="control-label" id="lblAlreadyNotificationSend">Already Notification added</label>
                                    </div>
                                </div>


                                <div class="control-group" id="DivNotificationContent">
                                    <label class="control-label" for="focusedInput">Notification Content</label>
                                    <div class="controls">
                                        <textarea class="input-xlarge" id="txtnotificationCOntent" name="Description" rows="4" placeholder=""></textarea>

                                    </div>
                                </div>


                            </div>

                            <div id="divView">

                                <div class="accordion" style="border-bottom: 1px solid #e6e2e2;">
                                    <div class="">

                                        <div class="">
                                            <div class="accordion-inner" style="border-top:none;height:auto;min-height:400px;" >
                                                <a id="aZoomEventImage" class='example-image-link' href='../img/No-Img_Chosen.png' data-lightbox='example-set' data-title='Click anywhere to close.'>
                                                <img class="eventImage img-polaroid" id="eventPreviewOnView" src="../img/No-Img_Chosen.png" /></a>

                                                <label for="focusedInput" style="font-size:12px" id="lblEventDescriptionOnView"></label>

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
                                <a class="btn btn-primary saveAll" id="btnSave"><span></span>Save</a>
                                <a class="btn btn-primary cancelAll" id="btnCancel"><span></span>Cancel</a>
                                <a class="btn btn-primary" id="btnDelete"><span></span>Delete</a>

                            </div>
                        </fieldset>
                    </div>
                </div>


                </div>
            </div>




        </div>
        </div>
        <input id="hdfImageID" type="hidden" value="" />
        <input id="hdfEventID" type="hidden" value="" />
        
        <input id="hdfIsAutoHide" type="hidden" value="" />
</asp:Content>
