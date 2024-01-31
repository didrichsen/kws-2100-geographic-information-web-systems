import React, {useEffect} from "react";
import {KommuneContext} from "./context/KommuneContext";
import VectorSource from "ol/source/Vector";
import {Feature} from "ol";

const KommuneAside = () => {

    const {layer} = React.useContext(KommuneContext);

    const kommuneLayer = layer.find((layer) => layer.getClassName() === "kommune");
    const features = (kommuneLayer?.getSource()  as VectorSource)?.getFeatures();

    return (

        <aside className={kommuneLayer? "visible" : "hidden"}>
            <div>
                <h1>Kommuner</h1>
            <ul>
                {features?.map((feature) =>
                    <li>{feature.getProperties().navn[0].navn}</li>
                )}
            </ul>
            </div>
        </aside>

    )

}

export default KommuneAside;