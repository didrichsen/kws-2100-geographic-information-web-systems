import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Feature, MapBrowserEvent } from "ol";
import { Map } from "ol";
import { Layer } from "ol/layer";

interface KommuneLayerCheckboxProps {
  map: Map;
  setLayer: Dispatch<SetStateAction<Layer[]>>;
}

interface KommuneProperties {
  navn: string;
}

type KommuneFeature = Feature & {
  getProperties(): KommuneProperties;
};

const KommuneLayerCheckbox = ({ map, setLayer }: KommuneLayerCheckboxProps) => {

  const [isChecked, setIsChecked] = useState(false);
  const [clickedKommune, setClickedKommune] = useState<KommuneFeature | undefined>(undefined);

  const kommuneLayer = useMemo(
    () =>
      new VectorLayer({
        source: new VectorSource({
          url: "/kws-2100-geographic-information-web-systems/kommuner_komprimert.json",
          format: new GeoJSON(),
        }),
      }),
    [],
  );

  const handleFeatureClick = (e: MapBrowserEvent<MouseEvent>) => {

    e.preventDefault();

    const kommuneFeatures = kommuneLayer.getSource()?.getFeaturesAtCoordinate(e.coordinate);

    if (kommuneFeatures) {
      const kommuneFeature = kommuneFeatures[0] as KommuneFeature;
      setClickedKommune(kommuneFeature);
    }

  }

  const dialogRef = useRef() as MutableRefObject<HTMLDialogElement>;

  useEffect(() => {
    if (isChecked) {
      setLayer((old) => [...old, kommuneLayer]);
      map.on("singleclick", handleFeatureClick);
    }
    return () => {
      map.un("singleclick", handleFeatureClick);
      setLayer((old) => old.filter((l) => l !== kommuneLayer));
    };
  }, [isChecked]);

  useEffect(() => {
    if (clickedKommune) {
      dialogRef.current.showModal();
    }
  }, [clickedKommune]);

  return (
    <>
      <label>
        {isChecked ? "Remove layer" : "Add layer"}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        ></input>
      </label>
      <dialog ref={dialogRef}>
        <h2>Kommune</h2>
        <p>{clickedKommune?.getProperties().navn[0].navn}</p>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default KommuneLayerCheckbox;
