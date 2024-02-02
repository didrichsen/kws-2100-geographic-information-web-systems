import React from "react";

const FylkeAside = () => {
    //const { visibleFeatures } = FylkeFeatures();

    return (
        <aside className={"visible"}>
            <div>
                <h1>Fylker</h1>
                <ul>
                    {/*
                    {visibleFeatures?.map((feature) => (
                        <li>{getStedsNavn(feature.getProperties().navn)}</li>
                    ))}
                    */}
                </ul>
            </div>
        </aside>
    );
};

export default FylkeAside;
