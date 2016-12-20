<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Families.aspx.cs" Inherits="ChurchApp.AdminPanel.Families" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Families.css" rel="stylesheet" />
     <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Families.js"></script>
     <div id="content" class="span10">
        <ul class="breadcrumb" id="breadcrumbFamily" style="margin-bottom:0px">
			 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li class="faUnits">Families</li>
			</ul>
         <div class="row-fluid">
             <div class="span6">
					<div>
                         <div id="divFamilyUnitsGrid">
                              <div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;">
						<h2 id="unitHeader"></h2>
                      
						<%--<a class="btnNew" id="btnAddNew" runat="server"  title="ADD NEW FAMILY MEMBER" onclick="AddFamilyMember();" ><i>+</i></a>
                         <a class="btnNew" id="btnfamilyAdd" runat="server"  title="ADD NEW FAMILY" onclick="AddFamily();"><i>+</i></a>--%>
                         <a class="btnNew" id="btnAddNew" runat="server" title="ADD NEW FAMILY UNIT" onclick="AddFamilyUnit();"><i>+</i></a>
							
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
                         	<%--<div id="executivesHeader">--%>
						<h2 id="executivesHeader" style="margin-top:1% !important;">Unit Executives</h2> 
						<%--<div class="box-icon">--%>
						<a class="btnEdit" id="AdminEdit" title="EDIT UNIT EXECUTIVES" style="display:none;right:40px;top:13px;position: absolute;" onclick="EditFamily(this)"><i class="halflings-icon white pencil FamiliesEdit" id="iconEdit" aria-hidden="true"></i></a>
							
						<%--</div>--%>
				<%--	</div>	--%>
                       
                           
					<div class="form-horizontal">
				    <fieldset>
                            <div id="divAdminDetals" class="span12" style="min-height:50px !important;max-height:1500px !important;opacity:1!important;margin-top:5%;">
                           
                            </div>
                        <%-- Div General information --%>
                           <div id="divAdminInfo" style="display:none;" class="span12">
                         <%-----Default card with button for Adding new administrator -----%>
                            <ul class="thumbnails span4">
                            <li class="span12" id="noRecordLi" style="position: relative;height:229px;">
                               <a class="btnNew" id="AdminBtnNew" style="position:relative!important;z-index:50;padding:25px 20px 10px !important;top:30px!important;left: 20%!important;color:black!important;background:white!important;" title="ADD" data-toggle="modal" data-target="#modelAddAdmin"><i style="font-size:48px;">+</i></a>
                               <div class="thumbnail" id="noRecordThumbnail" style="position:relative!important;top: -55px;opacity:0.7;">
                               <img class="img-rounded" style="height:159px" src="../img/gallery/Noimage.png"  alt=""/>
                                <address>
                                    <br/>
                                    <strong><br/>No Records Found</strong>
                                    <br/>
                                </address>                
                              </div>
                                <br />
                            </li>
                            </ul>
                            <%-- End Default card add new --%>
                        </div>
                              
                         <div class="span12" id="familyMembersPhotoDiv"  style="margin-top:10px!important;display:none;">  
                          
                             </div>
                       
                        <div class=" span12" id="familyAddDiv"  style="margin-top:10px!important;display:none;">  
                               <div class="box-header" data-original-title="">
						<h2 id="FamilyHeader"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span><span id="memberAddOrEdit"></span> Family Member</h2>
                        <h2 id="AddFamilyHeader"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span><span id="familyAddOrEdit"></span> Family </h2>
						<h2 id="AddFamilyUnitHeader"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span><span id="familyUnitAddOrEdit"></span> Family Unit </h2>
                                      
					    </div>
                             <div class="alert alert-error" id="ErrorBox" style="display: none;">
                             <div id="Displaydiv">
                             </div>
                            </div>
                               <div class="control-group" id="firstNameDiv" style="margin-top:2%">
								<label class="control-label" for="focusedInput"><span id="familyHeadFirst" style="display:none;">Family Head </span>First Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtFirstName" type="text"/>
                                </div>
								</div>
                               <div class="control-group" id="lastNameDiv">
								<label class="control-label" for="focusedInput"><span id="familyHeadLast" style="display:none;">Family Head </span>Last Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtLastName" type="text"/>
                                </div>
								</div>
                               <div class="control-group" id="familyNameDiv">
								<label class="control-label" for="focusedInput">Family Name:</label>
								<div class="controls">
								  <input type="text" class="input-large focused" id="txtFamilyName" disabled="disabled"/>
                                </div>
								</div>
                        
                               <div class="control-group" id="unitNameDiv">
								<label class="control-label" for="focusedInput">Unit Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtUnitName" disabled="disabled" type="text"/>
                                </div>
								</div>
                               <div class="control-group" id="phoneDiv">
								<label class="control-label" for="focusedInput">Phone</label>
								<div class="controls">
								  <input class="input-large focused" name="phone1" id="txtPhone" onkeypress="return isNumber(event);" type="text" value=""/>
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
                                   
                                       <input type="checkbox" id="chkIsHead" value=""/>
                                </div>
								</div> 
                                <div class="control-group" id="memberImgDiv">
                       <img id="MemberImg" src="../img/gallery/priest.png" class="img-rounded"/>
                       <input class="" id="mfluImage" type="file" accept="image/*" onchange="OnUpload(this);showpreviewMember(this);" />
                          <%-- <output id="AdminPreview"></output>--%>
                       </div>
                        </div>
                
                        <%-- End general information --%>
                 
                        <%-- Div for Administrator information --%>
                     
                        <%-- End div Administrator information --%>
						<input type="hidden" id="hdnInstutID" />
							<div class="form-actions span12" id="btnDiv">
							  <a class="btn btn-primary Save" name="" id="btnSavePriest">Save</a>
                                <a id="btnCancelPriest" class="btn btn-primary Cancel">Cancel</a>
                                <a class="btn btn-primary Delete" name="" id="btnDelete">Delete</a>
							  
							</div>
                            <div class="form-actions span12" id="btnFamilyDiv">
							  <a class="btn btn-primary SaveFamily" name="" >Save</a>
                                <a class="btn btn-primary CancelFamily">Cancel</a>
                                <a class="btn btn-primary DeleteFamily" name="">Delete</a>
							  
							</div>
                            <div class="form-actions span12" id="btnFamilyUnitDiv">
							  <a class="btn btn-primary SaveUnit" name="" >Save</a>
                                <a class="btn btn-primary CancelUnit">Cancel</a>
                                <a class="btn btn-primary DeleteUnit" name="">Delete</a>
							  
							</div>
						  </fieldset>
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
                       <img id="AdminImg" src="../img/gallery/priest.png" class="img-rounded"/>
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
                       <input class="span12" id="txtMobile" type="text"/>
                       </div>
					  </div> 
                      <input id="hdnInstituteID" type="hidden" />
                           <input id="hdnAdminID" type="hidden" />
                          
					  </div> 
                    </fieldset>
                
					</div>

		</div>
		  <div class="modal-footer">
			<a class="btn" data-dismiss="modal" onclick="clearAdminControls();">Close</a>
			<a id="btnAddAdmin" class="btn btn-primary SaveAdmin">Save changes</a>
		</div>
	      </div>
    <input type="hidden" value="" id="hdfUnitName" />
    <input type="hidden" value="" id="hdfUnitID" />
    <input type="hidden" value="" id="hdfExecutivesLength" />
    <input type="hidden" value="" id="hdfFamilyName" />
    <input type="hidden" value="" id="hdfFamilyID" />
    <input type="hidden" value="" id="hdfMemberID" />
       <input type="hidden" value="" id="hdfAdminID" />
    <input type="hidden" value="" id="hdfPhone" />
    <input type="hidden" value="" id="hdfAdminStatus" />
</asp:Content>
