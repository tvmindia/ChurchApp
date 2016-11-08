<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Institutions.aspx.cs" Inherits="ChurchApp.AdminPanel.Institutions" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Institution.css" rel="stylesheet" />
     <div id="content" class="span10">
        <ul class="breadcrumb">
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
          <div class="span6">
			<h1>Institutions</h1>
            <div id="VicarDivDisplay">
            <div id="VicarDefault">
            <div class="priority high"><span>Institutions</span><a class="btnNew" style="left:75%!important;" title="ADD NEW" onclick="OpenNewAdd('Vicar');"><i class="material-icons">+</i></a></div>
			<div class="task high">
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
			
            <%--<div id="assVicardiv">
            <div id="AsstVicarDefault">--%>
            <%--<div class="priority low" style="margin-top:4%!important;"><span>Asst Vicar</span><a class="btnNew" style="left:76%!important;" title="ADD NEW" onclick="OpenNewAdd('Asst');"><i class="material-icons">+</i></a></div>
			<div class="task low" id="AsstVicartask">
                 <div id="assVicardiv">
            <div id="AsstVicarDefault">
             <ul class="dashboard-list vicarlist">
				<li >
				<img class="priestimage" src="../img/gallery/priest.png"/>
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
            <div class="clearfix"></div>--%>		
			</div>
               
					
				<div id="PriestShowDetails" style="margin-top:4%;" class="span6 noMarginLeft">
				<div class="dark">
				<h1>Details</h1>
				<div class="box-content">
				<div class="form-horizontal">
				    <fieldset>
                        <%--<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">+</i></a>--%>
                    <a class="btnEdit" style="right:40px;position: fixed;" title="EDIT" id="iconEditPriest" onclick="editPriestDetails(this);"><i class="halflings-icon white pencil" aria-hidden="true" ></i></a>
                         <div class="control-group" style="margin-top:20px;">
							  <img class="priestimage" id="priestDetailPreview" src="../img/gallery/Institution.jpg"/>
							</div> 
                        <div class="control-group accordion" style="background-color:#FFEFEC">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:'Adobe Caslon Pro'"> GENERAL INFORMATION</span>
                        </div>
                        <div id="divGenDetals" class="panel">
                       
							       
                         <div class="control-group" >
								<label class="control-label" for="focusedInput">Name:</label>
								<div class="controls">
								 <label class="control-label" for="focusedInput" id="lblName"></label>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Address:</label>
								<div class="controls">
								  <label class="control-label" for="Address" id="lblBapName"></label>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Founder:</label>
								<div class="controls">
								  <label class="control-label" for="Founder" id="lblParish" />
                                </div>
								</div>
                       
                         <div class="control-group">
							  <label class="control-label" for="date01">Founded:</label>
							  <div class="controls">
                                  <label class="control-label" for="date01" id="lblFounded"></label>
							  </div>
							</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">History :</label>
								<div class="controls">
								<label class="control-label" for="focusedInput" id="lblHistory"></label></div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Location:</label>
							  <div class="controls">
								<label class="control-label" for="date01" id="lblLocation"></label>
							  </div>
							</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Website:</label>
								<div class="controls">
                                   <label class="control-label" for="Status" id="lblWebsite"></label> 
								</div>
								</div> 
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Email:</label>
								<div class="controls">
								  <label class="control-label" for="focusedInput" id="lblEmail"></label>
								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Phone 1:</label>
								<div class="controls">
								  <label class="control-label" for="focusedInput" id="lblPhone1"></label>
								</div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Phone 2:</label>
								<div class="controls">
								  <label class="control-label" for="focusedInput" id="lblPhone2"></label>
								</div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Fax:</label>
								<div class="controls">
								  <label class="control-label" for="focusedInput" id="lblfax"></label>
								</div>
								</div>
                            </div>
                         <div class="control-group accordion" style="background-color:#FFEFEC">
                           <span style="padding:4px 10px 4px 10px;font-size:16px;font-family:'Adobe Caslon Pro'">ADMINISTRATION INFOTMATION</span>
                        </div>
                        <div id="divAdminDetals" class="panel">
                       
							       
                         <div class="control-group" >
								<label class="control-label" for="focusedInput">Manager:</label>
								<div class="controls">
								 <label class="control-label" for="focusedInput" id="lblManager"></label>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Principal:</label>
								<div class="controls">
								  <label class="control-label" for="Address" id="lblPrincipal"></label>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Treasurer:</label>
								<div class="controls">
								  <label class="control-label" for="Founder" id="lblTreasurer" />
                                </div>
								</div>
                       
                         <div class="control-group">
							  <label class="control-label" for="date01">Executive 1:</label>
							  <div class="controls">
                                  <label class="control-label" for="date01" id="lblExe1"></label>
							  </div>
							</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Executive 2:</label>
								<div class="controls">
								<label class="control-label" for="focusedInput" id="lblExe2"></label></div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Executive 3:</label>
							  <div class="controls">
								<label class="control-label" for="date01" id="lblExe3"></label>
							  </div>
							</div>
                            </div>
                        
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
              <!---------------------  Add New Priest and Edit details ----------------------------->
                <div id="PriestEd" style="display:none;margin-top:4%;" class="span6 noMarginLeft">
					<div class="dark">
					<h1 id="HeadDetails">Add Details</h1>
					<div class="box-content">
					<div class="form-horizontal">
				    <fieldset>
                    <%--<a style="right:30px;position: fixed;"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i> Edit</a>--%>

							<div class="control-group">
							  <img class="priestimage" id="priestPreview" src="../img/gallery/priest.png"/>
                               
                                <input type="file" value="Choose Image" id="priestimg" style="position: absolute;top: 10%;left: 7%;cursor:pointer;background-color: lightsteelblue;color: white;" onchange="showpreview(this);" />
							</div>          
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtPriestName" type="text"/>
                                </div>
								</div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Baptismal Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtPriestBaptismName" type="text"/>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Parish</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtParish" type="text"/>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Diocese</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtDiocese" type="text"/>
                                </div>
								</div>
                         <div class="control-group">
							  <label class="control-label" for="date01">DOB</label>
							  <div class="controls">
								<input type="text" class="input-xlarge datepicker" id="priestDOB"/>
							  </div>
							</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">About</label>
								<div class="controls">
								<textarea class="input-xlarge" id="txtAboutPriest" name="AboutPriest" rows="6" placeholder=""></textarea>
								</div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Ordination Date</label>
							  <div class="controls">
								<input type="text" class="input-xlarge datepicker" id="OrdinationDate"/>
							  </div>
							</div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Status</label>
								<div class="controls">
                                    <select id="ddlstatus">
                                        <option value="-1" selected disabled">Select status</option>
                                        <option value="Vicar">Vicar</option>
                                        <option value="Asst Vicar">Asst Vicar</option>
                                    </select>
								</div>
								</div> 
                       
						  <div class="control-group">
								<label class="control-label" for="focusedInput">Designation</label>
								<div class="controls">
								  <input class="input-large focused" name="Designation" id="txtDesignation" type="text" value=""/>
								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Address</label>
								<div class="controls">
								<textarea class="input-xlarge" id="txtAddress" name="Address" rows="6" placeholder=""></textarea></div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <input class="input-large focused" name="Email" id="txtEmail" type="text" value=""/>
								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <input class="input-large focused" name="Email" id="txtMobile" type="text" value=""/>
								</div>
								</div>
                        
						<input type="hidden" id="hdfPriestID" />
							<div class="form-actions">
							  <a class="btn btn-primary" name="" id="btnSavePriest">Save changes</a>
                                <a id="btnCancelPriest" class="btn btn-primary">Cancel</a>
                                <a class="btn btn-primary" name="" id="btnDelete">Delete</a>
							  
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
						
			</div>





    </div>
    <style>

</style>

    <script>
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
  }
}
</script>


</asp:Content>
