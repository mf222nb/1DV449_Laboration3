<?php

require_once("../rmccue/library/Requests.php");
Requests::register_autoloader();

$request = Requests::get('http://api.sr.se/api/v2/traffic/messages?format=json&indent=true&size=100&sort=createddate+desc');

file_put_contents("traffic.json", $request->body);

echo(file_get_contents("traffic.json"));