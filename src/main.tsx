import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
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


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

useGeographic();

const MapView = () => {

    const [isChecked, setIsChecked] = useState(true)

    const map = new Map({
        layers: [
            new TileLayer({
                source: new OSM()
            }),
            new VectorLayer({
                source: new VectorSource({
                    url:"/kws-2100-geographic-information-web-systems/kommuner_komprimert.json",
                    format: new GeoJSON()
                }),
            })
        ],
        view: new View({
            center: [10, 59],
            zoom: 8
        })
    });

    const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        map.setTarget(mapRef.current);
    }, []);

    console.log(isChecked);


    return (
        <>
            <header>Click button to click "kommuner" on and off.</header>
            <nav>
                <label>
                    Toggle kommuner on/off (Not working yet)
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)}></input>
                </label>
                </nav>
            <main>
                <div className="map-container" ref={mapRef}></div>
            </main>
            <footer>Created to show my love for kommuner, Simen!</footer>
        </>
    )
}

root.render(<MapView/>)