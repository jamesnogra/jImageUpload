# jImageUpload
A simple single image ajax upload.
This requires jQuery. See example.html

Sample Usage is as easy as follows:

In your form view:
```html
<!-- somewhere in the <head> -->
<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
<script src="jImageUpload.js"></script>

<!-- somewhere in the <body> -->
<form>
	<input id="my-file" type="file" />
</form>

<!-- you can put this anywhere you want -->
<script type="text/javascript">
  var test1 = new jImageUpload("my-file", "images/");
	function checkUploadedFile() { //required function to get image upload details
		console.log(data_results[test1.id]);
		alert("File name: " + data_results[test1.id]["file_name"]);
		alert("Full path: " + data_results[test1.id]["full_path"]);
	}
</script>
```
