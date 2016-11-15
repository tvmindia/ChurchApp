<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Novenas.aspx.cs" Inherits="ChurchApp.AdminPanel.Novenas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/CustomJS/Novenas.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
    <link href="../CSS/CustomCSS/Novenas.css" rel="stylesheet" />

    <style>
        #DivSaints ul {
            display: ruby !important;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

    <div id="content" class="span10">
        <ul class="breadcrumb">
            <li>
                <i class="icon-home"></i>
                <a href="../AdminPanel/Home.aspx">Home</a>
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </li>
            <li>Novenas</li>
        </ul>


        <div class="row-fluid" id="divImageAlbum">
            <div class="box span12">
                <div class="box-header">
                    <h2><i class="halflings-icon picture"></i><span class="break"></span>Saints</h2>
                    <div class="box-icon">
                        <a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>

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
                                <div class="span5">
                                    <div id="imgDiv">
                                        <img id="imgSaint" src="../img/No-Img_Chosen.png" />
                                    </div>
                                    <input type="file" id="UpSaint" value="Choose Image" onchange="showpreview(this);" />
                                </div>
                                <div class="span6">
                                    <div id="NameDiv">
                                        <label for="name">Saint Name</label><input name="Caption" id="txtSaintName" type="text" />
                                    </div>
                                    <label for="name">Description</label><textarea id="txtSaintDescription" name="Description" rows="3" placeholder=""></textarea>
                                </div>

                                <%--<div class="span1"></div>--%>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-primary" id="btnSaveInModal">Save</a>
                        <a href="#" class="btn" data-dismiss="modal">Close</a>

                    </div>

                </div>
            </div>
        </div>
    </div>

</asp:Content>
