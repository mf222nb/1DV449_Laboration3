var TrafficMessage = {

    markers:[],
    array0:[],
    array1:[],
    array2:[],
    array3:[],
    infoWindow:undefined,
    prev_InfoWindow:false,
    chosenCategory:4,
    init:function(){
        TrafficMessage.getMessages();
        TrafficMessage.getChosenCategoryClick();
    },
    getMessages:function(){
        $.ajax({
            type: "GET",
            url: "calls/TrafficMessageCall.php",
            success: function(data){
                data = JSON.parse(data);

                for (var i = 0; i < data["messages"].length; i++) {

                    if(data["messages"][i].category == 0){
                        TrafficMessage.array0.push(data["messages"][i]);
                    }
                    if(data["messages"][i].category == 1){
                        TrafficMessage.array1.push(data["messages"][i]);

                    }
                    if(data["messages"][i].category == 2){
                        TrafficMessage.array2.push(data["messages"][i]);

                    }
                    if(data["messages"][i].category == 3){
                        TrafficMessage.array3.push(data["messages"][i]);
                    }

                    TrafficMessage.markers.push(data["messages"][i]);

                    //date = new Date(parseInt(date.replace("/Date(", "").replace(")/",""), 10));
                }

                for (var i = 0; i < data["messages"].length; i++) {
                    switch(TrafficMessage.chosenCategory) {
                        case 0:
                            var marker = new google.maps.Marker({
                                map:GoogleMap.map,
                                position: new google.maps.LatLng(TrafficMessage.array0[i].latitude, TrafficMessage.array0[i].longitude),
                                title: TrafficMessage.array0[i].title
                            });
                            break;
                        case 1:
                            var marker = new google.maps.Marker({
                                map:GoogleMap.map,
                                position: new google.maps.LatLng(TrafficMessage.array1[i].latitude, TrafficMessage.array1[i].longitude),
                                title: TrafficMessage.array1[i].title
                            });
                            break;
                        case 2:
                            var marker = new google.maps.Marker({
                                map:GoogleMap.map,
                                position: new google.maps.LatLng(array2[i].latitude, array2[i].longitude),
                                title: TrafficMessage.array2[i].title
                            });
                            break;
                        case 3:
                            var marker = new google.maps.Marker({
                                map:GoogleMap.map,
                                position: new google.maps.LatLng(TrafficMessage.array3[i].latitude, TrafficMessage.array3[i].longitude),
                                title: TrafficMessage.array3[i].title
                            });
                            break;
                        case 4:
                            var marker = new google.maps.Marker({
                                map:GoogleMap.map,
                                position: new google.maps.LatLng(TrafficMessage.markers[i].latitude, TrafficMessage.markers[i].longitude),
                                title: TrafficMessage.markers[i].title
                            });
                            break;
                    }

                    var headerTitle = data["messages"][i].title;
                    var id = data["messages"][i].id;
                    TrafficMessage.renderTitle(headerTitle, id);
                    /*var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data["messages"][i].latitude, data["messages"][i].longitude),
                        map: GoogleMap.map,
                        title: data["messages"][i].title,
                        category: data["messages"][i].category
                    });*/
                    //TrafficMessage.markers.push(marker);
                    google.maps.event.addListener(marker, 'click', (function(marker) {
                        var description = data["messages"][i].description;
                        var date = data["messages"][i].createddate;
                        var title = headerTitle;
                        return function(){
                            if(TrafficMessage.prev_InfoWindow){
                                TrafficMessage.prev_InfoWindow.close();
                            }
                            TrafficMessage.renderInfoWindow(description, title, date);
                            TrafficMessage.prev_InfoWindow = TrafficMessage.infoWindow;
                            TrafficMessage.infoWindow.open(GoogleMap.map,marker);
                        }
                    })(marker));
                }
            }
        })
    },
    renderTitle:function(title, id){
        var body = document.getElementById("messageList");
        var aTag = document.createElement("a");

        aTag.innerText = title;
        aTag.href = "#"+id;

        body.appendChild(aTag);
    },
    renderInfoWindow:function(description, title, date){
        date = new Date(parseInt(date.replace("/Date(", "").replace(")/",""), 10));
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + title + '</h1>'+
            '<div id="bodyContent">'+
            '<p>' + date + '</p>'+
            '<p>' + description + '</p>'+
            '</div>'+
            '</div>';

        this.infoWindow = new google.maps.InfoWindow({
            content: contentString
        });
    },
    getChosenCategoryClick:function(){
        $('#selectList').change(function(v){
            this.chosenCategory = v.target.value;
            TrafficMessage.getMessages();
        });
    },
    getChosenCategoryMessages:function(chosenCategory){

    }
}

window.addEventListener('load', TrafficMessage.init);