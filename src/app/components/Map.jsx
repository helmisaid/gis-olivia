'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  const [geoData, setGeoData] = useState(null);

  // Memuat data GeoJSON
  useEffect(() => {
    fetch('/data/gadm41_IDN_2.json')
      .then((response) => response.json())
      .then((data) => setGeoData(data))
      .catch((error) => console.error('Error loading GeoJSON:', error));
  }, []);

  // Fungsi untuk mengatur gaya setiap daerah
  const getStyle = (feature) => {
    // Warna acak sederhana berdasarkan GID_2 untuk membedakan daerah
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeead', '#d4a5a5', '#9b59b6'];
    const index = parseInt(feature.properties.GID_2.split('.')[2]) % colors.length;
    return {
      fillColor: colors[index],
      weight: 1,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7,
    };
  };

  // Fungsi untuk menangani interaksi (klik dan hover)
  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_2;
    // Popup saat diklik
    layer.bindPopup(`<b>Kabupaten:</b> ${name}`);
    // Tooltip saat hover
    layer.bindTooltip(name, { sticky: true });
    // Highlight saat mouseover
    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          weight: 3,
          fillOpacity: 0.9,
        });
      },
      mouseout: (e) => {
        e.target.setStyle(getStyle(feature));
      },
    });
  };

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[4.5, 96.0]} // Koordinat tengah untuk Aceh secara umum
        zoom={8} // Zoom level lebih kecil untuk melihat kabupaten
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={getStyle}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;