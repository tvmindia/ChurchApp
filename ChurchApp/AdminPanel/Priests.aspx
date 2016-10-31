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
					
					<div class="priority high"><span>Vicar</span></div>
					
					<div class="task high">
                        <ul class="dashboard-list">
						<li class="vicarlist">
								<a href="#">
									<img class="priestimage" src="../img/gallery/assist%20vicar.jpg"/>
								</a>
					      		<strong>Name:</strong> Fr.Jacob Thunkuzhi<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Status:</strong> Vicar<br/> 
                               <ul><li><div class="priesteditdiv">
                                    	<a href="#"><i class="fa fa-pencil priestEdit" aria-hidden="true"></i>dfdf</a>
								</div></li></ul>
                            
                                                       						
							</li>
                            </ul>
					</div>

                    <div class="task high">
                        <ul class="dashboard-list">
						<li class="vicarlist">
								<a href="#">
									<img class="priestimage" src="../img/gallery/assist%20vicar.jpg"/>
								</a>
								<div class="priesteditdiv">
                                    	<a href="#"><i class="fa fa-pencil priestEdit" aria-hidden="true"></i></a>
								</div>
													
												   
								<strong>Name:</strong> Fr.Jacob Thunkuzhi<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Status:</strong> Vicar<br/> 
                                                       						
							</li>
                            </ul>
					</div>

                 
                 
                   


				
					
					
					
				
					
					<div class="priority low"><span>Asst. Vicar</span></div>

                    <div class="task low">

                           <ul class="dashboard-list">
						<li class="vicarlist">
								<a href="#">
									<img class="priestimage" src="../img/gallery/assist%20vicar.jpg" alt="St.Thomas Church"/>
								</a>
								<div class="priesteditdiv">
                                    	<a href="#"><i class="fa fa-pencil priestEdit" aria-hidden="true"></i></a>
								</div>
													
												   
								<strong>Name:</strong> Fr.Jacob Thunkuzhi<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Status:</strong> Vicar<br/> 
                                                       						
							</li>
                            </ul>
					
					</div>

                       <div class="task low">

                      <ul class="dashboard-list">
						<li class="vicarlist">
								<a href="#"><img class="priestimage" src="../img/gallery/assist%20vicar.jpg" alt="St.Thomas Church"/></a>
								<div class="priesteditdiv">
                                    	<a href="#"><i class="fa fa-pencil priestEdit" aria-hidden="true"></i></a>
								</div>
													
												   
								<strong>Name:</strong> Fr.Jacob Thunkuzhi<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Status:</strong> Vicar<br/>
                                                       						
							</li>
                            </ul>
					
					</div>
					
				
					<div class="clearfix"></div>		
					
				</div>
				
				<div id="PriestEditDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Edit</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        
					

							<div class="control-group">
							  <label class="control-label" for="fileInput">Picture URL</label>
							  <div class="controls">
								<input class="input-large focused" id="txtImageVicarURL" type="text"/>
							  </div>
							</div>          
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Name" id="txtPriestName" type="text" value="Albert Thomson"/>
								</div>
								</div>
                         <div class="control-group">
							  <label class="control-label" for="date01">DOB</label>
							  <div class="controls">
								<input type="text" class="input-xlarge datepicker" id="priestDOB" value="02/16/12"/>
							  </div>
							</div>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">About</label>
								<div class="controls">
								<textarea tabindex="3" class="input-xlarge" id="txtAboutPriest" name="AboutPriest" rows="12" placeholder="">The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century. Each had its several institutions and properties as well as high resources. St. George Church is chronologically prior as it was established in 1845 AD. This originated at the request of the Christian merchants who migrated to Irinjalakuda during the regime of Rama Varma Thampuran (known as “Sakthan Thampuran” – 1790-1805) the king of Kochi. He invited the Christian merchants from the neighboring ancient Catholic regions such as Velayanad, Mapranam, Kalparambu etc. in view of trade and industry. Thus a small Church was constructed here, then known as Kombarakunnu under the guidance of the Parish Priest of Mapranam Church. Later they tried for building a spacious Church. However, in 1874 the so-called “Mellus Schism” affected the area and the majority succumbed to it. But a ministry resisted and tried to continue in the papal allegiance. With that view they constructed a new and better Church in 1880 and dedicated to the Blessed Virgin Mary (ST. Mary’s Church). Gradually several religious, educational and charitable institutions came up and flourished in the area. Though the Mellusian group got away from that influence and rejoined the Papal allegiance, both the Churches remained side by side as separate Catholic Parishes without territorial limits. They cherished Concord and Cordiality. In 1944 St. George Church was raised to the Status of a Forane Church.</textarea>
								</div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Ordination Date</label>
							  <div class="controls">
								<input type="text" class="input-xlarge datepicker" id="OrdinationDate" value="02/16/12"/>
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
								<textarea tabindex="3" class="input-xlarge" id="txtAddress" name="Address" rows="12" placeholder="">The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century. Each had its several institutions and properties as well as high resources. St. George Church is chronologically prior as it was established in 1845 AD. This originated at the request of the Christian merchants who migrated to Irinjalakuda during the regime of Rama Varma Thampuran (known as “Sakthan Thampuran” – 1790-1805) the king of Kochi. He invited the Christian merchants from the neighboring ancient Catholic regions such as Velayanad, Mapranam, Kalparambu etc. in view of trade and industry. Thus a small Church was constructed here, then known as Kombarakunnu under the guidance of the Parish Priest of Mapranam Church. Later they tried for building a spacious Church. However, in 1874 the so-called “Mellus Schism” affected the area and the majority succumbed to it. But a ministry resisted and tried to continue in the papal allegiance. With that view they constructed a new and better Church in 1880 and dedicated to the Blessed Virgin Mary (ST. Mary’s Church). Gradually several religious, educational and charitable institutions came up and flourished in the area. Though the Mellusian group got away from that influence and rejoined the Papal allegiance, both the Churches remained side by side as separate Catholic Parishes without territorial limits. They cherished Concord and Cordiality. In 1944 St. George Church was raised to the Status of a Forane Church.</textarea>
								</div>
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
							  <button type="reset" class="btn btn-primary">Cancel</button>
							</div>
						  </fieldset>
					</div>   
					</div>
				
				</div>
				
				</div>	
						
			</div>
                  
					
				
			
			




        
				
			
		
				
			
			
                
             


</div>
</asp:Content>
