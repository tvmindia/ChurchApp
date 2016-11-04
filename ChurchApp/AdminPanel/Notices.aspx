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

            <%--Alert boxes --%>

            <div class="row-fluid">

                <div class="box span5">
                    <div class="box-header">
                        <h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Latest Notices</h2>
                        <div class="box-icon">
                            <a href="#" class="btn btn-lg btn-round btn-primary" title="" onclick="AddNewNoticeFormat();">NEW <i class="glyph-icon icon-plus"></i></a>
                            <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>

                        </div>
                    </div>
                    <div class="box-content" id="DivNoticeType1">

                      <%--  <div class="accordion">
                            <div class="accordion-group">
                                <div class="accordion-heading">

                                    <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">Unit #1</a>
                                    
                                </div>
                                <div class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        <img class="Eventimage" src="../img/AppImages/747515f2-501a-3f59-96ba-6fd122f83f61.jpg" alt="St.Thomas Church" /><p>In your heart, do you wish your friends knew about God’s love–and how He cared about us so much that He sent His son to earth to give His life for us? The good news is, as a student you have neat way to share your Christian faith: Bring Your Bible to School Day! On this day, thousands of students just like you will bring their Bible to school and talk about it with friends during free time.  To learn more about this event, ask your parents to go to the website with you: BringYourBible.org</p>
                                        <span class="NoticeViewDetails"><a href="#">View Details</a></span>
                                    </div>

                                </div>
                            </div>

                        </div>--%>


                    </div>
                </div>

                <div class="box span7" id="PriestEditDivBox">
                    <div class="box-header" >
                        <h2 id="h1Notice"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Add Notice</h2>
                        <div class="box-icon">

                            <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>

                        </div>
                    </div>
                    <div class="box-content">
                        <div class="form-horizontal">
                            <fieldset>
                                <div id="NoticeEdit" style=" right: 30px; position: fixed;" onclick="FixedEditClick()"><a href="#" ><i class="fa fa-pencil eventEdit" aria-hidden="true" ></i>Edit</a></div>
                                
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
                                        <div id="DivFile" >
                                            <input type="file" id="UpNotice" value="Choose Image" onchange="showpreview(this);" /></div>
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
                                    <label class="control-label" id="lblAlreadyNotificationSend" >Already Notification added</label>
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
                                       
                                    <img class="Eventimage" id="NoticePreviewOnView" src="../img/No-Img_Chosen.png" />

                                         <label  for="focusedInput" id="lblNoticeDescriptionOnView" ></label>
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
                                    <%--<button type="submit" id="btnSave" class="btn btn-primary">Save</button>--%>
                                    <button type="reset" class="btn btn-primary" id="btnCancel">Cancel</button>
                                    <%--<asp:Button ID="btnUpload" class="btn btn-primary" runat="server" Text="Upload"  />--%>
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
