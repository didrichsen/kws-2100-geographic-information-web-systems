import React, { useEffect, useMemo, useState } from "react";
import { KommuneContext } from "../context/KommuneContext";
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
  const { layer, map } = React.useContext(KommuneContext);

  const [viewExtend, setViewExtend] = useState(map.getView().calculateExtent());

  const kommuneLayer = layer.find(
    (layer) => layer.getClassName() === "kommune",
  ) as KommuneVectorLayer;

  const [features, setFeatures] = useState<kommuneFeatures[]>();

  const visibleFeatures = useMemo(
    () =>
      features?.filter((feature) =>
        feature.getGeometry()?.intersectsExtent(viewExtend),
      ),
    [features, viewExtend],
  );

  function handleSourceChange() {
    setFeatures(kommuneLayer?.getSource()?.getFeatures());
  }

  function handleViewUpdate() {
    setViewExtend(map.getView().calculateExtent());
  }

  useEffect(() => {
    kommuneLayer?.getSource()?.on("change", handleSourceChange);

    return () => kommuneLayer?.getSource()?.un("change", handleSourceChange);
  }, [kommuneLayer]);

  useEffect(() => {
    map.getView().on("change", handleViewUpdate);
    return () => map.getView().un("change", handleViewUpdate);
  }, [map]);

  return { visibleFeatures };
};
