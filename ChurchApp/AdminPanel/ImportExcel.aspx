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
      .lblRows
      {
          float: left;
    padding-top: 5px;
    text-align: left;
    font-size: small;
    font-weight: 600;
      }
  </style>

    <div id="content" class="span10">
        <ul class="breadcrumb">
 		<li>Import Excel</li>
		</ul>
        <!--Import Excel field-->  
        <div class="row-fluid " style="margin-top:3%">		
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
                                      <select class="ddlexcel" id="ddlexceldropdown" onchange="ddldropdownchange()">
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

                   <div class="span11" style="border-bottom:1px solid black;margin-left:28px;" data-original-title>
						<h3>Import Details</h3>
					</div>
                <div class="span11" id="errorLabelsDiv">
                     <div class="span5">
                      <div class="form-horizontal">
                <fieldset>
                      <div class="control-group">

                              <label class="control-label" for="focusedInput">Total Rows</label>
                               <div class="controls">
                             <label id="lblTotalRows" class="lblRows" style="width:30px !important;"></label>
                              </div>
                              </div>
                                    <div class="control-group">

                              <label class="control-label" for="focusedInput">Errors Rows</label>
                               <div class="controls">
                             <label id="lblErrorCount" class="lblRows" style="width:30px !important;"></label>
                              </div>
                              </div>
                </fieldset>
                          </div>
            </div>
             <div class="span6">
                  <div class="form-horizontal">
                <fieldset>
                        <div class="control-group">

                              <label class="control-label" style="width:165px !important" for="focusedInput">Rows Inserted</label>
                               <div class="controls">
                             <label id="lblInsertCount" class="lblRows"></label>
                              </div>
                              </div>
                                            <div class="control-group">

                              <label class="control-label" style="width:165px !important" for="focusedInput">Rows Updated</label>
                               <div class="controls">
                             <label id="lblUpdateCount" class="lblRows" ></label>
                              </div>
                              </div>
                </fieldset>
                      </div>
            </div>
                </div>
                
  
           
            

           <div class="box span11" id="errorTableDiv">  
                
                     <div class="" style="border-bottom:2px solid black" data-original-title>
						<h3>Error Details</h3>
					
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
