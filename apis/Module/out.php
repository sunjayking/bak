<?php
class out extends Virgin {
	public function REQUEST(){
		session_destroy();
	}
}