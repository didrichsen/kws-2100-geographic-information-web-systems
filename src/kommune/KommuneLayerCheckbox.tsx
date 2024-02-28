import React, { useContext, useEffect, useState } from "react";
import VectorLayer from "ol/layer/Vector";
import { MapContext } from "../map/MapContext";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

function KommuneLayerCheckbox() {
  const { vectorLayers, setVectorLayers } = useContext(MapContext);

  const [checked, setChecked] = useState(false);

  const kommuneLayer = new VectorLayer({
    className: "kommuneLayer",
    source: new VectorSource({
      url: "/kws2100-publishing-a-map-application-ArianMathai/kommuner.json",
      format: new GeoJSON(),
    }),
  });

  useEffect(() => {
    if (checked) {
      setVectorLayers((old) => [...old, kommuneLayer]);
    }
    return () => {
      setVectorLayers(() =>
        vectorLayers.filter((old) => old != kommuneLayer),
      );
    };
  }, [checked]);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {!checked ? "Vis" : "Skjul"} kommuner
      </label>
    </div>
  );
}

export default KommuneLayerCheckbox;
