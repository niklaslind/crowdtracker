var map;
var myMarker;
var crowdees  = {};
var user;
var infoWindow;

function initMap(lat, long) {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(lat,long)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  showAssemblyPoint(lat, long);
  myMarker = createMarker(lat, long, 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png', 'myself');
  io = io.connect();
  infowindow = new google.maps.InfoWindow(); 
}

function join(){
	user = document.getElementById("username").value;
  	io.emit('crowdee:join', {user:user}); 
}

function initPositionListener() {
	io.on('positionUpdate', function(data) {  
		console.log("got position: "+JSON.stringify(data));
		updateCrowdeeMarker(data.user, data.lat, data.long)
	})	
} 

function initChatListener() {
	io.on('chatUpdate', function(data) {  
		console.log("got chitchat: "+JSON.stringify(data));
		updateChat(data.user, data.message)
	})	
} 


function showAssemblyPoint(lat, long) {
	createMarker(lat, long, 'https://maps.google.com/mapfiles/kml/shapes/schools_maps.png', 'assembly point')
}


// Info window trigger function 
function onItemClick(event, marker, username) { 
  // Create content  
  var contentString = username;//"todo:name";// + marker.position.lng +"," + marker.data.lat; 

  // Replace our Info Window's content and position 
  infowindow.setContent(contentString); 
  infowindow.setPosition(marker.position); 
  infowindow.open(map) 
} 

function createMarker(lat, long, icon, username){
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat ,long),
        icon: icon,

    });

	 // Listen for click event  
	  google.maps.event.addListener(marker, 'click', function() { 
	    map.setCenter(new google.maps.LatLng(marker.position.lat(), marker.position.lng())); 
	   // map.setZoom(18); 
	    onItemClick(event, marker, username); 
	  }); 
	  return marker;


};

var temp = 0;
function showMyPosition(geoPos) {
	newPos = new google.maps.LatLng(geoPos.coords.latitude+temp, geoPos.coords.longitude);
    temp = temp + 0.001;
    if (myMarker){
	    myMarker.setPosition(newPos);
    }
      io.emit('crowdee:updatePosition', 
      		{	user: user,
      			lat: newPos.lat(),
      			long: newPos.lng()}); 
}

function getMyPosition() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showMyPosition);
    }else{
        alert('Your browser does not support geolocation!');
    }

}

function updateCrowdeeMarker(name, lat,long) {
	var marker = crowdees[name]
	if (!marker) {
		marker = createMarker(lat, long, "http://maps.google.com/mapfiles/ms/micons/bar.png", name);
		crowdees[name] = marker
	} else {
		pos = new google.maps.LatLng(lat, long);
		marker.setPosition(pos);
	}
}

function sendChatMessage(){
	var message = document.getElementById("chatMessage").value;
  	io.emit('crowdee:chat', {user:user, message: message}); 
  	document.getElementById("chatMessage").value = "";
}

function updateChat(sender, message){
 	document.getElementById("chatWindow").value = document.getElementById("chatWindow").value + "\n" +  sender + ": " + message;
}
