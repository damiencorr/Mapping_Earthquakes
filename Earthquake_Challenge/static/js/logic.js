// Add console.log to check to see if our code is working.
console.log("working");

//Create the tilelayer background streets view for the map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY,
  }
);

// Create the Satellite Streets view tile layer as another option.
let satelliteStreets = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY,
    }
  );

// Create the light view tile layer as another option.
let light = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      accessToken: API_KEY,
    }
  );
    
// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Light": light
};

// Create the earthquake & tectonic plates layers for our map.
let earthquakes = new L.layerGroup();
let tectonicPlates = new L.layerGroup();

// Define an object that contains the overlays.
// This overlay will be visible only when selected.
let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
  };

// Create the map object with center, zoom level and default layer.
// Center on US
let map = L.map("mapid", {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets],
});

// Add a control to the map that allows the user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

// Return the style data for each of the earthquakes plotted on the map. 
// Pass the magnitude of the earthquake into two separate functions to calculate the color and radius.
function styleCircles(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5,
    };
}

    // Determine the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
    }

    // Determine the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

// Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    // Turn each earthquake feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      console.log(data);
      return L.circleMarker(latlng);
    },

    // Set the style for each circleMarker using the styling function.
    style: styleCircles,

    // Create a popup for each circleMarker to display the magnitude and
    // location of the earthquake (after the marker has been created and styled).
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "Magnitude: " +
          feature.properties.mag +
          "<br>Location: " +
          feature.properties.place
      );
    },
  }).addTo(earthquakes);
  // Add the eartchquakes layer to the map.
  earthquakes.addTo(map);
});

// Create a legend control object.
var legend = L.control({position: 'bottomright'});
legend.onAdd = function () {

    let div = L.DomUtil.create('div', 'info legend'),
    magnitudes = [0, 1, 2, 3, 4, 5],
    colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
    
    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + 
        // (condition that evaluates to truthy or falsey  ?  result_if_true  :  result_if_false )
        (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
};
// Add the legend to the map.
legend.addTo(map);


// Style tectonic lines for hi-vi.
function styleLines (){
	return {
        color: "yellow",
        weight: 2
    }
};

// Retrieve tectonic plates GeoJSON data via the github link.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
    
    // Create a GeoJSON layer with the tectonic data.
    L.geoJSON(data, {
        style: styleLines,
        // onEachFeature: function(feature, layer){
        // console.log(layer);
        // }
    }).addTo(tectonicPlates);
    // Add the tectonic plates layer to our map
    tectonicPlates.addTo(map);
});


console.log("Done!");