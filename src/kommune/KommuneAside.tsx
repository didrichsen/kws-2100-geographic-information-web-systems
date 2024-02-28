import React, { useContext, useEffect, useMemo, useState } from "react";
import { map, MapContext } from "../map/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol/render/webgl/MixedGeometryBatch";
import { MapBrowserEvent } from "ol";
import { Fill, Style } from "ol/style";

type Stedsnavn = {
  sprak: string;
  navn: string;
};
type KommuneProperties = {
  kommunenummer: string;
  navn: Stedsnavn[];
};
interface KommuneFeature extends Feature {
  getProperties(): KommuneProperties;
}

type KommuneVectorLayer = VectorLayer<VectorSource<KommuneFeature>>;

function getStedsnavn(navn: Stedsnavn[]) {
  return navn.find((n) => n.sprak == "nor")?.navn;
}

function useKommuneFeatures() {
  const { map, vectorLayers } = useContext(MapContext);

  const kommuneLayer = vectorLayers.find(
    (layer) => layer.getClassName() === "kommuneLayer",
  ) as KommuneVectorLayer;

  const [features, setFeatures] = useState<KommuneFeature[]>();

  const [viewExtent, setViewExtent] = useState(
    map.getView().getViewStateAndExtent().extent,
  );
  const visibleFeatures = useMemo(
    () =>
      features?.filter((f) => f.getGeometry()?.intersectsExtent(viewExtent)),
    [viewExtent, features],
  );
  function handleSetViewExtent() {
    setViewExtent(map.getView().getViewStateAndExtent().extent);
  }
  function handleSetFeatures() {
    setFeatures(kommuneLayer?.getSource()?.getFeatures());
  }

  useEffect(() => {
    map.getView().on("change", handleSetViewExtent);
    return () => {
      map.getView().un("change", handleSetViewExtent);
    };
  }, [map]);

  useEffect(() => {
    kommuneLayer?.getSource()?.on("change", handleSetFeatures);
    handleSetFeatures();
  }, [kommuneLayer]);

  return { kommuneLayer, features, visibleFeatures };
}
const transparentColor = "rgba(0,247,255,0.3)";
const hoverStyle = new Style({
  fill: new Fill({
    color: transparentColor,
  }),
});

function KommuneAside() {
  const { kommuneLayer, features, visibleFeatures } = useKommuneFeatures();

  const [hoveredKommune, setHoveredKommune] = useState<KommuneFeature>();

  function handleHoveredKommune(e: MapBrowserEvent<PointerEvent>) {
    const hoveredFeatures = kommuneLayer
      ?.getSource()
      ?.getFeaturesAtCoordinate(e.coordinate);
    setHoveredKommune(
      hoveredFeatures?.length === 1
        ? (hoveredFeatures[0] as KommuneFeature)
        : undefined,
    );
  }

  useEffect(() => {
    if (visibleFeatures) {
      map.on("pointermove", handleHoveredKommune);
    }
    return () => {
      map.un("pointermove", handleHoveredKommune);
    };
  }, [map, visibleFeatures]);

  useEffect(() => {
    hoveredKommune?.setStyle(hoverStyle);
    return () => hoveredKommune?.setStyle(undefined);
  }, [hoveredKommune]);

  return (
    <>
      <aside className={features?.length ? "visible" : "hidden"}>
        <div>
          <h3>Kommuner</h3>
          <ul>
            {visibleFeatures?.map((k) => (
              <li
                key={k.getProperties().kommunenummer}
                className={
                  getStedsnavn(k.getProperties().navn) ===
                  hoveredKommune?.getProperties().navn[0].navn
                    ? "bold"
                    : ""
                }
              >
                {getStedsnavn(k.getProperties().navn)}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
export default KommuneAside;
