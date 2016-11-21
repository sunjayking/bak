<?php
class article extends Virgin {
	public function REQUEST(){
		$data = json_decode(file_get_contents('php://input'));
		switch($_SERVER['REQUEST_METHOD']){
			case 'GET' :
				unset($_GET['module']); 
				self::GET($_GET);
				break;
			case 'POST' :
				self::POST($data);
				break;
			case 'PUT' :
				self::PUT($data);
				break;
			case 'DELETE' :
				self::DEL($data);
				break;
		}
	}
	private function GET($data){
		$login	= new articleModel();
		$login->get($data);
	}
	private function POST($data){
		$login	= new articleModel();
		$login->add($data);
	}
	private function PUT($data){
		$login	= new articleModel();
		$login->update($data);
	}
	private function DEL($data){
		$login	= new articleModel();
		$login->delete($data);
	}
}