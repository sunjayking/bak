<?php
	class Virgin {
		//-- 转json格式
		public function JSON($data){
			return json_encode($data,JSON_UNESCAPED_UNICODE);
		}

		//-- 错误提示，神经病啊，这种写法
		public function error($errcode,$errdata){
			exit(self::JSON(compact('errcode','errdata')));
		}
		//-- 无资源，返回404
		public function fail404($errcode,$errdata){
			header("HTTP/1.1 404");
			exit(self::JSON(compact('errcode','errdata')));
		}
		//-- 请求失败，返回500
		public function fail($errcode,$errdata){
			header("HTTP/1.1 500");
			exit(self::JSON(compact('errcode','errdata')));
		}
		
		//-- md6加密
		public function md6($value){
			$key = md5('sunjay');
			return md5($value.$key);
		}
		
		//-- 模板替换
		public function pregReplace($array,$content){
			$mode = Array();
			$string = Array();
			foreach($array as $key => $v){
				array_push($mode,"/{{".$key."}}/iUs");
				array_push($string,$v);
			}
			return preg_replace($mode,$string,$content);
		}
			
		//-- 检查过滤
		public function check(){
			return new check();
		}
		
		//-- 链接数据库
		public function db(){
			return new Mysql(MYSQL_HOST,MYSQL_ROOT,MYSQL_PASS,MYSQL_NAME,MYSQL_UTF);
		}
		
		//-- id加密
		public function tranId($id){			
			$box = Array("j","n","u","r","U","s","y","G","x","p","N","k","h","f","5","H","w","S","V","E","1","Y","A","6","3","J","P","Q","Z","q","F","i","4","X","9","g","C","c","e","d","I","M","7","2","m","8","b","B","R","t","D","W","K","v","o","0","z","a","l","O","L","T");
			function tranArr($id){
				return Array(
					floor( ( $id/312500000)),
					floor( ( $id/6250000) %50),
					floor( ( $id/125000) %50),
					floor( ( $id/2500) %50),
					floor( ($id/50) %50 ),
					$id%50
				);
			}
			$idArr = tranArr($id);
			$keyArr = Array( 12, 6, 7, 3, 1,0 );
			$code = Array(
				$box[$idArr[0] + $keyArr[0] ],
				$box[$idArr[1] + $keyArr[1] ],
				$box[$idArr[2] + $keyArr[2] ],
				$box[$idArr[3] + $keyArr[3] ],
				$box[$idArr[4] + $keyArr[4] ],
				$box[$idArr[5] + $keyArr[5] ]
			);
			$res = implode('',$code);
			return $res;
		}
	}