"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { GoogleMap, useJsApiLoader, OverlayView } from "@react-google-maps/api";

import { getSingleGeolocation } from "@/services/geolocationService";

import { RepairShop } from "@/types";

import PreviewCard from "../cards/PreviewCard";
import { mapOptions } from "../browse-map/mapStyles";

import { smallContainerStyles } from "../browse-map/smallMapStyles";

interface Location {
  name: string;
  lat: number;
  lng: number;
}

interface MapComponentProps {
  shop: RepairShop | null;
}

function MapComponent({ shop }: MapComponentProps) {
  const [center, setCenter] = useState({ lat: 61.497753, lng: 23.760954 });
  const [zoom, setZoom] = useState(12);

  const searchParams = useSearchParams();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (shop) {
        const coord = await getSingleGeolocation(shop);
        if (coord) {
          setCenter(coord);
          setZoom(searchParams.toString().length > 0 ? 12 : 7);
        }
      }
    };

    fetchCoordinates();
  }, [shop, searchParams]);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={smallContainerStyles}
      center={center}
      zoom={15}
      options={mapOptions}
    >
      {shop && (
        <OverlayView
          position={{ lat: center.lat, lng: center.lng }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <PreviewCard repairShop={shop} />
        </OverlayView>
      )}
    </GoogleMap>
  ) : null;
}

export default React.memo(MapComponent);
