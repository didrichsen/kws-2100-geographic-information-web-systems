import React from "react";
import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../hooks/UseLayer";
import { Fill, Stroke, Style } from "ol/style";
import { Circle } from "ol/style";
import {Feature} from "ol";
import {FeatureLike} from "ol/Feature";
import {Point} from "ol/geom";

type KraftverkFeature = {getProperties():kraftverkProps} & Feature<Point>

interface kraftverkProps {
  maksytelse:number;
}

const kraftverkLayer = new VectorLayer({
  source: new VectorSource({
    url: "/kws-2100-geographic-information-web-systems/kraftverk.json",
    format: new GeoJSON(),
  }),
  style: kraftVerkStyle,
});

function kraftVerkStyle(feature:FeatureLike) {

  const kraftFeature = feature as KraftverkFeature;

  return new Style({
    image: new Circle({
      radius: kraftFeature.getProperties().maksytelse * 10,
      fill: new Fill({
        color: "red",
      }),
      stroke: new Stroke({
        color: "white",
        width: 2,
      }),
    }),
  });
}

const KraftverkCheckbox = () => {
  const [checked, setChecked] = useState(true);

  useLayer(checked, kraftverkLayer);

  return (
    <label>
      {checked ? "Remove kraftverk layer" : "Add kraftverk layer"}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    </label>
  );
};

export default KraftverkCheckbox;
