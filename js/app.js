// array of all the malls in hyderabad
var malls = [
{
    title : 'Golconda Fort',
    lat : 17.383309,
    lng : 78.3988641,
    description : 'dummy'
},
{
    title : 'Salar Jung Museum',
    lat : 17.3713411,
    lng : 78.4792221,
    description : 'dummy'
},
{
    title : 'Buddha Statue',
    lat : 17.4155731,
    lng : 78.4662276,
    description : 'dummy'
},
{
    title : 'Charminar',
    lat : 17.3615636,
    lng : 78.4724758,
    description : 'dummy'
},
{
    title : 'Birla Mandir',
    lat : 17.4062367,
    lng : 78.4668714,
    description : 'dummy'
},
{
    title : 'Birla Planetarium',
    lat : 17.4033187,
    lng : 78.4684219,
    description : 'dummy'
},
{
    title : 'Chowmahalla Palace',
    lat : 17.3578233,
    lng : 78.469501,
    description : 'dummy'
}
];

// object to hold the mall details
var mall_details = function (mall){
    this.title = ko.observable(mall.title);
    this.lat = ko.observable(mall.lat);
    this.lng = ko.observable(mall.lng);
    this.description = ko.observable(mall.description);
    // Todo: add ajax call to wikipedia and get the description for the mall
};

// Initialize the map
var map;
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center : {lat : 17.4338554, lng : 78.363027},
        zoom : 11
    });
    ko.applyBindings(new viewModel());
}


// Show error when the google map fails to load for some reason
function showError(){
    document.getElementsByTagName("body").innerHtml = '<h1>Sorry, Google maps is not reachable currently.<br/>Please try Again later</h1>';
}

// Todo: add viewmodel
// knockout viewModel
var viewModel = function (){
    self = this;
    this.mallsList = ko.observableArray();
    // push malls into the mallsList
    malls.forEach(function (mall){
        self.mallsList.push(new mall_details(mall));
    });
    console.log(self.mallsList());
    // initialize a marker
    var mallMarker;
    // initialize a popup for malls
    var popup = new google.maps.InfoWindow();
    self.mallsList().forEach(function (mall){
        mallMarker = new google.maps.Marker({
            position : new google.maps.LatLng(mall.lat(), mall.lng()),
            map : map,
            animation : google.maps.Animation.DROP,
            title : mall.title()
        });
        mall.marker = mallMarker;
        // form the content of the InfoWindow
        var info = "<div> "+ mall.description() + "</div>";
        // add click listener to show the popup on marker
        google.maps.event.addListener(mallMarker, 'click', function(){
            popup.setContent(info);
            popup.open(map, this);
            mall.marker.setAnimation(google.maps.Animation.BOUNCE);
        });
        // console.log(mall.marker);
    });

};