<?php
$errors = array();
$data = array();

$_POST = json_decode(file_get_contents('php://input'), true);

$name = $_POST['name'];
$title = $_POST['title'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$mailTo = 'generic@emailaddress.com';
$headers = "Reply-To: $email \r\n";
$emailSubject = $subject;
$body = 'New message from ' . $name . ', ' . $title . ' - ' . $message . "\n";
mail($mailTo, $emailSubject, $body, $headers);

echo json_encode($data);
?>