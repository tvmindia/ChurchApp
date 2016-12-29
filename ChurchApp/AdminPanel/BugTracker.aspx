<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="BugTracker.aspx.cs" Inherits="ChurchApp.AdminPanel.BugTracker" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">

    <link href="../CSS/CustomCSS/BugTracker.css" rel="stylesheet" />
      <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/BugTracker.js"></script>
  

    <div id="content" class="span10">
        <ul class="breadcrumb">
 		<li>Bug Tracker</li>
		</ul>

         <!--BugTrackerTable-->
        <div class="row-fluid">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2>BugTracker</h2>
						<div class="box-icon">
						
							<a  style="cursor:pointer;" class="btn-minimize churchdoublebox"><i id="churchchevronup" class="halflings-icon chevron-down"></i></a>
						
						</div>
					</div>
					<div class="box-content ErrorBox">
				
						<table class="table table-bordered table-striped table-condensed" id="ErrorTable">
							   <thead>
							  <tr>
                                  <th>ErrorID</th>
                                  <th>Church</th>
								  <th>Module</th>
								  <th>Method</th>
								  <th>Source</th>
                                  <th>Version</th>
                                  <th>Date</th>
								  <th>Action</th>
							  </tr>
						  </thead>   
						  <tbody>
						
						</tbody>
						 </table>  

                        <br />
               
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
                               <input class="input-large focused" name="txtChurchName" id="txtChurchName" type="text" readonly/>
                              </div>
                              </div>

                              <div class="control-group">
                             <label class="control-label" for="focusedInput">User</label>
                               <div class="controls">
                                  <input type="text" class="input-large focused" name="txtUser" id="txtUser" readonly/>
                                  
                                 </div>
                             </div>
                                   <div class="control-group">
                             <label class="control-label" for="focusedInput">Description</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtDescription" name="Description" rows="3" readonly></textarea>
                               </div>
                             </div>

                                   <div class="control-group">
                             <label class="control-label" for="focusedInput">Date & Time</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtErrorDate" name="txtErrorDate" readonly></textarea>
                               </div>
                             </div>
							
							


                              <div class="control-group">
                             <label class="control-label" for="focusedInput">Module</label>
                               <div class="controls">
                                 <textarea tabindex="3" class="input-large" id="txtModule" name="txtModule" readonly></textarea>
                               </div>
                             </div>
                                   <div class="control-group">

                              <label class="control-label" for="focusedInput">Method</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtMethod" id="txtMethod" type="text" readonly/>
                              </div>
                              </div>
                                  </div>
                             <div class="span6">
                                  
						    

                                <div class="control-group">

                              <label class="control-label" for="focusedInput">Version</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtVersion" id="txtVersion" type="text" readonly/>
                              </div>
                              </div>

                                <div class="control-group">

                              <label class="control-label" for="focusedInput">Source</label>
                               <div class="controls">
                               <input class="input-large focused" name="txtSource" id="txtSource" type="text" readonly/>
                              </div>
                              </div>
                                    <div class="control-group">

                              <label class="control-label" for="focusedInput">AppBuild</label>
                               <div class="controls">
                               <textarea class="input-large focused" name="txtAppBuild" id="txtAppBuild" tabindex="2" readonly></textarea>
                              </div>
                              </div>
                                    <div class="control-group">

                              <label class="control-label" for="focusedInput">AppLog Category</label>
                               <div class="controls">
                               <textarea class="input-large focused" name="txtAppLogCat" id="txtAppLogCat" tabindex="2" readonly></textarea>
                                  <input type="image" src="../img/copy.png" onclick="return CopyAppLog();" title="copy text to clipboard" style="height:20px;width:20px;"/>
                              </div>
                              </div>
                                 <div class="control-group">

                              <label class="control-label" for="focusedInput">IsMobile</label>
                               <div class="controls">
                               <div id="isActiveMobile">
								  <label class="radio">
									<input type="radio" name="optionsRadiosMobileFixed" id="OptIsMobileYes" value="true" checked="" disabled="disabled"/>
									Yes
								  </label>
								
								  <label class="radio">
									<input type="radio" name="optionsRadiosMobileFixed" id="OptIsMobileNo" value="false" disabled="disabled" />
									No
								  </label>
                                        </div>
                              </div>
                              </div>
                                

                                   <div class="control-group">
								<label class="control-label">Is Fixed</label>
								<div class="controls">
                                     <div id="isFixedbtn">
								  <label class="radio">
									<input type="radio" name="optionsRadiosFixed" id="OptIsFixedYes" value="true" checked=""/>
									Yes
								  </label>
								
								  <label class="radio">
									<input type="radio" name="optionsRadiosFixed" id="OptIsFixedNo" value="false" />
									No
								  </label>
                                        </div>
								</div>
                                     
							  </div>
                                   
                                   
                                 
                                    </div>
                                 
                             </div>
                     
                             
                     
                         </fieldset>
                            <div id="footer" runat="server" class="form-actions">
                                        <a class="btn btn-primary updateBug" href="#">Save</></a>
                                        <a class="btn btn-primary BugClear">Cancel</a>
                                    </div>	
                        </div>
                       
					</div>

                    
					
		         </div>
				</div>
		
	    
         <!--BugTrackerTable-->

        </div>

    <input type="hidden" id="hdfErrorID" />
</asp:Content>
