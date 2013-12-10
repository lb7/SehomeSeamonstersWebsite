<?php
	include 'class/phpmailer/class.phpmailer.php';
	include 'class/phpmailer/class.smtp.php';

	$post = $_POST;

	$name = $post["name"];
	$replyto = $post["replyto"];
	$subject = $post["subject"];
	$message = $post["message"];

	$mail = new PHPMailer();

	$mail->SMTPDebug = 0;
	$mail->IsSMTP();
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = "ssl";
	$mail->Host = "smtp.mail.yahoo.com";
	$mail->Port = 465;

	$mail->Username = "sehomeseamonsters@yahoo.com";
	$mail->Password = "shsfirst";

	$mail->From = "sehomeseamonsters@yahoo.com";
	$mail->FromName = "[Contact Form] Me";
	//$mail->Sender = $replyto;
	$mail->Subject = "[Website Contact] " . $subject;
	$mail->Body = "From: " . $name . "\nReply at: " . $replyto . "\n\n" . $message;
	$mail->WordWrap = 50;

	$mail->AddAddress("sehomeseamonsters@yahoo.com");

	if(!$mail->Send()) {
		echo "There was an error sending your message, please try back soon. If this problem continues, please email us directly at sehomeseamonsters@yahoo.com";
	} else {
		echo "Your message has been sent. We will do our best to respond as soon as possible.";
	}
	
?>