import {useContext, useEffect, useMemo, useState} from "react";
import {MapContext} from "../context/MapContext";
import {Feature} from "ol/render/webgl/MixedGeometryBatch";
import {stedsNavn} from "../utility/interfaces";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

//"navn": [{ "sprak": "nor", "rekkefolge": "", "navn": "Rogaland" }],

type FylkeVectorLayer = VectorLayer<VectorSource<FylkeFeature>>;

interface FylkeProperties{
    navn: stedsNavn[];
}

interface FylkeFeature extends Feature {

    getProperties(): FylkeProperties;

}

export const FylkeFeatures = () => {

    const {layer, map} = useContext(MapContext);

    const [viewExtend, setViewExtend] = useState(map.getView().calculateExtent());

    const fylkeLayer = layer.find(l => l.getClassName() == "fylker") as FylkeVectorLayer;

    const [features, setFeatures] = useState<FylkeFeature[]>();


    const visibleFeatures = useMemo(
        () =>
            features?.filter((feature) => feature.getGeometry()?.intersectsExtent(viewExtend)
            ), [features, viewExtend]);


    const handleViewUpdate = () => {

        setViewExtend(map.getView().calculateExtent());

    }

    const handleSourceChange = () => {

        setFeatures(fylkeLayer?.getSource()?.getFeatures());

    }

    useEffect(() => {

        fylkeLayer?.getSource()?.on("change",handleSourceChange);

        return () => fylkeLayer?.getSource()?.un("change",handleSourceChange);

    }, [fylkeLayer]);

    useEffect(() => {
        map.getView().on("change", handleViewUpdate);

        return () => map.getView().un("change",handleViewUpdate);

    }, [map]);

return {visibleFeatures};

};
