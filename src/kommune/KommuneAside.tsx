import React, {useEffect} from "react";
import { KommuneFeatures } from "./KommuneFeatures";
import { getStedsNavn } from "../utility/utilities";

const KommuneAside = () => {
  const { visibleFeatures } = KommuneFeatures();

    useEffect(() => {
        console.log("Visible Feature: " + visibleFeatures);
    }, [visibleFeatures]);

  return (
    <aside className={visibleFeatures?.length? "visible" : "hidden"}>
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
