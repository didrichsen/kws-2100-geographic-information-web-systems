import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReactDOM from "react-dom/client";
import { Feature, Map, MapBrowserEvent, View } from "ol";
import "./main.css";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useGeographic } from "ol/proj";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Layer } from "ol/layer";
import { Fill, Icon, Stroke, Style } from "ol/style";
import { Point } from "ol/geom";
import KommuneLayerCheckbox from "./KommuneLayerCheckbox";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

useGeographic();

const MapView = () => {
  const [layer, setLayer] = useState<Layer[]>([
    new TileLayer({
      source: new OSM(),
    }),
  ]);

  /*
    const marker = useMemo(() => {
        const image = new Image(20,20);
        image.src = '../public/marker.png';

        return new VectorLayer({
            source: new VectorSource({
                features: [
                    new Feature({
                        geometry: new Point([59,10]),
                    }),
                ],
            }),
            style: new Style({
                image: new Icon({
                    img: image,
                }),
            }),
        });
    }, []);
*/

  const iconFeature = new Feature({
    geometry: new Point([59, 10]),
    name: "Test",
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      src: "../public/marker.png",
    }),
  });

  iconFeature.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [iconFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const map = useMemo(
    () =>
      new Map({
        view: new View({
          center: [10, 59],
          zoom: 8,
        }),
      }),
    [],
  );

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dialogRef = useRef() as MutableRefObject<HTMLDialogElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  useEffect(() => {
    //const layers = map.getLayers();
    //layers.push(vectorLayer);
    map.setLayers(layer);
  }, [layer]);

  return (
    <>
      <header>
        An awesome application where you can learn about kommune Norge.
      </header>
      <nav>
        <KommuneLayerCheckbox map={map} setLayer={setLayer} />
      </nav>
      <main>
        <div className="map-container" ref={mapRef}></div>
      </main>
      <footer>Created by Simen with love for kommuner.</footer>
    </>
  );
};

root.render(<MapView />);
