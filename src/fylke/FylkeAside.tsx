import React, { useMemo } from "react";
import { getStedsNavn } from "../utility/utilities";
import { getFeatures } from "../utility/getFeatures";
import { GetViewExtend } from "../utility/getViewExtend";

const FylkeAside = () => {
  const features = getFeatures("fylker");

  const viewExtend = GetViewExtend();

  const visibleFeatures = useMemo(
    () =>
      features?.filter((feature) =>
        feature.getGeometry()?.intersectsExtent(viewExtend),
      ),
    [features, viewExtend],
  );

  return (
    <aside className={visibleFeatures ? "visible" : "hidden"}>
      <div>
        <h1>Fylker</h1>
        <ul>
          {visibleFeatures?.map((feature, key) => (
            <li key={key}>{getStedsNavn(feature.getProperties().navn)}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default FylkeAside;
