import { useContext, useEffect, useState } from "react";
import { MapContext } from "../context/MapContext";

export const GetViewExtend = () => {
  const { map } = useContext(MapContext);

  const [extent, setExtent] = useState(() => map.getView().calculateExtent());

  const handleViewExtendUpdate = () => {
    setExtent(map.getView().calculateExtent());
  };

  useEffect(() => {
    map.getView().on("change", handleViewExtendUpdate);

    return () => map.getView().un("change", handleViewExtendUpdate);
  }, [map.getView()]);

  return extent;
};
