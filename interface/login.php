<?php
  // header('content-type:text/html;charset=utf-8');

  // $_GET[]     用于接收 http请求 发送的get数据
  // $_POST[]    用于接收 http请求 发送的post数据
  // $_REQUEST[] 用于接收 http请求 发送的get/post数据

  // $username = $_REQUEST['username'];
  // $password = $_REQUEST['password'];

  // GET请求和POST请求的区别
  // 1. GET请求的数据 会出现在URL的search部分  POST不显示
  // 2. GET请求可发送的数据量 比POST小 GET数据量有限制 POST没有限制
  // 3. GET请求速度比POST快
  // 4. GET请求的数据在请求头中发送 POST请求的数据在请求体中发送

  // http请求报文 分为两个部分 
  // 1. 请求头(request header)
  // 2. 请求体(request body)

  // 在安全性上没有区别

  // echo "我收到的用户名是 $username , 密码是 $password";


  // ----------------------------------------------------
  // 登录逻辑
  // 1. 连接数据库
  // 2. 接收数据
  // 3. 将数据在数据库中进行查找
  // 查找到结果 说明用户名和密码正确 ——> 登录成功
  // 没有查找到结果 说明用户名或密码错误  ——> 登录失败

  // 1. 连接数据库
  include('./library/conn copy.php'); // 加载一个php文件

  // 2. 接收数据
  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];

  // 3. 查询数据
  $sql = "select * from users where username='$username' and password='$password'";

  $results = $mysql->query($sql);

  $mysql->close(); // 关闭数据库连接

  // var_dump($results);

  if($results->num_rows>0){
    echo '<script>alert("登录成功");</script>';
    echo '<script>location.href="https://www.baidu.com";</script>';
  }else{
    echo '<script>alert("登录失败");</script>';
    echo '<script>location.href="../src/login.html";</script>';
  }

?>