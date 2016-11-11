<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notices.aspx.cs" Inherits="ChurchApp.AdminPanel.Notices" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


    <%--<script src="../Scripts/select2.min.js"></script>
    <link href="../CSS/select2.min.css" rel="stylesheet" />--%>

    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Notices.js"></script>
    <link href="../CSS/CustomCSS/Notice.css" rel="stylesheet" />

    <%-- <link href="../CSS/lightbox.css" rel="stylesheet" />
    <script src="../Scripts/lightbox.js"></script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <form id="frm1" runat="server">
        <div id="content" class="span10">
            <ul class="breadcrumb">
                <li>
                    <i class="icon-home"></i>
                    <a href="../AdminPanel/Home.aspx">Home</a>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </li>
                <li>Notices</li>
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

            <%--Alert boxes --%>

            <div class="row-fluid">

                <div class=" span5">

                <div>
                    <div id="divLatestEvents">
                        <div class="priority high">
                            <span class="latest">Latest Notices</span>
                           <a class="btnNew" title="" onclick="AddNewNoticeFormat();"><i title="Add New Notice">+</i></a>

                        </div>
                        <%--class="box-content"--%> 
                        <div id="DivNoticeType1">

                        </div>

                        <div id="viewAllLatest">
                            <a class="aBack" style="display: none;">Back</a>
                            <a class="aViewMore" id="aViewMore">View All>></a>
                        </div>

                    </div>

                  
                </div>

            </div>



                <div class="box span7" id="NoticeEditDivBox">
                    <div class="box-header">
                         <h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span><span id="h1Notice">Event</span><a id="NoticeEdit" class="btnEdit" onclick="FixedEditClick()"><i class="halflings-icon white pencil" aria-hidden="true" title="Edit Notice"></i></a></h2>

                        <%--<h2 id="h1Notice"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Add Notice</h2>--%>
                        <div class="box-icon">

                            <%--<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>--%>
                        </div>
                    </div>

                    <%--class="box-content"--%>
                    <div >
                        <div class="form-horizontal">
                            <fieldset>

                                <%--<a id="NoticeEdit" class="btnEdit" onclick="FixedEditClick()" style="right: 1px; position: fixed;"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>--%>

                                <%--Notice Name--%>
                                <div class="control-group" id="divnoticeName">
                                    <label class="control-label" for="focusedInput">Notice Name</label>
                                    <div class="controls">
                                        <label class="control-label" for="focusedInput" id="lblNoticeName" style="display: none">Notice Name</label>
                                        <input class="input-large focused" name="Caption" id="txtNoticeName" type="text" />
                                    </div>
                                </div>

                                <%--Notice Type--%>
                                <div class="control-group" id="divNoticeType">
                                    <label class="control-label" for="focusedInput">Notice Type</label>
                                    <div class="controls">

                                        <select id="ddlNoticeType">
                                            <option></option>
                                        </select>
                                    </div>
                                </div>

                                <%--Image--%>
                                <div class="control-group " id="DivImg">
                                    <%--<label class="control-label" for="fileInput">Notice Image</label>--%>

                                    <div class="controls">
                                        <img class="imgNotices" id="NoticePreview" src="../img/No-Img_Chosen.png" />
                                        <%--onchange="showpreview(this);"--%>
                                        <div id="DivFile">
                                            <input type="file" id="UpNotice" value="Choose Image" onchange="showpreview(this);" />
                                        </div>
                                    </div>
                                </div>


                                <%--Description--%>
                                <div class="control-group" id="divNoticeDescription">
                                    <label class="control-label" for="focusedInput" id="lblDescTitle">Description</label>
                                    <div class="controls">
                                        <label class="control-label" for="focusedInput" id="lblNoticeDescription" style="display: none">Notice Description</label>
                                        <textarea tabindex="10" class="input-xlarge span10" id="txtDescription" name="Description" rows="25" placeholder=""></textarea>
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

                                <div id="divNotificationDates">
                                    <div class="control-group">
                                        <label class="control-label" id="lblAlreadyNotificationSend">Already Notification added</label>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="date01">Start Date</label>
                                        <div class="controls">
                                            <label class="control-label" for="focusedInput" id="lblStartDate" style="display: none"></label>
                                            <input type="text" class="input-xlarge datepicker" id="dateStartDate" />
                                        </div>
                                    </div>

                                    <div class="control-group">
                                        <label class="control-label" for="date01">Expiry Date</label>
                                        <div class="controls">
                                            <label class="control-label" for="focusedInput" id="lblExpiryDate" style="display: none"></label>
                                            <input type="text" class="input-xlarge datepicker" id="dateExpiryDate" />
                                        </div>
                                    </div>
                                </div>

                                <div id="divView">

                                    <div class="accordion">
                                        <div class="accordion-group">

                                            <%--   <div class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        <img  id="NoticePreviewOnView" src="../img/No-Img_Chosen.png" />
                                        <label  for="focusedInput" id="lblNoticeDescriptionOnView" ></label>
                                       
                                    </div>

                                </div>--%>

                                            <div class="accordion-body collapse in">
                                                <div class="accordion-inner">
                                                    <%--<a class="btn btn-toolbar" style="border:1px solid white" href="../img/No-Img_Chosen.png"  ><i class="icon-zoom-in"></i></a>--%>

                                                    <img class="noticeImage" id="NoticePreviewOnView" src="../img/No-Img_Chosen.png" />
                                                    <span class="NoticeViewDetails" style="margin-bottom: 0px" id="spnNoticeType"></span>
                                                    <br />
                                                    <label for="focusedInput" id="lblNoticeDescriptionOnView"></label>

                                                </div>

                                            </div>


                                        </div>

                                    </div>



                                    <%--                                 
                                <div class="span12">
                                    <div style="height:100px;margin-top:20px">        </div>
                                </div>


                                 
                                <div class="span12">  </div>--%>
                                </div>


                                <%--<input class="input-file uniform_on" id="UpNotice" type="file" runat="server"/>--%>


                                <%--<asp:FileUpload ID="UpNotice" runat="server" />--%>

                                <%--<a class="btn btn-primary" id="btnUpload"><span></span>Upload File</a>--%>
                                <%--<input type="button" id="btnUpload" value="Upload Files"/>--%>



                                <%--    <div class="control-group">
                                                        <label class="control-label" for="image" style="visibility: hidden">Image</label>
                                                        <div class="controls">
                                                            <img id="ImgProduct" style="height: 100px; max-width: 100%; border: none" src="../img/No-Img_Chosen.png" />

                                                        </div>
                                                    </div>
                                --%>


                                <div class="form-actions">
                                    <a class="btn btn-primary" id="btnSave"><span></span>Save</a>
                                    <a class="btn btn-primary" id="btnCancel"><span></span>Cancel</a>
                                    <a class="btn btn-primary" id="btnDelete"><span></span>Delete</a>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </div>

                <input id="hdfImageID" type="hidden" value="" />
                <input id="hdfNoticeID" type="hidden" value="" />


                <%--<asp:HiddenField ID="hdfImgID" runat="server" />--%>
            </div>

        </div>


    </form>
</asp:Content>
