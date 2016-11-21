<?php
	session_start();
	//-- 路径
	define('PATH',str_replace('\\','/',dirname(dirname(__FILE__)).'/apis/'));			//-- 基础路径
	define('PATH_MODULE',	PATH.'Module/');							//-- 应用路径
	define('PATH_MODEL',	PATH.'Model/');							//-- 应用路径
	define('VIRGIN',	PATH.'King/virgin.php');							//-- 应用路径
	define('CHECK',	PATH.'King/check.php');							//-- 应用路径
	define('MYSQLS',	PATH.'King/mysql.php');							//-- 应用路径
	define('CONFIG',	PATH.'King/config.php');							//-- 应用路径
	require(VIRGIN);
	require(CHECK);
	require(MYSQLS);
	require(CONFIG);
	
	//-- 判断是否存在对应的module和model
	$module = explode('/',$_GET['module'])[0];
	$module_path	= PATH_MODULE.$module.'.php';
	$model_path		= PATH_MODEL.$module.'Model.php';
	if(!is_file($module_path)){
		header("HTTP/1.1 404");
		exit();
	}
	require($module_path);
	is_file($model_path) && require($model_path);
	$api = new $module();
	$api -> REQUEST();