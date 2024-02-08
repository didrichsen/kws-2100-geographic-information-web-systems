import React, { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { useLayer } from "../hooks/UseLayer";

const fylkeLayer = new VectorLayer({
  className: "fylker",
  source: new VectorSource({
    url: "/kws-2100-geographic-information-web-systems/fylker_komprimert.json",
    format: new GeoJSON(),
  }),
});

const FylkeLayerCheckbox = () => {
  const [checked, setChecked] = useState(false);

  useLayer(checked, fylkeLayer);

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
