import React, { useEffect, useMemo, useState } from "react";
import { MapContext } from "../context/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { stedsNavn } from "../utility/interfaces";

type KommuneVectorLayer = VectorLayer<VectorSource<kommuneFeatures>>;

interface KommuneProperties {
  navn: stedsNavn[];
}

interface kommuneFeatures extends Feature {
  getProperties(): KommuneProperties;
}

export const KommuneFeatures = () => {
  const { layer, map } = React.useContext(MapContext);

  const kommuneLayer = layer.find(
    (layer) => layer.getClassName() === "kommune",
  ) as KommuneVectorLayer;

  const [features, setFeatures] = useState<kommuneFeatures[]>();

  const [viewExtend, setViewExtend] = useState(map.getView().getViewStateAndExtent().extent);


  const visibleFeatures = useMemo(
    () =>
      features?.filter((feature) =>
        feature.getGeometry()?.intersectsExtent(viewExtend),
          ),
    [features, viewExtend],
  );

  function handleSourceChange() {
    console.log("handlesoureChange")
    setFeatures(kommuneLayer?.getSource()?.getFeatures());
  }

  function handleViewUpdate() {
    setViewExtend(map.getView().getViewStateAndExtent().extent);
  }


  useEffect(() => {
    console.log("useEffect HandleSourceChange")
    kommuneLayer?.getSource()?.on("change", handleSourceChange);

    return () => kommuneLayer?.getSource()?.un("change", handleSourceChange);
  }, [kommuneLayer]);

  useEffect(() => {
    map.getView().on("change", handleViewUpdate);
    return () => map.getView().un("change", handleViewUpdate);
  }, [map]);

  return { visibleFeatures };
};
