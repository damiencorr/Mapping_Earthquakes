# Mapping_Earthquakes
Module 13

## CHALLENGE
For this challenge we created a map that plots all of the earthquakes in the last 7 days, sourcing data from the United States Geological Survey GeoJSON Feed page. The map illustrates the relationship between seismic activity and the earth's tectonic plates.
The map employs three different view styles, selectedable by the user. The user also has the option to turn on or off overlays showing the earthquakes and/or tectonic plates.

The solution employs the following: Leaflet & Mapbox, HTML/CSS/JavaScript, D3, and GeoJSON source files

The Challenge code resides on this path - https://github.com/damiencorr/Mapping_Earthquakes/tree/master/Earthquake_Challenge

### Objectives
The goals of this challenge are:
- Use d3.json() to get tectonic plate data and add the data using the L.geoJSON() layer.
- Style the tectonic plate LineString data to stand out on the map.
- Add the tectonic plate data as an overlay with the earthquake data.
- Add a third map style to allow the user to select from three different maps.

### Instructions
To complete this challenge, follow these steps:
- Create a new folder on your Mapping_Earthquakes repository and name it “Earthquake_Challenge.”
- Copy the folders and files from your Earthquakes_past7days branch and add them to the Earthquake_Challenge folder.
- Use the GeoJSON/PB2002_boundaries.json data from the GitHub repository (https://github.com/fraxen/tectonicplates) for the tectonic plate data.
- Place the d3.json() call with the L.geoJSON() layer for the tectonic plate data at the end of your code from your Earthquakes_past7days branch.
- Style the lines with a strong, bright color so the lines show up on the satellite map and are not too light to be seen on the lighter maps.
- Create the tectonic plate layer for the map.
- Add the tectonic plate layer to the overlays so that they show up in the tile layer, as shown in the image below.
- Add the tectonic plate and earthquake data to the map for any map style choice.
- Edit the base layer so that it holds all three maps.
- Make the streets map the default map.
