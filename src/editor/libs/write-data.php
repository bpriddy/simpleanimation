<?php 

if($_POST['newfile']=="true") {

	$fp = fopen('../../data/'.$_POST['file'], 'w');
	$formatted = "var ".$_POST['varName']." = [ ];";
	fwrite($fp, $formatted);
	fclose($fp);
	
} else {

	$json = stripslashes($_POST['json']);
	$formatted = "var ".$_POST['varName']." = [ ";
	$formatted .= $json;
	$formatted .= " ];";
	$fp = fopen('../../data/'.$_POST['file'], 'w');
	fwrite($fp, $formatted);
	$fb = fopen('../backups/'.time().$_POST['file'], 'w');
	fwrite($fb, $formatted);
	fclose($fp);

}



?> 