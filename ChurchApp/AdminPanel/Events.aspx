<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Events.aspx.cs" Inherits="ChurchApp.AdminPanel.Events" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Events.css" rel="stylesheet" />

    <script src="../Scripts/CustomJS/Events.js"></script>

     <div id="content" class="span10">
        <ul class="breadcrumb">
             <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Events</li>
				
			</ul>


         	<div class="row-fluid">
               
                     
				
				<div class="span7">
					<h1>Events</h1>
					
					<div class="priority high"><span>Latest Events</span></div>
					
					<div class="task high">
                        <ul class="dashboard-list">
						<li class="Eventlist">
								<a href="#">
									<img class="Eventimage" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/>
								</a>
								<%--<div class="Eventeditdiv">
                                    	<a href="#"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i></a>
								</div>--%>
													
												   
								<strong>Name:</strong> Festival 2016<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Expiry Date:</strong> Jul 25, 2012
                               <div class="Eventeditdiv">
                                    	<a href="#">View Details</a>
								</div> 
                                                       						
							</li>
                            </ul>
					</div>

                   		<div class="task high">
                        <ul class="dashboard-list">
						<li class="Eventlist">
								<a href="#">
									<img class="Eventimage" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/>
								</a>
								<%--<div class="Eventeditdiv">
                                    	<a href="#"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i></a>
								</div>--%>
													
												   
								<strong>Name:</strong> Festival 2016<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Expiry Date:</strong> Jul 25, 2012
                            <div class="Eventeditdiv">
                                    	<a href="#">View Details</a>
								</div> 
                                                       						
							</li>
                            </ul>
					</div>

                 
                 
                   


				
					
					
					
				
					
					<div class="priority low"><span>Old Events</span></div>

                    <div class="task low">

                           <ul class="dashboard-list">
						<li class="Eventlist">
								<a href="#">
									<img class="Eventimage" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/>
								</a>
								<%--<div class="Eventeditdiv">
                                    	<a href="#"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i></a>
								</div>--%>
													
												   
								<strong>Name:</strong> Festival 2016<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Expiry Date:</strong> Jul 25, 2012 
                                <div class="Eventeditdiv">
                                    	<a href="#">View Details</a>
								</div>                       						
							</li>
                            </ul>
					
					</div>

                       <div class="task low">

                    <ul class="dashboard-list">
						<li class="Eventlist">
								<a href="#">
									<img class="Eventimage" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church"/>
								</a>
								<%--<div class="Eventeditdiv">
                                    	<a href="#"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i></a>
								</div>--%>
													
												   
								<strong>Name:</strong> Festival 2016<br/>
								<strong>Since:</strong> Jul 25, 2012 11:09<br/>
								<strong>Expiry Date:</strong> Jul 25, 2012
                            <div class="Eventeditdiv">
                                    	<a href="#">View Details</a>
								</div> 
                                                       						
							</li>
                            </ul>
					
					</div>
					
				
					<div class="clearfix"></div>		
					
				</div>
				
				<div id="EventEditDivBox" class="span5 noMarginLeft">
					
					<div class="dark">
					
					<h1>Details</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                      
					
                        <a style="right:30px;position: fixed;"><i class="fa fa-pencil eventEdit" aria-hidden="true"></i> Edit</a>
							  
                         <div class="control-group" style="margin-top:20px">
								<label class="control-label" for="focusedInput">Event Name</label>
								<div class="controls">
								  <%--<input class="input-large focused" name="Name" id="txtEventName" type="text"/>--%>
                                    <label class="control-label" for="focusedInput">Fest of St. Francies of Assisi</label>
								</div>
								</div>
                        

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
								<label class="control-label" for="focusedInput">The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century. Each had its several institutions and properties as well as high resources. St. George Church is chronologically prior as it was established in 1845 AD. This originated at the request of the Christian merchants who migrated to Irinjalakuda during the regime of Rama Varma Thampuran (known as “Sakthan Thampuran” – 1790-1805) the king of Kochi. He invited the Christian merchants from the neighboring ancient Catholic regions such as Velayanad, Mapranam, Kalparambu etc. in view of trade and industry. Thus a small Church was constructed here, then known as Kombarakunnu under the guidance of the Parish Priest of Mapranam Church. Later they tried for building a spacious Church. However, in 1874 the so-called “Mellus Schism” affected the area and the majority succumbed to it. But a ministry resisted and tried to continue in the papal allegiance. With that view they constructed a new and better Church in 1880 and dedicated to the Blessed Virgin Mary (ST. Mary’s Church). Gradually several religious, educational and charitable institutions came up and flourished in the area. Though the Mellusian group got away from that influence and rejoined the Papal allegiance, both the Churches remained side by side as separate Catholic Parishes without territorial limits. They cherished Concord and Cordiality. In 1944 St. George Church was raised to the Status of a Forane Church.</label>
								</div>
								</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Start Date</label>
							  <div class="controls">
								<label  class="control-label" for="date01">02/16/12</label>
							  </div>
							</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">End Date</label>
							  <div class="controls">
								<label class="control-label" for="date01">02/16/12</label>
							  </div>
							</div>

                          <div class="control-group">
							  <label class="control-label" for="date01">Expiry Date</label>
							  <div class="controls">
								<label class="control-label" for="date01">02/16/12</label>
							  </div>
							</div>

                       
					     <div class="control-group">
								<label class="control-label">Auto Hide</label>
								<div class="controls">
								  <label class="radio">
									<input type="radio" name="Hide" id="optHideYes" value="Yes" checked=""/>
									Yes
								  </label>
								
								  <label class="radio">
									<input type="radio" name="Hide" id="optHideNo" value="No"/>
									No
								  </label>
								</div>
							  </div>


                        
					     <div class="control-group">
								<label class="control-label">IsDelete</label>
								<div class="controls">
								  <label class="radio">
									<input type="radio" name="Delete" id="optDeleteYes" value="Yes" checked=""/>
									Yes
								  </label>
							
								  <label class="radio">
									<input type="radio" name="Delete" id="optDeleteNo" value="No"/>
									No
								  </label>
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
