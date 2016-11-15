<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Families.aspx.cs" Inherits="ChurchApp.AdminPanel.Families" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Families.css" rel="stylesheet" />
     <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Families.js"></script>
     <div id="content" class="span10">
        <ul class="breadcrumb">
			 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Families</li>
			</ul>
         <div class="row-fluid">
             <div class="box span6">
					<div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Family Units</h2>
                        <a class="btnNew" title="ADD NEW" onclick="AddFamilyUnit();"><i>+</i></a>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content" id="FamilyUnitsTableBox">
				

	
	<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">


	</div><!-- panel-group -->
	
	


					</div>
				</div>
   <%-- <div class="span6">
  <div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Family Units</h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
     <div class="accordion" id="accordion2">
<div class="accordion-group">
<div class="accordion-heading">
   
<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">Unit #1</a>
     <a href="#" class="unitViewDetails">View Details</a>
       
    </div>
    <div id="collapseOne" class="accordion-body collapse in">
      <div class="accordion-inner">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
      <div class="accordion-inner">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
       <div class="accordion-inner">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
    
    </div>
  </div>
  <div class="accordion-group">
    <div class="accordion-heading">
      <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">Unit #2</a>
         <a href="#" class="unitViewDetails">View Details</a>
    </div>
    <div id="collapseTwo" class="accordion-body collapse">
       <div class="accordion-inner">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
    </div>
  </div>
</div>
  
