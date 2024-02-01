import React, {useEffect, useState} from "react";
import {KommuneContext} from "./context/KommuneContext";
import VectorSource from "ol/source/Vector";
import {Feature} from "ol";
import VectorLayer from "ol/layer/Vector";

type KommuneVectorLayer = VectorLayer<VectorSource<kommuneFeatures>>

//"navn": [{ "rekkefolge": "", "sprak": "nor", "navn": "Vadsø" }]
interface stedsNavn {
    sprak: string;
    navn: string;
}

interface KommuneProperties{
    navn: stedsNavn[]
}

interface kommuneFeatures extends Feature {
    getProperties(): KommuneProperties;
}

const getStedsNavn = (navn: stedsNavn[])=> {
    return navn.find((navn) => navn.sprak === "nor")?.navn;
};

const kommuneFeatures = () => {

    const {layer} = React.useContext(KommuneContext);
    
    const kommuneLayer = layer.find((layer) => layer.getClassName() === "kommune") as KommuneVectorLayer;
    //const features = (kommuneLayer?.getSource()  as VectorSource)?.getFeatures();

    const [features, setFeatures] = useState<kommuneFeatures[]>();

    function handleSourceChange() {
        setFeatures(kommuneLayer?.getSource()?.getFeatures());
    }

    useEffect(() => {
        kommuneLayer?.getSource()?.on("change",handleSourceChange);

        return () => kommuneLayer?.getSource()?.un("change", handleSourceChange);

    }, [kommuneLayer]);

    return {kommuneLayer,features};

}

const KommuneAside = () => {

    const {kommuneLayer,features} = kommuneFeatures();

    useEffect(() => {
        console.log(kommuneLayer);
    }, [kommuneLayer]);

    return (

        <aside className={kommuneLayer? "visible" : "hidden"}>
            <div>
                <h1>Kommuner</h1>
            <ul>
                {features?.map((feature) =>
                    <li>{getStedsNavn(feature.getProperties().navn)}</li>
                )}
            </ul>
            </div>
        </aside>

    )

}

export default KommuneAside;