import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect } from 'react';
import { GetCoordinates } from './coordinates.js';

export function Map({ locationtest }) {
  const [latgood, setLatgood] = useState(null);
  const [lnggood, setLnggood] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (locationtest) {
        const [lat, lng] = await GetCoordinates(locationtest);
        setLatgood(lat);
        setLnggood(lng);
      }
    };
    fetchCoordinates();
  }, [locationtest]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBGwo4KfC880qldYVqzMODQAIEmHt0pMeo",
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div style={{ height: "600px", width: "600px"}}>
      {latgood && lnggood ? (
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%", borderRadius: "10px" }}
          zoom={8}
          center={{ lat: latgood, lng: lnggood }}
        >
        </GoogleMap>
      ) : (
        <div>Waiting for coordinates</div>
      )}
    </div>
  );
}
