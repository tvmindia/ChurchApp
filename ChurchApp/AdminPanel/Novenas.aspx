<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Novenas.aspx.cs" Inherits="ChurchApp.AdminPanel.Novenas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/CustomJS/Novenas.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
    <link href="../CSS/CustomCSS/Novenas.css" rel="stylesheet" />

    <script src="../Scripts/timepicki.js"></script>
    <link href="../CSS/timepicki.css" rel="stylesheet" />


    <style>
        #DivSaints ul {
            display: ruby !important;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

    <div id="content" class="span10">
        <ul class="breadcrumb" id="breadcrumbNovena">
            <li>
                <i class="icon-home"></i>
                <a href="../AdminPanel/Home.aspx">Home</a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li class="Novena">Novenas</li>
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


        <div class="row-fluid" id="divImageAlbum">
            <div class="box span12">
                <div class="box-header">
                    <h2><i class="halflings-icon picture"></i><span class="break" id="spnSaint">Saints</span></h2>

                    <div class="box-icon">
                        <a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
                        <a class="btnEdit" style="position: relative; top: -1px; right: 0px;" title="Edit" id="EditPatron"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>
                        <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>

                    </div>
                </div>
                <div class="box-content">
                    <div class="span12" id="DivSaints">

                        <%-- <div id="divAddSaint">
                   <img class="PlusImg" src="../img/Plussymbol.png"/>
                    <a data-rel="tooltip" data-original-title="Add New Saint"  id="aNewSaint">Add New Saint</></a>

                   </div>--%>

                        <%--  <ul class="thumbnails">
                            <li class="span2">
                            <div class="thumbnail">
                            <img src="../img/gallery/priest.png" class="img-polaroid" alt=""/>
                            <address>
                            <strong>
                            Dr. Thomson Kattingal
                            </strong>
                            <p>Manger<br />9996532452</p>
                            </address>
                            </div>
                            </li>
                       </ul>--%>
                    </div>

                    <div class="span12" id="DivIndividualPatron">
                        <div id="divLatestNovenas" class="span5">
                            <div class="priority high">
                                <span class="latest">Latest Novenas</span>
                                <a class="btnNew" onclick="SetControlsInNovenaFormat();"><i title="Add New Novena">+</i></a>

                            </div>

                            <div id="DivNovenas">
                            </div>

                            <div id="viewAllLatest">
                                <a class="aBack" style="display: none;">Back</a>
                                <a class="aViewMore" id="aViewMore">View All>></a>
                            </div>

                        </div>
                        <div class="span1"></div>
                        <div id="DivNewNovena" class="span6 noMarginLeft">

                            <div class="box-header">
                                <h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span><span id="h1Event" style="position: absolute">New Novena</span><a id="NoticeEdit" class="btnEdit" onclick="FixedEditClick()"><i class="halflings-icon white pencil" aria-hidden="true" title="Edit Novena"></i></a></h2>

                                <%--   <h2>
                                    <i class="fa fa-user" aria-hidden="true"></i>
                                    <span class="break"></span>
                                    <span id="NovenaHeading">New Novena</span>
                                    <a id="novenaEdit" class="btnEdit" onclick="FixedEditClick()">
                                        <i class="halflings-icon white pencil" aria-hidden="true" title="Edit Novena"></i>
                                    </a>
                                </h2>--%>

                                <div class="box-icon">
                                </div>
                            </div>
                            <div class="box-content">
                                <div class="form-horizontal">
                                    <fieldset>
                                        <%--New Format--%>
                                        <div id="DivNewFormat">

                                            <%--Novena Caption--%>
                                            <div class="control-group">
                                                <label class="control-label" for="focusedInput">Novena Caption</label>
                                                <div class="controls">
                                                    <input class="input-large focused" name="Caption" id="txtNovenaCaption" type="text" />
                                                </div>
                                            </div>


                                            <%--Patron--%>
                                            <div class="control-group">
                                                <label class="control-label" for="focusedInput">Patron</label>
                                                <div class="controls">
                                                    <select id="ddlPatron">
                                                        <option></option>
                                                    </select>
                                                </div>
                                            </div>

                                            <%--Image--%>
                                            <div class="control-group">
                                                <div class="controls">
                                                    <img class="Preview" id="imgNewNovena" src="../img/No-Img_Chosen.png" />
                                                    <div>
                                                        <input type="file" id="UpNewNovena" value="Choose Image" onchange="showpreview(this);" />
                                                    </div>
                                                </div>
                                            </div>

                                            <%--Novena Type --%>
                                            <div class="control-group" id="divNovenaType">
                                                <label class="control-label">Novena Type</label>
                                                <div class="controls">
                                                    <label class="radio">
                                                        <input type="radio" name="NovenaType" id="rdoNovenaNormal" value="Normal" checked="" />
                                                        Normal
                                                    </label>

                                                    <label class="radio">
                                                        <input type="radio" name="NovenaType" id="rdoNovenaSpecial" value="Special" />
                                                        Special
                                                    </label>
                                                </div>

                                            </div>

                                            <%-- Day--%>

                                            <div class="control-group" id="divDay">

                                                <label class="control-label" for="focusedInput">Day</label>
                                                <div class="controls">
                                                    <select id="ddlDay" name="DaySelect">
                                                        <option value="Sun">Sunday</option>
                                                        <option value="Mon">Monday</option>
                                                        <option value="Tue">Tuesday</option>
                                                        <option value="Wed">Wednesday</option>
                                                        <option value="Thu">Thursday</option>
                                                        <option value="Fri">Friday</option>
                                                        <option value="Sat">Saturday</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <%-- Time--%>

                                            <div class="control-group">

                                                <label class="control-label" for="focusedInput">Time</label>
                                                <div class="controls">
                                                    <input type="text" class="timePikerClass" id="TxtTime" name="time" />
                                                </div>
                                            </div>

                                            <%--Start Date--%>
                                            <div class="control-group" id="divStartDate">
                                                <label class="control-label" for="date01">Start Date</label>
                                                <div class="controls">
                                                    <input type="text" class="input-xlarge datepicker" id="dateStartDate" />
                                                </div>
                                            </div>

                                            <%--End Date--%>
                                            <div class="control-group" id="divEndDate">
                                                <label class="control-label" for="date01">End Date</label>
                                                <div class="controls">
                                                    <input type="text" class="input-xlarge datepicker" id="dateEndDate" />
                                                </div>
                                            </div>



                                            <%--Description--%>
                                            <div class="control-group">
                                                <label class="control-label" for="focusedInput">Description</label>
                                                <div class="controls">
                                                    <textarea tabindex="10" class="input-xlarge span10" id="txtDescription" name="Description" rows="3"></textarea>
                                                </div>
                                            </div>


                                        </div>

                                        <%--View Frormat--%>

                                        <div id="DivViewFormat">

                                            <div id="divGenDetals" class="panel span12">

                                                <%--                           
                       <address>
                           <strong>Church</strong><br />
                           <p><label id="lblAddress">Kottayam Kerala</label> </p>
                       </address>--%>

                                                <div class="span6">
                                                    <img id="imgNovenaView" class="Preview" src="../img/No-Img_Chosen.png" />
                                                </div>

                                                <div class="span6">
                                                    <dl>
                                                        <dt>Church</dt>
                                                        <dd>
                                                            <label id="lblChurchName"></label></dd>
                                                        <dt>Start</dt>
                                                        <dd>
                                                            <label id="lblStartDate"></label></dd>
                                                        <dt>End</dt>
                                                        <dd>
                                                            <label id="lblEndDate"></label></dd>
                                                    </dl>
                                                </div>


                                                <div class="span12">
                                                    <address>
                                                        <p>
                                                            <label id="lblDescription">
                                                           

                                                            </label></p>
                                                    </address>
                                                </div>
                                                <div>
                                                </div>

                                            </div>
                                        </div>

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
                <!--/span-->

                <!--Models used in this page-->
                <div class="modal hide fade" id="NewSaintModel">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3>Add New Saint</h3>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <div class="span12">
                                <div class="span1"></div>

                                <div class="span6">
                                    <div id="NameDiv">
                                        <label for="name">Saint Name</label><input name="Caption" id="txtSaintName" type="text" />
                                    </div>
                                    <label for="name">Description</label><textarea id="txtSaintDescription" name="Description" rows="3" placeholder=""></textarea>
                                </div>

                                <div class="span5">
                                    <div id="imgDiv">
                                        <img class="Preview" id="imgSaint" src="../img/No-Img_Chosen.png" />
                                    </div>
                                    <input type="file" id="UpSaint" value="Choose Image" onchange="showpreview(this);" />
                                </div>


                                <%--<div class="span1"></div>--%>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-primary" id="btnSaveInModal">Save</a>
                        <a href="#" class="btn" data-dismiss="modal" id="btnCloseInModal">Close</a>

                    </div>

                </div>
            </div>
        </div>
    </div>

</asp:Content>
