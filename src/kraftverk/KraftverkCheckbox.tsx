import React from "react";
import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../hooks/UseLayer";
import { Fill, Stroke, Style } from "ol/style";
import { Circle as CircleStyle, RegularShape } from "ol/style"; // Changed Circle import to CircleStyle
import {Feature} from "ol";
import {FeatureLike} from "ol/Feature";
import {Point} from "ol/geom";
import {Cluster} from "ol/source";

type KraftverkFeature = {getProperties():kraftverkProps} & Feature<Point>

interface kraftverkProps {
  maksytelse:number;
}

const source = new VectorSource({
  url: "/kws-2100-geographic-information-web-systems/kraftverk.json",
  format: new GeoJSON(),
});

const clusterSource = new Cluster({
  distance: 40,
  source: source,
});

const kraftverkLayer = new VectorLayer({
  source: clusterSource,
  style: kraftVerkStyle,
});

function kraftVerkStyle(feature:FeatureLike) {

  const kraftFeatures = feature.get('features') as Feature<Point>[];

  const maxMaksytelse = kraftFeatures.reduce((max, feature) => {
    const maksytelse = (feature.getProperties() as kraftverkProps).maksytelse;
    return Math.max(max, maksytelse);
  }, 0);

  return new Style({
    image: new CircleStyle({
      radius: maxMaksytelse * 10,
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
