<?php

#$destination_path = "/var/www/walkma.no-ip.info/results/";

if (!isset($_SERVER['PHP_AUTH_USER'])) {
    header('WWW-Authenticate: Basic realm="My Realm"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Text to send if user hits Cancel button';
    exit;
} else {
    echo "<p>Hello {$_SERVER['PHP_AUTH_USER']}.</p>";
    echo "<p>You entered {$_SERVER['PHP_AUTH_PW']} as your password.</p>";
}

$file_name = basename($_POST['data']);
$destination_path = dirname($_POST['data']) . "/";
$target_path = $destination_path . $file_name;
$hasExtension = checkHasExtension($target_path);

echo "Source=" .        basename($destination_path) . "<br />";
echo "Destination=" .   $destination_path . "<br />";
echo "Target path=" .   $target_path . "<br />";
echo "Size=" .          $_FILES['uploadfile']['size'] . "<br />";

if(!is_dir($destination_path)) {
	mkdir($destination_path);
}

if(!$hasExtension){
	echo "Error: File has no extension.<br />";
} else if(move_uploaded_file($_FILES['uploadfile']['tmp_name'], $target_path)) {
	echo "The file ".  $file_name.
		" has been uploaded";
} else {
	echo "There was an error uploading the file, please try again!";
}

function checkHasExtension($file_name){
	$file_parts = pathinfo($file_name);

	if($file_parts['extension'] == ""){
#		echo "no extension<br />";
#		return FALSE;
#	} else {
#		echo "has extension<br />";
		return TRUE;
#	}
}

function incrementFileName($file_path,$filename){
	if(count(glob($file_path.$filename))>0)
	{
		$file_ext = end(explode(".", $filename));
		$file_name = str_replace(('.'.$file_ext),"",$filename);
		$newfilename = $file_name.'_'.count(glob($file_path."$file_name*.$file_ext")).'.'.$file_ext;
		echo "changed filename<br />";
		return $newfilename;
	}
	else
  	{
		echo "did not change filename<br />";
		return $filename;
	}
}
?>
