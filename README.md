# KWS2100: Exercise 3

Continuing from exercise four, display and style point features on a map. 

## 1. Set Up: 

- [] Add a map with OpenLayers with an Open Street Map layer and a vector layer from https://kart.dsb.no. I recommend "Mini- og mikrokraftverk" (under "Infrastruktur").

## 2. Style the map 
- [] Choose color, style and size based on the feature properties of your chosen feature layer
- [] Add a list of currently visible features in an aside, like with polygon features
- [] Show text for each feature (optional: display text based on the view resolution to avoid clutter)
- [] Add hover or click functionality to the feature layer. Note: use map.forEachFeatureAtPixel instead of VectorSource.getFeatureAtCoordinate
