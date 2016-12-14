<?php
require 'PHPMailer-master/PHPMailerAutoload.php';

$mail = new PHPMailer;
// $mail->SMTPDebug = 3;                               // Enable verbose debug output
$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->CharSet='UTF-8';
// $mail->Host = 'smtp.163.com';  //smtp1.example.com;smtp2.example.com Specify main and backup SMTP servers
$mail->Host = 'smtp.exmail.qq.com';  //smtp1.example.com;smtp2.example.com Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->SMTPSecure = "ssl";                 // 安全协议，可以注释掉
// $mail->Username = 'romanote@163.com';                 // SMTP username
$mail->Username = 'service@romanote.com';                 // SMTP username
$mail->Password = 'Service798';                           // SMTP password
// $mail->Password = 'samfuck@5255290';                           // SMTP password
// $mail->Port = 25;                                    // TCP port to connect to
$mail->Port = 465;                                    // TCP port to connect to

//-- 发件邮箱
// $mail->From = 'romanote@163.com';
$mail->From = 'service@romanote.com';
//-- 发件人
$mail->FromName = '罗曼笔记';

//-- 收件人
$mail->addAddress('475069288@qq.com');               // Name is optional

// //-- 抄送
// $mail->addCC('sunjay@romanote.com');

// //-- 秘抄
// $mail->addBCC('sunjayking007@gmail.com');

//-- 附件
// $mail->addAttachment('aaa.jpg','bbb.jpg');    // Optional name

$mail->isHTML(true);                                  // Set email format to HTML
//-- 主题
$mail->Subject = '活动报名信息';
//-- 内容
$mail->Body    = '正文<b>粗体字</b>';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
}