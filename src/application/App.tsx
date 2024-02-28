import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "ol/ol.css";
import { Layer } from "ol/layer";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { map, MapContext } from "../map/MapContext";
import "ol/ol.css";
import "./App.css";
import BaseLayerOptions from "../baseLayer/BaseLayerDropdown";
import KommuneLayerCheckbox from "../kommune/KommuneLayerCheckbox";
import KommuneAside from "../kommune/KommuneAside";
import TilfluktsromLayerCheckbox from "../tilfluktsrom/TilfluktsromLayerCheckbox";
import {FeatureLike} from "ol/Feature";
import {Overlay} from "ol";

function App() {
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [clickedFeature, setClickedFeature] = useState<FeatureLike | undefined>(undefined);

  const [baseLayer, setBaseLayer] = useState<Layer>(
    new TileLayer({ source: new OSM() }),
  );
  const [vectorLayers, setVectorLayers] = useState<Layer[]>([]);

  const allLayers = useMemo(
    () => [baseLayer, ...vectorLayers],
    [baseLayer, vectorLayers],
  );

  const overlayClick = useMemo(() => new Overlay({}),[]);
  const overlayRefClick = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    overlayClick.setElement(overlayRefClick.current)
    map.addOverlay(overlayClick);

    return () => {

      map.removeOverlay(overlayClick);
    };
  }, []);

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);
  useEffect(() => {
    map.setLayers(allLayers);
  }, [allLayers]);

  const [lat, setLat] = useState<number>();
  const [long, setLong] = useState<number>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      console.log(pos.coords);
      setLong(longitude);
      setLat(latitude);
    });
  }, []);

  function handleFocusOnMe(e: React.MouseEvent) {
    e.preventDefault();
    if (lat && long) {
      map.getView().animate({
        center: [long, lat],
        zoom: 19,
      });
    }

    /*
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      map.getView().animate({
        center: [longitude, latitude],
        zoom: 19,
      });
    });

     */
  }

  return (
    <MapContext.Provider
      value={{ map, setBaseLayer, vectorLayers, setVectorLayers, setClickedFeature }}
    >
      <header>
        <h1>Map app</h1>
      </header>
      <nav>
        <button className={"focus-btn"} onClick={handleFocusOnMe}>
          Focus on me
        </button>
        <BaseLayerOptions />
        <KommuneLayerCheckbox />
        <TilfluktsromLayerCheckbox />
      </nav>
      <main>
        <div ref={mapRef} className="map"></div>
        <KommuneAside />
        {clickedFeature?
            <div className={"clickedFeature"}>
              <p>Adresse: {clickedFeature?.getProperties().adresse}</p>
              <p>Antall plasser: {clickedFeature?.getProperties().plasser}</p>
            </div>: null
        }
      </main>
      <footer></footer>
    </MapContext.Provider>
  );
}

export default App;
