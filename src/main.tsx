import React, {MutableRefObject, useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Feature, Map, MapBrowserEvent, View} from "ol";
import './main.css';
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {useGeographic} from "ol/proj";
import 'ol/ol.css';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Layer} from "ol/layer";
import {Fill, Icon, Stroke, Style} from "ol/style";
import {Point} from "ol/geom";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

useGeographic();

const MapView = () => {

    const [kommune, setKommune] = useState<string>("");

    const [layer, setLayer] = useState<Layer[]>([
        new TileLayer({
            source: new OSM()
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
        geometry: new Point([59,10]),
        name: 'Test',
      });

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../public/marker.png',
        }),
      });

      iconFeature.setStyle(iconStyle);

      const vectorSource = new VectorSource({
        features: [iconFeature],
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
      });


    const [isChecked, setIsChecked] = useState(true)

    const kommuneLayer = useMemo( () => new VectorLayer({
        source: new VectorSource({
            url:"/kws-2100-geographic-information-web-systems/kommuner_komprimert.json",
            format: new GeoJSON()
        }),
    }), []);

    const map = useMemo(
        () =>
            new Map({
                view: new View({
                    center: [10, 59],
                    zoom: 8,
                }),
            }),
        []
    );

    const handleClick =  (e: MapBrowserEvent<MouseEvent>) => {
        const features = map.getFeaturesAtPixel(e.pixel);
        if (features) {
            const feature = features[0];
            const kommune = feature.get('navn');
            setKommune(kommune[0].navn);
        }
    }

    const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        map.setTarget(mapRef.current);
    }, []);

    useEffect(() => {
        if (isChecked) {
            setLayer((oldLayer) => [...oldLayer, kommuneLayer]);
        } else {
            setLayer((oldLayer) => oldLayer.filter((layer) => layer !== kommuneLayer));
        }
    }, [isChecked]);


    useEffect(() => {
        //const layers = map.getLayers();
        //layers.push(vectorLayer);
        map.setLayers(layer);
    }, [layer]);

    useEffect(() => {
        map.on('singleclick', handleClick);
    }, []);



    return (
        <>
            <header>An awesome application where you can learn about kommune Norge.</header>
            <nav>
                <label>
                    Toggle kommuner on/off
                <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}></input>
                </label>
                {kommune? <p>Currently selected kommune: {kommune}</p> : <p>Click on a kommune to see its name</p>}
                </nav>
            <main>
                <div className="map-container" ref={mapRef}></div>
            </main>
            <footer>Created by Simen with love for kommuner.</footer>

        </>
    )
}

root.render(<MapView/>)