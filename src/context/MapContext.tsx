import React, { createContext, SetStateAction, useMemo } from "react";
import { Layer } from "ol/layer";
import Map from "ol/Map";
import { View } from "ol";
import { useGeographic } from "ol/proj";

useGeographic();

export const map = new Map({
  view: new View({
    center: [10, 59],
    zoom: 8,
  }),
});

export const MapContext = createContext<{
  map: Map;
  layer: Layer[];
  setLayer: React.Dispatch<SetStateAction<Layer[]>>;
}>({
  setLayer: () => {},
  map,
  layer: [],
});
