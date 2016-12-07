﻿<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="DashBoard.aspx.cs" Inherits="ChurchApp.AdminPanel.DashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
     <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyBGYAg9VLLllUHiLbNguOAHAB_scDP038E"></script>
    
    <link href="../CSS/CustomCSS/DashBoard.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/DashBoard.js"></script>

 <%-- <style>
 #datepickerdob
{
    background-image :url('../img/invalid.png');
    background-position:95% center;
    background-Repeat:no-repeat;
    padding-left:30px;
}
  </style>--%>
    

    <div id="content" class="span10">
        <ul class="breadcrumb">
 		<li>Dashboard</li>
		</ul>

              <%--Alert boxes --%>
               <div id="rowfluidDivAlert" style="display:none;">	
				       <div class="alert alert-error" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Operation Not Successfull.</strong> 
						</div>
						<div class="alert alert-success" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Successfull.</strong> 
						</div>
						<div class="alert alert-info" style="display:none;">
						<%--	<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<strong>Heads up!</strong> This alert needs your attention, but it's not super important.
						</div>
						<div class="alert alert-block" style="display:none;">
							<%--<button type="button" class="close" data-dismiss="alert">×</button>--%>
							<h4 class="alert-heading">Warning!</h4>
							<p>Best check yourself, you're not looking too good.</p>
						</div>
					

              
            </div>
			  <%--Alert boxes --%>

       
         <!--churchtable-->
        <div class="row-fluid">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2>Churches</h2>
						<div class="box-icon">
						
							<a  style="cursor:pointer;" class="btn-minimize churchdoublebox"><i id="churchchevronup" class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content churchBox">
				
						<table class="table table-bordered table-striped table-condensed" id="churchtable">
							   <thead>
							  <tr>
								  <th>Name</th>
								  <th>Town</th>
								  <th>Address</th>
								  <th>Phone1</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody>
						
						</tbody>
						 </table>  

                        <br />

                        <div class="form-horizontal">
						
							<fieldset>
                             <div class="span12">   
				             <div class="span6">
						      <div class="alert alert-error" id="ErrorBox" style="display: none;">
                             <div id="Displaydiv">
                             </div>
                            </div>
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Church Name</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtChurchName" id="txtChurchName" placeholder="Enter Church name" type="text"/>
                              </div>
                              </div>

                              <div class="control-group">
                             <label class="control-label" for="focusedInput">Town Code</label>
                               <div class="controls">
                                  <select id="idddlTownCode" name="ddlTownCode" class="ddlTownCode"><option></option></select>
                                  
                                 </div>
                             </div>


                                   <div class="control-group">
                             <label class="control-label" for="focusedInput">Address</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtAddress" name="txtAddress" rows="3" placeholder=""></textarea>
                               </div>
                             </div>
							
							  <div class="control-group">
                             <label class="control-label" for="focusedInput">Description</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtDescription" name="Description" rows="3" placeholder=""></textarea>
                               </div>
                             </div>


                              <div class="control-group">
                             <label class="control-label" for="focusedInput">About</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtAbout" name="txtAbout" rows="3" placeholder=""></textarea>
                               </div>
                             </div>
                                  </div>
                             <div class="span6">
                                  
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Phone 1</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtPhone1" id="txtPhone1" onkeypress="return isNumber(event);" placeholder="" type="text"/>
                              </div>
                              </div>

                                <div class="control-group">

                              <label class="control-label" for="focusedInput">Phone 2</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtPhone2" id="txtPhone2" onkeypress="return isNumber(event);" placeholder="" type="text"/>
                              </div>
                              </div>

                                <div class="control-group">

                              <label class="control-label" for="focusedInput">Latitude</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtLatitude" id="txtLatitude" placeholder="" onfocus="GetMap();" type="text"/>
                              </div>
                              </div>

                                 <div class="control-group">

                              <label class="control-label" for="focusedInput">Longitude</label>
                               <div class="controls">
                               <input class="input-large focused"  name="txtLongitude" id="txtLongitude" placeholder="" onfocus="GetMap();" type="text"/>
                              </div>
                              </div>
                                

                                   <div class="control-group">
								<label class="control-label">Main Image</label>
								<div class="controls">
                                  <img id="ChurchPreview" src="../img/defaultalbumadd.jpg" style="max-height:159px" class="img-rounded"/>
								  <input type="file" accept="image/*" id="churchimageuploader" onchange="OnUpload(this);ChurchImagePreview(this);"/>
                              
								</div>
                                     
							  </div>
                                   
                                   
                                 
                                    </div>
                                 
                             </div>
                     
                             
                     
                         </fieldset>
                            <div id="footer" runat="server" class="form-actions">
                                        <a class="btn btn-primary" id="btnChurchAdd" href="#">Save</></a>
                                        <a class="btn ChurchClear">Cancel</a>
                                    </div>	
                        </div>
                        
					</div>

                    
					
		         </div>
				</div>
		
	    
         <!--churchtable-->


          <br />
        <!--Rolestable-->
     
        <div class="row-fluid">
            <div class="box span12">
					<div class="box-header">
						<h2>Roles</h2>
						<div class="box-icon">
							
							<a style="cursor:pointer;" class="btn-minimize"><i class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content RolesBox">
						<table class="table table-bordered" id="Rolestable">
							  <thead>
								  <tr>
									  <th>Role</th>
									  <th>Church</th>
									  <th>Created Date</th>
									  <th>Actions</th>                                          
								  </tr>
							  </thead>   
							  <tbody>
								
							                  
							  </tbody>
						 </table>  

                        <br />
                        <br />
                        <br />
                         	<div class="form-horizontal">
						
							<fieldset>
                             <div class="span12">   
				             <div class="span6">
						      <div class="alert alert-error" id="ErrorBox1" style="display: none;">
                             <div id="Displaydiv1">
                             </div>
                            </div>
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Role Name</label>
                               <div class="controls">
                              
                                    <select id="idddlRoleName" name="RoleName" class="ddlRoleName"><option>Admin</option><option>User</option></select>
                              </div>
                              </div>

                                         
                   </div>
                             <div class="span6">
                                  
						      <div class="control-group">
                             <label class="control-label" for="focusedInput">Church</label>
                               <div class="controls">
                                  <select id="idddlChurch" name="ddlChurch" class="ddlChurch"><option></option></select>
                                  
                                 </div>
                             </div>
                                   
                                 
                                    </div>
                             </div>
                     
                             
                     
                         </fieldset>
                                  <div  class="form-actions">
                                        <a class="btn btn-primary" id="btnRolesAdd" href="#">Save</></a>
                                        <a class="btn RolesClear">Cancel</a>
                                    </div>	
                                 </div>
						
					</div>

                
                


		   </div><!--/span-->

        </div>

        <!--Rolestable-->


          <br />

        <!--Userstable-->
          <div class="row-fluid">
            <div class="box span12">
					<div class="box-header">
						<h2>Users</h2>
						<div class="box-icon">
							
							<a style="cursor:pointer;" class="btn-minimize"><i class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content UserBox">
						<table class="table table-bordered" id="Userstable">
							  <thead>
								  <tr>
									  <th>Name</th>
									  <th>Mobile</th>
									  <th>Church</th>
                                      <th>Role</th>
                                     <th>Actions</th>                                          
								  </tr>
							  </thead>   
							  <tbody>
								
							                  
							  </tbody>
						 </table>  


                         	<div class="form-horizontal">
						
							<fieldset>
                             <div class="span12">   
				             <div class="span6">
                                  <div class="alert alert-error" id="ErrorBox2" style="display: none;">
                             <div id="Displaydiv2">
                             </div>
                            </div>
                                     <div class="control-group">
                             <label class="control-label" for="focusedInput">Church</label>
                               <div class="controls">
                                  <select id="idddlchurchuser" name="churchuser" class="ddlChurchuser"><option></option></select>
                                  
                                 </div>
                             </div>
                                   
						     
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Name</label>
                               <div class="controls">
                              
                                    <input class="input-large focused" name="txtUserName" id="txtUserName" placeholder=""  type="text"/>
                              </div>
                              </div>

                                     <div class="control-group">
                             <label class="control-label" for="focusedInput">Address</label>
                               <div class="controls">
                                  <textarea id="txtUserAddress" name="UserAddress" rows="3"></textarea>
                                  
                                 </div>
                             </div>
                                      <div class="control-group">

                              <label class="control-label" for="focusedInput">Mobile</label>
                               <div class="controls">
                              
                                    <input class="input-large focused" onkeypress="return isNumber(event);" name="txtMobile" id="txtMobile" placeholder=""  type="text"/>
                              </div>
                              </div>

                                     <div class="control-group">
                                    <label class="control-label" for="focusedInput">Email</label>
                                   <div class="controls">
                                   <input class="input-large focused" name="txtEmail" id="txtEmail" type="text"/>
                                  </div>
                                 </div>

                                    <div class="control-group">
                                    <label class="control-label" for="focusedInput">Gender</label>
                                  <%-- <div class="controls">
                                    <label class="radio">
									<input type="radio" name="optionsRadios" id="optionMale" value="option1" checked=""/>
									Male
								  </label>
								  <div style="clear:both"></div>
								  <label class="radio">
									<input type="radio" name="optionsRadios" id="optionFemale" value="option2"  checked=""/>
									Female
								  </label>
                                  </div>--%>
                                         <div class="controls">
                                                      <%--  <label class="checkbox inline">
                                                          
                                                         <input type="checkbox" id="chkActiveAdmin" checked="checked" />Yes</label>--%>
                                                         <label class="radio">
								                      	<input type="radio" name="optionsRadios" id="optionMale" value="true" checked=""/>
								                        Male
								                        </label>
								
								                     <label class="radio">
								                      	<input type="radio" name="optionsRadios" id="optionFemale" value="false"/>
								                         	Female
							                    	 </label>

                                                    </div>
                                 </div>

                          
                   </div>
                             <div class="span6">
                                  
						  

                                       <div class="control-group">
                             <label class="control-label" for="focusedInput">Roles</label>
                               <div class="controls">
                                  <select id="idddlRoles" name="ddlRoles" class="ddlRoles"><option></option></select>
                                  
                                 </div>
                             </div>
                                       <div class="control-group">
                                    <label class="control-label" for="focusedInput">Active</label>
                                   <div class="controls">
                                    <input id="chkActive" type="checkbox"/>
                                  </div>
                                 </div>
                                       <div class="control-group">
                                    <label class="control-label" for="focusedInput">Administrator</label>
                                   <div class="controls">
                                    <input id="chkAdministrator" type="checkbox"/>
                                  </div>
                                 </div>

                                     

                                <div class="control-group">
                                <label class="control-label" for="focusedInput">DOB</label>
                               <div class="controls">
                                <input type="text" class="input-large datepicker" name="DOB" id="datepickerdob" value=""/>
                                  
                                 </div>
                             </div>


                                   <div class="control-group">
                                    <label class="control-label" for="focusedInput">Login Name</label>
                                   <div class="controls">
                                   <input class="input-large focused" name="txtLoginName" id="txtLoginName" type="text"/>
                                  </div>
                                 </div>
                                   <div class="control-group">
                                    <label class="control-label" for="focusedInput">Password</label>
                                   <div class="controls">
                                   <input class="input-large focused" name="txtPassword" id="txtPassword" placeholder="Password" type="password"/>
                                  </div>
                                 </div>
                                  <div class="control-group">
                                    <label class="control-label" for="focusedInput">Confirm Password</label>
                                   <div class="controls">
                                   <input class="input-large focused" name="txtconfirmpswd" onkeyup="checkPass(); return false;" id="txtconfirmpswd" placeholder="Confirm password" type="password"/>
                                  </div>
                                 </div>
                                 
                                    </div>
                             </div>
                     
                             
                     
                         </fieldset>

                             <div class="form-actions">
                                        <a class="btn btn-primary" id="btnUserAdd" href="#">Save</></a>
                                        <a class="btn UserClear">Cancel</a>
                                    </div>	
                                 </div>
						
					</div>

                  
                


		   </div><!--/span-->

        </div>

        <!--Userstable-->

         <br />

         <!--Designationtable-->
     
       <div class="row-fluid">
            <div class="box span12">
					<div class="box-header">
						<h2>Designation</h2>
						<div class="box-icon">
							
							<a style="cursor:pointer;" class="btn-minimize"><i class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content DesignationBox">
						<table class="table table-bordered" id="Designationtable">
							  <thead>
								  <tr>
									  <th>Position</th>
									  <th>Order</th>
									  <th>Organization</th>
                                     <th>Actions</th>                                          
								  </tr>
							  </thead>   
							  <tbody>
								
							                  
							  </tbody>
						 </table>  


                         	<div class="form-horizontal">
						
							<fieldset>
                                <br />
                             <div class="span12">   
				             <div class="span6">
                                  <div class="alert alert-error" id="ErrorBox4" style="display: none;">
                             <div id="Displaydiv4">
                             </div>
                            </div>
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Position</label>
                               <div class="controls">
                              
                                    <input class="input-large focused" name="txtPosition" id="txtPosition" placeholder=""  type="text"/>
                              </div>
                              </div>

                                 
                                      <div class="control-group">

                              <label class="control-label" for="focusedInput">Organization</label>
                               <div class="controls">
                               <select id="idddlOrganization" name="Organization" class="ddlOrganization"><option></option></select>
                              </div>
                              </div>

                          
                   </div>
                             <div class="span6">
                           <div class="control-group">
                             <label class="control-label" for="focusedInput">Hierarchical Order</label>
                               <div class="controls">
                                  <input class="input-small focused" onkeypress="return isNumber(event);" name="txtOrder" id="txtOrder" placeholder="Order No"  type="text"/>
                            </div>
                             </div>
                                
                                    </div>
                             </div>
                     
                             
                     
                         </fieldset>

                             <div class="form-actions">
                                        <a class="btn btn-primary" id="btnDesignationAdd" href="#">Save</></a>
                                        <a class="btn clearDesignation">Cancel</a>
                                    </div>	
                                 </div>
						
					</div>

                  
                


		   </div><!--/span-->

        </div>

        <!--Designationtable-->
       
        

        <!--Saint-->
        <div class="row-fluid">
             <div class="box span12">
					<div class="box-header">
						<h2>Saint</h2>
						<div class="box-icon">
							
							<a style="cursor:pointer;" class="btn-minimize"><i class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content DesignationBox">
				
                        	<table class="table table-bordered" id="Sainttable">
							  <thead>
								  <tr>
									  <th>Name</th>
									  <th>Created Date</th>
								     <th>Actions</th>                                          
								  </tr>
							  </thead>   
							  <tbody>
								
							                  
							  </tbody>
						 </table>  

                         	<div class="form-horizontal">
						
							<fieldset>
                                <br />
                             <div class="span12">   
				             <div class="span6">
                                  <div class="alert alert-error" id="ErrorBox5" style="display: none;">
                             <div id="Displaydiv5">
                             </div>
                            </div>
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Name</label>
                               <div class="controls">
                              
                                    <input name="Saintname" id="txtSaintName"  type="text" />
                              </div>
                              </div>

                                 
                                      <div class="control-group">

                              <label class="control-label" for="focusedInput">Description</label>
                               <div class="controls">
                               <textarea id="txtSaintDescription" name="Description" rows="3" placeholder=""></textarea>
                              </div>
                              </div>

                          
                   </div>
                             <div class="span6">
                                  
						  

                                     <div class="control-group">
                                <img class="Preview span6" id="imgSaint" src="../img/No-Img_Chosen.png" />
                             
                                 <input type="file" id="UpSaint" value="Choose Image" onchange="showpreview(this);" />
                                  
                                
                             </div>
                                
                                    </div>
                             </div>
                     
                             
                     
                         </fieldset>

                             <div class="form-actions">
                                       <a href="#" class="btn btn-primary" id="btnSaintAdd">Save</a>
                                        <a href="#" class="btn ClearSaint">Close</a>
                                    </div>	
                                 </div>
						
					</div>

                  
                


		   </div><!--/span-->
        </div>

        <!--Saint-->

       







    </div><!--span10 end-->
    <div class="modal hide fade" id="mapModal">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>Google Map</h3>
		</div>
		<div class="modal-body">
			 <div id="dvMap" style="width: 500px; height: 350px"/>
		</div>
		
	   </div>
     <input type="hidden" id="hdfDesignationID"/>
     <input type="hidden" id="hdfChurchID"/>
     <input type="hidden" id="hdfRolesID"/>
     <input type="hidden" id="hdfUserID"/>
  
         <input id="hdfPatronID" type="hidden" />
         <input id="hdfPatronImageID" type="hidden" value="" />
         <input id="hdfPatronImageURL" type="hidden" />
</asp:Content>
