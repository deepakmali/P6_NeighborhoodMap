// array of all the malls in hyderabad
var malls = [
{
    title : 'Golkonda Fort',
    lat : 17.383309,
    lng : 78.3988641,
    description : 'https://en.wikipedia.org/wiki/Golkonda'
},
{
    title : 'Salar Jung Museum',
    lat : 17.3713411,
    lng : 78.4792221,
    description : 'https://en.wikipedia.org/wiki/Salar_Jung_Museum'
},
{
    title : 'Buddha Statue',
    lat : 17.4155731,
    lng : 78.4662276,
    description : 'https://en.wikipedia.org/wiki/Buddha_Statue_of_Hyderabad'
},
{
    title : 'Charminar',
    lat : 17.3615636,
    lng : 78.4724758,
    description : 'https://en.wikipedia.org/wiki/Charminar'
},
{
    title : 'Birla Mandir',
    lat : 17.4062367,
    lng : 78.4668714,
    description : 'https://en.wikipedia.org/wiki/Birla_Mandir,_Hyderabad'
},
{
    title : 'Birla Planetarium',
    lat : 17.4033187,
    lng : 78.4684219,
    description : 'https://en.wikipedia.org/wiki/Birla_Science_Museum'
},
{
    title : 'Chowmahalla Palace',
    lat : 17.3578233,
    lng : 78.469501,
    description : 'https://en.wikipedia.org/wiki/Chowmahalla_Palace'
}
];





// object to hold the mall details
var mall_details = function (mall){
    this.title = ko.observable(mall.title);
    this.lat = ko.observable(mall.lat);
    this.lng = ko.observable(mall.lng);
    this.description = ko.observable(mall.description);
    this.wikiLink = ko.observable();
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
    document.getElementById("main").innerHTML = '<h1>Sorry, Google maps is not reachable currently.<br/>Please try Again later</h1>';
}

// Todo: add viewmodel
// knockout viewModel
var viewModel = function (){
    self = this;
    this.mallsList = ko.observableArray();
    self.result = ko.observable();

    //api call to wiki to get related links to Hyderabad

    // var moreAboutHyderabad = '<ul>';
    // wiki_url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=Hyderabad,India&format=json&callback=wikiCallback";
    //     var wikiRequestTimeout = setTimeout(function(){
    //     moreAboutHyderabad = "Failed to get the wiki articles!!!";
    //     }, 8000);
    //     $.ajax({
    //         url : wiki_url,
    //         dataType : 'jsonp',
    //         success : function(data){
    //             response = data[1] ;
    //             for (var i = 0; i < Math.min(3,response.length); i++) {
    //                 // console.log(response[i]);
    //                 article_str = response[i];
    //                 article_url = "http://en.wikipedia.org/wiki/" + article_str ;
    //                 moreAboutHyderabad += '<li><a href="' + article_url + '">' + article_str + '</a></li>';
    //             }
    //             clearTimeout(wikiRequestTimeout);
    //             // console.log(moreAboutHyderabad);
    //             moreAboutHyderabad += '</ul>';
    //             // document.getElementById('WikiLinks').innerHTML = moreAboutHyderabad;
    //         },
    //         error : function(){
    //             // document.getElementById('WikiLinks').innerHTML = '<p>Sorry, could not load links</p>';
    //         }
    //     });

    // push malls into the mallsList
    // setTimeout(function(){console.log('testing');}, 8000);
    malls.forEach(function (mall){
        self.mallsList.push(new mall_details(mall));
    });


    // console.log(self.mallsList());
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
        // Add a image to popup
        // flickrUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=97d1c372b413a02c10ef47541ba743a8&text=&woe_id=24527543&lat="+mall.lat()+"&lon="+mall.lng()+"&per_page=1&page=1&format=json&nojsoncallback=1&api_sig=55add2d5a0b4f4fd2d92d17f6f9af98e";
        googleapiKey = "AIzaSyDx-pYXGTkwhFeqcG9M8SQHeKP0LTdZbYQ";
        gimageUrl = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+ mall.lat() + ',' + mall.lng() +"&heading=151.78&pitch=-0.76&key=" + googleapiKey ;
        
        // ajax call to get the image
        // $.ajax({
        //     url : flickrUrl,
        //     dataType : "json",
        //     success : function (data){
        //         console.log(data);
        //     }
        // });
        // form the content of the InfoWindow
        var info = '<img class="images" src="' + gimageUrl + '"/>';
        // info += '<a href="'+ mall.description() + '" target="_blank">Read on Wikipedia</a>';
        // info += mall.links();
        // console.log(info);
        // add wiki link to each place
        // var result = ko.observable('<ul>');
        wiki_url = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + mall.title() + "&format=json&callback=wikiCallback";
        // var wikiRequestTimeout = setTimeout(function(){
        // result = "Failed to get the wiki articles!!!";
        // }, 8000);
        $.ajax({
            url : wiki_url,
            dataType : 'jsonp',
            success : function(data){
                self.result('<ul>');
                response = data[1] ;
                for (var i = 0; i < Math.min(1,response.length); i++) {
                    // console.log(response[i]);
                    article_str = response[i];
                    article_url = "http://en.wikipedia.org/wiki/" + article_str ;
                    mall.wikiLink(article_url)
                    // self.result( self.result() + '<li><a href="' + article_url + '">' + article_str + '</a></li>');
                }
                clearTimeout(wikiRequestTimeout);
                // console.log(moreAboutHyderabad);
                self.result( self.result() + '</ul>');
                // document.getElementById('WikiLinks').innerHTML = moreAboutHyderabad;
                // console.log(self.result);
            },
            error : function(){
                self.result = '<p>Sorry, could not load links</p>';
            }
        });

        // console.log(result);
        // info += mall.wikiLink();
        console.log('testing');
        console.log(info);
        // add click listener to show the popup on marker
        google.maps.event.addListener(mallMarker, 'click', function(){
            if(info.indexOf(mall.wikiLink()) === -1){
                info += '<a href="' + mall.wikiLink() + '">Read more about ' + mall.title() + ' </a>';    
            }
            
            popup.setContent(info);
            console.log(info);
            popup.open(map, this);
            mall.marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                mall.marker.setAnimation(null);
            }, 500);
        });
        // console.log(mall.marker);
    });
    // add click event for the list elements
    self.showPopup = function (mall){
        google.maps.event.trigger(mall.marker, 'click');
    };

    // user input variable
    self.filterString = ko.observable('');
    // filter the tourist attractions based on user's filter input
    self.filteredList = ko.observableArray();
    // initialize with all the tourist places
    // self.filteredList = self.mallsList.slice(0);
    self.mallsList().forEach(function (mall){
        self.filteredList.push(mall);
    });
    // console.log(self.filteredList());
    // self.filteredList.removeAll();
    // console.log(self.filteredList());
    // filter the tourist places as user types
    self.filterList = function (){
        var substr = self.filterString().toLowerCase();
        // reset the filteredList
        // http://knockoutjs.com/documentation/observableArrays.html
        self.filteredList.removeAll();
        // remove all markers from map
        self.mallsList().forEach(function (mall){
            mall.marker.setVisible(false);
            // https://stackoverflow.com/questions/1789945/how-to-check-whether-a-string-contains-a-substring-in-javascript
            if (mall.title().toLowerCase().indexOf(substr) !== -1) {
                self.filteredList.push(mall);
            }
        });
        self.filteredList().forEach(function(mall){
            mall.marker.setVisible(true);
        });
    };
};