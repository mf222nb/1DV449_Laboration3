<?php

class echoHTML{
    public function echoHTML(){
        $ret = "<!DOCTYPE html>
                <html>
                <head>
                    <title></title>
                    <meta charset='utf-8'>
                    <link href='./Style/style.css' rel='stylesheet'>
                </head>
                <body>
                    <div id='messageList'></div>
                    <select id='selectList'>
                        <option value='4'>Alla trafikmeddelande</option>
                        <option value='0'>Vägtrafik</option>
                        <option value='1'>Kollektivtrafik</option>
                        <option value='2'>Planerade störningar</option>
                        <option value='3'>Övrigt</option>
                    </select>
                    <div id='map-canvas'></div>

                    <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyD0g_j-daef3ACajzaXTPAZ6Lg9xrsQ6-0'></script>
                    <script src='./js/GoogleMap.js'></script>
                    <script src='./js/jquery-1.10.2.min.js'></script>
                    <script src='./js/TrafficMessages.js'></script>
                </body>
                </html>";
        return $ret;
    }
}