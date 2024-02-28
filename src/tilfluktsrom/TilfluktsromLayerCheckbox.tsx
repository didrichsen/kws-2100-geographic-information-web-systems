import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { MapContext } from "../map/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Feature } from "ol/render/webgl/MixedGeometryBatch";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { MapBrowserEvent, Overlay } from "ol";
import { FeatureLike } from "ol/Feature";

type TilflulktsromProperties = {
  plasser: number;
  adresse: string;
};
type TilfluktsromFeature = {
  getProperties(): TilflulktsromProperties;
} & Feature; // Why cant i say Feature<Point> ????????

function tilfluksromStyle(f: FeatureLike) {
  const feature = f as TilfluktsromFeature;
  const rom = feature.getProperties();
  return new Style({
    image: new Circle({
      stroke: new Stroke({ color: "white", width: 2 }),
      fill: new Fill({ color: "rgb(5,116,129)" }),
      radius: 5 + rom.plasser / 700,
    }),
  });
}
const hoveredColor = "rgb(3,11,141)";
function hoveredTilfluksromStyle(f: FeatureLike) {
  const feature = f as TilfluktsromFeature;
  const rom = feature.getProperties();
  return new Style({
    image: new Circle({
      stroke: new Stroke({ color: "white", width: 2 }),
      fill: new Fill({ color: hoveredColor }),
      radius: 8 + rom.plasser / 700,
    }),
  });
}
function TilfluktsromLayerCheckbox() {
  const { map, setVectorLayers, setClickedFeature } = useContext(MapContext);

  const [checked, setChecked] = useState(false);
  const [hoveredTilfluktsrom, setHoveredTilfluktsrom] =
    useState<TilfluktsromFeature>();

  const tilfluktsromLayer = new VectorLayer({
    className: "tilfluktsromLayer",
    source: new VectorSource({
      url: "/kws2100-publishing-a-map-application-ArianMathai/tilfluktsrom.json",
      format: new GeoJSON(),
    }),
    style: tilfluksromStyle,
  });

  function handlePointerMove(e: MapBrowserEvent<PointerEvent>) {
    const features: FeatureLike[] = [];
    map.forEachFeatureAtPixel(e.pixel, (f) => features.push(f), {
      hitTolerance: 6,
      layerFilter: (l) => l === tilfluktsromLayer,
    });
    if (features.length === 1) {
      setHoveredTilfluktsrom(features[0] as TilfluktsromFeature);
      overlay.setPosition(e.coordinate);
    } else {
      setHoveredTilfluktsrom(undefined);
      overlay.setPosition(undefined);
    }
  }

  function handlePointerClick(e:MapBrowserEvent<PointerEvent>){
    console.log("Test");

    const features : FeatureLike[] = [];

    map.forEachFeatureAtPixel(e.pixel,(f) => features.push(f),{
      layerFilter: (l) => l === tilfluktsromLayer,
      hitTolerance:10,
    });

    console.log(features.length);

    if(features.length === 1){
      setClickedFeature(features[0] as TilfluktsromFeature);
    } else {
      setClickedFeature(undefined);
    }

  }
  const overlay = useMemo(() => new Overlay({}), []);
  const overlayRef = useRef() as MutableRefObject<HTMLDivElement>;


  useEffect(() => {
    overlay.setElement(overlayRef.current);
    map.addOverlay(overlay);
    return () => {
      map.removeOverlay(overlay);
    };
  }, []);

  useEffect(() => {
    hoveredTilfluktsrom?.setStyle(hoveredTilfluksromStyle(hoveredTilfluktsrom));
    return () => hoveredTilfluktsrom?.setStyle(undefined);
  }, [hoveredTilfluktsrom]);

  useEffect(() => {
    if (checked) {
      setVectorLayers((old) => [...old, tilfluktsromLayer]);
      map.on("click",handlePointerClick);
      //map.on("pointermove", handlePointerMove);
    }
    return () => {
      setVectorLayers((old) => old.filter((old) => old != tilfluktsromLayer));
      map.un("pointermove", handlePointerMove);
      //map.un("click",handlePointerClick);
      setClickedFeature(undefined);
    };
  }, [checked]);


  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        {!checked ? "Vis" : "Skjul"} Tilfluktsrom
      </label>
      <div ref={overlayRef} className={"overlay"}>
        {<p>Addresse: {hoveredTilfluktsrom?.getProperties().adresse}</p>}
        {<p>Plasser: {hoveredTilfluktsrom?.getProperties().plasser}</p>}
      </div>
    </div>
  );
}

export default TilfluktsromLayerCheckbox;
