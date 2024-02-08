import React, { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { MapContext } from "../context/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";

const FylkeLayerCheckbox = () => {
  const [checked, setChecked] = useState(false);

  const { setLayers } = useContext(MapContext);

  const fylkeLayer = useMemo(
    () =>
      new VectorLayer({
        className: "fylker",
        source: new VectorSource({
          url: "/kws-2100-geographic-information-web-systems/fylker_komprimert.json",
          format: new GeoJSON(),
        }),
      }),
    [],
  );

  useEffect(() => {
    if (checked) {
      setLayers((old) => [...old, fylkeLayer]);
    }

    return () => setLayers((old) => old.filter((l) => l != fylkeLayer));
  }, [checked]);

  return (
    <label>
      {checked ? "Remove Fylker layer" : "Add Fylker layer"}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      ></input>
    </label>
  );
};

export default FylkeLayerCheckbox;