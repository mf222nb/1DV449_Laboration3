<?php

class echoHTML{
    public function echoHTML(){
        $ret = "<!DOCTYPE html>
                <html>
                <head>
                    <title></title>
                    <meta charset='utf-8'>
                    <link href='./Style/bootstrap.min.css' rel='stylesheet'>
                    <link href='./Style/style.css' rel='stylesheet'>
                </head>
                <body>
                <div class='row col-md-12'>
                    <div class='page-header'>
                        <h1>Trafikhjälpen</h1>
                    </div>
                </div>
                <div class='container-fluid'>
                    <div class='row'>
                        <div class='col-md-5'>
                            <select id='selectList' class='btn btn-success form-control'>
                                <option value='4' class='btn btn-default'>Alla trafikmeddelande</option>
                                <option value='0' class='btn btn-default'>Vägtrafik</option>
                                <option value='1' class='btn btn-default'>Kollektivtrafik</option>
                                <option value='2' class='btn btn-default'>Planerade störningar</option>
                                <option value='3' class='btn btn-default'>Övrigt</option>
                            </select>
                            <div  id='messageList'></div>
                        </div>

                        <div id='map-canvas' class='col-md-7'></div>
                    </div>
                </div>
                    <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyD0g_j-daef3ACajzaXTPAZ6Lg9xrsQ6-0'></script>
                    <script src='./js/GoogleMap.js'></script>
                    <script src='./js/jquery-1.10.2.min.js'></script>
                    <script src='./js/TrafficMessages.js'></script>
                </body>
                </html>";
        return $ret;
    }
}