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

export const KommuneContext = createContext<{
  map: Map;
  layer: Layer[];
}>({
  map,
  layer: [],
});
