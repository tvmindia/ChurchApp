<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Priests.aspx.cs" Inherits="ChurchApp.AdminPanel.Priests" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Priests.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Priests.js"></script>
      <div id="content" class="span10">

           <ul class="breadcrumb">
             <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Priests</li>
				
			</ul>
          <div class="row-fluid">
          <div class="span6">
			<h1>Current Vicars</h1>
			<div class="priority high"><span>Vicar</span><a href="#" class="btn btn-lg btn-round btn-primary" title="" onclick="OpenNewAdd();">NEW <i class="glyph-icon icon-plus"></i></a></div>
			<div class="task high">
             <ul class="dashboard-list vicarlist">
				<li >
				<img class="priestimage" src="../img/gallery/priest.png"/>
                    </li>
                 <li >
                     <br />
                     <br />
                     <br />
				<span style="font-size:32px;font-weight:500;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;color:#647587"> No record Found</span> <br/>
				  
				</li>
                </ul>
                
				</div>
              <div id="assVicardiv">
                    <div class="priority low"><span>Asst. Vicar</span><a href="#" class="btn btn-lg btn-round btn-primary" style="left:75%!important;" title="">NEW <i class="glyph-icon icon-plus"></i></a></div>
                    <div class="task low">
                    <ul class="dashboard-list vicarlist">
				<li >
				<img class="priestimage" src="../img/gallery/kozhipadan.jpg"/>
                    </li>
                 <li >
				<span style="font-size:32px;font-weight:500;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;color:#9e5d5d"> Fr.Varghees Kozhipadan</span> <br/>
				<strong>Baptismal Name:</strong> Varghese <br/>
                     <strong>House Name</strong> Kozhippadan <br/>
				<strong>Status:</strong> Priest<br/>
                     <strong>Date of Birth:</strong>  30-08-1982<br />
                     <strong>Date of Ordination:</strong> 21-11-2009<br />
                     <a href="#" style="color:saddlebrown;font-weight:700;">View more details</a>  <%-- left:75%;position:relative;--%>
				</li>
                </ul>
					
					</div>
                  </div>
                      <%-- <div class="task low">
                           
                      <ul class="dashboard-list vicarlist">
				<li >
				<img class="priestimage" src="../img/gallery/priest.png"/>
                    </li>
                 <li >
				<span style="font-size:32px;font-weight:500;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;color:#9e5d5d"> No record Found</span> <br/>
				<strong>Baptismal Name:</strong> No record Found <br/>
                     <strong>House Name</strong> No record Found <br/>
				<strong>Status:</strong> No record Found<br/>
                     <strong>Date of Birth:</strong> No record Found<br />
                     <strong>Date of Ordination:</strong> No record Found   
				</li>
                </ul>
					
					</div>--%>
					
				
					<div class="clearfix"></div>		
					
				</div>

				
				<div id="PriestEditDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Details</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        
					<a style="right:30px;position: fixed;"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i> Edit</a>

							<%--<div class="control-group">
							  <label class="control-label" for="fileInput">Picture URL</label>
							  <div class="controls">
								<%--<input class="input-large focused" id="txtImageVicarURL" type="text"/>--%>
                                  <%--<label class="control-label" for="fileInput"></label>
							  </div>
							</div>  --%>        
                         <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <%--<input class="input-large focused" name="Name" id="txtPriestName" type="text" value="Albert Thomson"/>--%>
								  <label class="control-label" for="focusedInput">BR. JOSEPH MANNULLIL, OFM</label>
                                </div>
								</div>
                         <div class="control-group">
							  <label class="control-label" for="date01">DOB</label>
							  <div class="controls">
								<%--<input type="text" class="input-xlarge datepicker" id="priestDOB" value="02/16/12"/>--%>
                                  <label class="control-label" for="date01">02/16/12</label>
							  </div>
							</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">About</label>
								<div class="controls">
								<%--<textarea tabindex="3" class="input-xlarge" id="txtAboutPriest" name="AboutPriest" rows="12" placeholder="">The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century. Each had its several institutions and properties as well as high resources. St. George Church is chronologically prior as it was established in 1845 AD. This originated at the request of the Christian merchants who migrated to Irinjalakuda during the regime of Rama Varma Thampuran (known as “Sakthan Thampuran” – 1790-1805) the king of Kochi. He invited the Christian merchants from the neighboring ancient Catholic regions such as Velayanad, Mapranam, Kalparambu etc. in view of trade and industry. Thus a small Church was constructed here, then known as Kombarakunnu under the guidance of the Parish Priest of Mapranam Church. Later they tried for building a spacious Church. However, in 1874 the so-called “Mellus Schism” affected the area and the majority succumbed to it. But a ministry resisted and tried to continue in the papal allegiance. With that view they constructed a new and better Church in 1880 and dedicated to the Blessed Virgin Mary (ST. Mary’s Church). Gradually several religious, educational and charitable institutions came up and flourished in the area. Though the Mellusian group got away from that influence and rejoined the Papal allegiance, both the Churches remained side by side as separate Catholic Parishes without territorial limits. They cherished Concord and Cordiality. In 1944 St. George Church was raised to the Status of a Forane Church.</textarea>--%>
								
                                <label class="control-label" for="focusedInput">The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century</label></div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Ordination Date</label>
							  <div class="controls">
								<%--<input type="text" class="input-xlarge datepicker" id="OrdinationDate" value="02/16/12"/>--%>
                                  <label class="control-label" for="date01">02/16/12</label>
							  </div>
							</div>

                       
						  <div class="control-group">
								<label class="control-label" for="focusedInput">Designation</label>
								<div class="controls">
								  <%--<input class="input-large focused" name="Designation" id="txtDesignation" type="text" value=""/>--%>
                                    <label class="control-label" for="focusedInput">Guest Vicar</label>
								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Address</label>
								<div class="controls">
								<%--<textarea tabindex="3" class="input-xlarge" id="txtAddress" name="Address" rows="12" placeholder="">The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century. Each had its several institutions and properties as well as high resources. St. George Church is chronologically prior as it was established in 1845 AD. This originated at the request of the Christian merchants who migrated to Irinjalakuda during the regime of Rama Varma Thampuran (known as “Sakthan Thampuran” – 1790-1805) the king of Kochi. He invited the Christian merchants from the neighboring ancient Catholic regions such as Velayanad, Mapranam, Kalparambu etc. in view of trade and industry. Thus a small Church was constructed here, then known as Kombarakunnu under the guidance of the Parish Priest of Mapranam Church. Later they tried for building a spacious Church. However, in 1874 the so-called “Mellus Schism” affected the area and the majority succumbed to it. But a ministry resisted and tried to continue in the papal allegiance. With that view they constructed a new and better Church in 1880 and dedicated to the Blessed Virgin Mary (ST. Mary’s Church). Gradually several religious, educational and charitable institutions came up and flourished in the area. Though the Mellusian group got away from that influence and rejoined the Papal allegiance, both the Churches remained side by side as separate Catholic Parishes without territorial limits. They cherished Concord and Cordiality. In 1944 St. George Church was raised to the Status of a Forane Church.</textarea>--%>
								
                                <label class="control-label" for="focusedInput">Ernakulam </label>

								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Email</label>
								<div class="controls">
								  <%--<input class="input-large focused" name="Email" id="txtEmail" type="text" value=""/>--%>
                                    <label class="control-label" for="focusedInput">stchurchenk@gmail.com</label>
								</div>
								</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Mobile</label>
								<div class="controls">
								  <%--<input class="input-large focused" name="Email" id="txtMobile" type="text" value=""/>--%>
                                    <label class="control-label" for="focusedInput">9995556661</label>
								</div>
								</div>
                        
						
							<div class="form-actions">
							  <button type="submit" class="btn btn-primary">Save changes</button>
							  <button type="reset" class="btn btn-primary">Cancel</button>
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
                <div id="PriestEd" style="display:none;" class="span6 noMarginLeft">
					<div class="dark">
					<h1>Add Details</h1>
					<div class="box-content">
					<div class="form-horizontal">
				    <fieldset>
                    <a style="right:30px;position: fixed;"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i> Edit</a>

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
                        
						
							<div class="form-actions">
							  <button type="submit" class="btn btn-primary">Save changes</button>
							  <a href="Priests.aspx" type="reset" class="btn btn-primary">Cancel</a>
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
						
			</div>
                  
					
				
			
		<script>
		    function OpenNewAdd()
		    {
		        $('#PriestEd').show();
		        $('#assVicardiv').hide();
		    }
		    function showpreview(input) {
		        if (input.files && input.files[0]) {
		            var reader = new FileReader();
		            reader.onload = function (e) {
		                $('#priestPreview').attr('src', e.target.result);
		            }
		            reader.readAsDataURL(input.files[0]);
		        }
		    }
		</script>	




        
				
			
		
				
			
			
                
             


</div>
</asp:Content>
