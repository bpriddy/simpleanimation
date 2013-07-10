<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	
	<head>
	
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		
		<title>test of simple animation</title>
		
		<link rel="stylesheet" type="text/css" href="css/editor.css">
		
		
		<!--  START  SIMPLE ANIMATION CODE SNIPPET *MUST BE A PHP FILE* -->
		<?php require_once('libs/all-scripts-and-data.php'); ?>
		<!--  END  SIMPLE ANIMATION CODE SNIPPET *MUST BE A PHP FILE* -->
		
		<script type="text/javascript">
			$(function() {
				var timelineUI = new scrollTimeLineGUI({element: $('#timeline'), print_btn: $('.print'), save_btn: $('.top-fixed.save'), output: $('#json-print'), zoom:8 });
			});
		</script>
		
	</head>
	
	
<body>

	<div id="timeline"></div>
	<div class="json create">
		<div class="close">X</div>
		<div>file name (include ".js"): <input type="text" value="default.js" name="filename" /></div>
		<div>variable name: <input type="text" value="defaultJSON" name="varname" /></div>
		<div><div class="create btn">CREATE</div></div>	
	</div>
	<div class="json files">
		<div class="close">X</div>
		<?php foreach($jsonVars as $jsonlink) { ?>
			<div class="json-link" rel="<?=$jsonlink[1]?>" ref="<?=$jsonlink[0]?>" >edit <?=$jsonlink[0]?></div>	
		<?php } ?>
	</div>
	<div class="top-fixed create">CREATE data file</div>
	<div class="top-fixed open">open data file</div>
	<div class="top-fixed add row">add row</div>
	<div class="top-fixed save">save</div>
	<div id="item-editor">
		<div class="main">
			<div class="title">Main</div>
			<div>Selector: <input class="selector" size="40" /></div>
			<div>Start Time:<input class="start" /></div>
			<div>End Time: <input class="end" /></div>
			<div>Easing: <select class="easing">
						 	<option value="none">none</option>
						 	<option value="easeInQuad">easeInQuad</option>
						 	<option value="easeOutQuad">easeOutQuad</option>
						 	<option value="easeInOutQuad">easeInOutQuad</option>
						 	<option value="easeInCubic">easeInCubic</option>
						 	<option value="easeOutCubic">easeOutCubic</option>
						 	<option value="easeInOutCubic">easeInOutCubic</option>
						 	<option value="easeInQuart">easeInQuart</option>
						 	<option value="easeOutQuart">easeOutQuart</option>
							<option value="easeInOutQuart">easeInOutQuart</option>
							<option value="easeInQuint">easeInQuint</option>
							<option value="easeOutQuint">easeOutQuint</option>
							<option value="easeInOutQuint">easeInOutQuint</option>
							<option value="easeInSine">easeInSine</option>
							<option value="easeOutSine">easeOutSine</option>
							<option value="easeInOutSine">easeInOutSine</option>
							<option value="easeInExpo">easeInExpo</option>
							<option value="easeOutExpo">easeOutExpo</option>
							<option value="easeInOutExpo">easeInOutExpo</option>
							<option value="easeInCirc">easeInCirc</option>
							<option value="easeOutCirc">easeOutCirc</option>
							<option value="easeInOutCirc">easeInOutCirc</option>
	
						 </select></div>
		</div>
		<div class="values">
			<div class="title">Values</div>
		</div>
		<div class="save btn">Save</div>
		<div class="add btn">Add Value</div>
		<div class="remove btn">Delete Row</div>
	</div>
	

</body>

</html>