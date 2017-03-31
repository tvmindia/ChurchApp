<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="PiousOrganizations.aspx.cs" Inherits="ChurchApp.AdminPanel.PiousOrganizations" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/PiousOrg.css?version=1" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js?version=1"></script>
    <script src="../Scripts/CustomJS/PiousOrganizations.js?version=1"></script>
     <div id="content" class="span10">
        <ul class="breadcrumb" style="margin-bottom:0px">
				<li> 
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Pious Organizations</li>
			</ul>
          <div class="buttonpatch" style="position:fixed;width:243px;right:0;top:8%;z-index:198">		
			<a class="facebook" title="Add New" id="btnAddNew" onclick="NewInstitute();"><img  src="/img/add.PNG"/></a>
              <a class="rss" id="iconEditInstitute"><img src="/img/edit.png"/></a>
            <a class="twitter" id="btnMain"><img src="/img/save.png"/></a>
            <a class="dribble" id="btnReset"><img src="/img/reset.png"/></a>
			<a class="rss" id="btnDeleteInstitute"><img src="/img/delete.png"/></a>
            
        </div>
               <div class="row-fluid" style="margin-top:3%">
              <%-- <a class="btnNew AddNew" id="btnAddNew" runat="server" style="left:93%!important;top:-14px;" title="ADD NEW" onclick="NewInstitute();"><i class="material-icons">+</i></a> --%>
               <div class="span6">
                   <h2>Pious Organizations</h2>
                   <div class="" style="border-bottom: 1.5px solid #FA603D;line-height: 0px;"></div>
			   
            <div id="Institutediv" style="margin-top:6%">
            <div id="InstituteDefault">
				<ul class="media-list" style="border-bottom:1px solid #cfcece">
                <li class="media">
               <a class="pull-left"><img class="media-object" src="../img/gallery/Pious.jpg" style="max-height:80px;"/></a>
                <div class="media-body">
                <h4 class="media-heading">No Record Found<span> </span><span class="fa fa-flag"></span></h4>
                 <br />
                    <br />
      <!-- Nested media object -->
      <div class="media">
          <a style="visibility:hidden">View more</a>
     </div>
    </div>
  </li>
