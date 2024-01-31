import React, {useEffect} from "react";
import {KommuneContext} from "./context/KommuneContext";

const KommuneAside = () => {

    const {layer} = React.useContext(KommuneContext);

    const kommuneLayer = layer.find((layer) => layer.getClassName() === "kommune");

    useEffect(() => {
        console.log(kommuneLayer);
    }, [kommuneLayer]);

    return (

        <aside className={kommuneLayer? "visible" : "hidden"}>
            <h2>Aside</h2>
        </aside>

    )

}

export default KommuneAside;