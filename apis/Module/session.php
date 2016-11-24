<?php
class session extends Virgin {
	public function REQUEST(){
		switch($_SERVER['REQUEST_METHOD']){
			case 'GET' :
				self::GET();
				break;
		}
	}
	private function GET(){
		if(!isset($_SESSION) || !count($_SESSION)){
			self::fail404(40005,'无session');
		}else{
			exit(self::JSON($_SESSION));			
		}
	}
}