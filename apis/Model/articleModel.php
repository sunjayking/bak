<?php
	class articleModel extends Virgin{
		//-- 查询文章
		public function get($data){
			$pagenum	= isset($data['pagenum']) ? $data['pagenum'] : 20;
			$page		= isset($data['page']) ? $data['page'] : 1;
			$status		= isset($data['status']) ? $data['status'] : 1;
			if(isset($data['pagenum'])){
				unset($data['pagenum']);
			}
			if(isset($data['page'])){
				unset($data['page']);
			}
			
			$selectArr = array();
			foreach($data as $key => $val){
				$key != 'view' && array_push($selectArr,$key.'="'.$val.'"');
			}
			!isset($data['status']) && array_push($selectArr,'status>0');
			$select = implode(' and ',$selectArr);
			$term = $select." ORDER BY sort DESC,createtime DESC limit ".($page-1)*$pagenum.",".$page*$pagenum;
			$row = self::db()->loop('s_article',"*",$term);
			if(!$row){
				self::fail404(40005,'文章列表为空');
			}else{
				$total 		= count($row);
				if(isset($data['view']) && $data['view'] == 'view'){
					$upid = $row[0]['id'];
					$viewnum = $row[0]['views'] + 1;
					$updateData = Array();
					array_push($updateData,"views=".$viewnum);
					$updateData = implode(',', $updateData);
					self::db()->update('s_article',$updateData,"id=".$upid);
				}
				$data = $row;
				$res = self::JSON(compact('data','page','pagenum','total'));
				exit($res);
			}
		}
		//-- 新增文章
		public function add($data){
			//-- 检查是否登录
			self::check()->login();
			//-- 检查是否有权限操作
			self::check()->right('addarticle');
			self::check()->isEmpty($data,Array('title','summary','content'));
			$name = isset($data->name) ? $data->name : '';
			$qrimg = isset($data->qrimg) ? $data->name : '';
			$addData = Array(
				"table" 		=> "s_article",
				"name"			=> $name,
				"title"			=> $data->title,
				"summary"		=> $data->summary,
				"keyword"		=> $data->keyword,
				"content"		=> $data->content,
				"cover"			=> $data->cover,
				"type"			=> $data->type,
				"qrimg"			=> $qrimg,
				"createtime"	=> time(),
				"updatetime"	=> time(),
			);
			$row = self::db()->add($addData);
			!$row && self::fail(40002,'数据新增失败');
		}
		//-- 更新文章
		public function update($data){
			//-- 检查是否登录
			self::check()->login();
			//-- 检查是否有权限操作
			self::check()->right('uparticle');
			self::check()->isEmpty($data,Array('id'));
			//-- 配置数据表中字段
			$baseParams = Array('id','name','title','summary','keyword','content','type','cover','qrimg','createtime','updatetime','sort','status','recommend');
			$updateData = Array();
			foreach($data as $key => $val){
				in_array($key, $baseParams) && array_push($updateData, $key."='".$val."'");  
			}
			array_push($updateData,"updatetime=".time());
			$updateData = implode(',', $updateData);
			$id = $data->id;
			$row = self::db()->update('s_article',$updateData,"id=".$id);
			!$row && self::fail(40003,'数据更新失败');
		}
		//-- 删除文章
		public function delete($data){
			//-- 检查是否登录
			self::check()->login();
			//-- 检查是否有权限操作
			self::check()->right('delarticle');
			self::check()->isEmpty($data,Array('id'));
			$id = $data->id;
			$row = self::db()->update('s_article',"status=0","id=".$id);
			!$row && self::fail(40004,'数据删除失败');
		}
	}