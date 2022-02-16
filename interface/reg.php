<?php
  // 注册的基本逻辑
  // 1. 连接数据库
  // 2. 接收数据
  // 3. 判断收到的用户名 在数据库中是否存在
  //    3.1 用户名存在 提示用户名已存在 结果为注册失败 -> 返回注册页面
  //    3.2 用户名不存在 将数据写入数据库 返回结果 注册成功 -> 回到首页


  // 1. 连接数据库
  include('./library/conn copy.php');

  // 2. 接收数据
  $username = $_REQUEST['username'];
  $password = $_REQUEST['password'];
  $phone = $_REQUEST['phone'];
  $email = $_REQUEST['email'];
  $address = $_REQUEST['address'];

  // 3. 判断收到的用户名 在数据库中是否存在
  $sql1 = "select * from users where phone='$phone'";

  $results = $mysql->query($sql1);

  if($results->num_rows>0){
    echo '<script>alert("注册失败!用户已存在");</script>';
    echo '<script>location.href="../src/reg.html";</script>';
    $mysql->close();
    die(); // 用户名已存在 结束代码执行
  }

  // 用户名不存在 将数据写入数据库
  $sql2 = "insert into users (username,password,email,phone,address) values ('root','root','root','$phone','root')";

  // 执行插入操作时  返回一个布尔值 表示插入数据是否成功
  $res = $mysql->query($sql2);

  $mysql->close();

  if($res){
    echo '<script>alert("注册成功!");</script>';
    echo '<script>location.href="https://www.baidu.com";</script>';
  }
?>