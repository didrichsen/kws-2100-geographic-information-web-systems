import React, {createContext, useContext, useEffect, useMemo} from "react";
import { getStedsNavn } from "../utility/utilities";
import { getFeatures } from "../utility/getFeatures";
import { GetViewExtend } from "../utility/getViewExtend";
import {MapContext} from "../context/MapContext";
import {Feature, MapBrowserEvent} from "ol";
import {Pixel} from "ol/pixel";
import {FeatureLike} from "ol/Feature";
import {Fill, Style} from "ol/style";

const KommuneAside = () => {
  const features = getFeatures("kommune");

  const featuresToStyle : FeatureLike[] = [];

  const {map} = useContext(MapContext);

  const viewExtend = GetViewExtend();

  const visibleFeatures = useMemo(
    () =>
      features?.filter((feature) =>
        feature.getGeometry()?.intersectsExtent(viewExtend),
      ),
    [features, viewExtend],
  );

  let styledFeature: FeatureLike | undefined = undefined;
  const handleFeaturesAtPixel = (pixel : Pixel) => {

      if(styledFeature){
          styledFeature.setStyle(null);
          styledFeature = undefined;
      }

      map.forEachFeatureAtPixel(pixel,(feature) => {
          featuresToStyle.push(feature)
      });

      if(featuresToStyle.length > 0){
          styledFeature = featuresToStyle.pop();
          const style = new Style({
                  fill: new Fill({
                      color: 'rgba(200, 200, 200, 0.5)'
                  })
          })

          styledFeature?.setStyle(style);
      }
  }

    useEffect(() => {
        map.on('pointermove', (e:MapBrowserEvent<MouseEvent>) => {
            const pixel = e.pixel;
            handleFeaturesAtPixel(pixel);
        })

    }, []);

  return (
    <aside className={visibleFeatures?.length ? "visible" : "hidden"}>
      <div>
        <h1>Kommuner</h1>
        <ul>
          {visibleFeatures?.map((feature, key) => (
            <li key={key}>{getStedsNavn(feature.getProperties().navn)}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default KommuneAside;
