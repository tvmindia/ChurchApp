<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notices.aspx.cs" Inherits="ChurchApp.AdminPanel.Notices" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">


    <%--<script src="../Scripts/select2.min.js"></script>
    <link href="../CSS/select2.min.css" rel="stylesheet" />--%>

    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Notices.js"></script>
    <link href="../CSS/CustomCSS/Notice.css" rel="stylesheet" />
     <style>
        #dtbselect option{
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif!important;
            font-size:12px!important;
        }






    </style>
    <script>
        function saveoredit(id)
        {
            $(id).attr('src', '/img/edit.PNG');
        }
    </script>
    <%-- <link href="../CSS/lightbox.css" rel="stylesheet" />
    <script src="../Scripts/lightbox.js"></script>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <form id="frm1" runat="server">
        <div id="content" class="span10">
            <ul class="breadcrumb" style="margin-bottom:0px">
                <li>
                    <i class="icon-home"></i>
                    <a href="../AdminPanel/Home.aspx">Home</a>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </li>
                <li>Notices</li>
            </ul>

           <div class="buttonpatch" style="position:fixed;width:290px;right:0;top:8%;z-index:198">		
			<a class="facebook" title="Add New" id="btnAddNew" onclick="AddNewNoticeFormat();"><img  src="/img/add.PNG"/></a>
             <a class="rss" id="NoticeEdit"><img src="/img/edit.png"/></a>
            <a class="twitter" id="btnSave"><img src="/img/save.png"/></a>
            <a class="dribble" id="btnReset"><img src="/img/reset.png"/></a>
			<a class="rss" id="btnDelete"><img src="/img/delete.png"/></a>
            <a class="rss" id="btnNotify"><img src="/img/notyfi.png"/></a>
        </div>

            <div class="row-fluid" style="margin-top:3%">

                <div class=" span6">

                <div>
                    <div id="divLatestEvents">
                        <div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;">
                            <h2>Notices</h2>
                           <%--<a class="btnNew AddNew" id="btnAddNew" runat="server" title="" onclick="AddNewNoticeFormat();"><i title="Add New Notice">+</i></a>--%>

                        </div>
                        <%--class="box-content"--%> 
                        <div id="DivNoticeType1">

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
                            
                            </div>

                    </div>

                  
                </div>

            </div>



                <div class="span6 noMarginLeft" id="NoticeEditDivBox" style="margin-top:1%">
                    <div class="dark">
                        <h2><span class="fa fa-bell-o"> </span>  <span id="h1Event">Notices</span></h2>
                        <%--<a id="NoticeEdit" class="btnEdit"><i id="iconEdit" class="halflings-icon white pencil" aria-hidden="true" title="Edit Notice"></i></a>--%>
                        
                    <div class="box-content">
                        <div class="form-horizontal">
                            <fieldset>

                                <%--<a id="NoticeEdit" class="btnEdit" onclick="FixedEditClick()" style="right: 1px; position: fixed;"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>--%>
                                <%--Image--%>
                                <div class="control-group " id="DivImg" style="margin-top: 20px">
                                    <%--<label class="control-label" for="fileInput">Notice Image</label>--%>
                                        <img class="imgNotices img-rounded" id="NoticePreview" src="../img/No-Img_Chosen.png" />
                                        <%--onchange="showpreview(this);"--%>
                                            <input type="file" id="UpNotice" value="Choose Image" onchange="showpreview(this);" />
                                </div>
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

                                


                                <%--Description--%>
                                <div class="control-group" id="divNoticeDescription">
                                    <label class="control-label" for="focusedInput" id="lblDescTitle">Description</label>
                                    <div class="controls">
                                        <label class="control-label" for="focusedInput" id="lblNoticeDescription" style="display: none">Notice Description</label>
                                        <textarea class="input-large" id="txtDescription" name="Description" rows="4" placeholder=""></textarea>
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
                                        <label class="control-label" id="lblAlreadyNotificationSend">Notification Was added</label>
                                        <i class="fa fa-info-circle" data-toggle="popover" data-trigger="hover" data-content="If you added the Mobile notification once you can only edit it from the notification portal !"></i>
                                    </div>
                                    <div class="control-group">
                                        <label class="control-label" for="date01">Start Date</label>
                                        <div class="controls">
                                            <label class="control-label" for="focusedInput" id="lblStartDate" style="display: none"></label>
                                            <input type="text" class="input-large datepicker" readonly="true" id="dateStartDate" placeholder="select date" />
                                        </div>
                                    </div>

                                    <div class="control-group">
                                        <label class="control-label" for="date01">Expiry Date</label>
                                        <div class="controls">
                                            <label class="control-label" for="focusedInput" id="lblExpiryDate" style="display: none"></label>
                                            <input type="text" class="input-large datepicker" readonly="true" id="dateExpiryDate" placeholder="select date"/>
                                        </div>
                                    </div>

                                    <div class="control-group" id="DivNotificationContent">
                                    <label class="control-label" for="focusedInput">Notification Content</label>
                                    <div class="controls">
                                        <textarea class="input-large" id="txtnotificationCOntent" name="Description" rows="4"></textarea>

                                    </div>
                                </div>

                                </div>

                                <div id="divView">

                                    <div class="accordion" style="border-bottom: 1px solid #e6e2e2;">
                                        <div class="">

                                            <%--   <div class="accordion-body collapse in">
                                    <div class="accordion-inner">
                                        <img  id="NoticePreviewOnView" src="../img/No-Img_Chosen.png" />
                                        <label  for="focusedInput" id="lblNoticeDescriptionOnView" ></label>
                                       
                                    </div>

                                </div>--%>

                                            <div class="">
                                                <div class="accordion-inner" style="border-top:none;height:auto;min-height:400px;">
                                                    <%--<a class="btn btn-toolbar" style="border:1px solid white" href="../img/No-Img_Chosen.png"  ><i class="icon-zoom-in"></i></a>--%>

                                                    <img class="noticeImage img-polaroid" id="NoticePreviewOnView" src="../img/No-Img_Chosen.png" />
                                                    <span class="NoticeViewDetails" id="spnNoticeType"></span>
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


                               <%-- <div class="form-actions">
                                    <a class="btn btn-primary saveAll" id="btnSave"><span></span>Save</a>
                                    <a class="btn btn-primary cancelAll" id="btnCancel"><span></span>Cancel</a>
                                    <a class="btn btn-primary" id="btnDelete"><span></span>Delete</a>
                                </div>--%>
                            </fieldset>
                        </div>
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
