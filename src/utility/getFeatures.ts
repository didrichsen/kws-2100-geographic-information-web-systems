import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";
import { Feature } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export const getFeatures = (className: string) => {
  const { layers } = useContext(MapContext);

  const [features, setFeatures] = useState<Feature[]>();

  const layer = layers.find(
    (l) => l.getClassName() === className,
  ) as VectorLayer<VectorSource<Feature>>;

  const handleUpdateFeatures = () => {
    const features = layer?.getSource()?.getFeatures();
    setFeatures(features);
  };

  useEffect(() => {
    //Funker som forventet

    layer?.getSource()?.on("change", handleUpdateFeatures);
    handleUpdateFeatures();

    return () => layer?.getSource()?.un("change", handleUpdateFeatures);
  }, [layer]);

  return features;
};
