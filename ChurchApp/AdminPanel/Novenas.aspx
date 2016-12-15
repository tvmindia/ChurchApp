<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Novenas.aspx.cs" Inherits="ChurchApp.AdminPanel.Novenas" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="../Scripts/CustomJS/Novenas.js"></script>
    <script src="../Scripts/CustomJS/Common.js"></script>
    <link href="../CSS/CustomCSS/Novenas.css" rel="stylesheet" />

    <%--<script src="../Scripts/timepicki.js"></script>
    <link href="../CSS/timepicki.css" rel="stylesheet" />--%>
   <style>
        ._30vx {
    left: 20px;
    position: relative;
    top: -180px;
}
._6a {
    display: inline-block;
}
._30v- {
    background-clip: padding-box;
    background-color: #000;
    border: 1px solid #fff;
    border-color: rgba(255, 255, 255, .8);
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(0, 0, 0, .6);
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    opacity: 0;
    overflow: hidden;
    padding: 6px 12px;
    position: relative;
    top: 3px;
    transition: opacity .3s cubic-bezier(.175, .885, .32, 1.275), width .3s step-end;
    white-space: nowrap;
    width: 34px;
    word-wrap: normal;
}
/*a {
    color: #365899;
    cursor: pointer;
    text-decoration: none;
}*/
/*a:-webkit-any-link {
    color: -webkit-link;
    text-decoration: underline;
    cursor: auto;
}*/
._30w0 {
    -webkit-font-smoothing: antialiased;
    padding-left: 26px;
    position: relative;
    top: 1px;
    z-index: 2;
}
._50f7 {
    font-weight: bold;
}
a._p {
    display: block;
}
._30vy {
    height: 34px;
    position: relative;
}
._30vy, ._30vy:hover {
    text-decoration: none;
}
.iconsize{
    font-size:20px;
    color:#bbb3b3!important;
}
._30vz {
    left: 5px;
    opacity: .7;
    position: absolute;
    top: 8px;
    transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
    z-index: 1;
}
._30vy:hover ._30vz, ._30vy:focus ._30vz, ._30vx.openToggler ._30vz, ._30v_ ._30vz, ._3y4k ._30vz, .coverImage:hover ._5pwk ._30vz {
    opacity: .9;
    transform: scale(.75);
}
._30vy:hover ._30v-, ._30vy:focus ._30v-, ._30vx.openToggler ._30v-, ._30v_ ._30v-, ._3y4k ._30v-, .coverImage:hover ._5pwk ._30v- {
    opacity: .8;
    width: 100%;
}
._30vy:hover ._30v-, ._30vy:focus ._30v-, .coverImage:hover ._5pwk ._30v-{
    transition: opacity .3s cubic-bezier(.175, .885, .32, 1.275), width .3s step-start;
}
    </style>
     <script>
        function popUpload()
        {
            $('#flupCoverpic').click();
        }
        function UploadNow()
        {
            alert('hai');
        }
    </script>
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
                <div class="box-header" id="DivBoxHeader">
                    <h2><i class="halflings-icon picture"></i><span class="break" id="spnSaint">Novenas</span></h2>
                    <div class="box-icon">
                            <%--<a class="AddNew" onclick="AddNewNovena();"><i title="Add New Novena">+</i></a>--%>
					        <a class="" style="position: relative; top: -1px;  right: 0px;" title="Edit" onclick="AddNewNovena();" ><i class="halflings-icon pencil" id="iconPatronRefresh" aria-hidden="true"></i></a>
                            <a class="" style="display:none;position: relative; top: -1px;  right: 0px;" title="Edit" id="RefreshAlbum"><i class="halflings-icon refresh" aria-hidden="true"></i></a>
                            <a class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							
						</div>
                 <%--   <div class="box-icon">
                        <a href="#" id="toggle-fullscreen" class="hidden-phone hidden-tablet"><i class="halflings-icon fullscreen"></i></a>
                        <a class="btnEdit" style="position: relative; top: -1px; right: 0px;" title="Edit" id="EditPatron"><i class="halflings-icon white pencil" aria-hidden="true"></i></a>
                        <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>

                    </div>--%>
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
                            <h2>Novenas</h2>
                            <div style="border-bottom: 1.5px solid #FA603D;line-height: 0px;">
                                
                                <a class="btnNew" onclick="SetControlsInNovenaFormat(true);"><i title="Add New Novena">+</i></a>

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
                                <h2><i class="fa fa-anchor" aria-hidden="true"></i><span class="break"></span><span id="h1Event" style="position: absolute">New Novena</span><a id="NoticeEdit" class="btnEdit" onclick="FixedEditClick()"><i id="iconEdit" class="halflings-icon white pencil" aria-hidden="true" title="Edit Novena"></i></a></h2>

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

                                         <div class="alert alert-block" id="ErrorBox" style="display: none; background-color: #fdeaea !important; color: #ca6f74 !important; border: 1px solid #f27b81 !important;">
                <div id="Displaydiv">
                </div>
            </div>

                                        <%--New Format--%>
                                        <div id="DivNewFormat">

                                           
                                            <div class="span6">
                                                <label for="name">Patron</label>
                                                <select id="ddlPatron">
                                                    <option></option>
                                                </select>
                                                <label for="name">Novena Caption</label>
                                                <input name="Caption" id="txtNovenaCaption" type="text"/>
                                                <label  >Description</label>
                                                <textarea id="txtDescription" name="Description" rows="3" ></textarea>
                                                

                                                 

                                            </div>
                                            <div class="span6" >
                                                 
                                                <img class="Preview" id="imgNewNovena" src="../img/No-Img_Chosen.png" />
                                                <div class="_6a uiPopover _30vx _5v-0" id="ProfileCoverPhotoSelector" data-ft="{&quot;tn&quot;:&quot;*|&quot;}">
                                                <a class="_30vy _5pwk _p" href="#" aria-haspopup="true" aria-expanded="false" rel="toggle" role="button" id="btnUpload" aria-controls="u_1c_3" onclick="popUpload();">
                                                <i class="fa fa-camera iconsize _30vz"></i>
                                                <div class="_30v-">
                                                <span class="_30w0 _50f7">Change Picture</span>
                                                 </div>
                                                 </a>
                             <%--<input type="file" onchange="UploadNow();" id="flupCoverpic" style="display:none" />--%>
                          </div>
                                                <input type="file" id="flupCoverpic" style="display:none" value="Choose Image" onchange="showpreview(this);UploadNow();" />
                                            </div>
                                            
                                           

                                            <div id="DivNovenaTiming" class="span12" >
                                <h2>Novena Timings</h2>
                                               
                           <%-- <div class="box-header">
                                <h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span><span style="position: absolute">Novena Timings</span>
                                </h2>

                                <div class="box-icon">
                                </div>
                            </div>--%>

                           
                                <div class="form-horizontal">
                                    <fieldset>


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



                                       
                                       

                                       <%-- <div class="span1">
                                             <a id="addBtn" class="btn btn-primary button" ><span>+</span></></a>

                                        </div>--%>


                                        <%--Start Date--%>
                                        <div class="control-group" id="divStartDate">
                                            <label class="control-label" for="date01">Start Date</label>
                                            <div class="controls">
                                                <input type="text" class="input-large datepicker" id="dateStartDate"/>
                                            </div>
                                        </div>

                                        <%--End Date--%>
                                        <div class="control-group" id="divEndDate">
                                            <label class="control-label" for="date01">End Date</label>
                                            <div class="controls">
                                                <input type="text" class="input-large datepicker" id="dateEndDate" />
                                            </div>
                                        </div>
                                        

                                         <%-- Day--%>

                                        <div class="control-group" id="divDay">

                                            <label class="control-label" for="focusedInput">Day</label>
                                            <div class="controls">
                                                <select id="ddlDay"  multiple="multiple" name="DaySelect">
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

                                        <div class="control-group" >

                                            <label class="control-label" for="focusedInput">Time</label>
                                            <div class="controls" >
                                                <input type="text" class="timepicker" placeholder="Select Time" id="TxtTime" name="time" />
                                                <%--<input type="text" class="timePikerClass" id="TxtTime" name="time" /> --%>
                                                 <%--<a id="addBtn" class="btn btn-primary button" ><span>+</span></></a>--%>
                                            </div>
                                        </div>


                                       <div class="span12">
                                       
                                            <label class="control-label" for="date01" id="lblSelectedTimes" style="width:100%">
                                          
                                            </label>

                                            <table id="tblNovenaTiming" style="width:80%" class="table table-striped table-bordered bootstrap-datatable">
						  <thead>
							  <tr>
								  <th>Day</th>
								  <th>Time</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody id="tblBdyNovenaTiming">
							
						</tbody>
					  </table>      



                                         </div>    
                                      


                                    </fieldset>
                                </div>

                           

                                </div>

                                       
                                            </div>

                                         <%--View Frormat--%>

                                        <div id="DivViewFormat" class="span12">



                                            <%--                           
                       <address>
                           <strong>Church</strong><br />
                           <p><label id="lblAddress">Kottayam Kerala</label> </p>
                       </address>--%>

                                            <div class="span3">
                                                <img id="imgNovenaView" class="Preview" src="../img/No-Img_Chosen.png" />
                                            </div>

                                            <div class="span7">

                                                <dl>
                                                    <dt>Church</dt>
                                                    <dd>
                                                        <label id="lblChurchNam"></label>
                                                    </dd>
                                                    <dt id="ViewDate">Date</dt>
                                                    <dd>
                                                        <label id="lblViewDate"></label>
                                                    </dd>
                                                    <dt id="Viewtime">Time</dt>
                                                    <dd>
                                                        <label id="lblViewTime"></label>
                                                    </dd>
                                                </dl>
                                            </div>


                                            <div class="span12">
                                                <address>
                                                    <p>
                                                        <label id="lblDescription">
                                                        </label>
                                                    </p>
                                                </address>
                                            </div>
                                           
                                             <%--NOVENA TIMING--%>

                            
                                        </div>


                                    </fieldset>
                                </div>
                                <div class="form-actions">
                                    <a class="btn btn-primary saveAll" id="btnSave"><span></span>Save</a>
                                    <a class="btn btn-primary" id="btnCancel"><span></span>Cancel</a>
                                    <a class="btn btn-primary" id="btnDelete"><span></span>Delete</a>

                                </div>

                            </div>

                            <br />
                            <br />
                           
                           

                        </div>
                    </div>

                </div>
                <!--/span-->

                <!--Models used in this page-->
                <div class="modal hide fade" id="NewSaintModel">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">×</button>
                        <h3 id="ModalHead">Add New Saint</h3>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-block" id="ErrorBox1" style="display: none; background-color: #fdeaea !important; color: #ca6f74 !important; border: 1px solid #f27b81 !important;">
                <div id="Displaydiv1">
                </div>
            </div>
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
        <input id="hdfNovenaID" type="hidden" />
         <input id="hdfPatronID" type="hidden" />
         <input id="hdfPatronImageID" type="hidden" value="" />
         <input id="hdfPatronImageURL" type="hidden" />
    </div>

</asp:Content>
