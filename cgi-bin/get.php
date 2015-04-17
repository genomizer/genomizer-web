<?php

$URI = $_GET['data'];

echo "filename = " . $URI . "<br />";

if (file_exists($URI)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename='.basename($URI));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($URI));
    ob_clean();
    flush();
    readfile($URI);
    exit;
} else {
	echo "File not found.";
	exit;
}

?>
