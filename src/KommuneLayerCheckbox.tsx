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
  const [kommune, setKommune] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  //Another approach to get the clicked feature
  //const [clickedKommune, setClickedKommune] = useState<KommuneFeature | undefined>(undefined);

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

  const handleClick = (e: MapBrowserEvent<MouseEvent>) => {
    const features = map.getFeaturesAtPixel(e.pixel);
    if (features) {
      const feature = features[0];
      const kommuneNavnArray = feature.get("navn");
      console.log(kommuneNavnArray);
      setKommune(kommuneNavnArray[0].navn);
    }
  };

  const dialogRef = useRef() as MutableRefObject<HTMLDialogElement>;

  useEffect(() => {
    if (isChecked) {
      setLayer((old) => [...old, kommuneLayer]);
      map.on("singleclick", handleClick);
    }
    return () => {
      map.un("singleclick", handleClick);
      setLayer((old) => old.filter((l) => l !== kommuneLayer));
    };
  }, [isChecked]);

  useEffect(() => {
    if (kommune) {
      dialogRef.current.showModal();
    }
  }, [kommune]);

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
        <p>{kommune}</p>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};

export default KommuneLayerCheckbox;
