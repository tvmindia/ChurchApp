<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="FamilyUnit.aspx.cs" Inherits="ChurchApp.AdminPanel.FamilyUnit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
     <link href="../CSS/CustomCSS/Families.css?version=2" rel="stylesheet" />
     <script src="../Scripts/CustomJS/Common.js?version=2"></script>
    <script src="../Scripts/CustomJS/FamilyUnit.js?version=2"></script>
     <div id="content" class="span10">
        <ul class="breadcrumb" id="breadcrumbFamily" style="margin-bottom:0px">
			 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li class="faUnits">Family Units</li>
			</ul>
          <div class="buttonpatch" style="position:fixed;width:291px;right:0;top:8%;z-index:198">		
			<a class="rss" id="btnBack"><img src="/img/back.png"/></a>
            <a class="facebook" id="btnAddNew"><img  src="/img/add.PNG"/></a>
            <a class="rss" id="btnEdit"><img src="/img/edit.png"/></a>
            <a class="twitter" id="btnMain"><img src="/img/save.png"/></a>
            <a class="dribble" id="btnReset"><img src="/img/reset.png"/></a>
			<a class="rss" id="btnDelete"><img src="/img/delete.png"/></a>
        </div>
         <div class="row-fluid" style="margin-top:3%">
             <div class="span6">
					<div>
                         <div id="divFamilyUnitsGrid">
                              <div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;">
						<h2 id="unitHeader"></h2>
                      
						<%--<a class="btnNew" id="btnAddNew" runat="server"  title="ADD NEW FAMILY MEMBER" onclick="AddFamilyMember();" ><i>+</i></a>
                         <a class="btnNew" id="btnfamilyAdd" runat="server"  title="ADD NEW FAMILY" onclick="AddFamily();"><i>+</i></a>--%>
                         <%--<a class="btnNew" id="btnAddNew" runat="server" title="ADD NEW FAMILY UNIT" onclick="AddFamilyUnit();"><i>+</i></a>--%>
							
						</div>
                            
					<div id="FamilyUnitsTableBox">	
	
					</div>
                              </div>
					</div>
				</div>
               <%-- Show details portion for institution --%>	
		
           
             <!---------------------  Add New Family and Edit details ----------------------------->
                <div id="FamilyAdd" style="display:none; margin-top:1% ;" class="span6">
                   
					<div class="dark">
                       
                           
					<div class="form-horizontal">
				    <fieldset>
                           
                         <div class="span12" id="familyMembersPhotoDiv"  style="margin-top:10px!important;display:none;">  
                          
                             </div>
                       
                        <div class=" span12" id="familyAddDiv"  style="margin-top:10px!important;display:none;">  
                               <div class="box-header" data-original-title="" style="width:88%">
						<h2 id="Header">Family Member</h2>
                                      
					    </div>
                             
                               <div class="control-group" id="firstNameDiv" style="margin-top:2%">
								<label class="control-label" for="focusedInput"><span id="familyHeadFirst" style="display:none;">Family Head </span>First Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtFirstName" onkeypress="return isnotNumber(event);" type="text"/>
                                </div>
								</div>
                               <div class="control-group" id="lastNameDiv">
								<label class="control-label" for="focusedInput"><span id="familyHeadLast" style="display:none;">Family Head </span>Last Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtLastName" onkeypress="return isnotNumber(event);" type="text"/>
                                </div>
								</div>
                               <div class="control-group" id="familyNameDiv">
								<label class="control-label" for="focusedInput">Family Name:</label>
								<div class="controls">
								  <input type="text" class="input-large focused" id="txtFamilyName" onkeypress="return isnotNumber(event);"/>
                                </div>
								</div>
                        
                               <div class="control-group" id="unitNameDiv">
								<label class="control-label" for="focusedInput">Unit Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtUnitName" type="text"/>
                                    <label class="control-label" id="lblUnitName" for="focusedInput"  style="display:none;"></label>
                                </div>
								</div>
                                <div class="control-group" id="unitCountDiv">
								<label class="control-label" for="focusedInput">Family Number:</label>
								<div class="controls">
                                    <label class="control-label" id="lblmemCount" for="focusedInput"  style="display:none;"></label>
                                </div>
								</div>
                               <div class="control-group" id="phoneDiv">
								<label class="control-label" for="focusedInput">Phone</label>
								<div class="controls">
								  <input class="input-large focused" name="phone1" id="txtPhone" onkeypress="return isMobileNumber(event);" type="text" value=""/>
								</div>
								</div>
                               <div class="control-group" id="addressDiv">
								<label class="control-label" for="focusedInput">Address:</label>
								<div class="controls">
								  <textarea class="input-large" id="txtAddress" rows="3" placeholder=""></textarea>
                                </div>
								</div>                       
                               <div class="control-group" id="isHeadDiv">
								<label class="control-label" for="focusedInput">IsHead:</label>
								<div class="controls">
                                   
                                       <input type="checkbox" id="chkIsHead" value="" onclick="return HeadCheked();"/>
                                </div>
								</div> 
                                <div class="control-group" id="memberImgDiv">
                       <img id="MemberImg" src="../img/gallery/Noimage.png" class="img-rounded"/>
                       <input class="" id="mfluImage" type="file" accept="image/*" onchange="OnUpload(this);showpreviewMember(this);" />
                          <%-- <output id="AdminPreview"></output>--%>
                       </div>
                        </div>
						<input type="hidden" id="hdnInstutID" />
							
						  </fieldset>
					</div>	
                        <h2 id="executivesHeader" style="margin-top:7% !important;margin-left: 2%;">Unit Executives</h2> 
                         <div id="divAdminDetals" class="span12" >
                            
                          </div>
                           <div id="divAdminInfo" class="span12">
                               <div class="w3-note w3-panel" id="tipDiv" style="display:none;">
                                <p><strong>Tip:</strong> If you are trying for Adding Executives Please try after adding Families and Members.</p>
                             </div>
                            <ul class="thumbnails span4">
                            <li class="span12" style="position: relative;height:229px;">
                               <a class="btnNew" id="btnAdminAdd" style="position:relative!important;z-index:50;padding:50px 44px 35px 44px !important;top:100px!important;left: 15%!important;color:black!important;background:white!important;" title="Add Administrators" data-toggle="modal" data-target="#modelAddAdmin" onclick="OpenAdminModal()"><i style="font-size:48px;">+</i></a>
                               <div class="thumbnail" style="position:relative!important;top: -33px;opacity:0.7;">
                               <img class="img-rounded" style="max-height:179px;min-height:179px;" src="../img/gallery/Noimage.png" alt=""/>
                                <address>
                                    <br/>
                                    <strong><br/>No Records Found<br/></strong>
                                    <br/>
                                </address>                
                              </div>
                            </li>
                            </ul>
                            <div id="EditdivAppend">

                            </div>
                           </div>
                              		
				</div>				
				</div>	
             </div>
    </div>
     <%-- Modal Insert Administration Faculties --%>
     <div class="modal hide fade" id="modelAddAdmin">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" onclick="clearAdminControls();">×</button>
			<h3><span id="AddOrEditAdmin">Add</span> Administrator</h3>
		  </div>
		  <div class="modal-body">
            <div class="form-horizontal">
				    <fieldset>
                       <div class="span12"> 
                       <div class="control-group">
                       <img id="AdminImg" style="max-width:150px;min-height:150px;" src="../img/gallery/Noimage.png" class="img-rounded"/>
                       <input class="" id="fluImage" type="file" accept="image/*" onchange="OnUpload(this);showpreviewAdmin(this);" />
                          <%-- <output id="AdminPreview"></output>--%>
                       </div>
                      <div class="control-group">
                      <label class="control-label" for="inputIcon">Designation</label>
					  <div class="input-prepend span6">
                       <span class="add-on"><i class="icon-briefcase"></i></span>
                       <select class="span12" id="ddlRole">
                           <option value="-1" selected disabled">Select Position</option>
                       </select>
                       </div>
					  </div> 
                      <div class="control-group">
                      <label class="control-label" for="inputIcon">Name</label>
					  <div class="input-prepend span6">
                       <span class="add-on"><i class="icon-user"></i></span>
                      <select class="span12" id="ddlMember" onchange="AdminMemberChange();">
                           <option value="-1" selected disabled">Select Member</option>
                       </select>
                       </div>
					  </div>     
                        <div class="control-group">
                            <label class="control-label" for="inputIcon">Phone</label>
					  <div class="input-prepend span6">
                       <span class="add-on"><i class="fa fa-phone"></i></span>
                       <input class="span12" onkeypress="return isMobileNumber(event);" id="txtMobile" type="text"/>
                       </div>
					  </div> 
                      <input id="hdnInstituteID" type="hidden" />
                           <input id="hdnAdminID" type="hidden" />
                          
					  </div> 
                    </fieldset>
                
					</div>

		</div>
		  <div class="modal-footer">
               <div class="buttonpatch" style="position:relative;float:right;z-index:196;">	<%--position:fixed;width:243px;right:0;top:8%;z-index:198  --%>	
			          
                       <a class="facebook" id="btnAddAdmin" title="Save"><img src="/img/save.png" style="left:-6px;"/></a>
                       <a class="facebook modelClear" data-dismiss="modal" title="Close" onclick="clearAdminControls();"><img src="/img/closemodel.png" style="left:-6px;"/></a>
			           </div>
              <%--<a id="btnAddAdmin" class="btn btn-primary SaveAdmin">Save</a>
			<a class="btn btn-primary" data-dismiss="modal" onclick="clearAdminControls();">Close</a>--%>
			
		</div>
	      </div>
    <input type="hidden" value="" id="hdfUnitName" />
    <input type="hidden" value="" id="hdfUnitID" />
    <input type="hidden" value="" id="hdfExecutivesLength" />
    <input type="hidden" value="" id="hdfFamilyAddress" />
    <input type="hidden" value="" id="hdfFamilyName" />
    <input type="hidden" value="" id="hdfFamilyID" />
    <input type="hidden" value="" id="hdfMemberID" />
       <input type="hidden" value="" id="hdfAdminID" />
    <input type="hidden" value="" id="hdfPhone" />
    <input type="hidden" value="" id="hdfAdminStatus" />
    <input type="hidden" value="" id="hdfMemberImgID" />
    <input type="hidden" value="" id="hdfAdminImageID" />
    <input type="hidden" value="" id="hdfAdminDefaultImg" />
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
</asp:Content>