</div><!--span6-->--%>

               <%-- Show details portion for institution --%>	
				<div id="InstituteShow" class="span6 noMarginLeft" style="display:none">
				<div class="dark">
				<div class="box-header" data-original-title>
						<h2 id="unitHeading"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span></h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
				<div class="box-content">
				<div class="form-horizontal">
				    
                  
                        <%-- Div administration information details --%>
                         <div id="divAdminDetals" class="panel span12">
                            <%--<ul class="thumbnails">
                            <li class="span4">
                            <div class="thumbnail">
                            <img src="../img/gallery/priest.png" alt="">
                            <address>
                            <strong>
                            Dr.paul
                            </strong>
                            <p>Manger<br />676756756</p>
                            </address>
                            </div>
                            </li>
                            <li class="span4">
                            <div class="thumbnail">
                            <img src="../img/gallery/priest.png" alt="">
                            <address>
                            <strong>
                            Dr.paul
                            </strong>
                            <p>Manger<br />676756756</p>
                            </address>
                            </div>
                            </li>
                            <li class="span4">
                            <div class="thumbnail">
                            <img src="../img/gallery/priest.png" alt="">
                            <address>
                            <strong>
                            Dr.paul
                            </strong>
                           <p>Manger<br />676756756</p>
                           </address>
                           </div>
                                </li>
                           </ul>--%>
                         <%--  <ul class="thumbnails">
                          <li class="span4">
                          <div class="thumbnail">
                          <img src="../img/gallery/priest.png" alt="">
                          <address>
                          <strong>
                        Dr.paul
                          </strong>
                         <p>Manger<br />676756756</p>

                          </address>
                          </div>
                          </li>
                          <li class="span4">
                          <div class="thumbnail">
                         <img src="../img/gallery/priest.png" alt="">
                         <address>
                         <strong>
                        Dr.paul
                         </strong>
                         <p>Manger<br />676756756</p>

                         </address>
                         </div>
                         </li>
                        <li class="span4">
                        <div class="thumbnail">
                        <img src="../img/gallery/priest.png" alt="">
                        <address>
                        <strong>
                        Dr.paul
                        </strong>
                        <p>Manger<br />676756756</p>

                       </address>
                       </div>
                            </li>
 
                       </ul>--%>
                     
                            </div>
                      
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
                         <input type="file" value="Choose Image" id="priestimg" style="position: absolute;top: 10%;left: 7%;cursor:pointer;background-color: lightsteelblue;color: white;" onchange="showpreview(this);" />
							</div>
                        <%-- Accordion general information --%>        
                        <div class="control-group accordion span12" style="background-color:#FFEFEC;margin-bottom:0px!important;">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:'Adobe Caslon Pro';"> General Information</span>
                        </div>
                        <%-- Accordion end  --%>
                        <%-- Div General information --%>
                        <div class="panel span12" style="margin-top:10px!important;">  
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtInstituteName" type="text"/>
                                </div>
								</div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Address:</label>
								<div class="controls">
								  <textarea class="input-xlarge" id="txtAddress" name="AboutPriest" rows="3" placeholder=""></textarea>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Founder:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtFounder" type="text"/>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Founded:</label>
								<div class="controls">
								  <input type="text" class="input-xlarge datepicker" id="txtFounded"/>
                                </div>
								</div>
                        

                         <div class="control-group">
								<label class="control-label" for="focusedInput">History</label>
								<div class="controls">
								<textarea class="input-xlarge" id="txtHistory" name="" rows="6" placeholder=""></textarea>
								</div>
								</div>

                         
                       
						 <%-- <div class="control-group">
								<label class="control-label" for="focusedInput">Location:</label>
								<div class="controls">
								  <input class="input-large focused" name="" id="txtLocation" type="text" value=""/>
								</div>
								</div>--%>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused" name="Email" id="txtEmail" type="text" value=""/>
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
								  <input class="input-large focused" name="phone1" id="txtPhone1" type="text" value=""/>
								</div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Phone2</label>
								<div class="controls">
								  <input class="input-large focused" name="phone2" id="txtPhone2" type="text" value=""/>
								</div>
								</div>
                            <div class="control-group">
								<label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" name="mobile" id="txtMob" type="text" value=""/>
								</div>
								</div>
                        
                        </div>
                        <%-- End general information --%>
                        <%-- Accordion div for Administrator information --%>
                        <div class="control-group accordion span12" style="background-color:#FFEFEC;margin-bottom:0px!important;">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:'Adobe Caslon Pro';">Administration Information</span>
                        </div>
                        <%-- End Accordion --%>
                        <%-- Div for Administrator information --%>
                        <div id="divAdminInfo" class="panel span12" style="margin-top:10px!important;">
                         <%-----Default card with button for Adding new administrator -----%>
                            <ul class="thumbnails">
                            <li class="span4" style="position: relative;height:229px;">
                               <a class="btnNew" style="position:relative!important;z-index:50;padding:50px 44px 35px 44px !important;top:100px!important;left: 10%!important;" title="ADD" data-toggle="modal" data-target="#modelAddAdmin"><i style="font-size:48px;">+</i></a>
                               <div class="thumbnail" style="position:relative!important;top: -33px;opacity:0.7;">
                               <img src="../img/gallery/priest.png" alt=""/>
                                <address>
                                    <br/>
                                    <strong><br/><br/>No Records Found</strong>
                                    <br/>
                                </address>                
                              </div>
                            </li>
                            </ul>
                            <%-- End Default card add new --%>
                        </div>
                        <%-- End div Administrator information --%>
						<input type="hidden" id="hdnInstutID" />
							<div class="form-actions span12">
							  <a class="btn btn-primary" name="" id="btnSavePriest">Save changes</a>
                                <a id="btnCancelPriest" class="btn btn-primary">Cancel</a>
                                <a class="btn btn-primary" name="" id="btnDelete">Delete</a>
							  
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
						
	<div id="FamilyEditDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Edit</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        
					

							<div class="control-group">
							  <label class="control-label" for="focusedInput">Family Name</label>
							  <div class="controls">
								<input class="input-large focused" id="txtFamilyName" type="text"/>
							  </div>
							</div>          
               						
							<div class="form-actions">
							  <button type="submit" class="btn btn-primary">Save changes</button>
							  <button type="reset" class="btn btn-primary">Cancel</button>
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	

    <div id="UnitEditDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Edit</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        
					

							<div class="control-group">
							  <label class="control-label" for="focusedInput">Unit Name</label>
							  <div class="controls">
								<input class="input-large focused" id="txtUnitName" type="text"/>
							  </div>
							</div>          
               						
							<div class="form-actions">
							  <button type="submit" class="btn btn-primary">Save changes</button>
							  <button type="reset" class="btn btn-primary">Cancel</button>
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	


    <div id="FamilyViewDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Details</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        <div class="Familyeditdiv">
                        <a href="#"><i class="fa fa-pencil familyEdit" aria-hidden="true"></i></a>
					    </div>
					

							<div class="control-group">
							  <label class="control-label" for="focusedInput">Family Name</label>
							  <div class="controls">
							  <label class="control-label" for="focusedInput">Family Name</label>
							  </div>
							</div>          
               						
							<div class="form-actions">
							  <button type="submit" class="btn btn-primary">Save changes</button>
							  <button type="reset" class="btn btn-primary">Cancel</button>
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	

     <div id="UnitViewDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Details</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        <div class="Uniteditdiv">
                        <a href="#"><i class="fa fa-pencil unitEdit" aria-hidden="true"></i></a>
					    </div>
					

							<div class="control-group">
							  <label class="control-label" for="focusedInput">Unit Name</label>
							  <div class="controls">
							  <label class="control-label" for="focusedInput">St.Ignatious Unit</label>
							  </div>
							</div>          
               						
							<div class="form-actions">
							  <button type="submit" class="btn btn-primary">Save changes</button>
							  <button type="reset" class="btn btn-primary">Cancel</button>
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
             </div>

    </div>
    <input type="hidden" value="" id="hdfUnitName" />
</asp:Content>
