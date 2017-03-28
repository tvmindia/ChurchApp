<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="DashBoard.aspx.cs" Inherits="ChurchApp.AdminPanel.DashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

    
    <style>
    
#searchInput {
    background-color: #fff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
    margin-left: 12px;
    padding: 0 11px 0 13px;
    text-overflow: ellipsis;
    width: 50%;
}
.box-content{
    display:none;
}
table{
    width:100%!important;
}
#searchInput:focus {
    border-color: #4d90fe;
}
    </style>
    <link href="../CSS/CustomCSS/DashBoard.css" rel="stylesheet" />
  
    <script src="../Scripts/CustomJS/Common.js"></script>
     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBGYAg9VLLllUHiLbNguOAHAB_scDP038E&libraries=places&callback=initMap"async defer></script>
    <script src="../Scripts/CustomJS/DashBoard.js"></script>
     
    <script>

</script>
    

    <div id="content" class="span10">
        <ul class="breadcrumb">
 		<li>Dashboard</li>
		</ul>

             

       
         <!--churchtable-->
        <div class="row-fluid" style="margin-top:3%">		
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
                                  <th>ID</th>
                                  <th>MainImageID</th>
								  <th>Name</th>
								  <th>Address</th>
								  <th>Phone1</th>
								  <th>TownName</th>
                                  <th>Actions</th>
								  
							  </tr>
						  </thead>   
						  <tbody>
						
						</tbody>
						 </table>  

                        <br />
                      <%--  <div>
                             <input id="searchInput" class="controls" type="text" placeholder="Enter a location"/>
                                  <div id="map" style="width: 100%;height: 400px;"></div>
                                  <ul id="geoData">
                                  <li>Full Address: <span id="location"></span></li>
                                  <li>Postal Code: <span id="postal_code"></span></li>
                                  <li>Country: <span id="country"></span></li>
                                  <li>Latitude: <span id="lat"></span></li>
                                  <li>Longitude: <span id="lon"></span></li>
                                  </ul>
                        </div>--%>
                       
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
                               <input class="input-large focused" name="txtChurchName" id="txtChurchName" onkeypress="return isnotNumber(event);" type="text"/>
                              </div>
                              </div>

                              <div class="control-group">

                              <label class="control-label" for="focusedInput">Nick Names</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtChurchName" id="txtNickNames" onkeypress="return isnotNumber(event);" type="text"/>
                              </div>
                              </div>
                                 <div class="control-group">
                             <label class="control-label" for="focusedInput">Diocese</label>
                               <div class="controls">
                                  <select id="idddlDiocese" name="ddlDiocese" class="ddlDiocese"><option></option></select>
                                  
                                 </div>
                             </div> 
                                 <div class="control-group">
                             <label class="control-label" for="focusedInput">Forane</label>
                               <div class="controls">
                                  <select id="idddlForane" name="ddlForane" class="ddlForane"><option></option></select>
                                  
                                 </div>
                             </div> 
                                 <div class="control-group">
                             <label class="control-label" for="focusedInput">Church Status</label>
                               <div class="controls">
                                  <select id="idddlChurchStatus" name="ddlChurchStatus" class="ddlChurchStatus"><option></option></select>
                                  
                                 </div>
                             </div> 
                                  <div class="control-group">
                             <label class="control-label" for="focusedInput">Rite</label>
                               <div class="controls">
                                  <select id="idddlChurchRite" name="ddlChurchRite" class="ddlChurchRite"><option></option></select>
                                  
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
                             <label class="control-label" for="focusedInput">Towns</label>
                               <div class="controls">
                                  <select id="idddlTownCode" name="ddlTownCode" class="ddlTownCode"><option></option></select>
                                  
                                 </div>
                             </div> 
                              <div class="control-group">

                              <label class="control-label" for="focusedInput">Place</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtPhone1" id="txtPlace" placeholder="" type="text"/>
                              </div>
                              </div>
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

                              <label class="control-label" for="focusedInput">Priority Order</label>
                               <div class="controls">
                               <input class="input-large focused" name="" id="txtPriority" placeholder="" type="text"/>
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
                                        <a class="btn btn-primary ChurchClear">Clear</a>
                                    </div>	
                        </div>
                        
					</div>

                    
					
		         </div>
				</div>
		
	    
         <!--churchtable-->
        <!------Request Church------->
        <div class="row-fluid">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2>Church Requests</h2>
						<div class="box-icon">
						
							<a  style="cursor:pointer;" class="btn-minimize churchdoublebox"><i id="churchReqchevronup" class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content churchBox">
				
						<table class="table table-bordered table-striped table-condensed" id="churchReqtable">
							   <thead>
							  <tr>
                                  <th>ID</th>
                                  <th>MainImageID</th>
                                  <th>Status</th>
								  <th>Name</th>
								  <th>Address</th>
                                  <th>Suggested By</th>
								  <th>Contact</th>
								  <th>TownName</th>
                                  <th>Actions</th>
								  
							  </tr>
						  </thead>   
						  <tbody>
						
						</tbody>
						 </table>  

                        <br />
                      <%--  <div>
                             <input id="searchInput" class="controls" type="text" placeholder="Enter a location"/>
                                  <div id="map" style="width: 100%;height: 400px;"></div>
                                  <ul id="geoData">
                                  <li>Full Address: <span id="location"></span></li>
                                  <li>Postal Code: <span id="postal_code"></span></li>
                                  <li>Country: <span id="country"></span></li>
                                  <li>Latitude: <span id="lat"></span></li>
                                  <li>Longitude: <span id="lon"></span></li>
                                  </ul>
                        </div>--%>
                       
                        <br />

                        <div class="form-horizontal">
						
							<fieldset>
                             <div class="span12">  
                                 <div class="span12" id="SuggestedDiv" style="display:none;border-bottom:1px solid black;margin-bottom:10px;">
                                     <div class="span1"><span class="fa fa-user" style="font-size:62px;"></span></div>
                                     <div class="span8" style="">
                                     <div class="control-group">

                              <label class="control-label" for="focusedInput" style="font-style:16px;">Suggested By</label>
                               <div class="controls">
                               <label class="control-label" id="lblReqUser" for="focusedInput" style="font-style:16px;"></label>
                              </div>
                              </div>
                                     <div class="control-group">

                              <label class="control-label" for="focusedInput" style="font-style:16px;">Contact Number</label>
                               <div class="controls">
                               <label class="control-label" id="lblReqContact" for="focusedInput" style="font-style:16px;"></label>
                              </div>
                              </div>
                                         </div>
                                 </div> 
				             <div class="span5">
						     
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Church Name</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtChurchName" id="txtReqChurchName" onkeypress="return isnotNumber(event);" type="text"/>
                              </div>

                              </div>

                              <div class="control-group">
                             <label class="control-label" for="focusedInput">Towns</label>
                               <div class="controls">
                                  <select id="idddlReqTownCode" name="ddlTownCode" class="ddlTownCode input-large focused"><option></option></select>
                                  
                                 </div>
                             </div>


                                   <div class="control-group">
                             <label class="control-label" for="focusedInput">Address</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtReqAddress" name="txtAddress" rows="3" placeholder=""></textarea>
                               </div>
                             </div>
							
							  <div class="control-group">
                             <label class="control-label" for="focusedInput">Description</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtReqDescription" name="Description" rows="3" placeholder=""></textarea>
                               </div>
                             </div>


                              <div class="control-group">
                             <label class="control-label" for="focusedInput">About</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtReqAbout" name="txtAbout" rows="3" placeholder=""></textarea>
                               </div>
                             </div>
                                  </div>
                             <div class="span5">
                                  
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Phone 1</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtPhone1" id="txtReqPhone1" onkeypress="return isNumber(event);" placeholder="" type="text"/>
                              </div>
                              </div>

                                <div class="control-group">

                              <label class="control-label" for="focusedInput">Phone 2</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtPhone2" id="txtReqPhone2" onkeypress="return isNumber(event);" placeholder="" type="text"/>
                              </div>
                              </div>

                                <div class="control-group">

                              <label class="control-label" for="focusedInput">Latitude</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtLatitude" id="txtReqLatitude" placeholder="" onfocus="GetMap();" type="text"/>
                              </div>
                              </div>

                                 <div class="control-group">

                              <label class="control-label" for="focusedInput">Longitude</label>
                               <div class="controls">
                               <input class="input-large focused"  name="txtLongitude" id="txtReqLongitude" placeholder="" onfocus="GetMap();" type="text"/>
                              </div>
                              </div>
                                

                                   <div class="control-group">
								<label class="control-label">Main Image</label>
								<div class="controls">
                                  <img id="ChurchRequestPreview" src="../img/defaultalbumadd.jpg" style="max-height:159px" class="img-rounded"/>
								  <input type="file" accept="image/*" id="churchRequestimageuploader" onchange="OnUpload(this);ChurchRequestImagePreview(this);"/>
                              
								</div>
                                     
							  </div>
                                   
                                   
                                 
                                    </div>
                                 
                             </div>
                     
                             
                     
                         </fieldset>
                            <div id="Div1" runat="server" class="form-actions">
                                        <a class="btn btn-primary" id="btnRequestChurchAdd" href="#">Approve</></a>
                                        <a class="btn btn-primary" id="btnRequestReject">Reject</a>
                                        <a class="btn btn-primary" onclick="BindAllRequestChurches();" >Cancel</a>
                                    </div>	
                        </div>
                        
					</div>

                    
					
		         </div>
				</div>
        <!------Request Church------->
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
                        	      <div class="control-group">

                                 <div class="controls">
                               <select id="ddlChurchinRoles" name="ddlChurch" class="ddlChurch"><option></option></select>
                                    
                              </div>
                              </div>
						<table class="table table-bordered" id="Rolestable">
							  <thead>
								  <tr>
                                      <th>RoleID</th>
                                      <th>ChurchID</th>
                                      <th>Church</th>
									  <th>Role</th>
									  <th>Created Date</th>
                                      <th>Town</th>
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
                            
                             </div>
                     
                             
                     
                         </fieldset>
                                  <div  class="form-actions">
                                        <a class="btn btn-primary" id="btnRolesAdd" href="#">Save</></a>
                                        <a class="btn btn-primary RolesClear">Clear</a>
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

                        <div class="control-group">

                                 <div class="controls">
                               <select id="ddlChurchinUsers" name="ddlChurch" class="ddlChurch"><option></option></select>
                                    
                              </div>
                              </div>
						<table class="table table-bordered" id="Userstable">
							  <thead>
								  <tr>
                                      <th>UserID</th>
                                      <th>ChurchID</th>
                                      <th>Name</th>
									  <th>Mobile</th>
									  <th>Church</th>
                                      <th>Role</th>
                                      <th>Town</th>
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
                                    <%-- <div class="control-group">
                             <label class="control-label" for="focusedInput">Church</label>
                               <div class="controls">
                                  <select id="idddlchurchuser" name="churchuser" class="ddlChurch"><option></option></select>
                                  
                                 </div>
                             </div>--%>
                                   
						     
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Name</label>
                               <div class="controls">
                              
                                    <input class="input-large focused" name="txtUserName" id="txtUserName" onkeypress="return isnotNumber(event);" placeholder=""  type="text"/>
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
                                  <select id="idddlRoles" name="ddlRoles" class="ddlRoleName"><option></option></select>
                                    
                                 </div>
                             </div>
                                       <div class="control-group">
                                    <label class="control-label" for="focusedInput">Active</label>
                                   <div class="controls">
                                    <input id="chkActive" checked="checked" type="checkbox"/>
                                  </div>
                                 </div>
                                

                                     

                                <div class="control-group">
                                <label class="control-label" for="focusedInput">DOB</label>
                               <div class="controls">
                                <input type="text" class="input-large datepicker" readonly="true" name="DOB" id="datepickerdob" value=""/>
                                  
                                 </div>
                             </div>


                                   <div class="control-group">
                                    <label class="control-label" for="focusedInput">Login Name</label>
                                   <div class="controls">
                                   <input class="input-large focused" name="txtLoginName" autocomplete="off" id="txtLoginName" type="text"/>
                                  </div>

                                 </div>
                                   <div class="control-group">
                                    <label class="control-label" for="focusedInput">Password</label>
                                   <div class="controls">
                                   <input class="input-large focused" name="txtPassword" autocomplete="off" id="txtPassword" type="password"/>
                                  </div>
                                 </div>
                                  <div class="control-group">
                                    <label class="control-label" for="focusedInput">Confirm Password</label>
                                   <div class="controls">
                                   <input class="input-large focused" autocomplete="off" name="txtconfirmpswd" onkeyup="checkPass(); return false;" id="txtconfirmpswd" type="password"/>
                                  </div>
                                 </div>
                                 
                                    </div>
                             </div>
                     
                             
                     
                         </fieldset>

                             <div class="form-actions">
                                        <a class="btn btn-primary" id="btnUserAdd" href="#">Save</></a>
                                        <a class="btn btn-primary UserClear">Clear</a>
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
                         <div class="controls">
                               <select id="idddlOrganization" name="Organization" class="ddlOrganization"><option></option></select>
                         </div>
                        <br />
						<table class="table table-bordered" id="Designationtable">
							  <thead>
								  <tr>
                                      <th>DesigID</th>
                                      <th>Organization Type</th>
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
                              
                                    <input class="input-large focused" name="txtPosition" id="txtPosition" onkeypress="return isnotNumber(event);" placeholder=""  type="text"/>
                              </div>
                              </div>

                                 
                         

                          
                   </div>
                             <div class="span6">
                           <div class="control-group">
                             <label class="control-label" for="focusedInput">Hierarchical Order</label>
                               <div class="controls">
                                  <input class="input-small focused" onkeypress="return isNumber(event);" name="txtOrder" id="txtOrder" type="text"/>
                            </div>
                             </div>
                                
                                    </div>
                             </div>
                     
                             
                     
                         </fieldset>

                             <div class="form-actions">
                                        <a class="btn btn-primary" id="btnDesignationAdd" href="#">Save</></a>
                                        <a class="btn btn-primary clearDesignation">Clear</a>
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
						<h2>Saints/Patrons</h2>
						<div class="box-icon">
							
							<a style="cursor:pointer;" class="btn-minimize"><i class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content DesignationBox">
				
                        	<table class="table table-bordered" id="Sainttable">
							  <thead>
								  <tr>
                                      <th>ID</th>
                                      <th>ImageID</th>
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
                              
                                    <input name="Saintname" id="txtSaintName" onkeypress="return isnotNumber(event);"  type="text" />
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
                                        <a href="#" class="btn btn-primary ClearSaint">Clear</a>
                                    </div>	
                                 </div>
						
					</div>

                  
                


		   </div><!--/span-->
        </div>

        <!--Saint-->

        <!--TownsTable-->

          <div class="row-fluid">
            <div class="box span12">
					<div class="box-header">
						<h2>Towns</h2>
						<div class="box-icon">
							
							<a style="cursor:pointer;" class="btn-minimize"><i class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content DesignationBox">
						<table class="table table-bordered" id="Townstable">
							  <thead>
								  <tr>
                                      <th>TownImageID</th>
                                      <th>Code</th>
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
                                  <div class="alert alert-error" id="ErrorBox6" style="display: none;">
                             <div id="Displaydiv6">
                             </div>
                            </div>
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Name</label>
                               <div class="controls">
                              
                                    <input class="input-large focused" name="txtName" id="txtName" onkeypress="return isnotNumber(event);" placeholder=""  type="text"/>
                              </div>
                              </div>

                                 
                                                   
                   </div>
                             <div class="span6">
                            <div class="control-group">
								<label class="control-label">Image</label>
								<div class="controls">
                                  <img id="TownPreview" src="../img/defaultalbumadd.jpg" style="max-height:159px" class="img-rounded"/>
								  <input type="file" accept="image/*" id="townimageuploader" onchange="OnUpload(this);TownImagePreview(this);"/>
                              
								</div>
                                     
							  </div>
                                
                                    </div>
                             </div>
                     
                             
                     
                         </fieldset>

                             <div class="form-actions">
                                        <a class="btn btn-primary" id="btnTownAdd" href="#">Save</></a>
                                        <a class="btn btn-primary clearTown">Clear</a>
                                    </div>	
                                 </div>
						
					</div>

                  
                


		   </div><!--/span-->

        </div>

        <!--TownsTable-->







    </div><!--span10 end-->
    <div class="modal hide fade" id="mapModal">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal">×</button>
			<h3>Google Map</h3>
		</div>
		<div class="modal-body">
			 <%--<div id="dvMap" style="width: 530px; height: 350px"/>--%>
                 <div>
                             <input id="searchInput" class="controls" type="text" placeholder="Enter a location"/>
                                  <div id="map" style="width: 100%;height: 350px;"></div>
                                  <ul id="geoData">
                                  <li>Full Address: <span id="location"></span></li>
                                  <li>Postal Code: <span id="postal_code"></span></li>
                                  
                                
                                  </ul>
                        </div>
		</div>
        
        <div class="modal-footer">
         <span>Latitude:</span><span id="spanLatitude"></span><span>   Longitude:</span><span id="spanLongitude"></span>
         <a href="#" class="btn btn-primary" data-dismiss="modal">OK</a>
		</div>
		
	   </div>
     <input type="hidden" id="hdfDesignationID"/>
     <input type="hidden" id="hdfChurchID"/>
     <input type="hidden" id="hdfChurchImageID"/>
     <input type="hidden" id="hdfRolesID"/>
     <input type="hidden" id="hdfUserID"/>
     <input type="hidden" id="hdfTownCode" />
     <input type="hidden" id="hdfTownImageID" />
     <input type="hidden" id="hdfPatronID"/>
     <input type="hidden" id="hdfPatronImageID"/>
         
         <input id="hdfPatronImageURL" type="hidden" />
</asp:Content>
