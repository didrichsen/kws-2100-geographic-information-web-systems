import React, {MutableRefObject, useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Map, View} from "ol";
import './main.css';
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {useGeographic} from "ol/proj";
import 'ol/ol.css';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {FeatureClass} from "ol/Feature";
import {Layer} from "ol/layer";


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

useGeographic();

const MapView = () => {

    const [layer, setLayer] = useState<Layer[]>([
        new TileLayer({
            source: new OSM()
        }),
    ]);

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
        map.setLayers(layer);
    }, [layer]);


    return (
        <>
            <header>An awesome application where you can learn about kommune Norge.</header>
            <nav>
                <label>
                    Toggle kommuner on/off
                <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}></input>
                </label>
                </nav>
            <main>
                <div className="map-container" ref={mapRef}></div>
            </main>
            <footer>Created by Simen with love for kommuner.</footer>
        </>
    )
}

root.render(<MapView/>)