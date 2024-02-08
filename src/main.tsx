import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
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
import { MapContext } from "./context/MapContext";
import { map } from "./context/MapContext";
import FylkeLayerCheckbox from "./fylke/FylkeLayerCheckbox";
import FylkeAside from "./fylke/FylkeAside";
import KraftverkCheckbox from "./kraftverk/KraftverkCheckbox";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const MapView = () => {
  const [layers, setLayers] = useState<Layer[]>([
    new TileLayer({
      source: new OSM(),
    }),
  ]);

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  useEffect(() => {
    map.setLayers(layers);
  }, [layers]);

  return (
    <>
      <MapContext.Provider value={{ map, layers, setLayers }}>
        <header>
          An awesome application where you can learn about kommune Norge.
        </header>
        <nav>
          <FocusOnMe map={map} />
          <KommuneLayerCheckbox map={map} setLayer={setLayers} />
          <FylkeLayerCheckbox />
          <KraftverkCheckbox />
        </nav>

        <main>
          <div className="map-container" ref={mapRef}></div>
          <MarkerOslo map={map} />
          <KommuneAside />
          <FylkeAside />
        </main>
        <footer>Created by Simen with love for kommuner.</footer>
      </MapContext.Provider>
    </>
  );
};

root.render(<MapView />);
