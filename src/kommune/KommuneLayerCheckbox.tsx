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
import { Feature, MapBrowserEvent, Overlay } from "ol";
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
  const [checked, setChecked] = useState(false);
  const [clickedKommune, setClickedKommune] = useState<
    KommuneFeature | undefined
  >(undefined);

  const overlay = useMemo(() => new Overlay({}), []);
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    overlay.setElement(overlayRef.current);
    map.addOverlay(overlay);

    return () => {
      map.removeOverlay(overlay);
    };
  }, []);

  const kommuneLayer = useMemo(
    () =>
      new VectorLayer({
        className: "kommune",
        source: new VectorSource({
          url: "/kws-2100-geographic-information-web-systems/kommuner_komprimert.json",
          format: new GeoJSON(),
        }),
      }),
    [],
  );

  const handleFeatureClick = (e: MapBrowserEvent<MouseEvent>) => {
    e.preventDefault();

    const kommuneFeatures = kommuneLayer
      .getSource()
      ?.getFeaturesAtCoordinate(e.coordinate);

    if (kommuneFeatures) {
      const kommuneFeature = kommuneFeatures[0] as KommuneFeature;
      setClickedKommune(kommuneFeature);
      overlay.setPosition(e.coordinate);
    } else {
      setClickedKommune(undefined);
      overlay.setPosition(undefined);
    }
  };

  const dialogRef = useRef() as MutableRefObject<HTMLDialogElement>;

  useEffect(() => {
    if (checked) {
      setLayer((old) => [...old, kommuneLayer]);
      map.on("singleclick", handleFeatureClick);
    }
    return () => {
      map.un("singleclick", handleFeatureClick);
      setClickedKommune(undefined);
      overlay.setPosition(undefined);
      setLayer((old) => old.filter((l) => l !== kommuneLayer));
    };
  }, [checked]);

  return (
    <>
      <label>
        {checked ? "Remove layer" : "Add layer"}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        ></input>
      </label>
      <div ref={overlayRef}>
        <p>{clickedKommune?.getProperties().navn[0].navn}</p>
      </div>
    </>
  );
};

export default KommuneLayerCheckbox;
