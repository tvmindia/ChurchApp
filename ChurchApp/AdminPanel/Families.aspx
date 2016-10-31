<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Families.aspx.cs" Inherits="ChurchApp.AdminPanel.Families" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Families.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../Scripts/CustomJS/Families.js"></script>
     <div id="content" class="span10">
        <ul class="breadcrumb">
			 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Families</li>
			</ul>
         <div class="row-fluid">
 <div class="span6">
  <h2>Family Units</h2>
   <div class="panel-group" id="accordion">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Unit1</a>
           <a href="#" class="unitViewDetails">View Details</a>
        </h4>
          
      </div>
      <div id="collapse1" class="panel-collapse collapse in">
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
      </div>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">Unit 2</a>
              <a href="#" class="unitViewDetails">View Details</a>
        </h4>
      </div>
      <div id="collapse2" class="panel-collapse collapse">
        <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
           
        </div>
    
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h4 class="panel-title">
          <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">Unit 3</a>
              <a href="#" class="unitViewDetails">View Details</a>
        </h4>
      </div>
      <div id="collapse3" class="panel-collapse collapse">
      <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
          <div class="panel-body">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
      </div>

    </div>
  </div>
</div><!--span6-->


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
