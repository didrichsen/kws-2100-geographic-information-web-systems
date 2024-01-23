import Map from 'ol/Map';
import React from 'react';
import {useEffect, useState} from "react";

const FeaturesInView = ({map}:{map:Map}) => {

    const [view, setView] = useState<number[] | undefined>(undefined);


    useEffect(() => {
        map.on('moveend', () => {
            console.log(map.getView().calculateExtent());
        })
    }, []);

    return (
        <div>
            <p>Features in view: {view}</p>
        </div>
    )



}

export default FeaturesInView;