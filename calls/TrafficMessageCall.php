<?php

require_once("../rmccue/library/Requests.php");
Requests::register_autoloader();
$cachetime = 300;
$cachefile = "traffic.json";



//file_put_contents("traffic.json", $request->body);
if (file_exists($cachefile) && filemtime($cachefile) > (time() - 300 )) {
    echo(file_get_contents("traffic.json"));
}
else{
    $request = Requests::get('http://api.sr.se/api/v2/traffic/messages?format=json&size=1000');
    if($request == "" || $request == null){
        echo(file_get_contents("traffic.json"));
        die();
    }
    file_put_contents($cachefile, $request->body);
    echo(file_get_contents("traffic.json"));
}