</ul>
				
                </div>
                    
                        </div>
				
               </div>
			  <%-- Show details portion for institution --%>	
				<div id="InstituteShow" style="display:none;" class="span6 noMarginLeft">
				<div class="dark">
				<h1>Details</h1>
				<div class="box-content">
				<div class="form-horizontal">
				    <fieldset>
                    <%--<a class="btnEdit" style="right:40px;top:-41px;position: absolute;" title="EDIT" id="iconEditInstitute" onclick="EditInstitute(this);"><i class="halflings-icon white pencil" aria-hidden="true" ></i></a>--%>
                         <div class="control-group span12" style="margin-top:20px;width:100%!important">
							  <img class="priestimage" id="instituteDetailPreview" src="../img/gallery/Pious.jpg"/>
							</div> 
                        <div class="control-group span12" >
						<label class="labelName" for="focusedInput" id="lblInstituteName"></label>
					    </div>
                        <%-- Accordion Show details general information --%>
                         <div class="control-group accordion span12" id="divGendetailsacc" style="background-color:#FFEFEC;margin-bottom:0px!important;">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:inherit"> General Information</span>
                        </div>
                        <%-- Div general information details --%>
                         <div id="divGenDetals" class="panel span12">
                       <address>
                           <strong>Patron</strong><br />
                           <p><label id="lblPatronDisplay"></label> </p>
                       </address>
                       <address>
                           <strong>History</strong><br />
                           <p><label id="lblHistory"></label></p>
                       </address>
                             </div>
                        <%-- Accordion details admonostration information --%>
                         <div class="control-group accordion span12" style="background-color:#FFEFEC;margin-bottom:0px!important;">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:inherit"> Administration Information</span>
                        </div>
                        <%-- Div administration information details --%>
                         <div id="divAdminDetals" class="panel span12">
                             <div id="AdminCards">
                                  <ul class="thumbnails">
                            <li class="span4">
                              
                               <div class="thumbnail" style="opacity:0.7;">
                               <img src="../img/gallery/priest.png" alt=""/>
                                <address>
                                    <br/>
                                    <strong><br/><br/>No Records Found</strong>
                                    <br/>
                                </address>                
                              </div>
                            </li>
                            </ul>
                             </div>
                            
                     
                            </div>
                        </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
              <!---------------------  Add New Priest and Edit details ----------------------------->
                <div id="InstituteEdit" style="display:none;" class="span6 noMarginLeft">
					<div class="dark">
					<h1 id="HeadDetails">Add Details</h1>
					<div class="box-content">
					<div class="form-horizontal">
				    <fieldset>
                        <%--<a class="btnEdit" id="iconDisInstitute" style="right:40px;top:-41px;position: absolute;" title="EDIT" name="Edit" onclick="Cancel(this);"><i class="halflings-icon white refresh" aria-hidden="true" ></i></a>--%>
                    
                        <div class="control-group span12">
					    <img class="priestimage span4" id="priestPreview" src="../img/gallery/Pious.jpg"/>
                            <strong class="span6"><br /><br /><br /><h2 id="lblPatron"></h2></strong>
                         <%--<input type="file" value="Choose Image" id="instituteimg" accept="image/*" style="position: absolute;top: 10%;left: 7%;cursor:pointer;background-color: lightsteelblue;color: white;" onchange="OnUpload(this);showpreview(this);" />--%>
							</div>
                        <%-- Accordion general information --%>        
                        <div class="control-group accordion span12" id="EditGenDetails" style="background-color:#FFEFEC;margin-bottom:0px!important;">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:inherit;"> General Information</span>
                        </div>
                        <%-- Accordion end  --%>
                        <%-- Div General information --%>
                        <div class="panel span12" id="EditGen" style="margin-top:10px!important;">
                            
                            <div class="control-group">
								<label class="control-label" for="focusedInput">Patron:</label>
								<div class="controls">
								  <input class="input-large focused" name="Patron" id="txtPatron" data-placement="top" data-toggle="popover" data-trigger="focus" data-content="Select patron with keystroks contact admin if patron not in the list" type="text" placeholder="Search Patron"/>
                                </div>
								</div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtInstituteName" type="text"/>
                                </div>
								</div>
                         
                     
                        

                         <div class="control-group">
								<label class="control-label" for="focusedInput">History</label>
								<div class="controls">
								<textarea class="input-xlarge" id="txtHistory" name="history" rows="6" placeholder=""></textarea>
								</div>
								</div>

                        
                        </div>
                        <%-- End general information --%>
                        <%-- Accordion div for Administrator information --%>
                        <div class="control-group accordion span12" style="background-color:#FFEFEC;margin-bottom:0px!important;" id="divAccoAdmininfo">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:inherit;">Administration Information</span>
                        </div>
                        <%-- End Accordion --%>
                        <%-- Div for Administrator information --%>
                        <div id="divAdminInfo" class="panel span12" style="margin-top:10px!important;">
                         <%-----Default card with button for Adding new administrator -----%>
                            <ul class="thumbnails span4">
                            <li class="span12" style="position: relative;height:229px;">
                               <a class="btnNew" style="position:relative!important;z-index:50;padding:50px 44px 35px 44px !important;top:100px!important;left: 10%!important;color:black!important;background:white!important;" title="ADD" onclick="OpenAdminModal()"><i style="font-size:48px;">+</i></a>
                               <div class="thumbnail" style="position:relative!important;top: -33px;opacity:0.7;">
                               <img class="img-rounded" style="height:179px" src="../img/gallery/Noimage.png" alt=""/>
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
                            <%-- End Default card add new --%>
                        </div>
                        <%-- End div Administrator information --%>
						<input type="hidden" id="hdnInstutID" />
                        <input type="hidden" id="hdnPatron" />
							<%--<div class="form-actions span12">
							  <a class="btn btn-primary saveAll" name="" id="btnSaveInstitute">Save changes</a>
                                <a id="btncancelInstitute" name="" class="btn btn-primary cancelAll" onclick="Cancel(this);">Cancel</a>
                                <a class="btn btn-primary" name="" id="btnDeleteInstitute">Delete</a>
							  
							</div>--%>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
						
			  </div>
         </div>
    
       
              <%-- Modal Insert Administration Faculties --%>
               <div class="modal hide fade" id="modelAddAdmin">
		  <div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>Add New Administrator</h3>
		  </div>
		  <div class="modal-body">
            <div class="form-horizontal">
				    <fieldset>
                       <div class="span12"> 
                       <div class="control-group">
                       <img id="AdminPicPreview" src="../img/gallery/Noimage.png" style="max-height:159px" class="img-rounded"/>
                       <input class="" id="fluImage" type="file" accept="image/*" onchange="OnUpload(this);showpreviewAdmin(this);"/>
                       </div>
                      <div class="control-group">
                      <label class="control-label" for="inputIcon">Designation</label>
					  <div class="input-prepend span6">
                       <span class="add-on"><i class="icon-briefcase"></i></span>
                       <select class="span12" name="role" id="ddlRole">
                           <option value="-1" selected disabled">Select Position</option>
                       </select>
                       </div>
					  </div> 
                      <div class="control-group">
                      <label class="control-label" for="inputIcon">Name</label>
					  <div class="input-prepend span6">
                       <span class="add-on"><i class="icon-user"></i></span>
                       <%--<input class="span12" name="name" placeholder="search & select" id="txtName" type="text"/>--%>
                       <select class="span12" id="ddlMember" onchange="AdminMemberChange();">
                           <option value="-1" selected disabled">Select Member</option>
                       </select>
                       </div>
					  </div>     
                        <div class="control-group">
                            <label class="control-label" for="inputIcon">Mobile</label>
					  <div class="input-prepend span6">
                       <span class="add-on"><i class="icon-book"></i></span>
                       <input class="span12" onkeypress="return isNumber(event);" name="mobile" id="txtMobile" type="text"/>
                       </div>
					  </div> 
                           
                      <input id="hdnInstituteID" type="hidden" />
                           <input id="hdnAdminID" type="hidden" />
                           <input id="hdnmemID" type="hidden" />
                           <input id="hdnmemName" type="hidden" />
                           <input id="hdfAdminImageID" type="hidden" />
                          
					  </div> 
                    </fieldset>
                
					</div>

		</div>
		  <div class="modal-footer">
			 <div class="buttonpatch" style="position:relative;float:right;z-index:196;">	<%--position:fixed;width:243px;right:0;top:8%;z-index:198  --%>	
			          
                       <a class="facebook" id="btnAddAdmin" title="Save"><img src="/img/save.png" style="left:-6px;"/></a>
                       <a class="facebook modelClear" data-dismiss="modal" title="Close"><img src="/img/closemodel.png" style="left:-6px;"/></a>
			           </div>
			<%--<a id="btnAddAdmin" name="" class="btn btn-primary">Save</a>
              <a class="btn btn-primary" data-dismiss="modal">Close</a>--%>
		</div>
	      </div>
    <script>
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            }
        }
    </script>








</asp:Content>
