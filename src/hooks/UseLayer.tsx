import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useContext, useEffect } from "react";
import { MapContext } from "../context/MapContext";

export function useLayer(checked: boolean, layer: VectorLayer<VectorSource>) {
  const { setLayers } = useContext(MapContext);

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, layer]);
    }

    return () => setLayers((old) => old.filter((l) => l != layer));
  }, [checked]);
}
