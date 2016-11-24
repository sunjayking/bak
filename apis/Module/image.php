<?php
class image extends Virgin {
	public function REQUEST(){
		$file = file_get_contents('php://input');
		function check_image_type($image){
			$bits = array(
				'jpg' => "\xFF\xD8\xFF",
				'gif' => "GIF",
				'png' => "\x89\x50\x4e\x47\x0d\x0a\x1a\x0a",
			);
			foreach ($bits as $type => $bit) {
				if (substr($image, 0, strlen($bit)) === $bit) {
					return $type;
				}
			}
			return 'jpg';
		}
		$type = check_image_type($file);

		$basepath = dirname(dirname(dirname(__file__))).'/uploads/';
		$childPath = date('Ymd/',time());
		$path = $basepath.$childPath;
		if(!file_exists($path)){
			mkdir($path);
		}
		$newfilename = time().rand().'.'.$type;
		$newfile = $path.$newfilename;
		
		file_put_contents($newfile,$file);
		// // $handle = fopen($newfile,'w');
		// // if($handle){
			// // fwrite($handle,$file);
			// // fclose($handle);
		// // }
		$filename = $childPath.$newfilename;
		$res = self::JSON(compact('filename'));
		exit($res);
	}
}