<%@ Page Title="" Language="C#" MasterPageFile="~/Master/AdminLayout.Master" AutoEventWireup="true" CodeBehind="Notices.aspx.cs" Inherits="ChurchApp.AdminPanel.Notices" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder2" runat="server">
    <script src="../Scripts/CustomJS/Common.js"></script>
    <script src="../Scripts/select2.min.js"></script>
    <script>
        $("document").ready(function (e)
        {
            debugger;
            BindNotices();
            BindNoticesOnEdit();
            debugger;
            $("#ddlNoticeType").select2({
                placeholder: "Choose Notice Types",
                allowClear: true,
                data: BindNoticeTypeDropDown()
            });


        });

        function BindNoticeTypeDropDown() {

            var jsonResult = {};
            var NoticeType = new Object();
            jsonResult = GetAllNoticeTypes(NoticeType);
            if (jsonResult != undefined) {
                return jsonResult;
            }
        }

        function GetAllNoticeTypes(NoticeType)
        {
            var ds = {};
            var table = {};
            var data = "{'NoticeTypeObj':" + JSON.stringify(NoticeType) + "}";
            ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNoticeTypes");
            table = JSON.parse(ds.d);
            return table;
        }



            function BindNotices() {
                var jsonResult = {};
                var Notices = new Object();
                jsonResult = GetNotices(Notices);
                if (jsonResult != undefined) {
                    //  FillOrderTable(jsonResult);
                }
            }

            function GetNotices(Notices) {
                var ds = {};
                var table = {};
                var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
                ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNotices");
                table = JSON.parse(ds.d);
                return table;
            }
          
            function BindNoticesOnEdit()
            {
                var jsonResult = {};
                var Notices = new Object();
                Notices.noticeId = "3172b77c-97e6-4acb-85a7-4508d27269b0";
                jsonResult = GetNoticesBynoticeID(Notices);
                if (jsonResult != undefined) {
                    //  FillOrderTable(jsonResult);
                }
            }
            function GetNoticesBynoticeID(Notices) {
                var ds = {};
                var table = {};
                var data = "{'NoticeObj':" + JSON.stringify(Notices) + "}";
                ds = getJsonData(data, "../AdminPanel/Notices.aspx/GetNoticeDetailsByNoticeID");
                table = JSON.parse(ds.d);
                return table;
            }


    </script>


     <div id="content" class="span10">
        <ul class="breadcrumb">
				 <li>
					<i class="icon-home"></i>
					<a href="../AdminPanel/Home.aspx">Home</a> 
					<i class="fa fa-angle-right" aria-hidden="true"></i>
				</li>
				<li>Notices</li>
			</ul>
         
         <div class="row-fluid">
                    <div class="box span6">
					<div class="box-header">
						<h2 id="headNoticeName"><i class="fa fa-file-o" aria-hidden="true"></i><span class="break"></span>Notice Name</h2>
						<div class="box-icon">
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							
						</div>
					</div>
					<div class="box-content">
                        <div class="span12" >

                            <div class="span4" ><img id="imgNoticeImage" class="grayscale" src="../img/St_Thomas_Church,_Irinjalakuda.jpg" alt="St.Thomas Church" /></div>
                            <div class="span8"></div>
                         </div>
                        </div>
				</div>

                    <div class="box span6" id="PriestEditDivBox">
					<div class="box-header">
						<h2><i class="fa fa-file-o" aria-hidden="true"></i><span class="break"></span>Add Notice</h2>
						<div class="box-icon">
							<a href="#" class="btn-minimize"><i class="halflings-icon chevron-up"></i></a>
							
						</div>
					</div>
					<div class="box-content">
					   <div class="form-horizontal">
				    <fieldset>

                         <div class="control-group">
								<label class="control-label" for="focusedInput">Notice Name</label>
								<div class="controls">
                                  <label class="control-label" for="focusedInput" id="lblNoticeName" style="display:none">Notice Name</label>
								  <input class="input-large focused" name="Caption" id="txtNoticeName" type="text" />
								</div>
								</div>

                        
                         <div class="control-group">
								<label class="control-label" for="focusedInput">Notice Type</label>
								<div class="controls">
							    
                                   <select class="Notices" id="ddlNoticeType" style="max-width: 50%!important; width: 40%!important;">
                                                        <option></option>
                                                    </select>
								</div>
								</div>

                           <div class="control-group">
								<label class="control-label" for="focusedInput">Description</label>
								<div class="controls">
							     <label class="control-label" for="focusedInput" id="lblNoticeDescription" style="display:none">Notice Description</label>
                                  <textarea tabindex="3" class="input-xlarge span10" id="txtDescription" name="Description" rows="4" placeholder=""></textarea>
								</div>
								</div>
							<div class="control-group">
							  <label class="control-label" for="fileInput">File input</label>
							  <div class="controls">
								<input class="input-file uniform_on" id="fileInput" type="file"/>
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

</asp:Content>
