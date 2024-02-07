import React, { useEffect, useMemo } from "react";
import { getStedsNavn } from "../utility/utilities";
import { getFeatures } from "../utility/getFeatures";
import { GetViewExtend } from "../utility/getViewExtend";

const KommuneAside = () => {
  const features = getFeatures("kommune");

  const viewExtend = GetViewExtend();

  const visibleFeatures = useMemo(
    () =>
      features?.filter((feature) =>
        feature.getGeometry()?.intersectsExtent(viewExtend),
      ),
    [features, viewExtend],
  );

  return (
    <aside className={visibleFeatures?.length ? "visible" : "hidden"}>
      <div>
        <h1>Kommuner</h1>
        <ul>
          {visibleFeatures?.map((feature, key) => (
            <li key={key}>{getStedsNavn(feature.getProperties().navn)}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default KommuneAside;
