<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notify.aspx.cs" Inherits="ChurchApp.AdminPanel.Notify" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
      <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-bootpag/1.0.4/jquery.bootpag.js" ></script>--%>
    <link href="../CSS/CustomCSS/Notifications.css" rel="stylesheet" />
    <link href="../CSS/dataTables.checkboxes.css" rel="stylesheet" />
     <script src="../Scripts/CustomJS/Notifications.js"></script>
    <script src="../Scripts/DataTables/dataTables.checkboxes.js"></script>
     <script src="../Scripts/CustomJS/Common.js"></script>
   
   <%-- <style>
        #dtbselect option{
            font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif!important;
            font-size:12px!important;
        }


buttonpatch {
	text-align: center;
	font-family: Arial;
	background: #f8f8f8 url(images/bg.jpg);
}



.buttonpatch a {
	margin-right: 30px;
	width: 32px;
	height: 32px;
	display: inline-block;
	position: relative;
    cursor:pointer;
	/*line-height: 40px;*/
	background-color: #eaeaea;
	background-image: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#eaeaea));
	background-image: -webkit-linear-gradient(top, #f6f6f6, #eaeaea);
	background-image: -moz-linear-gradient(top, #f6f6f6, #eaeaea); 
	background-image: -ms-linear-gradient(top, #f6f6f6, #eaeaea); 
	background-image: -o-linear-gradient(top, #f6f6f6, #eaeaea);
	background-image: linear-gradient(top, #f6f6f6, #eaeaea);
	-moz-border-radius: 32px;
	-webkit-border-radius: 32px;
	border-radius: 32px;
	-moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .25), 0 2px 3px rgba(0, 0, 0, .1);
	-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .25), 0 2px 3px rgba(0, 0, 0, .1);
	box-shadow: 0 1px 1px rgba(0, 0, 0, .25), 0 2px 3px rgba(0, 0, 0, .1);
}

.buttonpatch a:active {
	/*top: 1px;*/
	background-image: -webkit-gradient(linear, left top, left bottom, from(#eaeaea), to(#f6f6f6));
	background-image: -webkit-linear-gradient(top, #eaeaea, #f6f6f6);
	background-image: -moz-linear-gradient(top, #eaeaea, #f6f6f6); 
	background-image: -ms-linear-gradient(top, #eaeaea, #f6f6f6); 
	background-image: -o-linear-gradient(top, #eaeaea, #f6f6f6);
	background-image: linear-gradient(top, #eaeaea, #f6f6f6);
}

.buttonpatch a::before{
		content: '';
		position: absolute;
		z-index: -1;
		top: -8px;
		right: -8px;
		bottom: -8px;
		left: -8px;
		background-color: #eaeaea;
		-moz-border-radius: 140px;
		-webkit-border-radius: 140px;
		border-radius: 140px;
	opacity: 0.5;		
}

.buttonpatch a:active::before {
	top: -7px;
}

.buttonpatch a:hover::before { opacity: 1; }

.buttonpatch a.twitter:hover::before {
	background-color: #c6f0f8;
}

.buttonpatch a.facebook:hover::before {
	background-color: #56ea87;
}

.buttonpatch a.dribble:hover::before {
	background-color: #f8ebb6;
}

.buttonpatch a.rss:hover::before {
	background-color:#fadae6 ;
}

.twitter img { vertical-align: -9px;position:relative;left:7px }
.dribble img { vertical-align: -9px;position:relative;left:7px }
.facebook img { vertical-align: -9px;position:relative;left:7px}
.rss img { vertical-align: -9px;position:relative;left:7px}

.buttonpatch a img { border: 0; }


/*.footer {
	width: 600px;
	margin: auto;
	margin-top: 100px;
	font-size: 15px;
	font-weight: bold;
	color: #cdcdcd;
	text-shadow: 1px 2px 0 #fff;
}

.footer a { color: #bebebe; text-decoration: none; }
.footer a:hover { color: #bebebe; text-decoration: none; border-bottom: 1px dashed #cdcdcd; }*/


a[title]:hover:after{
content: attr(title);
padding: 4px 6px;
color: #85003a;
position: absolute;
left: 0;
top: 100%;
white-space: nowrap;
z-index: 20;
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius: 3px;
-moz-box-shadow: 0px 0px 2px #c0c1c2;
-webkit-box-shadow: 0px 0px 2px #c0c1c2;
box-shadow: 0px 0px 2px #c0c1c2;
background-image: -moz-linear-gradient(top, #ffffff, #eeeeee);
background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0, #ffffff),color-stop(1, #eeeeee));
background-image: -webkit-linear-gradient(top, #ffffff, #eeeeee);
background-image: -moz-linear-gradient(top, #ffffff, #eeeeee);
background-image: -ms-linear-gradient(top, #ffffff, #eeeeee);
background-image: -o-linear-gradient(top, #ffffff, #eeeeee);
}



    </style>--%>
    <style>
.w3-note {
    background-color: #ffffcc;
    border-left: 6px solid #ffeb3b;
}
.w3-panel {
    padding: 0.01em 16px;
    margin-bottom: 16px!important;
}
.w3-panel:after {
    content: "";
    display: table;
    clear: both;
}
    </style>
    <script>
        function saveoredit(id)
        {
            
            $(id).attr('src', '/img/save.PNG');
            $(id).attr('title', 'Save');
            $(id).attr('onclick', 'NotificationValidation();');
        }
        
    </script>
    <div id="content" class="span10">
        <ul class="breadcrumb" style="margin-bottom:0px;">
				 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Notifications</li>
			</ul>
         
        <div class="buttonpatch" style="position:fixed;width:243px;right:0;top:8%;z-index:198">		
			<a class="facebook" title="Add New" id="btnAddNew" onclick="AddNewclick();"><img  src="/img/add.PNG"/></a>
            <a class="twitter" id="btnMain"><img src="/img/save.png"/></a>
            <a class="dribble" id="btnReset"><img src="/img/reset.png"/></a>
			<a class="rss" id="btnDelete"><img src="/img/delete.png"/></a>
            <a class="rss" id="btnSendNotification"><img src="/img/sentmail.png"/></a>
        </div>

        		<div class="row-fluid" style="margin-top:3%">	
                    <div class="w3-note w3-panel">
                     <p><strong>Tip:</strong> If you are looking for Pushing or Deleting notifications in this page, you please select the checkbox and continue.</p>
                    </div>
                    <table class="display" cellspacing="0" width="100%" id="tblNotifications">
							   <thead>
							  <tr>
                                  <th>ID</th>
                                  <th>LinkID</th>
								  <th></th>
                                  <th>Status</th>
                                  <th>Caption</th>
								  <th>Type</th>
								  <th>Start Date</th>
                                  <th>Expiry Date</th>
                                  <th>Created Date</th>
                                  <th>Processed Date</th>
                                  <th></th>
								  
							  </tr>
						  </thead>   
						  <tbody>
						
						</tbody>
						 </table>
                    <div class="span11" id="divnotificationAdd" style="display:none">
                        <div class="">
                        <h2 ><span class="fa fa-comments-o" aria-hidden="true"></span> <span id="detailsHeading"></span></h2>
					     
					<%--<h1 id="detailsHeading"></h1>--%>
						<div class="box-content">
                                  
					   <div class="form-horizontal">
				    <fieldset>
							  
                         <div class="control-group" style="margin-top:20px" id="lblCaptionH">
								<label class="control-label" for="focusedInput" >Caption</label>
								<div class="controls">
                                   <%-- <label class="control-label" for="focusedInput" id="lblCaption"></label>--%>
								  <input class="input-large focused" name="Caption" id="txtCaption" type="text" />
								</div>
								</div>
                        

                         <div class="control-group" id="lblTypeH">
								<label class="control-label" for="focusedInput" >Notification Type</label>
								
                            <div class="controls">
                                
                                <select id="ddlType" name="NotificationType">
                                    <option></option>
                                </select>
                            </div>
                        </div>
								

                        <div class="control-group" id="lblDescH">
								<label class="control-label" for="focusedInput" >Description</label>
								<div class="controls">
								 <%--<label class="control-label" for="focusedInput" id="lblDescription"></label>--%>
                                     <textarea class="input-large" id="txtDescription" name="Description" rows="5"></textarea>
								  <%--<input class="input-large focused" name="Description" id="txtDescription" type="text" />--%>
								</div>
								</div>

                          <div style="display: none;" class="control-group"  id="lblStartH">
							  <label class="control-label" for="date01">Start Date</label>
							  <div class="controls">
								 <%--<label class="control-label" for="date01" id="lblStartDate"></label>--%>
								  <input  class="input-large datepicker" name="StartDate" id="txtStartDate" type="text" readonly="true" placeholder="Select Start Date"/>
							  </div>
							</div>

                          <div style="display: none;" class="control-group" id="lblExpiryH">
							  <label class="control-label" for="date01" >Expiry Date</label>
							  <div class="controls">
								 <%--<label class="control-label" for="date01" id="lblExpiryDate">Caption</label>--%>
								  <input  class="input-large datepicker" readonly="true" name="ExpiryDate" id="txtExpiryDate" type="text" placeholder="Select Expiry Date"/>
							  </div>
							</div>
                        <div style="display:none;">
                            <div class="control-group" id="lblScheduleH">
						<label class="control-label" for="date01" >Do you want to Schedule?</label>
						

                            

                        <div class="controls">
                                        <label class="radio">
                                            <input type="radio" name="IsnotificationScheduleNeeded" id="rdoNotificationScheduleYes" value="Yes" />
                                            Yes
                                        </label>

                                        <label class="radio">
                                            <input type="radio" name="IsnotificationScheduleNeeded" id="rdoNotificationScheduleNo" value="No" checked="" />
                                            No
                                        </label>
                        </div>
                            	</div>

                        <div class="controls">
                                <input type="text" class="input-large datepicker" readonly="true" id="selectDate"  placeholder="Select date" />
                                </div>
                        <%--onselect="return ScheduleDateSelect();"--%>
                         <div class="controls span3">
                        <table id="notificationScheduleTable" class="table table-striped table-bordered bootstrap-datatable">
						  <thead>
							  <tr>
								  <th>Date</th>
								  <th>Actions</th>
							  </tr>
						  </thead>   
						  <tbody id="notificationScheduleBody">
							
						    </tbody>
					    </table> 
                            </div>
                        </div>
						
					


						  </fieldset>
					</div>   
					</div>
				
				</div>
                    </div>
                    </div>
        </div>
    <input type="hidden" id="hdfNotificationID" />
    <input type="hidden" id="hdfChurchID" />
    <input type="hidden" id="hdfType" />
    <input type="hidden" id="hdfEditID" />
</asp:Content>
