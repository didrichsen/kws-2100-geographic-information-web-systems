import React, {Dispatch, MutableRefObject, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {Feature, MapBrowserEvent} from "ol";
import {Map} from "ol";
import {Layer} from "ol/layer";
import FeaturesInView from "./FeaturesInView";

interface KommuneLayerCheckboxProps {
    map: Map,
    setLayer: Dispatch<SetStateAction<Layer[]>>
}

interface KommuneProperties {
    navn: string
}

type KommuneFeature = Feature & {
    getProperties(): KommuneProperties
};

const KommuneLayerCheckbox = ({map, setLayer} : KommuneLayerCheckboxProps) => {

    const [kommune, setKommune] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [clickedKommune, setClickedKommune] = useState<KommuneFeature | undefined>(undefined);

    const kommuneLayer = useMemo( () => new VectorLayer({
        source: new VectorSource({
            url:"/kws-2100-geographic-information-web-systems/kommuner_komprimert.json",
            format: new GeoJSON()
        }),
    }), []);

    const handleClick =  (e: MapBrowserEvent<MouseEvent>) => {
        const features = map.getFeaturesAtPixel(e.pixel);
        if (features) {
            const feature = features[0];
            const kommune = feature.get('navn');
            setKommune(kommune[0].navn);
        }
    }

    const dialogRef = useRef() as MutableRefObject<HTMLDialogElement>;

    {/*
    Prat med Joahnnes her om ulik bruk av UseEffect

    useEffect(() => {
  if (checked) {
    setLayers((old) => [...old, kommuneLayer]);
    map.on("click", handleClick);
  }
  return () => {
    map.un("click", handleClick);
    setLayers((old) => old.filter((l) => l !== kommuneLayer));
  };
}, [checked]);


     */}

    const handleClickFeatureApproach = (e : MapBrowserEvent<MouseEvent>) => {

        const clickedKommuner = kommuneLayer.getSource()?.getFeaturesAtCoordinate(e.coordinate);

        setClickedKommune(clickedKommuner?.[0] as KommuneFeature);

    }

    useEffect(() => {
        if (isChecked) {
            setLayer((oldLayer) => [...oldLayer, kommuneLayer]);
            map.on('singleclick', handleClick);
            map.on('singleclick', handleClickFeatureApproach);
        } else {
            setLayer((oldLayer) => oldLayer.filter((layer) => layer !== kommuneLayer));
            map.un('singleclick', handleClick);
            map.un('singleclick', handleClickFeatureApproach);
        }
    }, [isChecked]);

    useEffect(() => {
        console.log(clickedKommune);
    }, [clickedKommune]);


    useEffect(() => {
        if (kommune) {
            dialogRef.current.showModal();
        }
    }, [kommune]);

    return (
        <>
        <label>
            Toggle kommuner on/off
            <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)}></input>
        </label>
            <dialog ref={dialogRef}>
                <h2>Valgt kommune</h2>
                <p>{kommune}</p>
                <form method="dialog">
                    <button>Close</button>
                </form>
            </dialog>
        {kommune? <p>Currently selected kommune: {kommune}</p> : <p>Click on a kommune to see its name</p>}
            <FeaturesInView map={map}/>
        </>
    );

}

export default KommuneLayerCheckbox;