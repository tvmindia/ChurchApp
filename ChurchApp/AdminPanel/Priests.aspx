<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Priests.aspx.cs" Inherits="ChurchApp.AdminPanel.Priests" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Priests.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Priests.js"></script>
   <%--<style>
       
       .btnNew {
           -webkit-border-radius: 58;
           -moz-border-radius: 58;
           border-radius: 58px;
           box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
           color: #ffffff;
           font-size: 20px;
           background: #F44336;
           padding: 8px 17px 8px 17px;
           text-decoration: none;
           position:relative;
           cursor:pointer;
       }

       .btnNew:hover {
           background: #eb5347;
           color:lightsteelblue;
           text-decoration: none;
       }
       .btnEdit {
           -webkit-border-radius: 58;
           -moz-border-radius: 58;
           border-radius: 58px;
           box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
           color: #ffffff;
           font-size: 20px;
           background: #21a01b;
           padding: 8px 10px 8px 13px;
           text-decoration: none;
           cursor:pointer;
       }

       .btnEdit:hover {
           background: green;
           color:whitesmoke;
           text-decoration: none;
       }
   </style>--%>
      <div id="content" class="span10">
       <ul class="breadcrumb" style="margin-bottom:0px">
                <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Priests</li>
				
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
            <div id="VicarDivDisplay">
            <div id="VicarDefault">
            <div class="" style="border-bottom:1.5px solid #F44336;line-height:0px;"><h2>Vicar</h2><a class="btnNew" id="btnNewVicar" style="left:93%!important;top:-14px;" title="ADD NEW" onclick="OpenNewAdd('Vicar');"><i class="material-icons">+</i></a></div>
			<div class="task high">
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
            <div class="" style="margin-top:4%!important;border-bottom:1.5px solid #78CD51;line-height:0px;"><h2>Asst Vicar</h2><a class="btnNew AddNew" id="btnAddNew" runat="server" style="left:93%!important;top:-14px;" title="ADD NEW" onclick="OpenNewAdd('Asst');"><i class="material-icons">+</i></a></div>
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
            <div class="clearfix"></div>		
			</div>
                					
				<div id="PriestShowDetails" style="display:none;margin-top:4%;" class="span6 noMarginLeft">
				<div class="dark">
				<h1>Details</h1>
				<div class="box-content">
				<div class="form-horizontal">
				    <fieldset>
                        <%--<a class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">+</i></a>--%>
                    <a class="btnEdit" style="right:40px;top:-41px;position: absolute;" title="EDIT" id="iconEditPriest" onclick="editPriestDetails(this);"><i class="halflings-icon white pencil" aria-hidden="true" ></i></a>
                        <div class="control-group">
							  <img class="priestimage" id="priestDetailPreview" src="../img/gallery/priest.png"/>
							</div> 
							       
                         <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Name:</label>
								<div class="controls">
								 <label class="control-label" for="focusedInput" id="lblName"></label>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Baptismal Name:</label>
								<div class="controls">
								  <label class="control-label" for="BaptisamName" id="lblBapName"></label>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Parish:</label>
								<div class="controls">
								  <label class="control-label" for="Parish" id="lblParish" />
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Diocese:</label>
								<div class="controls">
								  <label class="control-label" for="Diocese"  id="lblDiocese"></label>
                                </div>
								</div>
                         <div class="control-group">
							  <label class="control-label" for="date01">DOB:</label>
							  <div class="controls">
                                  <label class="control-label" for="date01" id="lblDob"></label>
							  </div>
							</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">About :</label>
								<div class="controls">
								<label class="control-label" for="focusedInput" id="lblAbout"></label></div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Ordination Date:</label>
							  <div class="controls">
								<label class="control-label" for="date01" id="lblOrdination"></label>
							  </div>
							</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Status:</label>
								<div class="controls">
                                   <label class="control-label" for="Status" id="lblStatus"></label> 
								</div>
								</div> 
                       
						  <div class="control-group">
								<label class="control-label" for="focusedInput">Designation:</label>
								<div class="controls">
								  <label class="control-label" for="focusedInput" id="lblDesignation"></label>
								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Address:</label>
								<div class="controls">
								<label class="control-label" for="focusedInput" id="lblAddress"></label>

								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Email:</label>
								<div class="controls">
								  <label class="control-label" for="focusedInput" id="lblEmail"></label>
								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Mobile:</label>
								<div class="controls">
								  <label class="control-label" for="focusedInput" id="lblMobile"></label>
								</div>
								</div>
                        <div class="form-actions">
                              <input type="hidden" id="hdnAddPriestID" />
							  <a class="btn btn-primary" name="" style="display:none;" id="btnAddPriest">ADD NOW</a>
                            <a class="btn btn-primary" id="bthCancelDetails">CANCEL</a>
							  
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
                    <a class="btnEdit" style="right:40px;top:-41px;position: absolute;display:none;" title="Back" id="btnrefresh"><i class="halflings-icon white refresh" aria-hidden="true" ></i></a>

							<div class="control-group">
							  <img class="priestimage" id="priestPreview" src="../img/gallery/priest.png"/>
                               
                                <input type="file" value="Choose Image" id="priestimg" accept="image/*" style="position: absolute;top: 10%;left: 7%;cursor:pointer;background-color: lightsteelblue;color: white;" onchange="OnUpload(this);showpreview(this);" />
							</div>          
                        <div class="alert alert-error" id="ErrorBox" style="display: none;">
                             <div id="Displaydiv">
                             </div>
                            </div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtPriestName" placeholder="Search / Add.." autocomplete="off" onkeypress="return isnotNumber(event);" type="text"/>
                                </div>
								</div>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Baptismal Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtPriestBaptismName" onkeypress="return isnotNumber(event);" type="text"/>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Parish</label>
								<div class="controls">
								  <input class="input-large focused" name="Parish" id="txtParish" onkeypress="return isnotNumber(event);" type="text"/>
                                </div>
								</div>
                        <div class="control-group">
								<label class="control-label" for="focusedInput">Diocese</label>
								<div class="controls">
								  <input class="input-large focused" name="Diocese" id="txtDiocese" onkeypress="return isnotNumber(event);" type="text"/>
                                </div>
								</div>
                         <div class="control-group">
							  <label class="control-label" for="date01">DOB</label>
							  <div class="controls">
								<input type="text" class="input-xlarge datepicker" readonly="true" id="priestDOB"/>
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
								<input type="text" class="input-xlarge datepicker" readonly="true" name="Ordination" id="OrdinationDate"/>
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
								  <input class="input-large focused" name="Designation" id="txtDesignation" onkeypress="return isnotNumber(event);" type="text" value=""/>
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
								  <input class="input-large focused" name="Email" id="txtMobile" onkeypress="return isNumber(event);" type="text" value=""/>
								</div>
								</div>
                        
						<input type="hidden" id="hdfPriestID" />
							<div class="form-actions">
							  <a class="btn btn-primary saveAll" name="" id="btnSavePriest">Save changes</a>
                                <a id="btnCancelPriest" class="btn btn-primary cancelAll">Cancel</a>
                                <a class="btn btn-primary" name="" id="btnDelete">Delete</a>
							  
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
						
			</div>

      </div>
    <%--  <input type="hidden" id="hdfpriestID"/>--%>
      <input type="hidden" id="hdfpriestImageID"/>
</asp:Content>
