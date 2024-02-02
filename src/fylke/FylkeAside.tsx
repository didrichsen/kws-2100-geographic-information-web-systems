import React from "react";
import {FylkeFeatures} from "./FylkeFeatures";
import {getStedsNavn} from "../utility/utilities";

const FylkeAside = () => {

    const { visibleFeatures } = FylkeFeatures();

    return (
        <aside className={visibleFeatures? "visible" : "hidden"}>
            <div>
                <h1>Fylker</h1>
                <ul>
                    {visibleFeatures?.map((feature) => (
                        <li>{getStedsNavn(feature.getProperties().navn)}</li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default FylkeAside;
