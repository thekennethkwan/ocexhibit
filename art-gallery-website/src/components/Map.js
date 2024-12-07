// Still compiling more locations
// Will eventually have a total of at least 10+

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// A few sparse locations
const galleryLocations = [
  { name: 'Huntington Beach Art Center', lat: 33.66234539340709, lng: -117.99877716392128 },
  { name: 'Orange County Center For Contemporary Art', lat: 33.74613651193147, lng: -117.8683765288628 },
  { name: 'Martin Lawrence Galleries', lat: 33.69196263368248, lng: -117.89267586444488 },
  { name: 'Irvine Fine Arts Center', lat: 33.70026660349348, lng: -117.7777088288628 },
  { name: 'OCFA Showcase Gallery', lat: 33.69603216841085, lng: -117.89062732886279 },
];

const Map = () => {
  return (
    <MapContainer center={[33.72256251516097, -117.90088806633459]} zoom={12} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {galleryLocations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup>
            <b>{location.name}</b>
            <br />
            Coordinates: {location.lat}, {location.lng}     
            Hours: [Insert Hours Here]
            Current Event: [Insert Event Name Here]
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;

