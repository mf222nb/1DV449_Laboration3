var TrafficMessage = {

    messages: [],
    init:function(){
        TrafficMessage.getMessages();
    },
    getMessages:function(){
        $.ajax({
            type: "GET",
            url: "calls/TrafficMessageCall.php",
            success: function(data){
                data = JSON.parse(data);

                for(var i = 0; i < data["messages"].length; i++){
                    var title = data["messages"][i].title;
                    TrafficMessage.renderTitle(title);
                }
            }
        })
    },
    renderTitle:function(title){
        var body = document.getElementById("messageList");
        var aTag = document.createElement("a");

        aTag.innerText = title;

        body.appendChild(aTag);
    }
}

window.onload = TrafficMessage.init;