import React from "react";
import {KommuneFeatures} from "./KommuneFeatures";
import {getStedsNavn} from "../utility/utilities";

const KommuneAside = () => {
  const {  visibleFeatures } = KommuneFeatures();

  return (
    <aside className={visibleFeatures ? "visible" : "hidden"}>
      <div>
        <h1>Kommuner</h1>
        <ul>
          {visibleFeatures?.map((feature) => (
            <li>{getStedsNavn(feature.getProperties().navn)}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default KommuneAside;
