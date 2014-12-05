var TrafficMessage = {

    markers:[],
    array0:[],
    array1:[],
    array2:[],
    array3:[],
    array4:[],
    infoWindow:undefined,
    prev_InfoWindow:false,
    chosenCategory:"4",
    init:function(){
        TrafficMessage.getMessages();
        TrafficMessage.getChosenCategoryClick();
        TrafficMessage.getMessageListClick();
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
                }

                TrafficMessage.markers.reverse();

                TrafficMessage.getChosenCategoryMessages();
            }
        })
    },
    renderTitle:function(title, id){
        var body = document.getElementById("messageList");
        var aTag = document.createElement("a");

        aTag.textContent = title;
        aTag.href = "#"+id;
        aTag.id = id;

        body.appendChild(aTag);
    },
    renderInfoWindow:function(description, title, date, subcategory){
        date = new Date(parseInt(date.replace("/Date(", "").replace(")/",""), 10));
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + title + '</h1>'+
            '<div id="bodyContent">'+
            '<p>' + date + '</p>'+
            '<p>' + description + '</p>'+
            '<p>' + subcategory + '</p>'+
            '</div>'+
            '</div>';

        this.infoWindow = new google.maps.InfoWindow({
            content: contentString
        });
    },
    getMessageListClick:function(){
        $("#messageList").on('click', function(v) {
            for(var i = 0; i < TrafficMessage.array4.length; i++){
                if(TrafficMessage.array4[i].id == v.target.id){
                    if(TrafficMessage.prev_InfoWindow){
                        TrafficMessage.prev_InfoWindow.close();
                    }
                    TrafficMessage.renderInfoWindow(TrafficMessage.array4[i].description, TrafficMessage.array4[i].title, TrafficMessage.array4[i].date, TrafficMessage.array4[i].subcategory);
                    TrafficMessage.prev_InfoWindow = TrafficMessage.infoWindow;
                    TrafficMessage.infoWindow.open(GoogleMap.map,TrafficMessage.array4[i]);
                }
            }
        });
    },
    getChosenCategoryClick:function(){
        $('#selectList').change(function(v){
            TrafficMessage.chosenCategory = v.target.value;
            TrafficMessage.getChosenCategoryMessages();
        });
    },
    getChosenCategoryMessages:function(){
        TrafficMessage.resetMarkers();

        for (var i = 0; i < TrafficMessage.markers.length; i++) {
            switch(TrafficMessage.chosenCategory) {
                case "0":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.array0[i].latitude, TrafficMessage.array0[i].longitude),
                        title: TrafficMessage.array0[i].title,
                        date: TrafficMessage.array0[i].createddate,
                        description: TrafficMessage.array0[i].description,
                        id: TrafficMessage.array0[i].id,
                        subcategory: TrafficMessage.array0[i].subcategory
                    });
                    TrafficMessage.array4.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.array4[i].title, TrafficMessage.array4[i].id);
                    break;
                case "1":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.array1[i].latitude, TrafficMessage.array1[i].longitude),
                        title: TrafficMessage.array1[i].title,
                        date: TrafficMessage.array1[i].createddate,
                        description: TrafficMessage.array1[i].description,
                        id: TrafficMessage.array1[i].id,
                        subcategory: TrafficMessage.array1[i].subcategory
                    });
                    TrafficMessage.array4.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.array4[i].title, TrafficMessage.array4[i].id);
                    break;
                case "2":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.array2[i].latitude, TrafficMessage.array2[i].longitude),
                        title: TrafficMessage.array2[i].title,
                        date: TrafficMessage.array2[i].createddate,
                        description: TrafficMessage.array2[i].description,
                        id: TrafficMessage.array2[i].id,
                        subcategory: TrafficMessage.array2[i].subcategory
                    });
                    TrafficMessage.array4.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.array4[i].title, TrafficMessage.array4[i].id);
                    break;
                case "3":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.array3[i].latitude, TrafficMessage.array3[i].longitude),
                        title: TrafficMessage.array3[i].title,
                        date: TrafficMessage.array3[i].createddate,
                        description: TrafficMessage.array3[i].description,
                        id: TrafficMessage.array3[i].id,
                        subcategory: TrafficMessage.array3[i].subcategory
                    });
                    TrafficMessage.array4.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.array4[i].title, TrafficMessage.array4[i].id);
                    break;
                case "4":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.markers[i].latitude, TrafficMessage.markers[i].longitude),
                        title: TrafficMessage.markers[i].title,
                        date: TrafficMessage.markers[i].createddate,
                        description: TrafficMessage.markers[i].description,
                        id: TrafficMessage.markers[i].id,
                        subcategory: TrafficMessage.markers[i].subcategory
                    });
                    TrafficMessage.array4.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.array4[i].title, TrafficMessage.array4[i].id);
                    break;
            }

            google.maps.event.addListener(marker, 'click', (function(marker) {
                var description = TrafficMessage.array4[i].description;
                var date = TrafficMessage.array4[i].date;
                var title = TrafficMessage.array4[i].title;
                var subcategory = TrafficMessage.array4[i].subcategory;
                return function(){
                    if(TrafficMessage.prev_InfoWindow){
                        TrafficMessage.prev_InfoWindow.close();
                    }
                    TrafficMessage.renderInfoWindow(description, title, date, subcategory);
                    TrafficMessage.prev_InfoWindow = TrafficMessage.infoWindow;
                    TrafficMessage.infoWindow.open(GoogleMap.map,marker);
                }
            })(marker));
        }
    },
    resetMarkers:function(){
        for(var i = 0; i < TrafficMessage.array4.length; i++){
            TrafficMessage.array4[i].setMap(null);
        }
        TrafficMessage.array4 = [];
        document.getElementById("messageList").innerHTML = "";
    }
}
window.addEventListener('load', TrafficMessage.init);