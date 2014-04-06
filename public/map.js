var map;
var myMarker;
var crowdees  = {};
var user;
var infoWindow;
var trace = {};
var myName = 'myself';

function initMap(lat, long) {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(lat,long)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  showAssemblyPoint(lat, long);
  myMarker = createMarker(lat, long, 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png', myName);
  io = io.connect();
  infowindow = new google.maps.InfoWindow(); 
  google.maps.event.trigger(map, 'resize');
  trace[myName] = [];
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

function watchMyPosition(){
	navigator.geolocation.watchPosition(showMyPosition);
}

var temp = 0;
function showMyPosition(geoPos) {
	newPos = new google.maps.LatLng(geoPos.coords.latitude+temp, geoPos.coords.longitude);
    //temp = temp + 0.001;
    if (myMarker){
	    myMarker.setPosition(newPos);
	    var keepCentered = document.getElementById("keepCentered").checked;
	    if (keepCentered){
	    	map.setCenter(newPos);
	    }
    }
	io.emit('crowdee:updatePosition', 
			{	user: user,
				lat: newPos.lat(),
				long: newPos.lng()}); 
	updatePath(myName, newPos, '#00FF00');
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
		trace[name] = [];
	} 
	var pos = new google.maps.LatLng(lat, long);
	marker.setPosition(pos);
	updatePath(name, pos, '#FF0000');
}

function updatePath(name, pos, color) {
	trace[name].push(pos);

	var footPath = new google.maps.Polyline({
	    path: trace[name],
	    geodesic: true,
	    strokeColor: color,
	    strokeOpacity: 1.0,
	    strokeWeight: 2
  	});

 	footPath.setMap(map);

}

function sendChatMessage(){
	var message = document.getElementById("chatMessage").value;
  	io.emit('crowdee:chat', {user:user, message: message}); 
  	document.getElementById("chatMessage").value = "";
}

function updateChat(sender, message){
 	document.getElementById("chatWindow").value = document.getElementById("chatWindow").value + "\n" +  sender + ": " + message;
 	document.getElementById("chatWindow").scrollTop =    document.getElementById("chatWindow").scrollHeight;
}

