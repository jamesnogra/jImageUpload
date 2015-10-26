//change this if you moved this file or you have your own uploader PHP script
var upload_script = "jImageUpload.php";

var data_results = [];

/**
 * Prepares a page for an AJAX image upload 
 * @param form_id is required and is the id of the <form id='your-form-id-here'></form>
 * @param file_input_id is required and is the id of the <input id="your-input-id-here" />
 * @param upload_folder is required and is the location of where the uploaded files will be with respect to this file
 * @param require_preview (optional, boolean). Default is true
 * @param preview_size (optional). This is the height in pixels of the preview. Default is 25 pixels;
 * @return void
 */
var jImageUpload = function(file_input_id, upload_folder, require_preview, preview_size) {
	
	this.id = file_input_id;
	if (require_preview===undefined) { require_preview = true; }
	preview_size = preview_size || 25;
	data_results[file_input_id] = [];
	
	$("#"+file_input_id).on("change", function() {
		$("#"+file_input_id).removeAttr("name");
		$("#"+file_input_id).attr("name", file_input_id);
		var my_form = $("#"+file_input_id).closest("form");
		var new_upload_form_id = "form-"+file_input_id;
		var preview_div_id = "preview-"+file_input_id;
		my_form.removeAttr("id");
		my_form.attr("id", new_upload_form_id);
		var the_form = document.getElementById(new_upload_form_id);
		var form_data = new FormData(the_form);
		form_data.append("folder_location", upload_folder);
		form_data.append("file_input_name", file_input_id);
		$.ajax({
			url: upload_script,
			type: "POST",
			data:  form_data,
			contentType: false,
			cache: false,
			processData:false,
			success: function(data) {
				if (data.search("Warning: move_uploaded_file") != -1) { alert("The directory " + upload_folder + " does not exists. Create it first."); return; }
				data = JSON.parse(data);
				data_results[file_input_id] = data;
				if (require_preview && data['code']==1) {
					$("#"+preview_div_id).remove();
					$("#"+new_upload_form_id).before("<div id='"+preview_div_id+"' style='float:left;margin-right:5px;'></div>");
					$("#"+preview_div_id).html("<img src='"+data['full_path']+"' height='"+preview_size+"' />");
				}
				if (data['code']==-1) {
					$("#"+preview_div_id).remove();
					$("#"+new_upload_form_id).before("<div id='"+preview_div_id+"' style='float:left;margin-right:5px;'></div>");
					$("#"+preview_div_id).html("Not an image.");
				}
				if (data['code']==1) {
					checkUploadedFile(); //user must define this function
				}
			},
			error: function() {}
		});
	});

};