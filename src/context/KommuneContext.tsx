import React, {createContext, SetStateAction} from "react";
import {Layer} from "ol/layer";

export const KommuneContext = createContext<{
    layer: Layer[];
}>({
    layer: [],
});

