<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Institutions.aspx.cs" Inherits="ChurchApp.AdminPanel.Institutions" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Institution.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Institution.js"></script>
    <style>
    </style>
     <div id="content" class="span10">
        <ul class="breadcrumb" style="margin-bottom:0px">
				 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Institutions</li>
			</ul>
              <%--Alert boxes --%>
               <div id="rowfluidDiv" style="display:none;">	
				       <div class="alert alert-error" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Successfull.</strong> 
						</div>
						<div class="alert alert-info" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
						</div>
						<div class="alert alert-block" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<h4 class="alert-heading">Warning!</h4>
							<p>Best check yourself, you're not looking too good.</p>
						</div>
					

              
            </div>
			  <%--Alert boxes --%>
               <div class="row-fluid">
              <%-- Div Institution list --%>
                <div class="span6">
			   <h1>Institutions</h1>
               <div class="priority high"><span style="visibility:hidden">Institutions</span><a class="btnNew" style="left:75%!important;" title="ADD NEW" onclick="NewInstitute();"><i class="material-icons">+</i></a></div>
			   <div class="task high">
                    <div id="Institutediv">
            <div id="InstituteDefault">
               <ul class="dashboard-list vicarlist">
				<li >
				<img class="priestimage" src="../img/gallery/Institution.jpg"/>
                    </li>
                 <li >
                     <br />
                     <br />
                     <br />
				<span style="color:#647587!important" class="choosepic"> No record Found</span> <br/>
				  
				</li>
                </ul>
                </div>
                    
                        </div>
				</div>
                </div>
               
			  <%-- Show details portion for institution --%>	
				<div id="InstituteShow" style="margin-top:4%;display:none;" class="span6 noMarginLeft">
				<div class="dark">
				<h1>Details</h1>
				<div class="box-content">
				<div class="form-horizontal">
				    <fieldset>
                    <a class="btnEdit" style="right:40px;top:-41px;position: absolute;" title="EDIT" id="iconEditInstitute" onclick="EditInstitute(this);"><i class="halflings-icon white pencil" aria-hidden="true" ></i></a>
                         <div class="control-group span12" style="margin-top:20px;width:100%!important">
							  <img class="priestimage" id="instituteDetailPreview" src="../img/gallery/Institution.jpg"/>
							</div> 
                        <div class="control-group span12" >
						<label class="labelName" for="focusedInput" id="lblInstituteName">Amaljyothi Institute of science and technology</label>
					    </div>
                        <%-- Accordion Show details general information --%>
                         <div class="control-group accordion span12" id="divGendetailsacc" style="background-color:#FFEFEC;margin-bottom:0px!important;">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:inherit"> General Information</span>
                        </div>
                        <%-- Div general information details --%>
                         <div id="divGenDetals" class="panel span12">
                       <address>
                           <strong>Address</strong><br />
                           <p><label id="lblAddress">Kottayam Kerala</label> </p>
                       </address>
                       <address>
                           <strong>History</strong><br />
                           <p><label id="lblHistory">suggestion for a separate Provincialate was approved by the Election Chapter of 1975. Though a plot of land adjacentto Nazareth Ashram was bought for the purpose, it was not foundvery convenient. Hence, with the approval of the ExtraordinaryChapter of 1976, another plot in Aluva was bought in 1977. All the arrangements for the purchase of the new plot was made by Br. Ignatius.</label></p>
                       </address>
                       <div>
						<div class="span6">
                            <dl>
                            <dt>Founder</dt>
                            <dd><label id="lblFounder">Bishop Andrews Thazhathu</label></dd>
                                <dt>Founded</dt>
                            <dd><label id="lblFounded">01 Jun 2000</label></dd>
                                <dt>Email</dt>
                            <dd><label id="lblEmail">0001.239.678.567.45</label></dd>
                            </dl>
                            
						</div>	       

                        <div class="span6">
                            <dl>
                            <dt>Phone1</dt>
                            <dd><label id="lblPhone1">04885223516</label></dd>
                                <dt>phone2</dt>
                            <dd><label id="lblPhone2">04885223517</label></dd>
                                <dt>Mobile</dt>
                            <dd><label id="lblMobile">9567677766</label></dd>
                            </dl>
                        </div>
                        </div>
                            <address>
                             <strong style="visibility:hidden;">Website</strong><br/>
                             <a href="#" target="_blank" id="aWebsite">Visit official website</a>
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
                <div id="InstituteEdit" style="display:none;margin-top:4%;" class="span6 noMarginLeft">
					<div class="dark">
					<h1 id="HeadDetails">Add Details</h1>
					<div class="box-content">
					<div class="form-horizontal">
				    <fieldset>
                    <%--<a class="btnEdit" style="right:30px;position: absolute;" onclick="EditInstitute();"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i></a>--%>
                        <div class="control-group span12">
					    <img class="priestimage" id="priestPreview" src="../img/gallery/Institution.jpg"/>
                         <input type="file" value="Choose Image" id="instituteimg" accept="image/*" style="position: absolute;top: 10%;left: 7%;cursor:pointer;background-color: lightsteelblue;color: white;" onchange="OnUpload(this);showpreview(this);" />
							</div>
                        <%-- Accordion general information --%>        
                        <div class="control-group accordion span12" id="EditGenDetails" style="background-color:#FFEFEC;margin-bottom:0px!important;">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:inherit;"> General Information</span>
                        </div>
                        <%-- Accordion end  --%>
                        <%-- Div General information --%>
                        <div class="panel span12" id="EditGen" style="margin-top:10px!important;">
                            <div class="alert alert-error" id="ErrorBox" style="display: none;">
                             <div id="Displaydiv">
                             </div>
                        </div>  
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtInstituteName" type="text"/>
                                </div>
								</div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Address:</label>
								<div class="controls">
								  <textarea class="input-xlarge" id="txtAddress" name="Address" rows="3" placeholder=""></textarea>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Founder:</label>
								<div class="controls">
								  <input class="input-large focused" name="Founder" id="txtFounder" type="text"/>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Founded:</label>
								<div class="controls">
								  <input type="text" class="input-xlarge datepicker" name="Founded" id="txtFounded"/>
                                </div>
								</div>
                        

                         <div class="control-group">
								<label class="control-label" for="focusedInput">History</label>
								<div class="controls">
								<textarea class="input-xlarge" id="txtHistory" name="history" rows="6" placeholder=""></textarea>
								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused e-mail" name="Email" id="txtEmail" type="text" value="" onkeypress="EmailValidation(this);"/>
								</div>
								</div>
                            <div class="control-group">
								<label class="control-label" for="focusedInput">Website</label>
								<div class="controls">
								  <input class="input-large focused" name="website" id="txtWebsite" type="text" value=""/>
								</div>
								</div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Phone1</label>
								<div class="controls">
								  <input class="input-large focused" name="phone1" id="txtPhone1" onkeypress="return isNumber(event);" type="text" value=""/>
								</div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Phone2</label>
								<div class="controls">
								  <input class="input-large focused" name="phone2" id="txtPhone2" onkeypress="return isNumber(event);" type="text" value=""/>
								</div>
								</div>
                            <div class="control-group">
								<label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" name="mobile" id="txtMob" onkeypress="return isNumber(event);" type="text" value=""/>
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
							<div class="form-actions span12">
							  <a class="btn btn-primary" name="" id="btnSaveInstitute">Save changes</a>
                                <a id="btncancelInstitute" name="" class="btn btn-primary" onclick="Cancel(this);">Cancel</a>
                                <a class="btn btn-primary" name="" id="btnDeleteInstitute">Delete</a>
							  
							</div>
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
                       <input class="span12" name="name" id="txtName" type="text"/>
                       </div>
					  </div>     
                        <div class="control-group">
                            <label class="control-label" for="inputIcon">Mobile</label>
					  <div class="input-prepend span6">
                       <span class="add-on"><i class="icon-book"></i></span>
                       <input class="span12" name="mobile" id="txtMobile" type="text"/>
                       </div>
					  </div> 
                           <div class="alert alert-error" id="ErrorBox1" style="display: none;">
                             <div id="Displaydiv1">
                             </div>
                        </div> 
                      <input id="hdnInstituteID" type="hidden" />
                           <input id="hdnAdminID" type="hidden" />
                          
					  </div> 
                    </fieldset>
                
					</div>

		</div>
		  <div class="modal-footer">
			<a class="btn" data-dismiss="modal">Close</a>
			<a id="btnAddAdmin" name="" class="btn btn-primary">Save changes</a>
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
