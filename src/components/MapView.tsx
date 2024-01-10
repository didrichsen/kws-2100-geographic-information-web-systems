import {Map, View} from "ol";
import {MutableRefObject, useEffect, useMemo, useRef} from "react";
import {useGeographic} from "ol/proj";
import './MapView.css'
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import "ol/ol.css"

useGeographic();

const MapView = () => {

    const view = useMemo(() => new View({
        center: [10.5, 59.7], zoom: 10
    }), []);

    const map = useMemo(() => new Map({

        layers: [
            new TileLayer({source: new OSM()}),
            new VectorLayer({
                source: new VectorSource({
                    url: '/kommuner.json',
                    format: new GeoJSON()
                })
            })
        ],

        view: view

    }), []);

    const mapRef = useRef() as MutableRefObject<HTMLDivElement>;


    useEffect(() => {
        map.setTarget(mapRef.current)
    }, []);

    return(
        <>
        <div className={"map"} ref={mapRef}></div>
        </>
    )

}

export default MapView;