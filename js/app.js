// array of all the malls in hyderabad
var malls = [
{
    title : 'GVK One',
    lat : 17.4232521,
    lng : 78.447205
},
{
    title : 'Inorbit Mall',
    lat : 17.4356584,
    lng : 78.3854069
},
{
    title : 'Central Shopping Mall',
    lat : 17.4247671,
    lng : 78.4073366
},
{
    title : 'Forum Srujana Mall',
    lat : 17.4247671,
    lng : 78.4073366
},
{
    title : 'Manjeera Mall',
    lat : 17.4247671,
    lng : 78.4073366
},
{
    title : 'Atrium Mall',
    lat : 17.4247671,
    lng : 78.4073366
},
]
// Initialize the map
var map;
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center : {lat : 17.4338554, lng : 78.363027},
        zoom : 11
    });
}

function showError(){
    document.getElementsByTagName("body").innerHtml = '<h1>Sorry, Google maps is not reachable currently.<br/>Please try Again later</h1>';
}