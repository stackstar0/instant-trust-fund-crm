import React from 'react';
import { MapContainer, TileLayer, WMSTileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default Leaflet icon issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface PropertyData {
  _id?: string;
  propertyId?: string;
  latitude?: number;
  longitude?: number;
  surveyNumber?: string;
  district?: string;
  taluk?: string;
  village?: string;
  ownerName?: string;
}

interface PropertyMapProps {
  properties: PropertyData[];
  onSelectProperty?: (prop: PropertyData) => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties = [], onSelectProperty }) => {
  // Center map on Karnataka (Bengaluru default: 12.9716, 77.5946)
  const defaultCenter: [number, number] = [12.9716, 77.5946];

  return (
    <div style={{ height: '500px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', zIndex: 0 }}>
      <MapContainer center={defaultCenter} zoom={9} style={{ height: '100%', width: '100%', zIndex: 0 }}>
        <LayersControl position="topright">
          
          {/* Base Layer 1: Google Maps Style (OpenStreetMap Standard) */}
          <LayersControl.BaseLayer checked name="Google / Road View">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
          </LayersControl.BaseLayer>

          {/* Base Layer 2: Satellite Hybrid View */}
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            />
          </LayersControl.BaseLayer>

          {/* Overlay Layer: Karnataka Cadastral Property & Land Survey Boundaries */}
          <LayersControl.Overlay checked name="Karnataka Land Survey Boundaries (KGIS)">
            <WMSTileLayer
              url="https://kgis.ksrsac.in/geoserver/wms"
              layers="KGIS:Cadastral_Boundaries,KGIS:Village_Boundaries"
              format="image/png"
              transparent={true}
              version="1.1.1"
              attribution="&copy; KSRSAC / Karnataka GIS"
            />
          </LayersControl.Overlay>
        </LayersControl>

        {/* Live Property Markers fetched from Backend/Bhoomi */}
        {properties.map((prop, idx) => (
          <Marker 
            key={prop._id || prop.propertyId || idx} 
            position={[prop.latitude || 12.9716, prop.longitude || 77.5946]}
            eventHandlers={{
              click: () => onSelectProperty && onSelectProperty(prop),
            }}
          >
            <Popup>
              <div style={{ padding: '5px' }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold' }}>Survey No: {prop.surveyNumber}</h4>
                <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>District:</strong> {prop.district}</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Taluk:</strong> {prop.taluk}</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Village:</strong> {prop.village}</p>
                <p style={{ margin: '2px 0', fontSize: '12px' }}><strong>Owner:</strong> {prop.ownerName || '•••••••• (Restricted)'}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
