<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="ChurchApp.AdminPanel.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">




     <div id="content" class="span10">
         <!--breadcrumb-->
            <ul class="breadcrumb">
				<li>
					<i class="icon-home"></i>
				</li>
				<li>Home</li>
			</ul>
         <!--breadcrumb-->

          <!--churchtable-->
        <div class="row-fluid sortable">		
				<div class="box span12">
					<div class="box-header" data-original-title>
						<h2><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>ST.Thomas Cathedral</h2>
						<div class="box-icon">
						
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
						
						</div>
					</div>
					<div class="box-content">
                        <!--left division-->
					<div class="span12" style="background-color:#fff;">
                      
						
                             <%-- <div class="control-group">
							  <label class="control-label">St.Thomas Cathedral</label>
				             </div>--%>

                             

                                <h3>St.Thomas Syro-Malabar Catholic Cathedral,Irinjalakuda</h3>
								<h3>About the Church</h3>
								<p>The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century. Each had its several institutions and properties as well as high resources. St. George Church is chronologically prior as it was established in 1845 AD. This originated at the request of the Christian merchants who migrated to Irinjalakuda during the regime of Rama Varma Thampuran (known as “Sakthan Thampuran” – 1790-1805) the king of Kochi. He invited the Christian merchants from the neighboring ancient Catholic regions such as Velayanad, Mapranam, Kalparambu etc. in view of trade and industry. Thus a small Church was constructed here, then known as Kombarakunnu under the guidance of the Parish Priest of Mapranam Church. Later they tried for building a spacious Church. However, in 1874 the so-called “Mellus Schism” affected the area and the majority succumbed to it. But a ministry resisted and tried to continue in the papal allegiance. With that view they constructed a new and better Church in 1880 and dedicated to the Blessed Virgin Mary (ST. Mary’s Church). Gradually several religious, educational and charitable institutions came up and flourished in the area. Though the Mellusian group got away from that influence and rejoined the Papal allegiance, both the Churches remained side by side as separate Catholic Parishes without territorial limits. They cherished Concord and Cordiality. In 1944 St. George Church was raised to the Status of a Forane Church.</p>
								
                          <ul>
						  <li>Lorem ipsum dolor sit amet</li>
						  <li>Consectetur adipiscing elit</li>
						  <li>Integer molestie lorem at massa</li>
						  <li>Facilisis in pretium nisl aliquet</li>
						  <li>Nulla volutpat aliquam velit
							<ul>
							  <li>Phasellus iaculis neque</li>
							  <li>Purus sodales ultricies</li>
							  <li>Vestibulum laoreet porttitor sem</li>
							  <li>Ac tristique libero volutpat at</li>
							</ul>
						  </li>
						  <li>Faucibus porta lacus fringilla vel</li>
						  <li>Aenean sit amet erat nunc</li>
						  <li>Eget porttitor lorem</li>
						</ul>        

							



					</div>
                          <!--right division-->
                    <div class="span12" style="background-color:#ffffff">

                        	   <div id="image-9" class="masonry-thumb">
								<a style="background:url(img/gallery/photo9.jpg)" title="Sample Image 9" href="img/gallery/photo9.jpg"><img class="grayscale" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="Sample Image 9"/></a>
							   </div>


                               <fieldset>
                                <div class="control-group form-horizontal">
								<label class="control-label" for="focusedInput">Church Name</label>
								<div class="controls">
								  <input class="input-large focused" id="focusedInput" type="text"/>
								</div>
                                 </div>


                                <div class="control-group form-horizontal">
								<label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
                               <textarea tabindex="3" class="input-xlarge span12" id="message" name="body" rows="12" placeholder="O"></textarea>
								
								</div>
                                 </div>



						        <div class="control-group form-horizontal">
								<label class="control-label">File Upload</label>
								<div class="controls">
								  <input type="file"/>
								</div>
							  </div>
						
							  <div class="form-actions">
								<button type="submit" class="btn btn-primary">Save changes</button>
								<button class="btn">Cancel</button>
							  </div>
							</fieldset>






                    </div>
                        





                        
                                  
					</div>
				</div><!--/span12-->
		
		</div><!--/row-fluid sortable-->
         <!--churchtable-->



    </div>  <!--end of span10 content-->
</asp:Content>
