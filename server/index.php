<?php

$db = new mysqli('localhost', 'mysql', 'mysql', 'wsr-0');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, TRUE);

$query = "INSERT INTO results (id, name, score, time) VALUES (NULL, '{$data['name']}', '{$data['score']}', '{$data['time']}' );";
$result = $db->query($query);
$db->close();

//echo json_encode(mysqli_fetch_assoc($db->query('SELECT * FORM `results`')));
echo $query;
