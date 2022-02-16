<?php
  header('content-type:text/html;charset=utf-8');

  $mysql_conf = array(
    'host'=>'localhost:3306',   // 主机名和端口号
    'db_user'=>'root', // 用于登录数据库的用户名
    'db_pass'=>'root', // 用于登录数据库的密码
    'db'=>'2113' // 数据库名称
  );

  // 登录(连接)数据库
  $mysql = @new mysqli($mysql_conf['host'],$mysql_conf['db_user'],$mysql_conf['db_pass']);

  // 判断是否出现了连接错误
  if($mysql->connect_errno){
    // die 用于结束代码执行
    die('连接错误'.$mysql->connect_errno);
  }

  // 设置查询字符集
  $mysql->query('set names utf8');

  // 选择数据库
  $selected = $mysql->select_db($mysql_conf['db']);

  // 判断数据库是否选择成功
  if(!$selected){
    die('数据库选择错误'.$mysql->error);
  }
?>