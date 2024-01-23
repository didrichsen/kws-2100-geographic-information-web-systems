import React, {Dispatch, MutableRefObject, SetStateAction, useEffect, useMemo, useRef, useState} from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {GeoJSON} from "ol/format";
import {MapBrowserEvent} from "ol";
import {Map} from "ol";
import {Layer} from "ol/layer";

interface KommuneLayerCheckboxProps {
    map: Map,
    setLayer: Dispatch<SetStateAction<Layer[]>>
}

const KommuneLayerCheckbox = ({map, setLayer} : KommuneLayerCheckboxProps) => {

    const [kommune, setKommune] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);

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

    useEffect(() => {
        if (isChecked) {
            setLayer((oldLayer) => [...oldLayer, kommuneLayer]);
        } else {
            setLayer((oldLayer) => oldLayer.filter((layer) => layer !== kommuneLayer));
        }
    }, [isChecked]);

    useEffect(() => {
        map.on('singleclick', handleClick);
    }, []);

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
        </>
    );

}

export default KommuneLayerCheckbox;