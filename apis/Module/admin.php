<?php
class admin extends Virgin {
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
		$admin	= new adminModel();
		$admin->get($data);
	}
	private function POST($data){
		$admin	= new adminModel();
		$admin->add($data);
	}
	private function PUT($data){
		$admin	= new adminModel();
		$admin->update($data);
	}
	private function DEL($data){
		$admin	= new adminModel();
		$admin->delete($data);
	}
}