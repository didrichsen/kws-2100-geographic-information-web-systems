import React, {useEffect, useMemo, useRef, useState} from 'react';
import ReactDOM from 'react-dom/client';
import {Feature, Map, View} from 'ol';
import {OSM} from "ol/source";
import TileLayer from "ol/layer/Tile";
import 'ol/ol.css';
import './index.css';
import {useGeographic} from "ol/proj";
import {Icon, Style} from "ol/style";
import {Point} from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

useGeographic();

const root = ReactDOM.createRoot(document.getElementById('root'));

const MapView = () => {

    const mapRef = useRef();

    const iconFeature = new Feature({
        geometry: new Point([9, 60]),
    });

    const iconStyle = new Style({
        image: new Icon({
            anchor: [0.5, 1],
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            src: './marker.png',
            scale: 0.1
        }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
        features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource,
    });

    const baseLayer = new TileLayer({
        source: new OSM()
    });

    const baseView = new View({
        center: [9, 59],
        zoom: 10
    });

    const map = useMemo(()=> new Map({
        layers: [baseLayer],
        view: baseView
    }), []);

    const handleMapClick = (e) => {
        iconFeature.setGeometry(new Point(e.coordinate));
        const layers = map.getLayers();
        if(layers.getLength() > 1) layers.pop();
        layers.push(vectorLayer);
        map.setLayers(layers);
    }

    useEffect(() => {
        map.setTarget(mapRef.current);
        map.on('click', handleMapClick);
    }, []);

    return (
        <div ref={mapRef} style={{width: '100%', height: '100%'}}/>
    );

}

root.render(<MapView/>);