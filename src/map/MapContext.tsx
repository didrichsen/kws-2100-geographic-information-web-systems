import { Map, View } from "ol";
import React, { Dispatch, SetStateAction } from "react";
import { Layer } from "ol/layer";
import { useGeographic } from "ol/proj";
import {FeatureLike} from "ol/Feature";

useGeographic();

export const map = new Map({ view: new View({ center: [10, 59], zoom: 8 }) });

export const MapContext = React.createContext<{
  map: Map;
  setBaseLayer: (baseLayer: Layer) => void;
  vectorLayers: Layer[];
  setVectorLayers: Dispatch<SetStateAction<Layer[]>>;
  setClickedFeature:Dispatch<SetStateAction<FeatureLike | undefined>>;
}>({
  map,
  setBaseLayer: () => {},
  vectorLayers: [],
  setVectorLayers: () => {},
  setClickedFeature:() => {},
});
