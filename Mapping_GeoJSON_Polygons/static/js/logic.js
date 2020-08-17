// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level.
//let map = L.map("mapid").setView([30, 30], 2);

//Create the tilelayer background for the map.
//navigation-preview-night-v4
//let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
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

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  }
);

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
// Center on Toronto
let map = L.map("mapid", {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets],
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto Routes GeoJSON URL
let torontoData =
  "https://raw.githubusercontent.com/damiencorr/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/Mapping_GeoJSON_Linestrings/static/js/torontoRoutes.json";
// NOTE: Having the tileLayer() method before accessing large datasets ensures that the map gets loaded before the data is added to it.
let torontoHoods = 
"https://raw.githubusercontent.com/damiencorr/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/static/js/torontoNeighborhoods.json"

// Create a style for the lines.
let myStyle = {
  color: "blue",
  weight: 1,
  fillColor: "yellow"
};

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function (data) {
  console.log("The Data payload: ", data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function (feature, layer) {
      console.log(
        "feature: ",
        feature,
        " - feature.properties: ",
        feature.properties,
        " - Layer: ",
        layer
      );
      layer.bindPopup(
        "<h2>Neighborhood: " +
          feature.properties.AREA_NAME +
          // " " +
          // feature.properties.AREA_S_CD +
          "</h2>"
      );
    },
  }).addTo(map);
});





// // Grabbing our GeoJSON data.
// d3.json(torontoData).then(function (data) {
//   console.log("The Data payload: ", data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     style: myStyle,
//     onEachFeature: function (feature, layer) {
//       console.log(
//         "feature.properties.airline: ",
//         feature.properties.airline,
//         " - Layer: ",
//         layer
//       );
//       layer.bindPopup(
//         "<h2>Airline: " +
//           feature.properties.airline +
//           "</h2> <hr> <h3>Destination: " +
//           feature.properties.dst +
//           "</h3>"
//       );
//     },
//   }).addTo(map);
// });

// // Grabbing our GeoJSON data.
// d3.json(airportData).then(function (data) {
//   console.log("The Data payload: ", data);
//   // Creating a GeoJSON layer with the retrieved data.
//   L.geoJson(data, {
//     onEachFeature: function (feature, layer) {
//       console.log("feature.properties.city: ",feature.properties.city," - Layer: ",layer);
//       layer.bindPopup(
//         "<h2>Airport code: " +
//           feature.properties.faa +
//           "</h2> <hr> <h3>Airport name: " +
//           feature.properties.name +
//           "</h3>"
//       );
//     },
//   }).addTo(map);
// });

// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function (city) {
//   console.log(city);
//   L.circleMarker(city.location, {
//     radius: city.population / 200000,
//     color: "orange",
//     weight: 4,
//   })
//     .bindPopup(
//       "<h2>" +
//         city.city +
//         ", " +
//         city.state +
//         "</h2> <hr> <h3>Population " +
//         city.population.toLocaleString() +
//         "</h3>"
//     )
//     .addTo(map);
// });

console.log("Done!");
