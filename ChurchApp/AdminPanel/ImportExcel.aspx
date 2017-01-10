<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="ImportExcel.aspx.cs" Inherits="ChurchApp.AdminPanel.ImportExcel" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
      
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/CustomJS/Import.js"></script>
  <style>
      #errorLabelsDiv
      {
    background-color: #eeeeee;
    padding-left: 37px;
    color: black;
      }
  </style>

    <div id="content" class="span10">
        <ul class="breadcrumb">
 		<li>Import Excel</li>
		</ul>
        <!--Import Excel field-->  
        <div class="row-fluid ">		
				<div class="box span12">
                     <div class="box-header" data-original-title>
                        <h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>Import Excel</h2>
                        <div class="box-icon">                      
                        <a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
                    </div>
                </div>  

                     <div class="box-content">
                            
                            <div class="control-group">
                                <label class="control-label" >Import Table Name</label>
                                <div class="controls">
                                      <select class="ddlexcel" id="ddlexceldropdown">
                                          <option></option>
                                  </select>
                                </div>
                            </div>
                                 
                            <div class="control-group">
                                <label class="control-label" for="focusedInput">Browse</label>
                                <div class="controls">
                                        <input type="file" onchange="validateExcel();" id="excelfileuploader" />
                                </div>
                            </div>                       
                                                 
                         
                          
                          <div class="form-actions">
							    <a class="btn btn-primary uploadexcel" href="#">Upload</></a>
                    </div> 
                     </div>
                   

                    
				</div>
        </div>
        <div class="row-fluid " id="excelErrorDiv" style="display:none;">

                   <div class="" style="border-bottom:1px solid black" data-original-title>
						<h2>Import Details</h2>
					</div>
                <div class="span11" id="errorLabelsDiv">
                     <div class="span5">
                      <div class="form-horizontal">
                <fieldset>
                      <div class="control-group">

                              <label class="control-label" for="focusedInput">Total No.of Excel Rows</label>
                               <div class="controls">
                             <label id="lblTotalRows" style="width:30px !important;font-weight:bold;"></label>
                              </div>
                              </div>
                                    <div class="control-group">

                              <label class="control-label" for="focusedInput">Total No.of Errors</label>
                               <div class="controls">
                             <label id="lblErrorCount" style="width:30px !important;font-weight:bold;"></label>
                              </div>
                              </div>
                </fieldset>
                          </div>
            </div>
             <div class="span6">
                  <div class="form-horizontal">
                <fieldset>
                        <div class="control-group">

                              <label class="control-label" style="width:165px !important" for="focusedInput">Total No.of Rows Inserted</label>
                               <div class="controls">
                             <label id="lblInsertCount" style="font-weight:bold;"></label>
                              </div>
                              </div>
                                            <div class="control-group">

                              <label class="control-label" style="width:165px !important" for="focusedInput">Total No.of Rows Updated</label>
                               <div class="controls">
                             <label id="lblUpdateCount" style="font-weight:bold;"></label>
                              </div>
                              </div>
                </fieldset>
                      </div>
            </div>
                </div>
                
  
           
            

           <div class="box span11">  
                
                     <div class="" style="border-bottom:2px solid black" data-original-title>
						<h2>Error Details</h2>
					
					</div>
                 
					<div class="box-content churchBox">
				
						<table class="table table-bordered table-striped table-condensed" id="Importtable">
							   <thead>
							  <tr>
                                  <th>Row No</th>
                                  <th>Key Field</th>
								  <th>Error Description</th>
																  
							  </tr>
						  </thead>   
						  <tbody>
						
						</tbody>
						 </table>          
					</div>

  
                </div>
        </div>
        <!--Import Excel field-->
    </div>

   
 <%--   <asp:HiddenField ID="hdfFileName" />
    <asp:HiddenField ID="hdfFileLocation" />--%>
</asp:Content>
