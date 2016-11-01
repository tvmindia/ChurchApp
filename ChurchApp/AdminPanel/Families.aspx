<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Families.aspx.cs" Inherits="ChurchApp.AdminPanel.Families" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <link href="../CSS/CustomCSS/Families.css" rel="stylesheet" />
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
     <div class="accordion" id="accordion2">
<div class="accordion-group">
<div class="accordion-heading">
   
<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">Unit #1</a>
     <a href="#" class="unitViewDetails">View Details</a>
       
    </div>
    <div id="collapseOne" class="accordion-body collapse in">
      <div class="accordion-inner">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
      <div class="accordion-inner">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
       <div class="accordion-inner">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
    
    </div>
  </div>
  <div class="accordion-group">
    <div class="accordion-heading">
      <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">Unit #2</a>
         <a href="#" class="unitViewDetails">View Details</a>
    </div>
    <div id="collapseTwo" class="accordion-body collapse">
       <div class="accordion-inner">Family1<span class="familyViewDetails"><a href="#">View Details</a></span></div>
    </div>
  </div>
</div>
  
</div><!--span6-->


	<div id="FamilyEditDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Edit</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        
					

							<div class="control-group">
							  <label class="control-label" for="focusedInput">Family Name</label>
							  <div class="controls">
								<input class="input-large focused" id="txtFamilyName" type="text"/>
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

    <div id="UnitEditDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Edit</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        
					

							<div class="control-group">
							  <label class="control-label" for="focusedInput">Unit Name</label>
							  <div class="controls">
								<input class="input-large focused" id="txtUnitName" type="text"/>
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


    <div id="FamilyViewDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Details</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        <div class="Familyeditdiv">
                        <a href="#"><i class="fa fa-pencil familyEdit" aria-hidden="true"></i></a>
					    </div>
					

							<div class="control-group">
							  <label class="control-label" for="focusedInput">Family Name</label>
							  <div class="controls">
							  <label class="control-label" for="focusedInput">Family Name</label>
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

     <div id="UnitViewDivBox" class="span6 noMarginLeft">
					
					<div class="dark">
					
					<h1>Details</h1>
						<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>
                        <div class="Uniteditdiv">
                        <a href="#"><i class="fa fa-pencil unitEdit" aria-hidden="true"></i></a>
					    </div>
					

							<div class="control-group">
							  <label class="control-label" for="focusedInput">Unit Name</label>
							  <div class="controls">
							  <label class="control-label" for="focusedInput">St.Ignatious Unit</label>
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
