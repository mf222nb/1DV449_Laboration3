<?php

class echoHTML{
    public function echoHTML(){
        $ret = "<!DOCTYPE html>
                <html>
                <head>
                    <title></title>
                    <meta charset='utf-8'>
                </head>
                <body>
                    <div id='messageList'>

                    </div>
                    <script src='./js/jquery-1.10.2.min.js'></script>
                    <script src='./js/TrafficMessages.js'></script>
                </body>
                </html>";
        return $ret;
    }
}