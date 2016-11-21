<?php
class login extends Virgin {
	public function REQUEST(){
		switch($_SERVER['REQUEST_METHOD']){
			case 'GET' :
				unset($_GET['module']); 
				self::GET($_GET);
				break;
		}
	}
	private function GET($data){
		$login	= new loginModel();
		$login->login($data);
	}
}