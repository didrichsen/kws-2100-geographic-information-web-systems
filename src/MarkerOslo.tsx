import {Overlay} from "ol";
import React from "react";
import {MutableRefObject, useEffect, useRef} from "react";
import Map from "ol/Map";

const MarkerOslo = ({map} : {map:Map}) => {

    const markerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const marker = new Overlay({
        position: [10.749, 59.91],
        positioning: 'center-center',

    });

    useEffect(() => {
        marker.setElement(markerRef.current);
        map.addOverlay(marker);
    }, []);

    return (
        <>

            <div id="marker" ref={markerRef}></div>

        </>
    )

}

export default MarkerOslo;