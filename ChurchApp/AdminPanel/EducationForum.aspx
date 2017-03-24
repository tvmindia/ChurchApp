<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="EducationForum.aspx.cs" Inherits="ChurchApp.AdminPanel.EducationForum" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
<link href="../CSS/CustomCSS/Events.css" rel="stylesheet" />
<script src="../Scripts/CustomJS/Common.js"></script>
<script src="../Scripts/CustomJS/EducationForum.js"></script>
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
li.active
{
    font-weight:800!important;
}
.tab-content{
    overflow:hidden;
}
</style>
<div id="content" class="span10">
<ul class="breadcrumb" style="margin-bottom:0px;">
<li>
<i class="icon-home"></i>
<a href="../AdminPanel/Home.aspx">Home</a>
<i class="fa fa-angle-right" aria-hidden="true"></i>
</li>
<li>Education Forum</li>

</ul>
<div class="buttonpatch" style="position:fixed;width:290px;right:0;top:8%;z-index:198">		
<a class="facebook" title="Add New" id="btnAddNew" onclick="SetControlsInNewEventFormat();"><img  src="/img/add.PNG"/></a>
<a class="rss" id="NoticeEdit"><img src="/img/edit.png"/></a>
<a class="twitter" id="btnSave"><img src="/img/save.png"/></a>
<a class="dribble" id="btnReset"><img src="/img/reset.png"/></a>
<a class="rss" id="btnDelete"><img src="/img/delete.png"/></a>
<a class="rss" id="btnNotify" data-toggle="modal"><img src="/img/notyfi.png"/></a>
</div>`
<%--END : Alert boxes --%>

<div class="row-fluid" style="">
    <h2>Education Forum - <span id="spanPrgName"> </span></h2>
<div class="tabbable"> <!-- Only required for left/right tabs -->
<ul class="nav nav-tabs">
<li class="active"><a href="#tab1" data-toggle="tab" id="tabEvents" onclick="SetEvents()">Events</a></li>
<li><a href="#tab2" data-toggle="tab" onclick="SetMembers()">Members</a></li>
<li><a href="#tab3" data-toggle="tab" onclick="SetAbout()">About</a></li>
</ul>
<div class="tab-content">
<div class="tab-pane active" id="tab1">
<div class="span6">

<div>
<div id="divLatestEvents">
<div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;">
<h2>Latest Events</h2>
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
<div class="box-content">
<div class="form-horizontal">
<fieldset>
<div id="EditContent">

<div class="control-group"id="DivImg" style="margin-top: 20px">
<img class="imgNotices img-rounded" id="NoticePreview" src="../img/No-Img_Chosen.png" />
                                       
<input type="file" id="UpEvent" value="Choose Image" onchange="showpreview(this);" />
</div>
<div class="control-group" >
<label class="control-label" for="txtEventName">Title</label>
<div class="controls">
<input class="input-xlarge focused" name="Caption" id="txtEventName" type="text" />
<label class="control-label" for="focusedInput" id="lblEventName"></label>

</div>
</div>
<div class="control-group">
<label class="control-label" for="txtDescription">Description</label>
<div class="controls">
<textarea class="input-xlarge" id="txtDescription" name="Description" rows="4" placeholder="" ></textarea>
<label class="control-label" id="lblDescription" for="focusedInput"></label>

</div>
</div>

<div class="control-group">
<label class="control-label" for="dateStartDate">Start Date</label>
<div class="controls">
<input type="text" class="input-xlarge datepicker" id="dateStartDate" readonly="true" />
<label class="control-label" for="date01" id="lblStartDate"></label>

</div>
</div>

<div class="control-group">
<label class="control-label" for="dateEndDate">End Date</label>
<div class="controls">
<input type="text" class="input-xlarge datepicker" id="dateEndDate" readonly="true" />
<label class="control-label" for="date01" id="lblEndDate"></label>

</div>
</div>

                               

</div>

<div id="divView">

<div class="accordion" style="border-bottom: 1px solid #e6e2e2;">
<div class="">

<div class="">
<div class="accordion-inner" style="border-top:none;height:auto;min-height:400px;" >
<a id="aZoomEventImage" class='example-image-link' href='../img/No-Img_Chosen.png'>
<img class="eventImage img-polaroid" id="eventPreviewOnView" src="../img/No-Img_Chosen.png" /></a>

<label for="focusedInput" style="font-size:12px" id="lblEventDescriptionOnView"></label>

</div>

</div>


</div>

</div>

</div>

<div id="ResponseSection" style="display:none;">
<div class="control-group" >
<label class="control-label" for="txtEventName">Total Response :</label>
<div class="controls">
<label class="control-label" for="focusedInput" id="lblResponseCound">XXX</label>
</div>
</div>
    <div class="control-group" >
<label class="control-label" for="txtEventName">Attending :</label>
<div class="controls">
<label class="control-label" for="focusedInput" id="lblAttendCound">XXX</label>
</div>
</div>
    <div class="control-group" >
<label class="control-label" for="txtEventName">Not Attending :</label>
<div class="controls">
<label class="control-label" for="focusedInput" id="lblNotAttendCound">XXX</label>
</div>
</div>
<div class="control-group" >
<label class="control-label" for="txtEventName">Not Sure :</label>
<div class="controls">
<label class="control-label" for="focusedInput" id="lblNotSureCound">XXX</label>
</div>
</div>
    <table id="tblResponse" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Response</th>
<th>Contact</th>
<th>Response Date</th>
</tr>
</thead>
</table>
</div>
                          
</fieldset>
</div>
</div>


</div>
</div>
</div>
<div class="tab-pane" id="tab2">
<table id="tblEduForumMembers" class="table table-striped table-bordered table-hover" cellspacing="0" width="100%">
<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Parent Name</th>
<th>Class</th>
<th>School</th>
<th>Age</th>
<th>Mobile No</th>
<th>Email ID</th>
</tr>
</thead>
</table>
</div>
<div class="tab-pane" id="tab3">
<div class="control-group" >
<label class="control-label" for="txtEventName">About</label>
<div class="controls">
<label class="control-label" for="focusedInput" id="lblEduAbout">XXX</label>
<textarea class="span12" rows="10" id="txtEduAbout" style="display:none;"></textarea>
</div>
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
<i class="fa fa-info-circle" id="NotificationInfo" style="display:none;position:relative;top:53px;left:-53px;" data-toggle="popover" data-trigger="hover" data-content="If you added the Mobile notification once you can only edit it from the notification portal !"></i>
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
