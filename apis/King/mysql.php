<?php
	//-- 操作数据库
	class Mysql{
		private $host;
		private $name;
		private $pass;
		private $table;
		private $ut;
		
		function __construct($host,$name,$pass,$table,$ut){
			$this -> host		= $host;
			$this -> name		= $name;
			$this -> pass		= $pass;
			$this -> table		= $table;
			$this -> ut			= $ut;
			$this -> connect();
		}
		
		function connect(){
			$this->link = mysqli_connect($this->host,$this->name,$this->pass) or die ();
			mysqli_select_db($this->link,$this -> table) or die("Can not find ".$this -> table);
			mysqli_query($this->link,"SET NAMES '$this->ut'");
		}
		
		function query($v){
			return mysqli_query($this->link,$v);
		}
		//	================
		
		function add($value){
			$name	= Array();
			$val		= Array();
			$table	= $value['table'];
			foreach($value as $key => $v){
				if($key != 'table'){
					array_push($name,$key);
					array_push($val,$v);
				}
			}
			$name	= implode(',',$name);
			$val		= implode("','",$val);
			$val		= "('".$val."')";
			
			$sql = "insert into $table ($name) value $val";
			return $this -> query($sql) or die(mysqli_error($this->link));
		}
		
		function check($t,$v){
			$sql		= "select count(*) from $t where $v";
			$query	= mysqli_query($sql);
			if($query){
				$rs		= mysqli_fetch_array($query);
				return $rs[0];
			}else{
				return 0;
			}
		}
		
		function num($t,$v){
			$sql		= "select id from $t where $v";
			$query	= mysqli_query($sql);
			return mysqli_num_rows($query);
		}
		
		
		
		function insert_id(){	//	Add
			return mysqli_insert_id();
		}
		function update($table,$data,$term){	//	Update
			return $this -> query("update $table set $data where $term;");
		}
		function sel($table,$param,$term){	//	Sel
			return $this -> query("select $param from $table where $term;");
		}
		function del($t,$v){	//	Sel
			return $this -> up($t,'status=0',$v);
		}
		function fetch($table,$param,$term){
			return mysqli_fetch_array($this -> sel($table,$param,$term),MYSQL_ASSOC);
		}
		function loop($table,$param,$term){
			$array = array();
			$sql = "select $param from $table where $term";
			$query = mysqli_query($this->link,$sql);
			while($row = mysqli_fetch_array($query,MYSQL_ASSOC)){
				array_push($array,$row);
			}
			return $array;
		}
	}