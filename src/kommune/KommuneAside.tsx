import React, { useContext, useEffect, useMemo, useState } from "react";
import { getStedsNavn } from "../utility/utilities";
import { getFeatures } from "../utility/getFeatures";
import { GetViewExtend } from "../utility/getViewExtend";
import { MapContext } from "../context/MapContext";
import { Feature, MapBrowserEvent } from "ol";
import { FeatureLike } from "ol/Feature";
import { Fill, Style } from "ol/style";
import { Polygon } from "ol/geom";
import { stedsNavn } from "../utility/interfaces";

type KommuneFeature = { getProperties(): KommuneProperties } & Feature<Polygon>;

interface KommuneProperties {
  navn: stedsNavn[];
}

const KommuneAside = () => {
  const [activeFeature, setActiveFeature] = useState<
    KommuneFeature | undefined
  >(undefined);

  const features = getFeatures("kommune");
  const { map } = useContext(MapContext);
  const viewExtend = GetViewExtend();

  const visibleFeatures = useMemo(
    () =>
      features?.filter((feature) =>
        feature.getGeometry()?.intersectsExtent(viewExtend),
      ),
    [features, viewExtend],
  );

  const handleFeaturesAtPixel = (e: MapBrowserEvent<MouseEvent>) => {
    const featuresToStyle: FeatureLike[] = [];

    map.forEachFeatureAtPixel(e.pixel, (feature) => {
      featuresToStyle.push(feature);
    });

    if (featuresToStyle.length === 1) {
      setActiveFeature(featuresToStyle[0] as KommuneFeature);
    } else {
      setActiveFeature(undefined);
    }
  };

  const style = new Style({
    fill: new Fill({
      color: "rgba(200, 200, 200, 0.5)",
    }),
  });

  useEffect(() => {
    if (features) activeFeature?.setStyle(style);
    return () => activeFeature?.setStyle(undefined);
  }, [activeFeature]);

  useEffect(() => {
    map?.on("pointermove", handleFeaturesAtPixel);
    return () => {
      map?.un("pointermove", handleFeaturesAtPixel);
    };
  }, []);

  return (
    <aside className={visibleFeatures?.length ? "visible" : "hidden"}>
      <div>
        <h1>Kommuner</h1>
        <ul>
          {visibleFeatures?.map((feature, key) => (
            <li
              key={key}
              className={
                activeFeature?.getProperties()?.navn[0].navn ===
                getStedsNavn(feature.getProperties().navn)
                  ? "highlight"
                  : ""
              }
            >
              {getStedsNavn(feature.getProperties().navn)}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default KommuneAside;
