"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";

import getGeolocation from "@/services/geolocationService";

import { RepairShop } from "@/types";

import { containerStyle, mapOptions } from "./mapStyles";
import PreviewCard from "../cards/PreviewCard";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  shops: RepairShop[] | null;
}

function MapComponent({ shops }: MapComponentProps) {
  const [coordinates, setCoordinates] = useState<Location[]>([]);
  const [center, setCenter] = useState({ lat: 61.497753, lng: 23.760954 });
  const [zoom, setZoom] = useState(7);

  const searchParams = useSearchParams();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      let coords = await getGeolocation(shops);
      const filteredCoords: Location[] = coords.filter(
        (coord): coord is Location => coord !== null,
      );

      setCoordinates(filteredCoords);

      if (filteredCoords.length > 0) {
        setCenter(filteredCoords[0]);
        setZoom(searchParams.toString().length > 0 ? 12 : 7);
      }
    };

    fetchCoordinates();
  }, [shops, searchParams]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={mapOptions}
    >
      {coordinates.map((location) => (
        <OverlayView
          key={location.name}
          position={{ lat: location.lat, lng: location.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <PreviewCard
            repairShop={
              shops?.find((shop) => shop.name === location.name) || null
            }
          />
        </OverlayView>
      ))}
    </GoogleMap>
  ) : null;
}

export default React.memo(MapComponent);
