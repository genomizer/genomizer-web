<?php
//
//// $destination_path = "/var/www/walkma.no-ip.info/results/";
//
//echo "<p> \$_FILES = ";
//print_r(array_values($_FILES));
//echo "</p>";
//echo "<p> array_keys(\$_FILES) = ";
//print_r(array_keys($_FILES));
//echo "</p>";
//echo "<p> \$_FILES[\"uploadfile\"] = " . $_FILES["uploadfile"] . "</p>";
//echo "<p> \$_FILES[\"uploadfile\"] = ";
//print_r(array_values($_FILES["uploadfile"]));
//echo "</p>";
//echo "<p> array_keys(\$_FILES[\"uploadfile\"]) = ";
//print_r(array_keys($_FILES["uploadfile"]));
//echo "</p>";
//echo "<p> \$_FILES[\"uploadfile\"][0] = " . $_FILES["uploadfile"][0] . "</p>";
//echo "<p> \$_FILES[\"uploadfile\"][\"tmp_name\"] = " . $_FILES["uploadfile"]["tmp_name"] . "</p>";
//
//
//echo "<br/>";
//echo "<br/>";
//echo "<br/>";
//
//$URI = $_GET['path'];
//// $URI = "/Home/staff/niklasf/edu/pvt/genomizer-web/cgi-bin/upload_test/file.txt";
//echo "filename = " . $URI . "<br />";
//
//// if (!isset($_SERVER['PHP_AUTH_USER'])) {
////     header('WWW-Authenticate: Basic realm="My Realm"');
////     header('HTTP/1.0 401 Unauthorized');
////     echo 'Text to send if user hits Cancel button';
////     exit;
//// } else {
////     echo "<p>Hello {$_SERVER['PHP_AUTH_USER']}.</p>";
////     echo "<p>You entered {$_SERVER['PHP_AUTH_PW']} as your password.</p>";
//// }
//
//
//// $target_file = basename($_POST['data']);
//// $destination_path = dirname($_POST['data']) . "/";
//// $target_file = basename($_POST['path']);
//// $destination_path = dirname($_POST['path']) . "/";
//$target_file = basename($URI);
//// $target_file = basename($_GET['path']);
//$destination_path = dirname($URI) . "/";
//$target_path = $destination_path . $target_file;
//$hasExtension = checkHasExtension($target_path);
//$uploadFile = $_FILES["uploadfile"]["tmp_name"];
//// $uploadFile = $_FILES['uploadfile']['tmp_name'];
//
//echo "Target file = " . $target_file . "<br />";
//
//// echo "Source=" .        basename($destination_path) . "<br />";
//echo "Destination=" .   $destination_path . "<br />";
//echo "Target path=" .   $target_path . "<br />";
//echo "Size=" .          $_FILES['uploadfile']['size'] . "<br />";
//echo "hasExtension=" . $hasExtension . "<br/>";
//echo "upload file=" . $uploadFile . "<br/>";
//
//$mkdir_res = mkdir($destination_path, 0755, true);
//// echo "<p>lol </p>";
//
//// if(!$hasExtension){
////  echo "Error: File has no extension.<br />";
//// } else if(move_uploaded_file($_FILES['uploadfile']['tmp_name'], $target_path)) {
////  echo "The file ".  $target_file.
////      " has been uploaded";
//// } else {
////  echo "There was an error uploading the file, please try again!";
//// }
//
//
//if(move_uploaded_file($uploadFile, $target_path)) {
//	echo "The file ".  $target_file.
//		" has been uploaded";
//} else {
//	echo "There was an error uploading the file, please try again!";
//}
//
//function checkHasExtension($target_file){
//	$file_parts = pathinfo($target_file);
//
//	// if($file_parts['extension'] == ""){
//		// echo "no extension<br />";
//		// return FALSE;
//	// } else {
//	// 	echo "has extension<br />";
//		return TRUE;
//	// }
//}
//
//// function incrementFileName($file_path,$filename){
//// 	if(count(glob($file_path.$filename))>0)
//// 	{
//// 		$file_ext = end(explode(".", $filename));
//// 		$target_file = str_replace(('.'.$file_ext),"",$filename);
//// 		$newfilename = $target_file.'_'.count(glob($file_path."$target_file*.$file_ext")).'.'.$file_ext;
//// 		echo "changed filename<br />";
//// 		return $newfilename;
//// 	}
//// 	else
////   	{
//// 		echo "did not change filename<br />";
//// 		return $filename;
//// 	}
//// }
?>
