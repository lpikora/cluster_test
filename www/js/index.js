document.addEventListener("deviceready", function () {

    var mapDiv = document.getElementById("map_canvas");
    var options = {
        'camera': {
            'target': data1[0].position,
            'zoom': 14
        }
    };
    var map = plugin.google.maps.Map.getMap(mapDiv, options);
    map.on(plugin.google.maps.event.MAP_READY, onMapReady);
});


function onMapReady() {
    var map = this;

    var label = document.getElementById("label");

    var addBtn = document.getElementById("addClusterBtn");
    addBtn.addEventListener("click", function() {
        addCluster(map, data1);
    });

    var clearBtn = document.getElementById("clearBtn");
    clearBtn.addEventListener("click", function() {
        map.clear();
    });

    addCluster(map, data1);

}

function addCluster(map, data) {

      //------------------------------------------------------
    // Create a marker cluster.
    // Providing all locations at the creating is the best.
    //------------------------------------------------------
    map.addMarkerCluster({
        //maxZoomLevel: 5,
        boundsDraw: true,
        markers: data,
        icons: [
            {min: 2, max: 100, url: "./img/blue.png", anchor: {x: 16, y: 16}},
            {min: 100, max: 1000, url: "./img/yellow.png", anchor: {x: 16, y: 16}},
            {min: 1000, max: 2000, url: "./img/purple.png", anchor: {x: 24, y: 24}},
            {min: 2000, url: "./img/red.png",anchor: {x: 32,y: 32}},
        ]
      }, function (markerCluster) {


          alert('cluster added ' + markerCluster.id)
  
          //-----------------------------------------------------------------------
          // Display the resolution (in order to understand the marker cluster)
          //-----------------------------------------------------------------------
          markerCluster.on("resolution_changed", function (prev, newResolution) {
              var self = this;
              label.innerHTML = "<b>zoom = " + self.get("zoom").toFixed(0) + ", resolution = " + self.get("resolution") + "</b>";
          });
          markerCluster.trigger("resolution_changed");
  
          
  
          //----------------------------------------------------------------------
          // Remove the marker cluster
          // (Don't remove/add repeatedly. This is really bad performance)
          //----------------------------------------------------------------------
          var removeBtn = document.getElementById("removeClusterBtn");
          removeBtn.addEventListener("click", function() {
            markerCluster.remove();
          }, {
            once: true
          });
  
          //------------------------------------
          // If you tap on a marker,
          // you can get the marker instnace.
          // Then you can do what ever you want.
          //------------------------------------
  
         console.log(markerCluster);

          markerCluster.on(plugin.google.maps.event.MARKER_CLICK, function (position, marker) {
              console.log('click marker')
            marker.on(plugin.google.maps.event.INFO_CLICK, function () {
            });
          });

          console.log(markerCluster);

        });

}
