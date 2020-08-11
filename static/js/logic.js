// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level
// Assign the variable map to object L.map(), instantiate the object with the string 'mapid'
// "mapid" references the id tag in <div> index.html file
// setView() sets view of the map with a geographical center, 
// the first coordinate is latitude (40.7), second is longitude (-94.5)
// Zoom level set to “4” on a scale 0–18.
let map = L.map('mapid').setView([40.7, -94.5], 4);


// We create the tile layer that will be the background of our map.
console.log("API_KEY: " + API_KEY);
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
console.log("Done!");