<?php
	
	$upload_now = new SimpleUpload();
	
	class SimpleUpload
	{
		public $return_arr = array();
		
		public function __construct() {
			if (!isset($_POST["folder_location"])) {
				$this->flagNotImageError();
				exit(json_encode($this->return_arr));
			}
			$the_folder_path = $_POST["folder_location"];
			$file_input_name = $_POST["file_input_name"];
			$this->checkIfImage($_FILES[$file_input_name]['tmp_name']);
			if(is_array($_FILES)) {
				if(is_uploaded_file($_FILES[$file_input_name]['tmp_name'])) {
					$sourcePath = $_FILES[$file_input_name]['tmp_name'];
					$original_file_name = $_FILES[$file_input_name]["name"];
					$temp = explode(".", $_FILES[$file_input_name]["name"]);
					$new_file_name = $this->randomFilename() . "." . end($temp);
					$target_path = $the_folder_path . $new_file_name;
					if(move_uploaded_file($sourcePath, $target_path)) {
						$this->return_arr = [
							"code"					=> 1,
							"file_name"				=> $new_file_name,
							"full_path"				=> $target_path,
							"original_file_name"	=> $original_file_name,
							"message"				=> "Image successfully uploaded."
						];
						exit(json_encode($this->return_arr));
					}
				}
			}
		}
		
		public function checkIfImage($temp_file) {
			$is_image = getimagesize($temp_file);
			if (count($is_image) <= 1) {
				$this->flagNotImageError();
				exit(json_encode($this->return_arr));
			}
		}
		
		public function flagNotImageError() {
			$this->return_arr = ["code" => -1, "message" => "File is not an image."];
		}
		
		public function randomFilename() {
			$temp_filename_time = round(microtime(true));
			$characters = 'abcdefghijklmnopqrstuvwxyz';
			$characters_length = strlen($characters);
			$random_string = '';
			for ($i = 0; $i < 8; $i++) {
				$random_string .= $characters[rand(0, $characters_length - 1)];
			}
			return $random_string . "_" . $temp_filename_time;
		}
	}
	
?>