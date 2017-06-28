﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Events.aspx.cs" Inherits="ChurchApp.AdminPanel.Events" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Events.css?version=2" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js?version=2"></script>
    <script src="../Scripts/CustomJS/Events.js?version=2"></script>
    
   
      <link href="../CSS/lightbox.css?version=2" rel="stylesheet" />
    <script src="../Scripts/lightbox.js?version=2"></script>
   <script src="../Scripts/progressbar.js?version=2"></script>
    <style>
        .w3-note {
    background-color: #ffffcc;
    border-left: 6px solid #ffeb3b;
}
.w3-panel {
    padding: 0.01em 16px;
    margin-bottom: 16px!important;
}
.w3-panel:after {
    content: "";
    display: table;
    clear: both;
}
    </style>
    <div id="content" class="span10">
        <ul class="breadcrumb" style="margin-bottom:0px;">
            <li>
                <i class="icon-home"></i>
                <a href="../AdminPanel/Home.aspx">Home</a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>Events</li>

        </ul>
         <div class="buttonpatch" style="position:fixed;width:290px;right:0;top:8%;z-index:198">		
			<a class="facebook" title="Add New" id="btnAddNew" onclick="SetControlsInNewEventFormat();"><img  src="/img/add.PNG"/></a>
             <a class="rss" id="NoticeEdit"><img src="/img/edit.png"/></a>
            <a class="twitter" id="btnSave"><img src="/img/save.png"/></a>
            <a class="dribble" id="btnReset"><img src="/img/reset.png"/></a>
			<a class="rss" id="btnDelete"><img src="/img/delete.png"/></a>
            <a class="rss" id="btnNotify" data-toggle="modal"><img src="/img/notyfi.png"/></a>
        </div>
        <%--END : Alert boxes --%>

        <div class="row-fluid" style="margin-top:3%">

            <div class="span6">

                <div>
                    <div id="divLatestEvents">
                        <div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;">
                            <h2>Latest Events</h2>
                            <%--<a class="btnNew AddNew" id="btnAddNew" runat="server" title="" onclick="SetControlsInNewEventFormat();"><i title="Add New Event">+</i></a>--%>

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
                        <%--<a id="NoticeEdit" class="btnEdit"><i id="iconEdit" class="halflings-icon white pencil" aria-hidden="true" title="Edit Event"></i></a>--%>
                    <div class="box-content">
                    <div class="form-horizontal">
                        <fieldset>
                              

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
                               <%-- <div class="control-group" id="divNotification">
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
                                        <i class="fa fa-info-circle" data-toggle="popover" data-trigger="hover" data-content="If you added the Mobile notification once you can only edit it from the notification portal !"></i>
                                    </div>
                                </div>


                                <div class="control-group" id="DivNotificationContent">
                                    <label class="control-label" for="focusedInput">Notification Content</label>
                                    <div class="controls">
                                        <textarea class="input-xlarge" id="txtnotificationCOntent" name="Description" rows="4" placeholder=""></textarea>

                                    </div>
                                </div>---%>


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


                            <%--<div class="form-actions">
                                <a class="btn btn-primary saveAll" id="btnSave"><span></span>Save</a>
                                <a class="btn btn-primary cancelAll" id="btnCancel"><span></span>Cancel</a>
                                <a class="btn btn-primary" id="btnDelete"><span></span>Delete</a>

                            </div>--%>
                        </fieldset>
                    </div>
                </div>


                </div>
            </div>




        </div>
        <!--Models used in this page-->
                <div class="modal hide fade" id="notificationModal">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3 id="ModalHead">Push Notification</h3>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-block" id="ErrorBox1" style="display: none; background-color: #fdeaea !important; color: #ca6f74 !important; border: 1px solid #f27b81 !important;">
              
                    </div>
                        <div class="form-horizontal">
                            <div class="span12" style="min-height:200px;max-height:200px;">
                                <div class="span6">
                                     <label for="name">Caption</label><input name="Caption" id="txtCaption" type="text" />
                                    <label for="name">Description</label><textarea id="txtnotificationCOntent" name="Description" rows="3" placeholder=""></textarea>
                                    <label class="control-label" id="lblAlreadyNotificationSend">Notification Was added</label>
                                    <i class="fa fa-info-circle" id="NotificationInfo" style="display:none;position:relative;top:53px;left:-43px;" data-toggle="popover" data-trigger="hover" data-content="If you added the Mobile notification once you can only edit it from the notification portal !"></i>
                                </div>
                                <div class="span6">
                                    <div class="w3-note w3-panel" style="margin-top:10%;">
                                    <p><strong>Tip:</strong><br />1) Recheck Caption. <br />2) Recheck Description (field allows only 200 characters).<br />3) Push Notification from here and shedule it from notification section. </p>
                                    </div>
                                </div>                                   
                           </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                    <div class="buttonpatch" style="position:relative;float:right;z-index:196;">
			          <a class="facebook" title="Push Notification" id="btnSaveNotification"><img src="/img/push.png" style="left:-6px;"/></a>
                       <a class="facebook modelClear" data-dismiss="modal" title="Close"><img src="/img/closemodel.png" style="left:-6px;"/></a>
			           </div>
                    </div>

                </div>
        </div>
        <input id="hdfImageID" type="hidden" value="" />
        <input id="hdfEventID" type="hidden" value="" />
        
        <input id="hdfIsAutoHide" type="hidden" value="" />
</asp:Content>
