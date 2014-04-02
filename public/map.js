var map;
var myMarker;
var crowdees  = {};
var user;

function initMap(lat, long) {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(lat,long)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  showAssemblyPoint(lat, long);
  myMarker = createMarker(lat, long, 'http://google-maps-icons.googlecode.com/files/sailboat-tourism.png');
  io = io.connect();
}

function join(userid){
	user = document.getElementById("username").value;
  	io.emit('crowdee:join', {user:user}); 
}

function initPositionListener() {
	io.on('positionUpdate', function(data) {  
		console.log("got position: "+JSON.stringify(data));
		updateCrowdeeMarker(data.user, data.lat, data.long)
	})	
} 


function showAssemblyPoint(lat, long) {
	createMarker(lat, long, 'https://maps.google.com/mapfiles/kml/shapes/schools_maps.png')
}

function createMarker(lat, long, icon) {
    return new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat ,long ),
        icon: icon
    });
};

var temp = 0;
function showMyPosition(geoPos) {
	newPos = new google.maps.LatLng(geoPos.coords.latitude+temp, geoPos.coords.longitude);
    //temp = temp + 0.001;
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
		marker = createMarker(lat, long, "http://maps.google.com/mapfiles/ms/micons/bar.png");
		crowdees[name] = marker
	} else {
		pos = new google.maps.LatLng(lat, long);
		marker.setPosition(pos);
	}
}

