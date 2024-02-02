import React, {useContext, useEffect, useMemo} from "react";
import {useState} from "react";
import {KommuneContext} from "../context/KommuneContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";

const FylkeLayerCheckbox = () => {

    const [checked, setChecked] = useState(false);

    const { setLayer} = useContext(KommuneContext);

    const fylkeLayer = useMemo(() => new VectorLayer({
        className: "fylker",
        source: new VectorSource({
            url: "/kws-2100-geographic-information-web-systems/fylker_komprimert.json",
            format: new GeoJSON(),
        })
    }),[]);

    useEffect(() => {
        if(checked){
            setLayer(old => [...old,fylkeLayer]);
        }

        return () => setLayer((old) => old.filter(l => l != fylkeLayer));

    }, [checked]);

    return (

        <label>
            {checked ? "Remove Fylker layer" : "Add Fylker layer"}
            <input
                type="checkbox"
                checked={checked}
                onChange={() => setChecked(!checked)}
            ></input>
        </label>

    )

}

export default FylkeLayerCheckbox;