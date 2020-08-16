// Add console.log to check to see if our code is working.
console.log("working");
console.log("API_KEY: " + API_KEY);

// Create the map object with a center and zoom level
// Assign the variable map to object L.map(), instantiate the object with the string 'mapid'
// "mapid" references the id tag in <div> index.html file
// setView() sets view of the map with a geographical center,
// the first coordinate is latitude (eg 40.7), second is longitude (eg -94.5)
// Zoom level set to “5” on a scale 0–18.
// Create the map object with center at the San Francisco airport.
let map = L.map("mapid").setView([37.6213, -122.379], 5);

// Edit logic.js to create an airline route from
// SFO to John F. Kennedy International Airport (JFK) with two stops,
// Austin-Bergstrom International Airport (AUS) and Toronto Pearson International Airport (YYZ).
// Make the route a - blue dashed line, with a - weight of 4 and - opacity of 0.5 on the - light map.
// SFO - 37.618889, -122.375
// AUS - 30.1945272,-97.6698761
// YYZ - 43.678524, -79.629129
// JFK - 40.647491, -73.787827

// Coordinates for each point to be used in the line.
let line = [
  // [33.9416, -118.4085],
  // [37.6213, -122.379],
  // [40.7899, -111.9791],
  // [47.4502, -122.3088],
  [37.618889, -122.375],
  [30.1945272, -97.6698761],
  [43.678524, -79.629129],
  [40.647491, -73.787827],
];
// Create a polyline using the line coordinates and make the line red.
var polyline = L.polyline(line, {
  color: "blue",
  weight: 4,
  opacity: 0.5,
  dashArray: "20,15",
  lineJoin: "round",
}).addTo(map);


// Center and fit the map around the boundary of the shape.
map.fitBounds(polyline.getBounds());

// We create the tile layer that will be the background of our map.
//  Add a marker to the map for Los Angeles, California.
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
// let marker = L.circleMarker([34.0522, -118.2437], {
// 	radius: 300,
// 	color: "black",
// 	fillColor: "yellow"
//  }).addTo(map);

// // Get data from cities.js
// let cityData = cities;

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

//Change the map style from “satellite-streets-v11” to light.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
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
console.log("Done!");
