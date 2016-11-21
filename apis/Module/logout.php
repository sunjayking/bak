<?php
class logout extends Virgin {
	public function REQUEST(){
		switch($_SERVER['REQUEST_METHOD']){
			case 'GET' :
				self::GET();
				break;
		}
	}
	private function GET(){
		session_destroy();
	}
}