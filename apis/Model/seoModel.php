<?php
	class seoModel extends Virgin{
		//-- 查询SEO
		public function get($data){
			$row = self::db()->fetch('s_seo','*',"id=1");
			if(!$row){
				self::fail404(40005,'seo信息为空');
			}else{
				$data = $row;
				$res = self::JSON(compact('data'));
				exit($res);
			}
		}
		//-- 更新文章
		public function update($data){
			//-- 检查是否登录
			self::check()->login();
			//-- 配置数据表中字段
			$baseParams = Array('keyworda','descriptiona','keywordb','descriptionb','keywordc','descriptionc','keywordd','descriptiond');
			$updateData = Array();
			foreach($data as $key => $val){
				in_array($key, $baseParams) && array_push($updateData, $key."='".$val."'");  
			}
			$updateData = implode(',', $updateData);
			$row = self::db()->update('s_seo',$updateData,"id=1");
			!$row && self::fail(40003,'数据更新失败');
		}
	}