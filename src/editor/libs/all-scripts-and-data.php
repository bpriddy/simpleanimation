<?php
$jsonVars = array();
$pathToSA = explode($_SERVER['DOCUMENT_ROOT'], dirname(__FILE__));
$pathToSA = explode('editor/libs', $pathToSA[1]);
$pathToSA = $pathToSA[0];

echo '<script src="'.$pathToSA.'core/c.sa.sprite.js"></script>';
echo '<script src="'.$pathToSA.'core/sa.utils.js" ></script>';
echo '<script src="'.$pathToSA.'core/c._sa.js"></script>';
echo '<script src="'.$pathToSA.'core/c.sa.element.js"></script>';
echo '<script src="'.$pathToSA.'core/c.sa.scroll.js"></script>';
echo '<script src="'.$pathToSA.'core/c.sa.timer.js"></script>';
echo '<script src="'.$pathToSA.'core/c.sa.editor.js"></script>';


$dir = opendir(dirname(__FILE__)."/../../data/");
while (false !== ($entry = readdir($dir))) {
	if($entry!='.' && $entry!='..') {
    	echo "<script src='".($pathToSA.'data/'.$entry)."'></script>";
    	$file = file_get_contents($_SERVER['DOCUMENT_ROOT'].$pathToSA.'data/'.$entry);
    	$varName = explode(" = ", $file);
    	$varName = explode("var ", $varName[0]);
    	$varName = $varName[1];
    	$varLink = array($varName, $entry);
    	array_push($jsonVars, $varLink);
    }
}
?>