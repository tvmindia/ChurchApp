<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Events.aspx.cs" Inherits="ChurchApp.AdminPanel.Events" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Events.css" rel="stylesheet" />

    <script src="../Scripts/CustomJS/Events.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
    <style>
        .fa{
            font-size:18px;
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

        <%--Alert boxes --%>
        <div id="rowfluidDiv" style="display: none;">

            <div class="alert alert-block" id="ErrorBox" style="display: none; background-color: #fdeaea !important; color: #ca6f74 !important; border: 1px solid #f27b81 !important;">
                <div id="Displaydiv">
                </div>
            </div>

            <div class="alert alert-error" style="display: none;">
                <strong>Operation Not Successfull.</strong>
            </div>
            <div class="alert alert-success" style="display: none;">
                <strong>Successfull.</strong>
            </div>
            <div class="alert alert-info" style="display: none;">
                <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
            </div>
            <div class="alert alert-block" style="display: none;">
                <h4 class="alert-heading">Warning!</h4>
                <p>Best check yourself, you're not looking too good.</p>
            </div>

        </div>

        <%--END : Alert boxes --%>

        <div class="row-fluid">

            <div class="span6">

                <div>
                    <div id="divLatestEvents">
                        <div class="" style="border-bottom:1.5px solid #F44336">
                            <h2>Latest Events</h2>
                            <a class="btnNew" title="" onclick="SetControlsInNewEventFormat();"><i title="Add New Event">+</i></a>

                        </div>
                       
                        <div  id="DivNoticeType1">

                        </div>

                        <div id="viewAllLatest">
                            <a class="aBack" style="display: none;">Back</a>
                            <a class="aViewMore" id="aViewMore">View All>></a>
                        </div>

                    </div>

                    <%--<div id="pagination-here"></div>--%>
                    <div id="divOldEvents" style="margin-top:40px">
                        <div class="" style="border-bottom:1.5px solid #87c16f"><h2>Old Events</h2></div>
                       
                        <div id="OldEventsGrid">
                        </div>
                        <div id="viewAllOld">
                            <a class="aOldBack" style="display: none;">Back</a>
                            <a class="aOldViewMore">View All>></a>
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
                                        <textarea tabindex="10" class="input-xlarge" id="txtDescription" name="Description" rows="4" placeholder="" ></textarea>
                                        <label class="control-label" id="lblDescription" for="focusedInput"></label>

                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="date01">Start Date</label>
                                    <div class="controls">
                                        <input type="text" class="input-xlarge datepicker" id="dateStartDate" />
                                        <label class="control-label" for="date01" id="lblStartDate"></label>

                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="date01">End Date</label>
                                    <div class="controls">
                                        <%--onblur="SetExpiryDate()"--%>

                                        <input type="text" class="input-xlarge datepicker" id="dateEndDate" onchange="SetExpiryDate()" />
                                        <label class="control-label" for="date01" id="lblEndDate"></label>

                                    </div>
                                </div>

                                <div class="control-group">
                                    <label class="control-label" for="date01">Expiry Date</label>
                                    <div class="controls">
                                        <input type="text" class="input-xlarge datepicker" id="dateExpiryDate" />
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
                                        <textarea tabindex="10" class="input-xlarge" id="txtnotificationCOntent" name="Description" rows="5" placeholder="" style="width: 70%"></textarea>

                                    </div>
                                </div>


                            </div>

                            <div id="divView">

                                <div class="accordion" style="border-bottom: 1px solid #e6e2e2;">
                                    <div class="">

                                        <div class="">
                                            <div class="accordion-inner" style="border-top:none;height:400px">

                                                <img class="eventImage img-polaroid" id="eventPreviewOnView" src="../img/No-Img_Chosen.png" />

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
        </div>
        <input id="hdfImageID" type="hidden" value="" />
        <input id="hdfEventID" type="hidden" value="" />

        <input id="hdfIsAutoHide" type="hidden" value="" />
</asp:Content>
