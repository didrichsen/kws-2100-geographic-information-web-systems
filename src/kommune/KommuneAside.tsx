import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import { getStedsNavn } from "../utility/utilities";
import { getFeatures } from "../utility/getFeatures";
import { GetViewExtend } from "../utility/getViewExtend";
import {MapContext} from "../context/MapContext";
import {Feature, MapBrowserEvent} from "ol";
import {Pixel} from "ol/pixel";
import {FeatureLike} from "ol/Feature";
import {Fill, Style} from "ol/style";
import {Polygon} from "ol/geom";

const KommuneAside = () => {
  const features = getFeatures("kommune");

  const {map} = useContext(MapContext);

  const viewExtend = GetViewExtend();

  const visibleFeatures = useMemo(
    () =>
      features?.filter((feature) =>
        feature.getGeometry()?.intersectsExtent(viewExtend),
      ),
    [features, viewExtend],
  );

  const [activeFeature, setActiveFeature] = useState<Feature<Polygon>>(undefined);

  let styledFeature: FeatureLike | undefined = undefined;


  const handleFeaturesAtPixel = (pixel : Pixel) => {

      const featuresToStyle : FeatureLike[] = [];
/*
      if(styledFeature){
          styledFeature.setStyle(null);
          styledFeature = undefined;
      }

 */

      map.forEachFeatureAtPixel(pixel,(feature) => {
          featuresToStyle.push(feature)
      });

      if(featuresToStyle.length === 1){
      // console.log(featuresToStyle[0]);
      setActiveFeature(featuresToStyle[0]);
      //console.log("----");
      //console.log(activeFeature);
          //styledFeature = featuresToStyle[0];
/*
          const style = new Style({
              fill: new Fill({
                  color: 'rgba(200, 200, 200, 0.5)'
              })
          })

 */



          //activeFeature.setStyle(style);
          //styledFeature.setStyle(style);
      } else {
          setActiveFeature(undefined);
      }
  }

    const style = new Style({
        fill: new Fill({
            color: 'rgba(200, 200, 200, 0.5)'
        })
    })




    useEffect(() => {
        activeFeature?.setStyle(style);
        return () => activeFeature?.setStyle(undefined);
    }, [activeFeature]);



    useEffect(() => {
        map.on('pointermove', (e:MapBrowserEvent<MouseEvent>) => {
            const pixel = e.pixel;
            handleFeaturesAtPixel(pixel);
        })

        return () => map.un('pointermove');

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
