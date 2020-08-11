// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level
// Assign the variable map to object L.map(), instantiate the object with the string 'mapid'
// "mapid" references the id tag in <div> index.html file
// setView() sets view of the map with a geographical center, 
// the first coordinate is latitude (40.7), second is longitude (-94.5)
// Zoom level set to “4” on a scale 0–18.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

console.log("API_KEY: " + API_KEY);

// We create the tile layer that will be the background of our map.
//  Add a marker to the map for Los Angeles, California.
//let marker = L.marker([34.0522, -118.2437]).addTo(map);
let marker = L.circleMarker([34.0522, -118.2437], {
	radius: 300,
	color: "black",
	fillColor: "yellow"
 }).addTo(map);

//console.log("Add marker: " + marker);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
console.log("Done!");