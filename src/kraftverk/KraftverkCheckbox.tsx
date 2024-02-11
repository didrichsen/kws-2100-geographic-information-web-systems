import React, { useContext, useEffect, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../hooks/UseLayer";
import { Fill, Stroke, Style } from "ol/style";
import { Circle as CircleStyle, RegularShape } from "ol/style"; // Changed Circle import to CircleStyle
import { Feature, MapBrowserEvent } from "ol";
import { FeatureLike } from "ol/Feature";
import { Point } from "ol/geom";
import { Cluster } from "ol/source";
import { map, MapContext } from "../context/MapContext";

type KraftverkFeature = { getProperties(): kraftverkProps } & Feature<Point>;

interface kraftverkProps {
  maksytelse: number;
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

function kraftVerkStyle(feature: FeatureLike) {
  const kraftFeatures = feature.get("features") as Feature<Point>[];

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

function kraftVerkStyleOnHover(feature: FeatureLike) {
  const kraftFeatures = feature.get("features") as Feature<Point>[];

  const maxMaksytelse = kraftFeatures.reduce((max, feature) => {
    const maksytelse = (feature.getProperties() as kraftverkProps).maksytelse;
    return Math.max(max, maksytelse);
  }, 0);

  return new Style({
    image: new CircleStyle({
      radius: maxMaksytelse * 10,
      fill: new Fill({
        color: "blue",
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
  const [activeFeature, setActiveFeature] = useState<
    KraftverkFeature | undefined
  >(undefined);
  const { map } = useContext(MapContext);

  const handleMouseOver = (e: MapBrowserEvent<MouseEvent>) => {
    const pixel = e.pixel;

    const features: FeatureLike[] = [];

    map?.forEachFeatureAtPixel(pixel, (f) => features.push(f), {
      hitTolerance: 5,
      layerFilter: (l) => l == kraftverkLayer,
    });

    if (features.length == 1) {
      setActiveFeature(features[0] as KraftverkFeature);
    } else {
      setActiveFeature(undefined);
    }
  };

  useLayer(checked, kraftverkLayer);

  useEffect(() => {
    if (checked) {
      map.on("pointermove", handleMouseOver);
    }

    return () => map.un("pointermove", handleMouseOver);
  }, [checked]);

  useEffect(() => {
    activeFeature?.setStyle(kraftVerkStyleOnHover);

    return () => activeFeature?.setStyle(kraftVerkStyle);
  }, [activeFeature]);

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
