var TrafficMessage = {

    allMessagesArray:[],
    roadTrafficArray:[],
    publicTransportArray:[],
    plannedInterferenceArray:[],
    otherArray:[],
    markers:[],
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

                var reverseArray = data["messages"].reverse();
                reverseArray = TrafficMessage.filterUnique(reverseArray);
                for (var i = 0; i < 100; i++) {

                    if(reverseArray[i].category == 0){
                        TrafficMessage.roadTrafficArray.push(reverseArray[i]);
                    }
                    if(reverseArray[i].category == 1){
                        TrafficMessage.publicTransportArray.push(reverseArray[i]);

                    }
                    if(reverseArray[i].category == 2){
                        TrafficMessage.plannedInterferenceArray.push(reverseArray[i]);

                    }
                    if(reverseArray[i].category == 3){
                        TrafficMessage.otherArray.push(reverseArray[i]);
                    }

                    TrafficMessage.allMessagesArray.push(reverseArray[i]);
                }

                TrafficMessage.getChosenCategoryMessages();
            }
        })
    },
    filterUnique: function (messages){
    var tempObj = {};
    return messages.filter(function(value){
        return tempObj.hasOwnProperty(value.id) ? false : (tempObj[value.id] = true);
    })
    },
    renderTitle:function(title, id){
        var body = document.getElementById("messageList");
        var aTag = document.createElement("a");
        var li = document.createElement("li");

        aTag.textContent = title;
        aTag.href = "#"+id;
        aTag.id = id;

        li.appendChild(aTag);
        body.appendChild(li);
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
            for(var i = 0; i < TrafficMessage.markers.length; i++){
                if(TrafficMessage.markers[i].id == v.target.id){
                    if(TrafficMessage.prev_InfoWindow){
                        TrafficMessage.prev_InfoWindow.close();
                    }
                    TrafficMessage.renderInfoWindow(TrafficMessage.markers[i].description, TrafficMessage.markers[i].title, TrafficMessage.markers[i].date, TrafficMessage.markers[i].subcategory);
                    TrafficMessage.prev_InfoWindow = TrafficMessage.infoWindow;
                    TrafficMessage.infoWindow.open(GoogleMap.map,TrafficMessage.markers[i]);
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

        for (var i = 0; i < TrafficMessage.allMessagesArray.length; i++) {
            switch(TrafficMessage.chosenCategory) {
                case "0":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.roadTrafficArray[i].latitude, TrafficMessage.roadTrafficArray[i].longitude),
                        title: TrafficMessage.roadTrafficArray[i].title,
                        date: TrafficMessage.roadTrafficArray[i].createddate,
                        description: TrafficMessage.roadTrafficArray[i].description,
                        id: TrafficMessage.roadTrafficArray[i].id,
                        subcategory: TrafficMessage.roadTrafficArray[i].subcategory
                    });
                    TrafficMessage.markers.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.markers[i].title, TrafficMessage.markers[i].id);
                    break;
                case "1":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.publicTransportArray[i].latitude, TrafficMessage.publicTransportArray[i].longitude),
                        title: TrafficMessage.publicTransportArray[i].title,
                        date: TrafficMessage.publicTransportArray[i].createddate,
                        description: TrafficMessage.publicTransportArray[i].description,
                        id: TrafficMessage.publicTransportArray[i].id,
                        subcategory: TrafficMessage.publicTransportArray[i].subcategory
                    });
                    TrafficMessage.markers.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.markers[i].title, TrafficMessage.markers[i].id);
                    break;
                case "2":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.plannedInterferenceArray[i].latitude, TrafficMessage.plannedInterferenceArray[i].longitude),
                        title: TrafficMessage.plannedInterferenceArray[i].title,
                        date: TrafficMessage.plannedInterferenceArray[i].createddate,
                        description: TrafficMessage.plannedInterferenceArray[i].description,
                        id: TrafficMessage.plannedInterferenceArray[i].id,
                        subcategory: TrafficMessage.plannedInterferenceArray[i].subcategory
                    });
                    TrafficMessage.markers.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.markers[i].title, TrafficMessage.markers[i].id);
                    break;
                case "3":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.otherArray[i].latitude, TrafficMessage.otherArray[i].longitude),
                        title: TrafficMessage.otherArray[i].title,
                        date: TrafficMessage.otherArray[i].createddate,
                        description: TrafficMessage.otherArray[i].description,
                        id: TrafficMessage.otherArray[i].id,
                        subcategory: TrafficMessage.otherArray[i].subcategory
                    });
                    TrafficMessage.markers.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.markers[i].title, TrafficMessage.markers[i].id);
                    break;
                case "4":
                    var marker = new google.maps.Marker({
                        map:GoogleMap.map,
                        position: new google.maps.LatLng(TrafficMessage.allMessagesArray[i].latitude, TrafficMessage.allMessagesArray[i].longitude),
                        title: TrafficMessage.allMessagesArray[i].title,
                        date: TrafficMessage.allMessagesArray[i].createddate,
                        description: TrafficMessage.allMessagesArray[i].description,
                        id: TrafficMessage.allMessagesArray[i].id,
                        subcategory: TrafficMessage.allMessagesArray[i].subcategory
                    });
                    TrafficMessage.markers.push(marker);
                    TrafficMessage.renderTitle(TrafficMessage.markers[i].title, TrafficMessage.markers[i].id);
                    break;
            }

            google.maps.event.addListener(marker, 'click', (function(marker) {
                var description = TrafficMessage.markers[i].description;
                var date = TrafficMessage.markers[i].date;
                var title = TrafficMessage.markers[i].title;
                var subcategory = TrafficMessage.markers[i].subcategory;
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
        for(var i = 0; i < TrafficMessage.markers.length; i++){
            TrafficMessage.markers[i].setMap(null);
        }
        TrafficMessage.markers = [];
        document.getElementById("messageList").innerHTML = "";
    }
}
window.addEventListener('load', TrafficMessage.init);