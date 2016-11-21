<?php
class right extends Virgin {
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
		$right	= new rightModel();
		$right->get($data);
	}
	private function POST($data){
		$right	= new rightModel();
		$right->add($data);
	}
	private function PUT($data){
		$right	= new rightModel();
		$right->update($data);
	}
	private function DEL($data){
		$right	= new rightModel();
		$right->delete($data);
	}
}