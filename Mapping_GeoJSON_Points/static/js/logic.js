// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level
// Assign the variable map to object L.map(), instantiate the object with the string eg 'mapid'
// "mapid" references the id tag in <div> index.html file
// setView() sets view of the map with a geographical center,
// the first coordinate is latitude (eg 40.7), second is longitude (eg -94.5)
// Zoom level set to eg “5” on a scale 0–18.
// Create the map object with center and zoom level.
let map = L.map("mapid").setView([30, 30], 2);

//Create the tilelayer background for the map.
//navigation-preview-night-v4
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
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Accessing the airport GeoJSON URL
let airportData =
  "https://raw.githubusercontent.com/damiencorr/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/static/js/majorAirports.json";

// NOTE: Having the tileLayer() method before accessing large datasets ensures that the map gets loaded before the data is added to it.

// Grabbing our GeoJSON data.
d3.json(airportData).then(function (data) {
  console.log("The Data payload: ", data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    onEachFeature: function (feature, layer) {
      console.log(
        "feature.properties.city: ",
        feature.properties.city,
        " - Layer: ",
        layer
      );
      layer.bindPopup(
        "<h2>Airport code: " +
          feature.properties.faa +
          "</h2> <hr> <h3>Airport name: " +
          feature.properties.name +
          "</h3>"
      );
    },
  }).addTo(map);
});

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
