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
                        <%--<a class="btnNew" title="ADD NEW FAMILY UNIT" onclick="AddFamilyUnit();"><i>+</i></a>--%>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content" id="FamilyUnitsTableBox">	
	<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
	</div><!-- panel-group -->
					</div>
				</div>
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
				    
                   <a class="circlebtn circlebtn-success FamiliesEdit" style="right:1px;position: fixed;display:none;"><i class="halflings-icon white pencil FamiliesEdit" aria-hidden="true"></i></a>
                        <%-- Div administration information details --%>
                         <div id="divAdminDetals" class="panel span12" style="min-height:50px !important;max-height:1500px !important;opacity:1!important;">
                           
                            </div>
                      
					</div>   
					</div>
				
				</div>
				
				</div>	
           
             <!---------------------  Add New Family and Edit details ----------------------------->
                <div id="FamilyAddDiv" style="display:none;margin-top:1%" class="span6 noMarginLeft">
                   
					<div class="dark">	
                         	<div class="box-header" data-original-title>
						<h2 id="AddHeader"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span></h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>			
					<div class="box-content">
					<div class="form-horizontal">
				    <fieldset>
              
                        <%-- Div General information --%>
                        
                        <div class="panel span12" id="familyAddDiv"  style="margin-top:10px!important;">  
                         <div class="control-group" id="firstNameDiv">
								<label class="control-label" for="focusedInput">First Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtFirstName" type="text"/>
                                </div>
								</div>
                              <div class="control-group" id="lastNameDiv">
								<label class="control-label" for="focusedInput">Last Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtLastName" type="text"/>
                                </div>
								</div>
                                 <div class="control-group" id="familyNameDiv">
								<label class="control-label" for="focusedInput">Family Name:</label>
								<div class="controls">
								  <input type="text" class="input-large focused" id="txtFamilyName"/>
                                </div>
								</div>
                        
                                <div class="control-group">
								<label class="control-label" for="focusedInput">Unit Name:</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtUnitName" type="text"/>
                                </div>
								</div>
                             <div class="control-group" id="phoneDiv">
								<label class="control-label" for="focusedInput">Phone</label>
								<div class="controls">
								  <input class="input-large focused" name="phone1" id="txtPhone" type="text" value=""/>
								</div>
								</div>
                         <div class="control-group" id="addressDiv">
								<label class="control-label" for="focusedInput">Address:</label>
								<div class="controls">
								  <textarea class="input-xlarge" id="txtAddress" name="AboutPriest" rows="3" placeholder=""></textarea>
                                </div>
								</div>                       

                        </div>
                
                        <%-- End general information --%>
                 
                        <%-- Div for Administrator information --%>
                        <div id="divAdminInfo" class="panel span12" style="margin-top:10px!important;">
                         <%-----Default card with button for Adding new administrator -----%>
                            <ul class="thumbnails span4">
                            <li class="span12" style="position: relative;height:229px;">
                               <a class="btnNew" style="position:relative!important;z-index:50;padding:50px 44px 35px 44px !important;top:100px!important;left: 10%!important;color:black!important;background:white!important;" title="ADD" data-toggle="modal" data-target="#modelAddAdmin"><i style="font-size:48px;">+</i></a>
                               <div class="thumbnail" style="position:relative!important;top: -33px;opacity:0.7;">
                               <img class="img-rounded" style="height:159px" src="../img/gallery/priest.png" alt=""/>
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
							  <a class="btn btn-primary Save" name="" id="btnSavePriest">Save</a>
                                <a id="btnCancelPriest" class="btn btn-primary Cancel">Cancel</a>
                                <a class="btn btn-primary" name="" id="btnDelete">Delete</a>
							  
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
                       <img src="../img/gallery/priest.png" class="img-rounded"/>
                      <%-- <input class="" id="fluImage" type="file"/>--%>
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
                       <input class="span12" id="txtName" type="text"/>
                       </div>
					  </div>     
                        <div class="control-group">
                            <label class="control-label" for="inputIcon">Mobile</label>
					  <div class="input-prepend span6">
                       <span class="add-on"><i class="icon-book"></i></span>
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
			<a class="btn" data-dismiss="modal">Close</a>
			<a id="btnAddAdmin" class="btn btn-primary">Save changes</a>
		</div>
	      </div>
    <input type="hidden" value="" id="hdfUnitName" />
    <input type="hidden" value="" id="hdfUnitID" />
        <script>
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].onclick = function () {
                debugger;
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            }
        }
    </script>
</asp:Content>
