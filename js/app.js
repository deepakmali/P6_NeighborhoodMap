//Initialize the map
var map;
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
		center : {lat : 17.4338554, lng : 78.363027},
		zoom : 11
	});
}