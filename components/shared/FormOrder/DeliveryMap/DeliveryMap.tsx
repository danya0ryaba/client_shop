"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { booleanPointInPolygon, point, polygon } from "@turf/turf";

const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
};

const SOLIKAMSK_CENTER: [number, number] = [59.649318, 56.770625];

const DELIVERY_ZONE_COORDINATES: [number, number][] = [
  [59.6514603, 56.7682886],
  [59.6804818, 56.7945099],
  [59.6787486, 56.8099594],
  [59.673375, 56.8053246],
  [59.6736784, 56.7990589],
  [59.651959, 56.8016338],
  [59.6428943, 56.7879009],
  [59.6378187, 56.779232],
  [59.6381224, 56.7745972],
  [59.6404217, 56.7744255],
  [59.6409856, 56.7698765],
  [59.6390335, 56.7660141],
  [59.6444559, 56.7564869],
  [59.648186, 56.7655849],
  [59.6514603, 56.7682886],
];

const polygonStyle = {
  color: "#16a34a",
  weight: 3,
  opacity: 1,
  fillColor: "#4CAF50",
  fillOpacity: 0.15,
};

const zonePolygon = polygon([
  DELIVERY_ZONE_COORDINATES.map(([lat, lng]) => [lng, lat]),
]);

function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (coords: [number, number], insideZone: boolean) => void;
}) {
  useMapEvents({
    click(e) {
      const coords: [number, number] = [e.latlng.lat, e.latlng.lng];
      const insideZone = booleanPointInPolygon(
        point([coords[1], coords[0]]),
        zonePolygon,
      );
      onMapClick(coords, insideZone);
    },
  });
  return null;
}

interface Props {
  marker?: [number, number] | null;
  onMapClick: (coords: [number, number], insideZone: boolean) => void;
}

export const DeliveryMap: React.FC<Props> = ({ marker, onMapClick }) => {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        zIndex: 9000,
        marginTop: "15px",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <MapContainer
        center={SOLIKAMSK_CENTER}
        zoom={12}
        scrollWheelZoom={true}
        style={{
          height: "340px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polygon
          positions={DELIVERY_ZONE_COORDINATES}
          pathOptions={polygonStyle}
        >
          {/* <Popup>Зона доставки курьером (г. Соликамск)</Popup> */}
        </Polygon>

        {marker && <Marker position={marker} />}

        <MapClickHandler onMapClick={onMapClick} />
      </MapContainer>
    </div>
  );
};
