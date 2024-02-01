import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
import { Map, View } from "ol";
import "./main.css";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useGeographic } from "ol/proj";
import "ol/ol.css";
import { Layer } from "ol/layer";
import KommuneLayerCheckbox from "./kommune/KommuneLayerCheckbox";
import FocusOnMe from "./features/FocusOnMe";
import MarkerOslo from "./features/MarkerOslo";
import KommuneAside from "./kommune/KommuneAside";
import { KommuneContext } from "./context/KommuneContext";
import { map } from "./context/KommuneContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const MapView = () => {
  const [layer, setLayer] = useState<Layer[]>([
    new TileLayer({
      source: new OSM(),
    }),
  ]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  useEffect(() => {
    map.setLayers(layer);
  }, [layer]);

  return (
    <>
      <KommuneContext.Provider value={{ map, layer }}>
        <header>
          An awesome application where you can learn about kommune Norge.
        </header>
        <nav>
          <FocusOnMe map={map} />
          <KommuneLayerCheckbox map={map} setLayer={setLayer} />
        </nav>

        <main>
          <div className="map-container" ref={mapRef}></div>
          <MarkerOslo map={map} />
          <KommuneAside />
        </main>
        <footer>Created by Simen with love for kommuner.</footer>
      </KommuneContext.Provider>
    </>
  );
};

root.render(<MapView />);
