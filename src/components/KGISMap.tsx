import React from "react";
import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface KGISMapProps {
  district?: string;
  taluk?: string;
  village?: string;
  surveyNumber?: string;
  className?: string;
}

export const KGISMap: React.FC<KGISMapProps> = ({ district, taluk, village, surveyNumber, className }) => {
  // Karnataka general center point
  const center: [number, number] = [15.3173, 75.7139]; 
  const zoom = 7;

  // The KGIS WMS endpoints usually require specific layer names and credentials or API tokens depending on the environment
  // Here we use a hypothetical KGIS public WMS endpoint for cadastral maps. 
  // In production, you would replace the url with the official API Setu/KGIS endpoint and pass necessary auth tokens in the headers or as WMS params.
  const wmsUrl = "https://kgis.ksrsac.in/kgis/wms"; 

  // Example CQL filter to highlight a specific survey number if provided
  const cqlFilter = surveyNumber ? `survey_no='${surveyNumber}' AND village='${village}'` : undefined;

  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden border border-border shadow-sm ${className || ""}`}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* KGIS Cadastral WMS Layer */}
        <WMSTileLayer
          url={wmsUrl}
          layers="karnataka:cadastral_boundaries"
          format="image/png"
          transparent={true}
          version="1.1.0"
          attribution="Karnataka GIS"
          // @ts-expect-error - Custom params for filtering
          cql_filter={cqlFilter}
        />
      </MapContainer>
    </div>
  );
};
