import React, {MutableRefObject, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import {Map, View} from "ol";
import './main.css';
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {useGeographic} from "ol/proj";


const root = ReactDOM.createRoot(document.getElementById('root'));

useGeographic();

const MapView = () => {

    const map = new Map({
        layers: [
            new TileLayer({
                source: new OSM()
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


    return (
        <>
            <header>Click button to click "kommuner" on and off.</header>
            <nav><button>Toggle "kommuner"</button></nav>
            <main>
                <div className="map-container" ref={mapRef}></div>
            </main>
            <footer>Created to show my love for kommuner, Simen!</footer>
        </>
    )
}

root.render(<MapView/>)