<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Home.aspx.cs" Inherits="ChurchApp.AdminPanel.Home" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
   
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
      <link href="../CSS/CustomCSS/Home.css" rel="stylesheet" />
    <script src="../Scripts/CustomJS/Common.js"></script>
      <script src="../Scripts/CustomJS/Home.js"></script>

    <style>
        ._30vx {
    left: 20px;
    position: absolute;
    top: 15px;
}
._6a {
    display: inline-block;
}
._30v- {
    background-clip: padding-box;
    background-color: #000;
    border: 1px solid #fff;
    border-color: rgba(255, 255, 255, .8);
    border-radius: 2px;
    box-shadow: 0 0 6px rgba(0, 0, 0, .6);
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    opacity: 0;
    overflow: hidden;
    padding: 6px 12px;
    position: relative;
    top: 3px;
    transition: opacity .3s cubic-bezier(.175, .885, .32, 1.275), width .3s step-end;
    white-space: nowrap;
    width: 34px;
    word-wrap: normal;
}
/*a {
    color: #365899;
    cursor: pointer;
    text-decoration: none;
}*/
/*a:-webkit-any-link {
    color: -webkit-link;
    text-decoration: underline;
    cursor: auto;
}*/
._30w0 {
    -webkit-font-smoothing: antialiased;
    padding-left: 26px;
    position: relative;
    top: 1px;
    z-index: 2;
}
._50f7 {
    font-weight: bold;
}
a._p {
    display: block;
}
._30vy {
    height: 34px;
    position: relative;
}
._30vy, ._30vy:hover {
    text-decoration: none;
}
.iconsize{
    font-size:20px;
    color:#bbb3b3!important;
}
._30vz {
    left: 5px;
    opacity: .7;
    position: absolute;
    top: 8px;
    transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
    z-index: 1;
}
._30vy:hover ._30vz, ._30vy:focus ._30vz, ._30vx.openToggler ._30vz, ._30v_ ._30vz, ._3y4k ._30vz, .coverImage:hover ._5pwk ._30vz {
    opacity: .9;
    transform: scale(.75);
}
._30vy:hover ._30v-, ._30vy:focus ._30v-, ._30vx.openToggler ._30v-, ._30v_ ._30v-, ._3y4k ._30v-, .coverImage:hover ._5pwk ._30v- {
    opacity: .8;
    width: 100%;
}
._30vy:hover ._30v-, ._30vy:focus ._30v-, .coverImage:hover ._5pwk ._30v-{
    transition: opacity .3s cubic-bezier(.175, .885, .32, 1.275), width .3s step-start;
}
    </style>
    <script>
        function popUpload()
        {
            $('#flupCoverpic').click();
        }
        function UploadNow()
        {
            alert('hai');
        }
    </script>
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
						<h2 id="h2ChurchName"><i class="fa fa-user" aria-hidden="true"></i><span class="break"></span>ST.Thomas Cathedral</h2>
						<div class="box-icon">
                         <a id="btnAddNew" runat="server" class="btn-setting"><i class="halflings-icon pencil"></i></a>
						<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
					</div>
					</div>

                    <div class="row-fluid" id="churchContainer">
					<div class="box-content" id="IdDivChurchDisplay">

                        <div class="masonry-thumb">
					     <img class="grayscale" src=" " alt="St.Thomas Church"/>
                            
					    </div>

                         <h3 id="h3ChurchName">St.Thomas Syro-Malabar Catholic Cathedral,Irinjalakuda</h3>
								<h3>About the Church</h3>
								<p id="pChurchDesc">The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century. Each had its several institutions and properties as well as high resources. St. George Church is chronologically prior as it was established in 1845 AD. This originated at the request of the Christian merchants who migrated to Irinjalakuda during the regime of Rama Varma Thampuran (known as “Sakthan Thampuran” – 1790-1805) the king of Kochi. He invited the Christian merchants from the neighboring ancient Catholic regions such as Velayanad, Mapranam, Kalparambu etc. in view of trade and industry. Thus a small Church was constructed here, then known as Kombarakunnu under the guidance of the Parish Priest of Mapranam Church. Later they tried for building a spacious Church. However, in 1874 the so-called “Mellus Schism” affected the area and the majority succumbed to it. But a ministry resisted and tried to continue in the papal allegiance. With that view they constructed a new and better Church in 1880 and dedicated to the Blessed Virgin Mary (ST. Mary’s Church). Gradually several religious, educational and charitable institutions came up and flourished in the area. Though the Mellusian group got away from that influence and rejoined the Papal allegiance, both the Churches remained side by side as separate Catholic Parishes without territorial limits. They cherished Concord and Cordiality. In 1944 St. George Church was raised to the Status of a Forane Church.</p>
								
                         


						

					</div>


                    <div class="box-content" id="IdDivChurchEdit">

                          <div class="masonry-thumb">
					     <img class="grayscale" src=" " alt="St.Thomas Church"/>
                              <div class="_6a uiPopover _30vx _5v-0" id="ProfileCoverPhotoSelector" data-ft="{&quot;tn&quot;:&quot;*|&quot;}">
                            <a class="_30vy _5pwk _p" href="#" aria-haspopup="true" aria-expanded="false" rel="toggle" role="button" id="btnUpload" aria-controls="u_1c_3" onclick="popUpload();">
                            <i class="fa fa-camera iconsize _30vz"></i>
                            <div class="_30v-">
                            <span class="_30w0 _50f7">Change Cover Photo</span>
                            </div>
                             </a>
                             <input type="file" onchange="UploadNow();" id="flupCoverpic" style="display:none" />
                          </div>
					    </div>
                          &nbsp;
                        
                    <div class="form-horizontal">
				    <fieldset>
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Name</label>
								<div class="controls">
								  <input class="input-large focused" name="Caption" id="txtCaption" type="text" value="St.Thomas Syro-Malabar Catholic Cathedral,Irinjalakuda"/>
								</div>
								</div>
                          <div class="control-group">
								<label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
								<%--  <input class="input-large focused" name="Description" id="txtDescription" type="text"/>--%>
                                  <textarea tabindex="3" class="input-xlarge span10" id="txtDescription" name="Description" rows="12" placeholder="">The Cathedral Church of the eparchy of Irinjalakuda got its present existence under the nomenclature and the Canonical Status as Cathedral in the Wake of the Origin of the New Eparchy. This was effected by the amalgamation of the two independent and important parishes of the locality, namely, St. George’s Forane Church and St. Mary’s church, which amicably situated side by side for about a century. Each had its several institutions and properties as well as high resources. St. George Church is chronologically prior as it was established in 1845 AD. This originated at the request of the Christian merchants who migrated to Irinjalakuda during the regime of Rama Varma Thampuran (known as “Sakthan Thampuran” – 1790-1805) the king of Kochi. He invited the Christian merchants from the neighboring ancient Catholic regions such as Velayanad, Mapranam, Kalparambu etc. in view of trade and industry. Thus a small Church was constructed here, then known as Kombarakunnu under the guidance of the Parish Priest of Mapranam Church. Later they tried for building a spacious Church. However, in 1874 the so-called “Mellus Schism” affected the area and the majority succumbed to it. But a ministry resisted and tried to continue in the papal allegiance. With that view they constructed a new and better Church in 1880 and dedicated to the Blessed Virgin Mary (ST. Mary’s Church). Gradually several religious, educational and charitable institutions came up and flourished in the area. Though the Mellusian group got away from that influence and rejoined the Papal allegiance, both the Churches remained side by side as separate Catholic Parishes without territorial limits. They cherished Concord and Cordiality. In 1944 St. George Church was raised to the Status of a Forane Church.</textarea>
								</div>
								</div>          
						
							<div class="form-actions" style="display:none">
							  <button type="submit" class="btn btn-primary">Save changes</button>
							  <button type="reset" class="btn btn-primary">Cancel</button>
							</div>
						  </fieldset>
					</div>   
                         

                        


						

					</div>

                    </div> 

				</div><!--/span-->

			</div><!--/row-->
         <!--churchtable-->



    </div>  <!--end of span10 content-->


   


</asp:Content>
