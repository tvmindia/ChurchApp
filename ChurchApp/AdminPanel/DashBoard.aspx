<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="DashBoard.aspx.cs" Inherits="ChurchApp.AdminPanel.DashBoard" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/DashBoard.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/DashBoard.js"></script>

    <div id="content" class="span10">
        <ul class="breadcrumb">
 		<li>Dashboard</li>
		</ul>


         <!--churchtable-->
        <div class="row-fluid sortable">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Churches</h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content">
				
						<table class="table table-bordered table-striped table-condensed">
							   <thead>
							  <tr>
								  <th>Username</th>
								  <th>Date registered</th>
								  <th>Role</th>
								  <th>Status</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody>
							<tr>
								<td>church1</td>
								<td class="center">2012/01/01</td>
								<td class="center">Member</td>
								<td class="center">
									<span class="label label-success">Active</span>
								</td>
								<td class="center">
									<a class="circlebtn circlebtn-success" href="#">
										<i class="halflings-icon white zoom-in"></i>  
									</a>
									<a class="circlebtn circlebtn-info" href="#">
										<i class="halflings-icon white edit"></i>  
									</a>
									<a class="circlebtn circlebtn-danger" href="#">
										<i class="halflings-icon white trash"></i> 
									</a>
								</td>
							</tr>
						</tbody>
						 </table>  

                        
                        
					</div>

                    <div class="box-content">
                         	<div class="form-horizontal">
						
							<fieldset>
                             <div class="span12">   
				             <div class="span6">
						     
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Church Name</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtChurchName" id="txtChurchName" placeholder="Enter Church name" type="text"/>
                              </div>
                              </div>

                              <div class="control-group">
                             <label class="control-label" for="focusedInput">Town Code</label>
                               <div class="controls">
                                  <select id="selectError3"><option>Town 1</option><option>Town 2</option><option>Town 3</option></select>
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

                              
                             <div class="control-group">
								<label class="control-label">Main Image</label>
								<div class="controls">
								  <input type="file"/>
								</div>
							  </div>

                             
                                  </div>
                             <div class="span6">
                                  
						      <div class="control-group">

                              <label class="control-label" for="focusedInput">Phone 1</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtPhone1" id="txtPhone1" placeholder="" type="text"/>
                              </div>
                              </div>

                                <div class="control-group">

                              <label class="control-label" for="focusedInput">Phone 2</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtPhone2" id="txtPhone2" placeholder="" type="text"/>
                              </div>
                              </div>

                                 <div class="control-group">

                              <label class="control-label" for="focusedInput">Main Priest</label>
                               <div class="controls">
                                <select id="selectMainPriest"><option>Priest 1</option><option>Priest 2</option><option>Priest 3</option></select>
                              </div>
                              </div>


                                 <div class="control-group">

                              <label class="control-label" for="focusedInput">Longitude</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtLongitude" id="txtLongitude" placeholder="" type="text"/>
                              </div>
                              </div>
                                 <div class="control-group">

                              <label class="control-label" for="focusedInput">Latitude</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtLatitude" id="txtLatitude" placeholder="" type="text"/>
                              </div>
                              </div>

                                   <div class="control-group">
                             <label class="control-label" for="focusedInput">Address</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtAddress" name="txtAddress" rows="3" placeholder=""></textarea>
                               </div>
                             </div>
                                        </div>
                             </div>
                     
                             
                     
                         </fieldset>
                                 </div>
                       
                    </div>
                    	 
						
							 
			
                   <footer id="footer" runat="server" class="form-actions">
                                        <a class="btn btn-primary AddBoutique" href="#">Save</></a>
                                        <a class="btn CancelClear">Cancel</a>
                                    </footer>	
					
		      </div>
				</div>
		
	
         <!--churchtable-->
     

       







    </div><!--span10 end-->
</asp:Content>
