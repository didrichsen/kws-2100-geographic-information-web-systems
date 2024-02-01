import React, {createContext, SetStateAction} from "react";
import {Layer} from "ol/layer";
import Map from "ol/Map";

export const KommuneContext = createContext<{
    layer: Layer[];
}>({

    layer: [],
});

