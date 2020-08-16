// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level
// Assign the variable map to object L.map(), instantiate the object with the string 'mapid'
// "mapid" references the id tag in <div> index.html file
// setView() sets view of the map with a geographical center,
// the first coordinate is latitude (40.7), second is longitude (-94.5)
// Zoom level set to “4” on a scale 0–18.
let map = L.map("mapid").setView([36.1733,-120.1794], 7);
// Coordinates for each point to be used in the line.
let line = [
  [33.9416, -118.4085],
  [37.6213, -122.3790]
];

console.log("API_KEY: " + API_KEY);

// We create the tile layer that will be the background of our map.
//  Add a marker to the map for Los Angeles, California.
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
// let marker = L.circleMarker([34.0522, -118.2437], {
// 	radius: 300,
// 	color: "black",
// 	fillColor: "yellow"
//  }).addTo(map);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function (city) {
  console.log(city);
  L.circleMarker(city.location, { radius: city.population/200000, color:"orange", weight:4 })
    .bindPopup(
      "<h2>" +
        city.city +
        ", " +
        city.state +
        "</h2> <hr> <h3>Population " +
        city.population.toLocaleString() +
        "</h3>"
    )
    .addTo(map);
});

let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
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
