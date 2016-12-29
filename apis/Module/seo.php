<?php
class seo extends Virgin {
	public function REQUEST(){
		$data = json_decode(file_get_contents('php://input'));
		switch($_SERVER['REQUEST_METHOD']){
			case 'GET' :
				unset($_GET['module']); 
				self::GET($_GET);
				break;
			case 'PUT' :
				self::PUT($data);
				break;
		}
	}
	private function GET($data){
		$seo	= new seoModel();
		$seo->get($data);
	}
	private function PUT($data){
		$seo	= new seoModel();
		$seo->update($data);
	}
}