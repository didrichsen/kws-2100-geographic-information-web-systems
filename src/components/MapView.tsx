import { Map, View } from "ol";
import React, { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { useGeographic } from "ol/proj";
import "./MapView.css";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import "ol/ol.css";

const MapView = () => {
  useGeographic();

  const defaultView = {
    center: [10.5, 60],
    zoom: 10,
  };

  const view = useMemo(
    () =>
      new View({
        center: [10.5, 59.7],
        zoom: 10,
      }),
    [],
  );

  const map = useMemo(
    () =>
      new Map({
        layers: [
          new TileLayer({ source: new OSM() }),
          new VectorLayer({
            source: new VectorSource({
              url: "/kommuner.json",
              format: new GeoJSON(),
            }),
          }),
        ],

        view: view,
      }),
    [],
  );

  /*
    https://openlayers.org/en/latest/examples/animation.html


    const elastic = (t: number) =>
        Math.pow(2, -10 * t) *
        Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) +
        1;
*/
  const bounce = (t: number) => {
    const s = 7.5625;
    const p = 2.75;
    let l;
    if (t < 1 / p) {
      l = s * t * t;
    } else {
      if (t < 2 / p) {
        t -= 1.5 / p;
        l = s * t * t + 0.75;
      } else {
        if (t < 2.5 / p) {
          t -= 2.25 / p;
          l = s * t * t + 0.9375;
        } else {
          t -= 2.625 / p;
          l = s * t * t + 0.984375;
        }
      }
    }
    return l;
  };

  const handleResetView = (e: React.MouseEvent) => {
    e.preventDefault();

    map.getView().animate({
      center: defaultView.center,
      duration: 2000,
      //easing:elastic
      easing: bounce,
    });
  };

  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  return (
    <>
      <a href="#" onClick={handleResetView}>
        Click to reset
      </a>
      <div className={"map"} ref={mapRef}></div>
    </>
  );
};

export default MapView;
